import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test('test', async ({ page }) => {
  await login(page, 'p.rossi', 'test');
  await page.getByRole('button', { name: 'Automobile Club Roma' }).click();
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('button', { name: 'Gruppi' }).click();
  await expect(page.getByRole('grid')).toContainText('Cesidia Mancini');
  await page.getByLabel('ActionsOnTheUser').click();
  await page.getByText('Sospendi ruolo').click();
  await expect(page.getByRole('dialog')).toContainText('Sospendi ruolo');
  await page.getByRole('button', { name: 'Sospendi' }).click();
  await expect(page.getByRole('alert').first()).toContainText('Ruolo sospeso correttamente.');
  await expect(page.getByLabel('Suspended').locator('span')).toContainText('Sospeso');
  await page.getByLabel('ActionsOnTheUser').click();
  await expect(page.getByRole('menu')).toContainText('Riabilita ruolo');
  await page.getByText('Riabilita ruolo').click();
  await page.getByRole('button', { name: 'Riabilita' }).click();
  await expect(page.getByRole('alert')).toContainText('Ruolo riabilitato correttamente.');
});
