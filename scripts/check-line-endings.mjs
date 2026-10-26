#!/usr/bin/env node
/**
 * Fails when a tracked text file under the build inputs has CRLF line endings in
 * the working tree. CRLF assets get normalized to LF when angular-cli-ghpages
 * commits them, which breaks the service worker hashes in ngsw.json and makes
 * PWA updates fail on clients.
 */
import { execSync } from 'node:child_process';

const BUILD_INPUTS = ['src', 'public', 'ngsw-config.json', 'angular.json'];

const output = execSync(`git ls-files --eol -- ${BUILD_INPUTS.join(' ')}`, { encoding: 'utf8' });

const crlfFiles = output
  .split('\n')
  .filter((line) => /\bw\/(crlf|mixed)\b/.test(line))
  .map((line) => line.split('\t').pop());

if (crlfFiles.length > 0) {
  console.error('CRLF line endings found in build inputs (service worker hashes would break):');
  for (const file of crlfFiles) {
    console.error(`  ${file}`);
  }
  console.error('\nFix with: git rm -r --cached -q . && git reset --hard   (commit or stash first)');
  process.exit(1);
}

console.log('Line endings OK (LF)');
