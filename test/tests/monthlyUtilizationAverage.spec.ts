/**
 * This test navigates to a local webpage, enters a date, submits a form, and checks for the presence of a table with monthly average utilization.
 * If the table exists, it verifies that the data is displayed and within the range of 0 to 100%.
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

  // Check for table existence
  await page.waitForSelector('.metricsTable');

  // If table exists, verify data is displayed and within range
  const monthlyUtilizationCells = await page.$$('.metricsTable tbody tr:nth-child(2) td');
  const monthlyUtilizationValues = await Promise.all(monthlyUtilizationCells.map(cell => cell.textContent()));

  for (const value of monthlyUtilizationValues) {
    if (value !== null) {
      const percentageValue = value.replace('%', '');
      const numberValue = parseFloat(percentageValue);
      expect(numberValue).toBeGreaterThanOrEqual(0);
      expect(numberValue).toBeLessThanOrEqual(100);
    }
    else {
      throw new Error('Value is null');
    }
  }
});
