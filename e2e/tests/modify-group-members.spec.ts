import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test('test', async ({ page }) => {
  await login(page, 'p.rossi', 'test');
  await page.getByRole('button', { name: 'Automobile Club Roma' }).click();
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('button', { name: 'Gruppi' }).click();
  await expect(page.getByRole('grid')).toContainText('test e2e');
  await page.getByRole('row', { name: 'test e2e' }).getByRole('paragraph').click();
  await page.getByRole('button', { name: 'Modifica' }).click();
  await page.getByLabel('Seleziona gli utenti che vuoi').click();
  await page
    .getByRole('option', { name: 'Cesidia Mancini 1@1.com' })
    .getByRole('checkbox')
    .uncheck();
  await page.getByText('Pagamenti pagoPA').click({ force: true });
  await page.getByRole('button', { name: 'Conferma' }).click();
  await expect(page.getByRole('alert')).toContainText('Gruppo modificato correttamente');
  await expect(page.getByRole('main')).toContainText('Aggiungi utente');
  await page.getByRole('button', { name: 'Aggiungi utente' }).click();
  await page.getByRole('option', { name: 'Cesidia Mancini 1@1.com' }).getByRole('checkbox').check();
  await page.getByText('Pagamenti pagoPA').click({ force: true });
  await page.getByRole('button', { name: 'Conferma' }).click();
  await expect(page.getByRole('alert').first()).toContainText('Gruppo modificato correttamente');
});
