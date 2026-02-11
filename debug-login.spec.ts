import { test, expect } from '@playwright/test';

test.describe('Login Flow Debug', () => {
  test.beforeEach(async ({ page }) => {
    // Clear all storage before each test
    await page.goto('http://localhost:5174/Lobbifigmademo/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
      // Set intro as seen to skip to landing page
      sessionStorage.setItem('lobbi_intro_seen', '1');
    });
    await page.reload();
  });

  test('should complete full login flow', async ({ page }) => {
    // Step 1: Navigate to landing page
    console.log('Step 1: Loading landing page...');
    await page.goto('http://localhost:5174/Lobbifigmademo/');
    
    // Wait for page to be interactive
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of initial state
    await page.screenshot({ path: 'debug-01-landing.png', fullPage: true });
    console.log('✓ Landing page loaded');

    // Step 2: Check if we see the landing page or dashboard
    const currentUrl = page.url();
    const hasLoginButton = await page.locator('button:has-text("Login")').count() > 0;
    const hasDashboard = await page.locator('text=Dashboard').count() > 0;
    
    console.log(`Current URL: ${currentUrl}`);
    console.log(`Has Login Button: ${hasLoginButton}`);
    console.log(`Has Dashboard: ${hasDashboard}`);
    
    if (hasDashboard) {
      console.log('❌ ERROR: Already on dashboard! Session not cleared properly.');
      await page.screenshot({ path: 'debug-ERROR-already-dashboard.png', fullPage: true });
      
      // Try to find and click reset button
      const resetButton = page.locator('button:has-text("Reset")');
      if (await resetButton.count() > 0) {
        console.log('Found Reset button, clicking...');
        await resetButton.click();
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'debug-02-after-reset.png', fullPage: true });
      }
      return;
    }

    // Step 3: Find and click Login button
    console.log('Step 2: Waiting for animations to complete...');
    // Landing page has GSAP animations that can take 2-3 seconds
    await page.waitForTimeout(3500);
    
    console.log('Step 3: Looking for Login button...');
    
    // Get page HTML for debugging
    const bodyHTML = await page.locator('body').innerHTML();
    console.log('Page HTML length:', bodyHTML.length);
    console.log('Has "Login" text:', bodyHTML.includes('Login'));
    console.log('Has "login" text:', bodyHTML.includes('login'));
    
    // Try to find any text that might be the button
    const allText = await page.locator('button').allTextContents();
    console.log('All button texts:', allText);
    
    const loginButton = page.locator('button:has-text("Enter Your Lobbi"), button:has-text("Login"), button:has-text("login")').first();
    
    if (await loginButton.count() === 0) {
      console.log('❌ ERROR: Login button not found!');
      const allButtons = await page.locator('button').all();
      console.log(`Found ${allButtons.length} buttons on page`);
      for (let i = 0; i < Math.min(allButtons.length, 5); i++) {
        const text = await allButtons[i].textContent();
        console.log(`  Button ${i}: "${text}"`);
      }
      await page.screenshot({ path: 'debug-ERROR-no-login-button.png', fullPage: true });
      return;
    }

    console.log('✓ Login button found, clicking...');
    await loginButton.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'debug-03-after-login-click.png', fullPage: true });

    // Step 4: Wait for email selection screen
    console.log('Step 3: Waiting for email selection...');
    await page.waitForTimeout(2000);
    
    const emailDropdown = page.locator('button:has-text("Select"), [role="combobox"]').first();
    if (await emailDropdown.count() === 0) {
      console.log('❌ ERROR: Email dropdown not found!');
      await page.screenshot({ path: 'debug-ERROR-no-email-dropdown.png', fullPage: true });
      return;
    }

    console.log('✓ Email dropdown found, clicking...');
    await emailDropdown.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'debug-04-email-dropdown-open.png', fullPage: true });

    // Step 5: Select first email
    console.log('Step 4: Selecting email...');
    await page.waitForTimeout(800); // Wait for dropdown animation
    
    // Try multiple selectors for email options
    const firstEmail = page.locator('div[role="option"], [data-option], button:has-text("@")').first();
    if (await firstEmail.count() === 0) {
      console.log('❌ ERROR: No email options found!');
      // Try to see what's in the dropdown
      const dropdownContent = await page.locator('.account-dropdown, [role="listbox"]').innerHTML().catch(() => 'not found');
      console.log('Dropdown content:', dropdownContent.substring(0, 500));
      await page.screenshot({ path: 'debug-ERROR-no-email-options.png', fullPage: true });
      return;
    }

    await firstEmail.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'debug-05-email-selected.png', fullPage: true });

    // Step 6: Wait for org login page
    console.log('Step 5: Waiting for org login...');
    await page.waitForTimeout(1500);
    
    const loginFormButton = page.locator('button:has-text("Login"), button[type="submit"]').first();
    if (await loginFormButton.count() === 0) {
      console.log('❌ ERROR: Org login button not found!');
      await page.screenshot({ path: 'debug-ERROR-no-org-login.png', fullPage: true });
      return;
    }

    console.log('✓ Org login button found, clicking...');
    await loginFormButton.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'debug-06-org-login-clicked.png', fullPage: true });

    // Step 7: Wait for welcome screen
    console.log('Step 6: Waiting for welcome screen...');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'debug-07-welcome-screen.png', fullPage: true });

    // Step 8: Wait for dashboard entry animation
    console.log('Step 7: Waiting for dashboard entry...');
    await page.waitForTimeout(4000);
    await page.screenshot({ path: 'debug-08-dashboard-entry.png', fullPage: true });

    // Step 9: Verify we're on dashboard
    console.log('Step 8: Checking if we reached dashboard...');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'debug-09-final-dashboard.png', fullPage: true });

    const isDashboard = await page.locator('text=Revenue').count() > 0;
    console.log(`On Dashboard: ${isDashboard}`);

    if (isDashboard) {
      console.log('✅ SUCCESS: Full login flow completed!');
    } else {
      console.log('❌ ERROR: Did not reach dashboard');
    }
  });

  test('check what happens on fresh load', async ({ page }) => {
    console.log('=== FRESH LOAD TEST ===');
    
    // Clear storage via API call before navigating
    await page.goto('http://localhost:5174/Lobbifigmademo/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
      // Skip intro
      sessionStorage.setItem('lobbi_intro_seen', '1');
    });
    
    console.log('Reloading after clearing storage...');
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.screenshot({ path: 'debug-fresh-load.png', fullPage: true });
    
    // Check localStorage
    const localStorageData = await page.evaluate(() => JSON.stringify(localStorage));
    const sessionStorageData = await page.evaluate(() => JSON.stringify(sessionStorage));
    
    console.log('localStorage:', localStorageData);
    console.log('sessionStorage:', sessionStorageData);
    
    // Check what's on screen
    const hasLanding = await page.locator('text=Premium Member Management').count() > 0;
    const hasDashboard = await page.locator('text=Revenue').count() > 0;
    const hasLoginButton = await page.locator('button:has-text("Login")').count() > 0;
    
    console.log(`Has Landing Content: ${hasLanding}`);
    console.log(`Has Dashboard: ${hasDashboard}`);
    console.log(`Has Login Button: ${hasLoginButton}`);
    
    // Get page title
    const title = await page.title();
    console.log(`Page Title: ${title}`);
    
    // Check hash
    const hash = await page.evaluate(() => window.location.hash);
    console.log(`URL Hash: ${hash}`);
  });
});
