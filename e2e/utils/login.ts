/* eslint-disable functional/immutable-data */
import { Page } from '@playwright/test';
import { globalState, state, storageStatePath } from '../setup/hooks';

export async function loginWithOI(page: Page, username: string, password: string) {
  console.log(`Logging in with username: ${username}`);

  await page.goto('https://dev.selfcare.pagopa.it/auth/login');
  await page.getByRole('button', { name: 'Entra con SPID' }).click();
  await page.getByTestId('idp-button-https://validator.dev.oneid.pagopa.it/demo').click();
  await page.locator('#username').click();
  await page.locator('#username').fill(username);
  await page.locator('#username').press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Entra con SPID' }).click();
  await page.getByRole('button', { name: 'Conferma' }).click();
  await page.getByRole('button', { name: 'Accetta tutti' }).click();

  console.log('Login successful');
  globalState.isLoggedIn = true;
  globalState.loginAttempted = true;

  // Store the authenticated state if there's a context
  if (state.context) {
    await state.context.storageState({ path: storageStatePath });
    console.log('Auth state saved to:', storageStatePath);
  }
}

export function isLoggedIn(): boolean {
  return globalState.isLoggedIn;
}

export function hasLoginBeenAttempted(): boolean {
  return globalState.loginAttempted;
}
