const { test, expect } = require('@playwright/test');

test('Support Page', async ({ page }) => {
  await page.goto('http://localhost:8000/support.html');
  await expect(page).toHaveTitle(/Support/);
  await page.screenshot({ path: '/home/jules/verification/support.png' });
});
