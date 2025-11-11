const { test, expect } = require('@playwright/test');

test('Tours Page', async ({ page }) => {
  await page.goto('http://localhost:8000/tours.html');
  await expect(page).toHaveTitle(/Tours/);
  await page.screenshot({ path: '/home/jules/verification/tours.png' });
});
