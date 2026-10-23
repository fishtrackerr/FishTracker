#!/usr/bin/env node

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

function incrementPatch(version) {
  const parts = String(version || '0.0.0').split('.');
  const major = Number.parseInt(parts[0] || '0', 10);
  const minor = Number.parseInt(parts[1] || '0', 10);
  const patch = Number.parseInt(parts[2] || '0', 10);
  return `${major}.${minor}.${patch + 1}`;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
}

/** Files the release steps change; committed together before tagging. */
const RELEASE_FILES = [
  'package.json',
  'package-lock.json',
  'public/assets/version.json',
  'public/assets/release-notes.json'
];

/**
 * Commits the version bump and release notes so the tag points at the commit
 * that actually contains the new version (other changes are left alone).
 */
function commitReleaseFiles(root, version) {
  const changed = execSync(`git status --porcelain -- ${RELEASE_FILES.join(' ')}`, {
    cwd: root,
    encoding: 'utf8'
  }).trim();
  if (!changed) {
    return;
  }
  execSync(`git add -- ${RELEASE_FILES.join(' ')}`, { cwd: root, stdio: 'inherit' });
  execSync(`git commit -m "chore: release v${version}" -- ${RELEASE_FILES.join(' ')}`, {
    cwd: root,
    stdio: 'inherit'
  });
}

function createAnnotatedTag(root, version) {
  const tag = `v${version}`;
  const existing = execSync('git tag --list', { cwd: root, encoding: 'utf8' })
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (existing.includes(tag)) {
    console.log(`Tag ${tag} already exists; skipping`);
    return;
  }

  execSync(`git tag -a ${tag} -m "Release ${tag}"`, {
    cwd: root,
    stdio: 'inherit'
  });
  console.log(`Created annotated tag ${tag}`);
}

function main() {
  const root = __dirname;
  const packageJsonPath = path.join(root, 'package.json');
  const versionAssetPath = path.join(root, 'public', 'assets', 'version.json');
  const tagOnly = process.argv.includes('--tag');

  const pkg = readJson(packageJsonPath);

  if (tagOnly) {
    commitReleaseFiles(root, pkg.version);
    createAnnotatedTag(root, pkg.version);
    return;
  }

  const nextVersion = incrementPatch(pkg.version);
  pkg.version = nextVersion;
  writeJson(packageJsonPath, pkg);

  writeJson(versionAssetPath, {
    version: nextVersion,
    generatedAt: new Date().toISOString()
  });

  console.log(`Version bumped to ${nextVersion}`);
}

main();
