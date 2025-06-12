/* eslint-disable functional/immutable-data */
import { Page } from '@playwright/test';
import { globalState, state, storageStatePath } from '../setup/hooks';

export async function loginWithOI(
  page: Page,
  username: string,
  password: string,
  institution: string
) {
  console.log(`Logging in with username: ${username}`);
  const acceptAllButton = page.getByRole('button', { name: 'Accetta tutti' });

  await page.goto('https://dev.selfcare.pagopa.it/auth/login');
  await page.getByRole('button', { name: 'Entra con SPID' }).click();
  await page.getByTestId('idp-button-https://validator.dev.oneid.pagopa.it/demo').click();
  await page.locator('#username').click();
  await page.locator('#username').fill(username);
  await page.locator('#username').press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Entra con SPID' }).click();
  await page.getByRole('button', { name: 'Conferma' }).click();

  if (await acceptAllButton.isVisible().catch(() => false)) {
    console.log('Clicking "Accetta tutti"');
    await acceptAllButton.click();
  } else {
    console.log('Accetta tutti" button not visible, skipping');
  }

  await page.locator(`text=${institution}`).waitFor({ state: 'visible' });
  await page.locator(`text=${institution}`).click();
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('button', { name: 'Gruppi' }).click();

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
