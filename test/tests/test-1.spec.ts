import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Please enter the date for').fill('2023-12-30');
  await page.getByRole('button', { name: 'submit' }).click();

  
});