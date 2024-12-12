import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test('test', async ({ page }) => {
  await login(page, 'p.rossi', 'test');
  await page.getByRole('button', { name: 'Automobile Club Roma' }).click();
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('button', { name: 'Gruppi' }).click();
  await expect(page.getByRole('grid')).toContainText('test e2e sospensione');
  await page.getByText('test e2e sospensione').click();
  await expect(page.getByRole('main')).toContainText('Sospendi');
  await page.getByRole('button', { name: 'Sospendi' }).click();
  await expect(page.getByRole('dialog')).toContainText('Sospendi gruppo');
  await page.getByRole('button', { name: 'Sospendi' }).click();
  await expect(page.getByRole('alert').first()).toContainText('Gruppo sospeso correttamente');
  await expect(page.getByLabel('Suspended').locator('span')).toContainText('Sospeso');
  await expect(page.getByRole('main')).toContainText('Riattiva');
  await page.getByRole('button', { name: 'Riattiva' }).click();
  await expect(page.getByRole('dialog')).toContainText('Riattiva gruppo');
  await page.getByRole('button', { name: 'Riattiva' }).click();
  await expect(page.getByRole('alert').first()).toContainText('Gruppo riattivato correttamente');
});
