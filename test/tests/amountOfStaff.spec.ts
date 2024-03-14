import { test, expect } from '@playwright/test';

test('message that this date dont have data', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Please enter the date for').fill('2023-12-30');
  await page.getByRole('button', { name: 'submit' }).click();

  const staffAmountCell = await page.$$('.showStaff');
  const staffAmountValue = await Promise.all(staffAmountCell.map(async cell => {
    const textContent = await cell.textContent();
    if (textContent !== null) {
      return parseFloat(textContent);
    }
    return 0;
  }));

  for (const value of staffAmountValue) {
    expect(value).toBeGreaterThan(0);
  }
});