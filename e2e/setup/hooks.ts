/* eslint-disable functional/immutable-data */
import * as fs from 'fs';
import * as path from 'path';
import { After, AfterAll, Before, BeforeAll } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from 'playwright';
import { hasLoginBeenAttempted } from '../utils/login';

// Path to storage state file
export const storageStatePath = path.join(__dirname, '../storage-state.json');

export const globalState: {
  browser: Browser | null;
  isLoggedIn: boolean;
  loginAttempted: boolean;
} = {
  browser: null,
  isLoggedIn: false,
  loginAttempted: false,
};

// Shared state
export const state: {
  context: BrowserContext | null;
  page: Page | null;
} = {
  page: null,
  context: null,
};

const options = {
  headless: true,
  slowMo: 1000,
  args: ['--disable-dev-shm-usage', '--start-maximized'],
  channel: 'chrome',
};

// Setup and teardown
// Only launch the browser once at the beginning of the test run
BeforeAll(async () => {
  // Check if browser is already running
  if (!globalState.browser) {
    console.log('Launching browser...');
    globalState.browser = await chromium.launch(options);
  }

  // Clear any previously existing storage state at the beginning of the test run
  if (fs.existsSync(storageStatePath)) {
    console.log('Found existing storage state file, removing it for fresh test run');
    fs.unlinkSync(storageStatePath);
  }
});

// Close the browser at the end of the test run
AfterAll(async () => {
  if (globalState.browser) {
    console.log('Closing browser...');
    await globalState.browser.close();
    globalState.browser = null;
  }

  // Clean up storage state file after all tests
  if (fs.existsSync(storageStatePath)) {
    console.log('Cleaning up storage state file after tests');
    fs.unlinkSync(storageStatePath);
  }
});

// Before each scenario
Before(async ({ pickle }) => {
  if (!globalState.browser) {
    console.log('Browser not initialized, launching...');
    globalState.browser = await chromium.launch(options);
  }

  console.info('Running scenario:', pickle.name);

  const requiresFreshLogin = pickle.tags.some((tag) => tag.name === '@fresh-login');

  if (requiresFreshLogin) {
    console.log('Scenario with fresh login tag - create new context');
    state.context = await globalState.browser.newContext({
      viewport: null,
    });
    globalState.isLoggedIn = false;
    globalState.loginAttempted = false;
  }
  // If storage state exists and not first run, use it
  else if (fs.existsSync(storageStatePath) && hasLoginBeenAttempted()) {
    console.log('Using existing storage state for authentication');
    state.context = await globalState.browser.newContext({
      storageState: storageStatePath,
      viewport: null,
    });
    globalState.isLoggedIn = true;
  } else {
    console.log('Creating new browser context without auth');
    state.context = await globalState.browser.newContext({
      viewport: null,
    });
  }

  state.page = await state.context.newPage();
});

// After each scenario
After(async ({ pickle, result }) => {
  const freshLoginFlow = pickle.tags.some((tag) => tag.name === '@fresh-login');

  const scenarioInfo = {
    name: pickle.name,
    duration: result?.duration,
    status: result?.status,
  };

  if (result?.status === 'FAILED') {
    console.warn('Scenario failed', scenarioInfo);
  } else if (result?.status === 'PASSED') {
    console.log('Scenario passed', scenarioInfo);
  }

  if (state.context && globalState.isLoggedIn && !freshLoginFlow) {
    // Always save the state after each scenario when logged in
    await state.context.storageState({ path: storageStatePath });
  }

  if (state.page) {
    await state.page.close();
    state.page = null;
  }

  if (state.context) {
    await state.context.close();
    state.context = null;
  }
});
