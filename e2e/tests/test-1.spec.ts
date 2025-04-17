import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://uat.oneid.pagopa.it/login?response_type=CODE&scope=openid&client_id=vhtKIlmVWA9D6SsbbpUw0rJEtSB_0Y1aZxuQowNlT6E&state=2afa8121e360409&nonce=d23f9edb006a471&redirect_uri=https%3A%2F%2Fdev.selfcare.pagopa.it%2Fauth%2Flogin%2Fcallback');
  await page.getByTestId('spidButton').click();
  await page.getByTestId('idp-button-https://validator.dev.oneid.pagopa.it/demo').click();
  await page.goto('https://validator.dev.oneid.pagopa.it/demo/start');
  await page.locator('#username').click();
  await page.locator('#username').fill('p.rossi');
  await page.locator('#username').press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('test');
  await page.getByRole('button', { name: 'Entra con SPID' }).click();
  await page.getByRole('button', { name: 'Conferma' }).click();
  await page.getByRole('button', { name: 'Accetta tutti' }).click();
  await page.getByRole('button', { name: 'Agenzia delle Dogane e dei' }).click();
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('button', { name: 'Gruppi' }).click();
  await page.locator('a').filter({ hasText: 'Crea un gruppo' }).click();
  await page.getByRole('textbox', { name: 'Inserisci il nome del gruppo' }).click();
  await page.getByRole('textbox', { name: 'Inserisci il nome del gruppo' }).fill('test cucumber');
  await page.getByRole('textbox', { name: 'Descrivi il gruppo e indica' }).click();
  await page.getByRole('textbox', { name: 'Descrivi il gruppo e indica' }).fill('test cucumber');
  await page.getByRole('combobox', { name: 'Seleziona gli utenti che vuoi' }).click();
  await page.getByRole('option', { name: 'Cesidia Mancini 1@1.co' }).getByRole('checkbox').check();
  await page.locator('.MuiBackdrop-root').click();
  await page.getByRole('button', { name: 'Conferma' }).click();
  await expect(page.getByRole('alert')).toContainText('Gruppo creato correttamente');
});