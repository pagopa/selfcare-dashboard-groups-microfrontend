/* eslint-disable functional/immutable-data */
import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { state } from '../../setup/hooks';
import { hasLoginBeenAttempted, isLoggedIn, loginWithOI } from '../../utils/login';

setDefaultTimeout(120000);

Given('I navigate to {string}', async (url: string) => {
  if (!state.page) {
    throw new Error('Page not initialized');
  }
  await state.page.goto(url);
});

Given(
  'I am logged in with username {string} and password {string}',
  async function (username, password) {
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
      await loginWithOI(state.page, username, password);
    } else {
      console.log('Already logged in, skipping login step');
    }
  }
);

When('I click on {string}', async (selector: string) => {
  if (!state.page) {
    throw new Error('Page not initialized');
  }

  try {
    await state.page.getByRole('button', { name: selector }).click();
  } catch {
    try {
      await state.page.getByText(selector).click();
    } catch {
      try {
        await state.page.getByRole('row', { name: selector }).getByRole('paragraph').click();
      } catch {
        await state.page.locator(`text=${selector}`).click();
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
