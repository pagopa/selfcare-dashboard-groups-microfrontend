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

  // Try the new IDP button testid first, fallback to previous dev validator IDP testid
  const idpButtonNew = page.getByTestId('idp-button-https://idp.uat.oneid.pagopa.it');
  const idpButtonOld = page.getByTestId('idp-button-https://validator.dev.oneid.pagopa.it/demo');

  if (await idpButtonNew.isVisible().catch(() => false)) {
    await idpButtonNew.click();
  } else {
    await idpButtonOld.click();
  }
  await page.locator('#username').click();
  await page.locator('#username').fill(username);
  await page.locator('#username').press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  // Click submit button "Accedi"
  const submitLoginButton = page.getByRole('button', { name: 'Accedi' });
  const oldSpidConfirmButton = page.getByRole('button', { name: 'Entra con SPID' });
  
  if (await submitLoginButton.isVisible().catch(() => false)) {
    await submitLoginButton.click();
  } else {
    await oldSpidConfirmButton.click();
  }

  // Handle consent step if present ("Do il consenso")
  const consentButton = page.getByRole('button', { name: 'Do il consenso' });
  if (await consentButton.isVisible().catch(() => false)) {
    console.log('Clicking "Do il consenso"');
    await consentButton.click();
  }

  // Fallback for "Conferma" or cookie banner if present
  const confirmButton = page.getByRole('button', { name: 'Conferma' });
  if (await confirmButton.isVisible().catch(() => false)) {
    await confirmButton.click();
  }

  if (await acceptAllButton.isVisible().catch(() => false)) {
    console.log('Clicking "Accetta tutti"');
    await acceptAllButton.click();
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
