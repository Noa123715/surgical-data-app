import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'submit' }).click();
  const dialog1 = await page.waitForEvent('dialog');
  await dialog1.accept();
  await page.getByLabel('Please enter the date for').fill('2024-03-01');
  await page.getByRole('button', { name: 'submit' }).click();
  await page.getByRole('button', { name: 'return to choose another date' }).click();
  const dialog2 = await page.waitForEvent('dialog');
  await dialog2.accept();
});
