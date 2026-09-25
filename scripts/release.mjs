#!/usr/bin/env node
/**
 * Local SemVer bump for fe_cyberxatria.
 * Updates package.json, commits, and creates annotated tag vX.Y.Z.
 * Does not push — team pushes branch + tag afterwards.
 *
 * Usage:
 *   npm run release:patch
 *   npm run release:minor
 *   npm run release:major
 */
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const bump = process.argv[2];
const allowed = new Set(['patch', 'minor', 'major']);

if (!allowed.has(bump)) {
  console.error(`Unknown bump "${bump ?? ''}".

Usage:
  npm run release:patch   # 1.0.0 → 1.0.1
  npm run release:minor   # 1.0.0 → 1.1.0
  npm run release:major   # 1.0.0 → 2.0.0
`);
  process.exit(1);
}

function run(cmd, args) {
  const r = spawnSync(cmd, args, {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  return r.status ?? 1;
}

function gitOut(args) {
  const r = spawnSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    shell: process.platform === 'win32',
  });
  return (r.stdout || '').trim();
}

const dirty = gitOut(['status', '--porcelain']);
if (dirty) {
  console.error(`Working tree is not clean. Commit or stash first, then retry.

${dirty}
`);
  process.exit(1);
}

const code = run('npm', ['version', bump, '-m', 'chore: release v%s']);
if (code !== 0) process.exit(code);

const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const version = typeof pkg.version === 'string' ? pkg.version : '';
const tag = `v${version}`;
const branch = gitOut(['branch', '--show-current']) || 'dev';

console.log(`
Release ${tag} created locally (commit + tag). Footer and Sonar will follow package.json.

Next — push branch then this tag only:
  git push origin ${branch}
  git push origin ${tag}
`);
