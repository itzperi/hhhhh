#!/usr/bin/env node
/**
 * Generates one 1200x630 share image per page into public/og/<page key>.png using headless Chrome (or Edge),
 * so the images are plain static files: nothing renders them at build time or on the server.
 *
 * Run after changing a page title, the address or the phone:   npm run generate:og
 * A unit test (src/__tests__/og-images.test.ts) fails when a title in src/data/pages.ts and this list disagree,
 * or when an image is missing or the wrong size.
 *
 * Needs Chrome or Edge installed. Set CHROME_PATH to use a different browser.
 */

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'og');

/** Page key and the headline shown on the image: the page title without the brand suffix. */
const PAGES = [
  ['home', 'Family Physician in Sacramento, CA'],
  ['newPatients', 'Doctor Accepting New Patients Sacramento'],
  ['annualPhysical', 'Annual Physical in Sacramento, CA'],
  ['sameDay', 'Same-Day Doctor Appointments Sacramento'],
  ['elkGrove', 'Family Physician for Elk Grove Patients'],
  ['panesar', 'Dr. Paramjit Panesar, Family Doctor'],
  ['services', 'Family Medicine Services in Sacramento'],
  ['immigration', 'Immigration Medical Exam in Sacramento'],
  ['insurance', 'Insurance & Payment Options, Sacramento'],
  ['medicare', 'Medicare Family Doctor in Sacramento'],
  ['mediCal', 'Medi-Cal Doctor in South Sacramento'],
  ['nivano', 'Nivano Physicians Doctor, Sacramento'],
  ['selfPay', 'Doctor Without Insurance in Sacramento'],
  ['languages', 'Punjabi/Hindi-Speaking Doctor Sacramento'],
  ['sportsPhysical', 'Sports Physical in Sacramento, CA'],
  ['wellChild', 'Well-Child Exam in Sacramento, CA'],
  ['chooseDoctor', 'Choosing a Family Doctor in Sacramento'],
  ['contact', 'Contact and Directions in Sacramento'],
  ['faq', 'Family Doctor Questions, Sacramento'],
];

const BRAND = 'Apollo Physicians';
const ADDRESS = '8191 Timberlake Way, Suite 200, Sacramento, CA 95823';
const PHONE = '916-236-5800';

const escapeHtml = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const html = (headline) => `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{box-sizing:border-box;padding:72px;display:flex;flex-direction:column;justify-content:space-between;color:#fff;
font-family:'Segoe UI',Arial,Helvetica,sans-serif;background:linear-gradient(135deg,#0b1f33 0%,#183a5a 55%,#0c5452 100%)}
.brand{font-size:34px;font-weight:700;color:#a1d9d6}
h1{margin:0;font-size:76px;line-height:1.08;font-weight:800;max-width:1000px}
.line{font-size:32px;color:#d5e1ed}
.phone{margin-top:10px;font-weight:700;color:#fff}
</style></head><body><div class="brand">${escapeHtml(BRAND)}</div><h1>${escapeHtml(headline)}</h1>
<div class="line"><div>${escapeHtml(ADDRESS)}</div><div class="phone">${escapeHtml(PHONE)}</div></div></body></html>`;

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean);
  return candidates.find((path) => existsSync(path));
}

const browser = findBrowser();
if (!browser) {
  console.error('No Chrome or Edge found. Install one, or set CHROME_PATH.');
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
const work = mkdtempSync(join(tmpdir(), 'apollo-og-'));
let failed = 0;

for (const [key, headline] of PAGES) {
  const page = join(work, `${key}.html`);
  const target = join(OUT, `${key}.png`);
  writeFileSync(page, html(headline), 'utf8');
  const result = spawnSync(
    browser,
    ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1200,630', `--screenshot=${target}`, pathToFileURL(page).href],
    { encoding: 'utf8', timeout: 60000 },
  );
  const ok = result.status === 0 && existsSync(target);
  if (ok) {
    const header = readFileSync(target).subarray(16, 24);
    const width = header.readUInt32BE(0);
    const height = header.readUInt32BE(4);
    console.log(`${ok && width === 1200 && height === 630 ? 'ok  ' : 'SIZE'} ${key}.png ${width}x${height}`);
    if (width !== 1200 || height !== 630) failed += 1;
  } else {
    console.error(`FAIL ${key}.png: ${result.stderr?.slice(0, 200) ?? result.error}`);
    failed += 1;
  }
}

rmSync(work, { recursive: true, force: true });
process.exit(failed === 0 ? 0 : 1);
