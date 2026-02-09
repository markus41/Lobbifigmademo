#!/usr/bin/env node
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 3000));

const buttons = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('button')).map(btn => ({
    text: btn.textContent?.trim().substring(0, 50),
    tag: btn.tagName,
  }));
});

console.log('Found buttons:', buttons);
await browser.close();
