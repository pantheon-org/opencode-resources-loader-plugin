import fs from 'fs';
import path from 'path';
import os from 'os';
import { parseFrontmatter } from '../src/parse/frontmatter.ts';

const basePaths = [
  path.join(process.cwd(), '.opencode'),
  path.join(os.homedir(), '.opencode'),
  path.join(os.homedir(), '.config', 'opencode'),
];

function scanDir(dir: string, files: string[] = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) scanDir(full, files);
    else if (e.isFile() && full.endsWith('.md')) files.push(full);
  }
  return files;
}

const argv = process.argv.slice(2);
const changedOnly = argv.includes('--changed-only');

const failures: { file: string; errors: unknown[] }[] = [];

import { findYamlPosition } from './lib/yaml-position';

// Determine files to validate
let targetFiles: string[] = [];

if (changedOnly) {
  // Try to detect changed files using git
  try {
    // If running in GitHub Actions on a PR, GITHUB_BASE_REF is set
    const githubBase = process.env.GITHUB_BASE_REF;
    if (githubBase) {
      // Fetch base branch and compute diff
      const spawnSync = require('child_process').spawnSync;
      spawnSync('git', ['fetch', 'origin', githubBase], { stdio: 'inherit' });
      const diff = spawnSync('git', ['diff', '--name-only', `origin/${githubBase}...HEAD`], {
        encoding: 'utf8',
      });
      const changed = diff.stdout ? diff.stdout.split('\n').filter(Boolean) : [];
      targetFiles = changed.filter((p) => p.startsWith('.opencode/') && p.endsWith('.md'));
    } else {
      // Fallback: compare against origin/main
      const spawnSync = require('child_process').spawnSync;
      spawnSync('git', ['fetch', 'origin', 'main'], { stdio: 'inherit' });
      const diff = spawnSync('git', ['diff', '--name-only', 'origin/main...HEAD'], {
        encoding: 'utf8',
      });
      const changed = diff.stdout ? diff.stdout.split('\n').filter(Boolean) : [];
      targetFiles = changed.filter((p) => p.startsWith('.opencode/') && p.endsWith('.md'));
    }
  } catch (err) {
    console.warn('Could not determine changed files via git, falling back to full scan', err);
  }
}

if (!changedOnly || targetFiles.length === 0) {
  // Full scan of base paths
  for (const base of basePaths) {
    const files = scanDir(base);
    targetFiles.push(...files);
  }
}

// De-duplicate
targetFiles = Array.from(new Set(targetFiles));

for (const f of targetFiles) {
  try {
    const content = fs.readFileSync(f, 'utf8');
    const { frontmatter, errors } = parseFrontmatter(content, f as string);
    if (errors && errors.length > 0) {
      failures.push({ file: f, errors });
    }
  } catch (err) {
    failures.push({ file: f, errors: [`Failed to read/parse: ${String(err)}`] });
  }
}

if (failures.length > 0) {
  console.error('\nFrontmatter validation failed for the following files:');
  for (const f of failures) {
    const rel = path.relative(process.cwd(), f.file);
    console.error(`\n- ${f.file}`);
    for (const e of f.errors) {
      // If Zod issues, try to format nicely
      if (Array.isArray(e) && e.length > 0 && typeof e[0] === 'object') {
        // Zod issues array
        for (const issue of e as any[]) {
          const msg = issue.message || JSON.stringify(issue);
          const issuePathArr = Array.isArray(issue.path) ? issue.path : [String(issue.path || '')];
          const issuePath = issuePathArr.join('.');
          // Try to map path to a YAML line number
          const frontmatterMatch = fs.readFileSync(f.file, 'utf8').match(/^---\n([\s\S]*?)\n---\n/);
          let lineNum: number | null = null;
          let colNum: number | null = null;
          if (frontmatterMatch) {
            const fm = frontmatterMatch[1];
            const pos = findYamlPosition(fm, issuePathArr);
            if (pos) {
              lineNum = pos.line;
              colNum = pos.col;
            }
          }

          if (lineNum) {
            console.error(`    - ${issuePath}: ${msg} (line ${lineNum}, col ${colNum || 1})`);
            if (process.env.GITHUB_ACTIONS) {
              console.log(
                `::error file=${rel},line=${lineNum},col=${colNum || 1},title=Frontmatter validation::${issuePath}: ${msg}`,
              );
            }
          } else {
            console.error(`    - ${issuePath}: ${msg}`);
            if (process.env.GITHUB_ACTIONS) {
              console.log(`::error file=${rel},title=Frontmatter validation::${issuePath}: ${msg}`);
            }
          }
        }
      } else if (e && typeof e === 'object' && 'message' in e) {
        const msg = (e as any).message || JSON.stringify(e);
        console.error(`    - ${msg}`);
        if (process.env.GITHUB_ACTIONS) {
          console.log(`::error file=${rel},title=Frontmatter validation::${msg}`);
        }
      } else {
        const msg = String(e);
        console.error(`    - ${msg}`);
        if (process.env.GITHUB_ACTIONS) {
          console.log(`::error file=${rel},title=Frontmatter validation::${msg}`);
        }
      }
    }
  }
  console.error(`\nTotal invalid files: ${failures.length}`);
  process.exit(1);
}

console.log('All frontmatter checks passed');
process.exit(0);
