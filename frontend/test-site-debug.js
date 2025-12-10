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

  console.log('🔍 Navigating to http://localhost:5173/...');

  try {
    const response = await page.goto('http://localhost:5173/', { timeout: 30000 });
    console.log('📡 Response status:', response.status());

    await page.waitForLoadState('domcontentloaded');
    console.log('📄 DOM loaded');

    // Wait a bit for React to render
    await page.waitForTimeout(3000);

    // Get HTML content
    const html = await page.content();
    console.log('\n📝 HTML preview (first 2000 chars):');
    console.log(html.substring(0, 2000));

    // Console messages
    console.log('\n🖥️ Console messages:');
    consoleMessages.forEach(msg => {
      console.log(`  [${msg.type}] ${msg.text}`);
    });

    // Page errors
    if (pageErrors.length > 0) {
      console.log('\n❌ Page errors:');
      pageErrors.forEach(err => console.log('  ', err));
    }

    await page.screenshot({ path: '/tmp/vedunya_debug.png', fullPage: true });
    console.log('\n📸 Screenshot saved: /tmp/vedunya_debug.png');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  await browser.close();
})();
