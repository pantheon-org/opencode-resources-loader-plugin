#!/usr/bin/env node

/**
 * Fix internal links in built HTML files to include the base path
 *
 * This script:
 * 1. Recursively scans the dist directory for HTML files
 * 2. Finds internal links that are missing the base path
 * 3. Adds the base path to those links
 * 4. Preserves anchor links and external links
 *
 * This is necessary because some markdown content links don't get
 * automatically rewritten by Astro's base path handling.
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_DIR = join(__dirname, 'dist');
const BASE_PATH = '/opencode-warcraft-notifications';

// Pattern to match internal links that are missing the base path
// Matches: href="/something/" but not href="/opencode-warcraft-notifications/something/"
// Also matches: href="/something/#anchor" and href="/"
// But not href="/opencode-warcraft-notifications" (exact match)
// Match href="/..." that does not already include the base path
// Allow anchors and query strings; preserve file extensions. Exclude protocol-relative and external links.
const INTERNAL_LINK_PATTERN =
  /href="(\/(?!opencode-warcraft-notifications(?:\/|"|$))(?:[^"\s]*?))"/g;

/**
 * Fix links in a single HTML file
 */
async function fixLinksInFile(filePath) {
  try {
    let content = await readFile(filePath, 'utf-8');
    let modified = false;

    // Replace internal links with base path
    content = content.replace(INTERNAL_LINK_PATTERN, (match, path) => {
      // Skip if it's an external link, protocol-relative, or starts with ../
      if (
        path.startsWith('http://') ||
        path.startsWith('https://') ||
        path.startsWith('//') ||
        path.startsWith('../')
      ) {
        return match;
      }

      // If path is exactly base path, ensure trailing slash
      if (path === BASE_PATH) {
        return `href="${BASE_PATH}/"`;
      }

      // Preserve anchors and query strings while prefixing base path
      // e.g. "/foo#bar" -> "/base/foo#bar"
      modified = true;
      return `href="${BASE_PATH}${path}"`;
    });

    if (modified) {
      await writeFile(filePath, content, 'utf-8');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`  ✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Recursively process all HTML files in a directory
 */
async function processDirectory(dirPath, baseDir = DIST_DIR) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  let fixedCount = 0;

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // Skip certain directories
      if (entry.name === '_astro' || entry.name === 'pagefind') {
        continue;
      }
      fixedCount += await processDirectory(fullPath, baseDir);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const wasFixed = await fixLinksInFile(fullPath);
      if (wasFixed) {
        const relativePath = fullPath.replace(baseDir + '/', '');
        console.log(`  ✓ Fixed links in ${relativePath}`);
        fixedCount++;
      }
    }
  }

  return fixedCount;
}

/**
 * Main process
 */
async function main() {
  console.log('🔗 Fixing internal links in HTML files...\n');
  console.log(`Base path: ${BASE_PATH}`);
  console.log(`Dist directory: ${DIST_DIR}\n`);

  try {
    const fixedCount = await processDirectory(DIST_DIR);

    if (fixedCount > 0) {
      console.log(`\n✅ Fixed links in ${fixedCount} HTML file(s)!`);
    } else {
      console.log('\n✨ No links needed fixing!');
    }
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Link fixing failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
