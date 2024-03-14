/**
 * This test navigates to a local webpage, enters dates, submits forms, and checks for the visibility of elements.
 *
 * @param page - The Playwright page to interact with.
 */
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Navigate to the local webpage
  await page.goto('http://localhost:3000/');

  // Fill in a date and submit the form
  await page.getByLabel('Please enter the date for').fill('2023-12-30');
  await page.getByRole('button', { name: 'submit' }).click();

  // Check for the visibility of a specific text
  await expect(page.getByText('Information for: 2023-12-')).toBeVisible();

  // Return to the form and check the visibility of the input field
  await page.getByRole('button', { name: 'return to choose another date' }).click();
  await expect(page.getByLabel('Please enter the date for')).toBeVisible();

  // Fill in another date and submit the form
  await page.getByLabel('Please enter the date for').fill('2024-03-05');
  await page.getByRole('button', { name: 'submit' }).click();

  // Return to the form and check the visibility of the input field again
  await page.getByRole('button', { name: 'return to choose another date' }).click();
  await expect(page.getByLabel('Please enter the date for')).toBeVisible();
});
