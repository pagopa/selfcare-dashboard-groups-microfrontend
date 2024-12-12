import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test('test', async ({ page }) => {
  await login(page, 'p.rossi', 'test');
  await page.getByRole('button', { name: 'Automobile Club Roma' }).click();
  await page.getByRole('button', { name: 'Accedi' }).click();
  await expect(page.locator('#root')).toContainText('Gruppi');
  await page.getByRole('button', { name: 'Gruppi' }).click();
  await page.getByRole('button', { name: 'Crea gruppo' }).click();
  await page.getByLabel('Inserisci il nome del gruppo *').click();
  await page.getByLabel('Inserisci il nome del gruppo *').fill('test e2e elimina');
  await page.getByLabel('Inserisci il nome del gruppo *').press('Tab');
  await page.getByLabel('Descrivi il gruppo e indica').fill('test elimina');
  await page.getByLabel('Seleziona gli utenti che vuoi').click();
  await page.getByRole('option', { name: 'Cesidia Mancini 1@1.com' }).getByRole('checkbox').check();
  await page.getByRole('option', { name: 'Paolo Rossi 2@2.com Referente' }).getByRole('checkbox').check();
  await page.locator('.MuiBackdrop-root').click();
  await page.getByRole('button', { name: 'Conferma' }).click();
  await expect(page.getByRole('main')).toContainText('test e2e elimina');
  await expect(page.getByRole('main')).toContainText('Elimina');
  await page.getByRole('button', { name: 'Elimina' }).click();
  await expect(page.getByRole('dialog')).toContainText('Elimina gruppo');
  await page.getByRole('button', { name: 'Elimina' }).click();
  await expect(page.getByRole('alert').first()).toContainText('Gruppo eliminato correttamente');
});