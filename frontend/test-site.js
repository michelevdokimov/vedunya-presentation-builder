import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  console.log('🔍 Navigating to http://localhost:5173/...');

  try {
    await page.goto('http://localhost:5173/', { timeout: 30000 });
    await page.waitForLoadState('networkidle');

    // Take screenshot of homepage
    await page.screenshot({ path: '/tmp/vedunya_homepage.png', fullPage: true });
    console.log('📸 Screenshot saved: /tmp/vedunya_homepage.png');

    // Get page title
    const title = await page.title();
    console.log('📄 Page title: ' + title);

    // Get page content summary
    const bodyText = await page.locator('body').innerText();
    console.log('\n📝 Page content preview:');
    console.log(bodyText.substring(0, 1000));

    // Try to find links/buttons
    const links = await page.locator('a').count();
    const buttons = await page.locator('button').count();
    console.log('\n🔗 Links: ' + links + ', Buttons: ' + buttons);

    // Check current URL
    const currentUrl = page.url();
    console.log('\n🌐 Current URL: ' + currentUrl);

    console.log('\n✅ Homepage loaded successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    await page.screenshot({ path: '/tmp/vedunya_error.png' });
    console.log('📸 Error screenshot saved: /tmp/vedunya_error.png');
  }

  await browser.close();
})();
