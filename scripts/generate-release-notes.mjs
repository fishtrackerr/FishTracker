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

function getRepositoryBaseUrl() {
  try {
    const remote = execSync('git config --get remote.origin.url', {
      cwd: root,
      encoding: 'utf8',
    }).trim();

    if (!remote) {
      return undefined;
    }

    const sshMatch = remote.match(/^git@github\.com:(.+?)(?:\.git)?$/);
    if (sshMatch) {
      return `https://github.com/${sshMatch[1]}`;
    }

    const httpsMatch = remote.match(/^https:\/\/github\.com\/(.+?)(?:\.git)?$/);
    if (httpsMatch) {
      return `https://github.com/${httpsMatch[1]}`;
    }

    return undefined;
  } catch {
    return undefined;
  }
}

function getCommitsSinceTag() {
  try {
    const tags = execSync('git tag --list', { cwd: root, encoding: 'utf8' }).trim();
    if (!tags) {
      return execSync('git log --pretty=format:%h%x09%H%x09%s', { cwd: root, encoding: 'utf8' })
        .split('\n')
        .filter(Boolean)
        .filter((line) => !line.includes('\tMerge '));
    }

    const tag = execSync('git describe --tags --abbrev=0', {
      cwd: root,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    return execSync(`git log ${tag}..HEAD --pretty=format:%h%x09%H%x09%s`, {
      cwd: root,
      encoding: 'utf8',
    })
      .split('\n')
      .filter(Boolean)
      .filter((line) => !line.includes('\tMerge '));
  } catch {
    return execSync('git log --pretty=format:%h%x09%H%x09%s', { cwd: root, encoding: 'utf8' })
      .split('\n')
      .filter(Boolean)
      .filter((line) => !line.includes('\tMerge '));
  }
}

function categorize(commits, repositoryBaseUrl) {
  const sections = new Map();
  for (const commit of commits) {
    const [shortHash, fullHash, subject] = commit.split('\t');
    if (!shortHash || !fullHash || !subject) {
      continue;
    }

    const match = subject.match(/^(\w+)(?:\([^)]+\))?!?:\s*(.+)$/);
    if (!match) continue;
    const [, type, message] = match;
    const category = CATEGORY_MAP[type] ?? 'Other';
    if (!sections.has(category)) sections.set(category, []);
    sections.get(category).push({
      message,
      shortHash,
      commitUrl: repositoryBaseUrl ? `${repositoryBaseUrl}/commit/${fullHash}` : undefined,
    });
  }
  return [...sections.entries()].map(([category, items]) => ({ category, items }));
}

const version = getVersion();
const repositoryBaseUrl = getRepositoryBaseUrl();
const commits = getCommitsSinceTag();
const sections = categorize(commits, repositoryBaseUrl);

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
