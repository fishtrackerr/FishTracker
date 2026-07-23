#!/usr/bin/env node

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

function main() {
  const root = __dirname;
  const packageJsonPath = path.join(root, 'package.json');
  const versionAssetPath = path.join(root, 'public', 'assets', 'version.json');

  const pkg = readJson(packageJsonPath);
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
