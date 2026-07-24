/* eslint-disable functional/immutable-data */
import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { state } from '../../setup/hooks';
import { hasLoginBeenAttempted, isLoggedIn, loginWithOI } from '../../utils/login';

setDefaultTimeout(40000);

Given('I navigate to {string}', async (url: string) => {
  if (!state.page) {
    throw new Error('Page not initialized');
  }
  await state.page.goto(url);
});

const getCredentialsForRole = (role?: string) => {
  const rolePrefix = role ? role.toUpperCase() : 'ADMIN';
  const username = process.env[`E2E_${rolePrefix}_USERNAME`];
  const password = process.env[`E2E_${rolePrefix}_PASSWORD`];

  if (!username || !password) {
    throw new Error(
      `Missing credentials for role "${rolePrefix}". Please ensure E2E_${rolePrefix}_USERNAME and E2E_${rolePrefix}_PASSWORD are set in .env or environment variables.`
    );
  }

  return { username, password };
};

Given(
  'I am logged in for institution {string}',
  async function (institution: string) {
    if (!state.page) {
      throw new Error('Page is not initialized');
    }

    const { username, password } = getCredentialsForRole('ADMIN');

    if (!isLoggedIn() || !hasLoginBeenAttempted()) {
      await loginWithOI(state.page, username, password, institution);
    } else {
      await state.page.goto('https://dev.selfcare.pagopa.it/dashboard');
      await state.page.locator(`text=${institution}`).waitFor({ state: 'visible' });
      await state.page.locator(`text=${institution}`).click();
      await state.page.getByRole('button', { name: 'Accedi' }).click();
      await state.page.getByRole('button', { name: 'Gruppi' }).click();
    }
  }
);

Given(
  'I am logged in as {string} for institution {string}',
  async function (role: string, institution: string) {
    if (!state.page) {
      throw new Error('Page is not initialized');
    }

    const { username, password } = getCredentialsForRole(role);

    if (!isLoggedIn() || !hasLoginBeenAttempted()) {
      await loginWithOI(state.page, username, password, institution);
    } else {
      await state.page.goto('https://dev.selfcare.pagopa.it/dashboard');
      await state.page.locator(`text=${institution}`).waitFor({ state: 'visible' });
      await state.page.locator(`text=${institution}`).click();
      await state.page.getByRole('button', { name: 'Accedi' }).click();
      await state.page.getByRole('button', { name: 'Gruppi' }).click();
    }
  }
);

// Deprecated step definition kept for backward compatibility (pulling from env if available)
Given(
  'I am logged in with username {string}, password {string} and institution {string}',
  async function (username, password, institution) {
    if (!state.page) {
      throw new Error('Page is not initialized');
    }

    const effectiveUsername = process.env.E2E_ADMIN_USERNAME || username;
    const effectivePassword = process.env.E2E_ADMIN_PASSWORD || password;

    if (!isLoggedIn() || !hasLoginBeenAttempted()) {
      await loginWithOI(state.page, effectiveUsername, effectivePassword, institution);
    } else {
      await state.page.goto('https://dev.selfcare.pagopa.it/dashboard');
      await state.page.locator(`text=${institution}`).waitFor({ state: 'visible' });
      await state.page.locator(`text=${institution}`).click();
      await state.page.getByRole('button', { name: 'Accedi' }).click();
      await state.page.getByRole('button', { name: 'Gruppi' }).click();
    }
  }
);

When('I click on the button {string}', async (buttonText: string) => {
  if (!state.page) {
    throw new Error('Page not initialized');
  }
  await state.page.getByRole('button', { name: buttonText, exact: true }).scrollIntoViewIfNeeded();
  await state.page.getByRole('button', { name: buttonText, exact: true }).click();
});

When('I click on the the select {string}', async (select: string) => {
  if (!state.page) {
    throw new Error('Page not initialized');
  }
  await state.page.getByLabel(select).scrollIntoViewIfNeeded();
  await state.page.getByLabel(select).click();
});

When('I click on the row {string}', async (rowText: string) => {
  if (!state.page) {
    throw new Error('Page not initialized');
  }
  await state.page
    .getByRole('row', { name: rowText })
    .getByRole('paragraph')
    .scrollIntoViewIfNeeded();
  await state.page.getByRole('row', { name: rowText }).getByRole('paragraph').click();
});

When('I click on the text {string}', async (selector: string) => {
  if (!state.page) {
    throw new Error('Page not initialized');
  }
  await state.page.getByText(selector, { exact: true }).scrollIntoViewIfNeeded();
  await state.page.getByText(selector, { exact: true }).click();
});

When('I click on the {string}', async (selector: string) => {
  if (!state.page) {
    throw new Error('Page not initialized');
  }
  try {
    await state.page.getByLabel('Seleziona gli utenti che vuoi').click();
  } catch {
    try {
      await state.page.getByText(selector, { exact: true }).click();
    } catch {
      try {
        await state.page.getByRole('button', { name: selector, exact: true }).click();
      } catch {
        try {
          await state.page.getByRole('row', { name: selector }).getByRole('paragraph').click();
        } catch {
          await state.page.getByText(selector).first().click();
        }
      }
    }
  }
});

Then('I should see {string}', async (text: string) => {
  if (!state.page) {
    throw new Error('Page not initialized');
  }
  const elements = state.page.getByText(text);

  await expect(elements.first()).toBeVisible();
});

When('I check the checkbox for user {string}', async (user: string) => {
  if (!state.page) {
    throw new Error('Page not initialized');
  }
  const checkbox = state.page.getByRole('option', { name: user }).getByRole('checkbox');
  const isChecked = await checkbox.isChecked();
  if (isChecked) {
    await checkbox.uncheck();
  } else {
    await checkbox.check();
  }
});

When('I click outside the dropdown to close it', async () => {
  if (!state.page) {
    throw new Error('Page not initialized');
  }

  await state.page.keyboard.press('Escape');
});
