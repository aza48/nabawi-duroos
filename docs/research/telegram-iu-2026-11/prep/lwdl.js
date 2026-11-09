const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2];
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ acceptDownloads: true });
  const page = await ctx.newPage();
  await page.goto('https://limewire.com/d/NYFVd#wDlbFR6hex', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForSelector('text=Download file', { timeout: 60000 });
  const [dl] = await Promise.all([
    page.waitForEvent('download', { timeout: 900000 }),
    page.click('text=Download file'),
  ]);
  console.log('download started', dl.suggestedFilename());
  await dl.saveAs(out + '/' + dl.suggestedFilename());
  console.log('saved', await dl.failure());
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
