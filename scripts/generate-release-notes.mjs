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

const EMPTY_PLACEHOLDER = 'No conventional commits found since last tag.';

function getVersion() {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  return pkg.version ?? '0.0.0';
}

function runGit(command) {
  return execSync(command, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  }).trim();
}

function parseSemver(version) {
  const match = String(version)
    .replace(/^v/, '')
    .match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!match) {
    return null;
  }
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function compareSemver(a, b) {
  const left = parseSemver(a) ?? [0, 0, 0];
  const right = parseSemver(b) ?? [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    if (left[i] !== right[i]) {
      return left[i] - right[i];
    }
  }
  return 0;
}

function listVersionTags() {
  try {
    const raw = runGit('git tag --list "v*"');
    if (!raw) {
      return [];
    }
    return raw
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .sort(compareSemver);
  } catch {
    return [];
  }
}

function tagDate(tag) {
  try {
    // Annotated tags: tagger date; lightweight: committer date.
    const date = runGit(`git log -1 --format=%cs ${tag}`);
    return date || new Date().toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function parseCommitLines(raw) {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^Merge /i.test(line));
}

function commitsInRange(fromExclusive, toInclusive) {
  try {
    const range = fromExclusive ? `${fromExclusive}..${toInclusive}` : toInclusive;
    return parseCommitLines(runGit(`git log ${range} --pretty=format:%s`));
  } catch {
    return [];
  }
}

function categorize(commits) {
  const sections = new Map();
  for (const subject of commits) {
    if (!subject) {
      continue;
    }

    const match = subject.match(/^(\w+)(?:\([^)]+\))?!?:\s*(.+)$/);
    if (!match) {
      continue;
    }
    const [, type, message] = match;
    const category = CATEGORY_MAP[type] ?? 'Other';
    if (!sections.has(category)) {
      sections.set(category, []);
    }
    sections.get(category).push(message);
  }
  return [...sections.entries()].map(([category, items]) => ({ category, items }));
}

function buildReleases() {
  const tags = listVersionTags();
  const releases = [];

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    const prev = i > 0 ? tags[i - 1] : null;
    const sections = categorize(commitsInRange(prev, tag));
    if (sections.length === 0) {
      continue;
    }
    releases.push({
      version: tag.replace(/^v/, ''),
      date: tagDate(tag),
      sections,
    });
  }

  const pkgVersion = getVersion();
  const latestTag = tags.at(-1) ?? null;
  const unreleased = latestTag
    ? commitsInRange(latestTag, 'HEAD')
    : parseCommitLines(runGit('git log --pretty=format:%s'));
  const unreleasedSections = categorize(unreleased);
  if (unreleasedSections.length > 0) {
    const already = releases.some((r) => r.version === pkgVersion);
    if (!already) {
      releases.push({
        version: pkgVersion,
        date: new Date().toISOString().slice(0, 10),
        sections: unreleasedSections,
      });
    }
  }

  // Newest first for the changelog UI.
  return releases.sort((a, b) => compareSemver(b.version, a.version));
}

function sectionsForCurrentVersion(releases, version) {
  return releases.find((r) => r.version === version)?.sections ?? [];
}

const version = getVersion();
const releases = buildReleases();
const currentSections = sectionsForCurrentVersion(releases, version);

const output = {
  version,
  date: new Date().toISOString().slice(0, 10),
  // Latest package version only — empty when this bump had no conventional commits.
  // Whats New uses this; full history lives in `releases`.
  sections: currentSections,
  releases,
};

const outPath = join(root, 'public', 'assets', 'release-notes.json');
writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n');

const releaseCount = releases.length;
const itemCount = releases.reduce(
  (sum, release) => sum + release.sections.reduce((s, section) => s + section.items.length, 0),
  0,
);
console.log(
  `Release notes written to ${outPath} (${releaseCount} releases, ${itemCount} items; current ${version}: ${currentSections.length ? 'has notes' : 'no new notes'})`,
);

// Keep placeholder string referenced so refactors notice if UI still depends on it.
if (currentSections.some((section) => section.items.includes(EMPTY_PLACEHOLDER))) {
  console.warn('Unexpected placeholder content in current sections');
}
