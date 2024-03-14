/**
 * This test navigates to a local webpage, enters a date, submits a form, and checks for the presence of data in a specific element.
 * If the date entered does not have data, it verifies that the element contains staff information.
 *
 * @param page - The Playwright page to interact with.
 */
import { test, expect } from '@playwright/test';

test('Table is displayed with monthly average utilization', async ({ page }) => {
  // Navigate to the local webpage
  await page.goto('http://localhost:3000/');

  // Fill in a date and submit the form
  await page.getByLabel('Please enter the date for').fill('2023-12-30');
  await page.getByRole('button', { name: 'submit' }).click();

  // Retrieve the text content of elements with class 'showStaff'
  const staffAmountCell = await page.$$('.showStaff');
  const staffAmountValue = await Promise.all(staffAmountCell.map(async cell => {
    const textContent = await cell.textContent();
    if (textContent !== null) {
      return parseFloat(textContent);
    }
    return 0;
  }));

  // Verify that each value is greater than 0 and is an integer
  for (const value of staffAmountValue) {
    expect(value).toBeGreaterThan(0);
    expect(Number.isInteger(value)).toBe(true);
  }
});
