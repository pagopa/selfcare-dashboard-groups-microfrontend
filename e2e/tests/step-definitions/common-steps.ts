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

Given(
  'I am logged in with username {string}, password {string} and institution {string}',
  async function (username, password, institution) {
    if (!state.page) {
      throw new Error('Page is not initialized');
    }

    // Always login on the first scenario or if not logged in
    if (!isLoggedIn() || !hasLoginBeenAttempted()) {
      console.log(
        'Need to login: isLoggedIn=',
        isLoggedIn(),
        'loginAttempted=',
        hasLoginBeenAttempted()
      );
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
