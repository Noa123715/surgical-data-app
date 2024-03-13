import { test, expect } from '@playwright/test';

test('message that this date dont have data', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Please enter the date for').fill('2024-12-30');
  await page.getByRole('button', { name: 'submit' }).click();

  await expect(page.getByRole('heading', { name: 'We are Sorry! There is no' })).toBeVisible();
});