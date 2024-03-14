/**
 * This test navigates to a local webpage, enters a date, submits a form, and checks for the visibility of a message indicating that there is no data for the entered date.
 *
 * @param page - The Playwright page to interact with.
 */
import { test, expect } from '@playwright/test';

test('message that this date dont have data', async ({ page }) => {
  // Navigate to the local webpage
  await page.goto('http://localhost:3000/');

  // Fill in a date and submit the form
  await page.getByLabel('Please enter the date for').fill('2024-12-30');
  await page.getByRole('button', { name: 'submit' }).click();

  // Check for the visibility of the message
  await expect(page.getByRole('heading', { name: 'We are Sorry! There is no' })).toBeVisible();
});
