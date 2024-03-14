import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('http://localhost:3000/');
  await page.getByLabel('Please enter the date for').fill('2023-12-30');
  await page.getByRole('button', { name: 'submit' }).click();
  await expect(page.getByText('Information for: 2023-12-')).toBeVisible();
  await page.getByRole('button', { name: 'return to choose another date' }).click();
  await expect(page.getByLabel('Please enter the date for')).toBeVisible();
  await page.getByLabel('Please enter the date for').fill('2024-03-05');
  await page.getByRole('button', { name: 'submit' }).click();
  await page.getByRole('button', { name: 'return to choose another date' }).click();
  await expect(page.getByLabel('Please enter the date for')).toBeVisible();

});