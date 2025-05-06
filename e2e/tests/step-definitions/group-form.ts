import { When } from '@cucumber/cucumber';
import { state } from '../../setup/hooks';

When(
  'I create a group with name {string}, description {string}, and user {string}',
  async (groupName: string, groupDescription: string, user: string) => {
    if (!state.page) {
      throw new Error('Page is not initialized');
    }
    await state.page.getByLabel('Inserisci il nome del gruppo *').click();
    await state.page.getByLabel('Inserisci il nome del gruppo *').fill(groupName);
    await state.page.getByLabel('Inserisci il nome del gruppo *').press('Tab');
    await state.page.getByLabel('Descrivi il gruppo e indica').fill(groupDescription);
    await state.page.getByLabel('Seleziona gli utenti che vuoi').click();
    await state.page.getByRole('option', { name: user }).getByRole('checkbox').check();
    await state.page.locator('.MuiBackdrop-root').click();
    await state.page.getByRole('button', { name: 'Conferma' }).scrollIntoViewIfNeeded();
    await state.page.getByRole('button', { name: 'Conferma' }).click();
  }
);

When('I modify the group description with {string}', async (groupDescription: string) => {
  if (!state.page) {
    throw new Error('Page is not initialized');
  }

  await state.page.getByRole('row', { name: 'edit group cucumber' }).getByRole('paragraph').click();
  await state.page.getByRole('button', { name: 'Modifica' }).click();
  await state.page.getByLabel('Descrivi il gruppo e indica').fill(groupDescription);
  await state.page.getByRole('button', { name: 'Conferma' }).scrollIntoViewIfNeeded();
  await state.page.getByRole('button', { name: 'Conferma' }).click();
  await state.page.getByRole('button', { name: 'Modifica' }).click();
  await state.page.getByLabel('Descrivi il gruppo e indica').fill('seconda modifica');
  await state.page.getByRole('button', { name: 'Conferma' }).scrollIntoViewIfNeeded();
  await state.page.getByRole('button', { name: 'Conferma' }).click();
});
