/**
 * This test navigates to a local webpage, clicks a button to trigger a dialog, accepts the dialog, fills in a date, submits the form,
 * returns to the form, clicks a button to trigger another dialog, and accepts the second dialog.
 *
 * @param page - The Playwright page to interact with.
 */
import { test, expect } from '@playwright/test';

test('show the dialog when there no date', async ({ page }) => {
  // Navigate to the local webpage
  await page.goto('http://localhost:3000/');

  // Click a button to trigger a dialog and accept it
  await page.getByRole('button', { name: 'submit' }).click();
  const dialog1 = await page.waitForEvent('dialog');
  await dialog1.accept();

  // Fill in a date and submit the form
  await page.getByLabel('Please enter the date for').fill('2024-03-01');
  await page.getByRole('button', { name: 'submit' }).click();

  // Return to the form, click a button to trigger another dialog, and accept it
  await page.getByRole('button', { name: 'return to choose another date' }).click();
  const dialog2 = await page.waitForEvent('dialog');
  await dialog2.accept();
});
