import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');

  await page.getByTestId('register-link').click();

  await page.getByTestId('first-name').click();
  await page.getByTestId('first-name').fill('Imtiaz');

  await page.getByTestId('first-name').press('Tab');
  await page.getByTestId('last-name').fill('Ali');

  await page.getByTestId('dob').click();
  await page.getByTestId('dob').fill('2002-03-24');

  await page.getByTestId('street').click();
  await page.getByTestId('street').fill('003');

  await page.getByTestId('postal_code').click();
  await page.getByTestId('postal_code').fill('55660');

  await page.getByTestId('city').click();
  await page.getByTestId('city').fill('Karachi');

  await page.getByTestId('state').click();
  await page.getByTestId('state').fill('Asia');

  await page.getByTestId('country').selectOption('PK');

  await page.getByTestId('phone').click();
  await page.getByTestId('phone').fill('222222222222222');

  await page.getByTestId('email').fill('test1@gmail.com');
  await page.getByTestId('password').fill('TessssssT@123');
  await page.getByTestId('register-submit').click();
});