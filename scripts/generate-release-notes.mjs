#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const CATEGORY_MAP = {
  feat: 'New Features',
  fix: 'Bug Fixes',
  refactor: 'Improvements',
  perf: 'Performance',
  docs: 'Documentation',
  style: 'Styling',
  test: 'Tests',
  chore: 'Maintenance',
  build: 'Build',
  ci: 'CI/CD',
};

function getVersion() {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  return pkg.version ?? '0.0.0';
}

function getCommitsSinceTag() {
  try {
    const tag = execSync('git describe --tags --abbrev=0', { cwd: root, encoding: 'utf8' }).trim();
    return execSync(`git log ${tag}..HEAD --pretty=format:%s`, { cwd: root, encoding: 'utf8' })
      .split('\n')
      .filter(Boolean)
      .filter((line) => !line.startsWith('Merge '));
  } catch {
    return execSync('git log --pretty=format:%s', { cwd: root, encoding: 'utf8' })
      .split('\n')
      .filter(Boolean)
      .filter((line) => !line.startsWith('Merge '));
  }
}

function categorize(commits) {
  const sections = new Map();
  for (const commit of commits) {
    const match = commit.match(/^(\w+)(?:\([^)]+\))?!?:\s*(.+)$/);
    if (!match) continue;
    const [, type, message] = match;
    const category = CATEGORY_MAP[type] ?? 'Other';
    if (!sections.has(category)) sections.set(category, []);
    sections.get(category).push(message);
  }
  return [...sections.entries()].map(([category, items]) => ({ category, items }));
}

const version = getVersion();
const commits = getCommitsSinceTag();
const sections = categorize(commits);

const output = {
  version,
  date: new Date().toISOString().slice(0, 10),
  sections: sections.length
    ? sections
    : [{ category: 'Notes', items: ['No conventional commits found since last tag.'] }],
};

const outPath = join(root, 'public', 'assets', 'release-notes.json');
writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n');
console.log(`Release notes written to ${outPath}`);
