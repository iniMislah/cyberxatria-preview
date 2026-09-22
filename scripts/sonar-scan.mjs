#!/usr/bin/env node
/**
 * Local SonarQube full/baseline scan for fe_cyberxatria.
 *
 * Required env:
 *   SONAR_HOST_URL     e.g. http://10.20.11.33:9000
 *   SONAR_TOKEN        project or user token
 *
 * Optional:
 *   SONAR_PROJECT_KEY  default: fe_cyberxatria
 *
 * Prefers `sonar-scanner` on PATH, otherwise Docker image
 * `sonarsource/sonar-scanner-cli`.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_PROJECT_KEY = 'fe_cyberxatria';

function envTrim(name) {
  const v = process.env[name];
  return typeof v === 'string' ? v.trim() : '';
}

function readPackageVersion() {
  try {
    const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
    return typeof pkg.version === 'string' ? pkg.version : '1.0.0';
  } catch {
    return '1.0.0';
  }
}

function commandExists(cmd) {
  const probe = process.platform === 'win32' ? 'where' : 'command';
  const args = process.platform === 'win32' ? [cmd] : ['-v', cmd];
  const r = spawnSync(probe, args, { stdio: 'ignore', shell: false });
  return r.status === 0;
}

function run(cmd, args, extraEnv = {}) {
  const r = spawnSync(cmd, args, {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: { ...process.env, ...extraEnv },
  });
  return r.status ?? 1;
}

const host = envTrim('SONAR_HOST_URL');
const token = envTrim('SONAR_TOKEN');
const projectKey = envTrim('SONAR_PROJECT_KEY') || DEFAULT_PROJECT_KEY;
const projectVersion = readPackageVersion();

if (!host || !token) {
  console.error(`Missing SONAR_HOST_URL or SONAR_TOKEN.

PowerShell:
  $env:SONAR_HOST_URL = "https://your-sonarqube"
  $env:SONAR_TOKEN = "squ_..."
  $env:SONAR_PROJECT_KEY = "${DEFAULT_PROJECT_KEY}"   # optional
  npm run sonar

Create the project in SonarQube first (key: ${DEFAULT_PROJECT_KEY}), then reuse
the same key in GitHub Actions vars later (Fase B: push to dev).
`);
  process.exit(1);
}

if (!existsSync(resolve(root, 'sonar-project.properties'))) {
  console.error('sonar-project.properties not found at repo root.');
  process.exit(1);
}

const scannerArgs = [
  `-Dsonar.host.url=${host}`,
  `-Dsonar.token=${token}`,
  `-Dsonar.projectKey=${projectKey}`,
  `-Dsonar.projectVersion=${projectVersion}`,
];

console.log(
  `Sonar baseline scan: key=${projectKey} version=${projectVersion} host=${host}`,
);

if (commandExists('sonar-scanner')) {
  process.exit(run('sonar-scanner', scannerArgs));
}

if (commandExists('docker')) {
  const dockerArgs = [
    'run',
    '--rm',
    '-e',
    `SONAR_HOST_URL=${host}`,
    '-e',
    `SONAR_TOKEN=${token}`,
    '-v',
    `${root}:/usr/src`,
    'sonarsource/sonar-scanner-cli',
    `-Dsonar.projectKey=${projectKey}`,
    `-Dsonar.projectVersion=${projectVersion}`,
  ];
  process.exit(run('docker', dockerArgs));
}

console.error(`Neither sonar-scanner nor docker is available.

Install one of:
  - SonarScanner CLI  https://docs.sonarsource.com/sonarqube-server/latest/analyzing-source-code/scanners/sonarscanner/
  - Docker Desktop, then re-run npm run sonar
`);
process.exit(1);
