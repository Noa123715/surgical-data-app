import { test, expect } from '@playwright/test';

test('Table is displayed with daily utilization', async ({ page }) => {
  await page.goto('http://localhost:3000/');
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
