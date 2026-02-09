#!/usr/bin/env node

/**
 * Screenshot capture script for The Lobbi Demo
 * Captures landing page and authentication flow screenshots
 */

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const screenshotsDir = path.join(rootDir, 'screenshots');

// Ensure screenshots directory exists
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const BASE_URL = 'http://localhost:5173/';

/**
 * Wait for animations to complete
 */
async function waitForAnimations(page, ms = 2000) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Take a screenshot with retries
 */
async function takeScreenshot(page, name, options = {}) {
  const filepath = path.join(screenshotsDir, name);
  const defaultOptions = {
    path: filepath,
    fullPage: false,
    type: 'png',
    ...options,
  };
  
  try {
    await page.screenshot(defaultOptions);
    console.log(`✅ Screenshot saved: ${name}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to take screenshot ${name}:`, error.message);
    return false;
  }
}

/**
 * Main screenshot capture function
 */
async function captureScreenshots() {
  console.log('🚀 Starting screenshot capture...\n');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1920,1080',
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // Increase timeout for navigation
    page.setDefaultNavigationTimeout(60000);

    console.log('📸 Navigating to landing page...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
    
    // Wait for content to load
    await page.waitForSelector('#root', { timeout: 30000 });
    await waitForAnimations(page, 3000);

    // 1. Landing Page - Full View
    console.log('📸 Capturing landing page (full view)...');
    await takeScreenshot(page, 'landing-page-full.png', { fullPage: false });

    // 2. Landing Page - CTA Focus
    console.log('📸 Capturing landing page (CTA focus)...');
    await takeScreenshot(page, 'landing-page-cta.png', { fullPage: false });

    // 3. Click "Enter Your Lobbi" button
    console.log('📸 Clicking "Enter Your Lobbi" button...');
    try {
      // Wait a bit longer for animations to complete
      await waitForAnimations(page, 1000);
      
      // Try to find and click the button with the text content
      const enterButton = await page.evaluateHandle(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(btn => 
          btn.textContent?.includes('Enter Your Lobbi') ||
          btn.textContent?.includes('ENTER YOUR LOBBI')
        );
      });
      
      if (enterButton && enterButton.asElement()) {
        await enterButton.asElement().click();
        await waitForAnimations(page, 2500);

        // 4. Email Selection Screen
        console.log('📸 Capturing email selection...');
        await takeScreenshot(page, 'auth-email-selection.png', { fullPage: false });

        // 5. Click first email button
        console.log('📸 Selecting first email...');
        await waitForAnimations(page, 1000);
        
        // Try multiple approaches to find and click email
        let clicked = false;
        
        // Approach 1: Find by email pattern
        try {
          await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const emailBtn = buttons.find(btn => /@/.test(btn.textContent || ''));
            if (emailBtn) {
              emailBtn.click();
              return true;
            }
            return false;
          });
          clicked = true;
        } catch (e) {
          console.log('⚠️  Approach 1 failed, trying approach 2...');
        }
        
        // Approach 2: Click any visible button that's not "back"
        if (!clicked) {
          try {
            await page.evaluate(() => {
              const buttons = Array.from(document.querySelectorAll('button'));
              const validBtn = buttons.find(btn => {
                const text = (btn.textContent || '').toLowerCase();
                return text.length > 5 && !text.includes('back');
              });
              if (validBtn) {
                validBtn.click();
                return true;
              }
              return false;
            });
            clicked = true;
          } catch (e) {
            console.log('⚠️  Approach 2 failed');
          }
        }
        
        if (clicked) {
          await waitForAnimations(page, 3000);

          // 6. Organization Login Screen
          console.log('📸 Capturing organization login...');
          await takeScreenshot(page, 'auth-org-login.png', { fullPage: false });

          // 7. With password entered (focus state)
          console.log('📸 Simulating password entry...');
          try {
            await page.waitForSelector('input[type="password"]', { timeout: 5000 });
            const passwordInput = await page.$('input[type="password"]');
            if (passwordInput) {
              await passwordInput.focus();
              await page.type('input[type="password"]', 'demo123', { delay: 50 });
              await waitForAnimations(page, 800);
              await takeScreenshot(page, 'auth-password-filled.png', { fullPage: false });

              // 8. Hover state on login button
              console.log('📸 Capturing login button hover...');
              const loginButton = await page.$('button[type="submit"]');
              if (loginButton) {
                await loginButton.hover();
                await waitForAnimations(page, 500);
                await takeScreenshot(page, 'auth-login-hover.png', { fullPage: false });
              } else {
                console.log('⚠️  Could not find login button');
              }
            } else {
              console.log('⚠️  Password input found but could not access');
            }
          } catch (e) {
            console.log('⚠️  Could not find password input:', e.message);
          }
        } else {
          console.log('⚠️  Could not click email button');
        }
      } else {
        console.log('⚠️  Could not find "Enter Your Lobbi" button');
      }
    } catch (error) {
      console.error('⚠️  Error during auth flow capture:', error.message);
    }

    console.log('\n✅ Screenshot capture completed!\n');
    console.log('Screenshots saved to:', screenshotsDir);

  } catch (error) {
    console.error('❌ Error during screenshot capture:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the script
captureScreenshots()
  .then(() => {
    console.log('✅ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
