#!/usr/bin/env node
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 3000));

// Navigate to login
await page.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button'));
  const enterBtn = btns.find(b => (b.textContent || '').includes('Enter Your Lobbi'));
  if (enterBtn) enterBtn.click();
});

await new Promise(r => setTimeout(r, 2500));

// Click email
await page.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button'));
  const emailBtn = btns.find(b => /@/.test(b.textContent || ''));
  if (emailBtn) emailBtn.click();
});

await new Promise(r => setTimeout(r, 3000));

// Try to fill password
const inputs = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('input')).map(i => ({
    type: i.type,
    placeholder: i.placeholder,
    id: i.id,
  }));
});

console.log('Found inputs:', inputs);

// Try different selectors
const selectors = ['input[type="password"]', 'input#login-password', 'input[placeholder*="password" i]'];
for (const selector of selectors) {
  try {
    const input = await page.$(selector);
    if (input) {
      await input.focus();
      await page.type(selector, 'demo123', { delay: 50 });
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({
        path: path.join(__dirname, '../screenshots/auth-password-filled.png'),
        type: 'png',
      });
      console.log('✅ Screenshot with password saved!');
      break;
    }
  } catch (e) {
    console.log(`Selector ${selector} failed:`, e.message);
  }
}

await browser.close();
