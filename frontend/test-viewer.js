import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  // Collect console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });

  // Collect page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
  });

  console.log('🔍 Testing presentation viewer...');

  try {
    // Go to homepage first
    await page.goto('http://localhost:5173/', { timeout: 30000 });
    await page.waitForLoadState('networkidle');

    // Click on first presentation card
    console.log('📱 Clicking on first presentation...');
    await page.click('.presentation-card');
    await page.waitForTimeout(3000);

    // Take screenshot
    await page.screenshot({ path: '/tmp/vedunya_viewer.png', fullPage: true });
    console.log('📸 Viewer screenshot saved: /tmp/vedunya_viewer.png');

    // Get current URL
    const currentUrl = page.url();
    console.log('🌐 Current URL: ' + currentUrl);

    // Get page content
    const bodyText = await page.locator('body').innerText();
    console.log('\n📝 Page content preview:');
    console.log(bodyText.substring(0, 500));

    // Console errors
    if (pageErrors.length > 0) {
      console.log('\n❌ Page errors:');
      pageErrors.forEach(err => console.log('  ', err));
    }

    // Console messages with errors
    const errorMessages = consoleMessages.filter(m => m.type === 'error');
    if (errorMessages.length > 0) {
      console.log('\n⚠️ Console errors:');
      errorMessages.forEach(msg => console.log('  ', msg.text));
    }

    console.log('\n✅ Viewer test completed!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    await page.screenshot({ path: '/tmp/vedunya_viewer_error.png' });
  }

  await browser.close();
})();
