#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const basePaths = [
  path.join(process.cwd(), '.opencode'),
  path.join(require('os').homedir(), '.opencode'),
  path.join(require('os').homedir(), '.config', 'opencode'),
];

const semverRegex = /^\d+\.\d+\.\d+(?:[-+].*)?$/;

function validateFrontmatter(obj) {
  const errs = [];
  if (obj == null) return errs;
  if (obj.description && typeof obj.description !== 'string')
    errs.push('description must be a string');
  if (obj.description && obj.description.length > 200)
    errs.push('description must be <= 200 chars');
  if (obj.version && !semverRegex.test(String(obj.version)))
    errs.push('version must be semver (e.g., 1.2.3)');
  if (obj.tags && !Array.isArray(obj.tags)) errs.push('tags must be an array');
  if (obj.tags && Array.isArray(obj.tags) && obj.tags.some((t) => typeof t !== 'string'))
    errs.push('all tags must be strings');
  if (obj.temperature != null) {
    const n = Number(obj.temperature);
    if (Number.isNaN(n) || n < 0 || n > 1)
      errs.push('temperature must be a number between 0 and 1');
  }
  return errs;
}

function scanDir(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) scanDir(full, files);
    else if (e.isFile() && full.endsWith('.md')) files.push(full);
  }
  return files;
}

let failures = [];
for (const base of basePaths) {
  const files = scanDir(base);
  for (const f of files) {
    try {
      const content = fs.readFileSync(f, 'utf8');
      const match = content.match(/^---\n([\s\S]*?)\n---\n/);
      if (!match) continue; // no frontmatter - skip
      const parsed = yaml.parse(match[1]);
      const errs = validateFrontmatter(parsed);
      if (errs.length > 0) {
        failures.push({ file: f, errors: errs });
      }
    } catch (err) {
      failures.push({ file: f, errors: [`Failed to read/parse: ${String(err)}`] });
    }
  }
}

if (failures.length > 0) {
  console.error('\nFrontmatter validation failed for the following files:');
  for (const f of failures) {
    const rel = path.relative(process.cwd(), f.file);
    console.error(`\n- ${f.file}`);
    for (const e of f.errors) {
      // Print human-readable error
      console.error(`    - ${e}`);
      // If running inside GitHub Actions emit an annotation so errors show inline on PRs
      if (process.env.GITHUB_ACTIONS) {
        // GitHub Actions annotation format (file-level)
        // Use ::error so it shows as a failed check annotation
        // No line/col info available so annotate the file broadly
        console.log(`::error file=${rel},title=Frontmatter validation::${e}`);
      }
    }
  }
  console.error(`\nTotal invalid files: ${failures.length}`);
  process.exit(1);
}

console.log('All frontmatter checks passed');
process.exit(0);
