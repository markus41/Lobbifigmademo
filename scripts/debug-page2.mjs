#!/usr/bin/env node
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();

// Log console messages
page.on('console', msg => console.log('PAGE LOG:', msg.text()));
page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 5000));

const content = await page.evaluate(() => {
  return {
    rootContent: document.getElementById('root')?.innerHTML.substring(0, 200),
    scripts: Array.from(document.querySelectorAll('script')).map(s => s.src),
    hasReact: !!window.React
  };
});

console.log('Page content:', content);
await browser.close();
