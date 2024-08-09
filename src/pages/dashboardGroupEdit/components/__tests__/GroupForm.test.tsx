import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '../../../../utils/test-utils';
import GroupForm from '../GroupForm';

test('renderGroupForm empty state', async () => {
  renderWithProviders(
    <GroupForm
      products={[]}
      party={{
        partyId: '',
        products: [],
        externalId: undefined,
        originId: undefined,
        origin: undefined,
        description: '',
        digitalAddress: undefined,
        category: undefined,
        urlLogo: undefined,
        fiscalCode: undefined,
        registeredOffice: '',
        zipCode: '',
        typology: '',
        institutionType: undefined,
        recipientCode: undefined,
        geographicTaxonomies: [],
        vatNumberGroup: undefined,
        supportEmail: undefined,
        vatNumber: undefined,
        subunitCode: undefined,
        subunitType: undefined,
        aooParentCode: undefined,
        parentDescription: undefined,
        userRole: undefined,
        status: undefined,
      }}
      productsMap={{}}
      initialFormData={{
        partyId: '',
        productId: '',
        name: '',
        description: '',
        members: [],
      }}
      isClone={false}
      productsRolesMap={{}}
    />
  );
  const insertGroupName = screen.getByRole('textbox', { name: /Inserisci il nome del gruppo/i });
  expect(insertGroupName).toBeInTheDocument();
  fireEvent.change(insertGroupName, { target: { value: 'test title' } });

  const insertGroupDescription = screen.getByRole('textbox', {
    name: /Descrivi il gruppo e indica la sua funzione/i,
  });

  expect(insertGroupDescription).toBeInTheDocument();
  fireEvent.change(insertGroupDescription, { target: { value: 'test description' } });

  const comboboxProduct = screen.getByLabelText(/Seleziona il prodotto/i);
  const comboboxMembers = screen.getByLabelText(
    /Seleziona gli utenti che vuoi associare al gruppo/i
  );
  const buttonBack = screen.getByRole('button', { name: /Indietro/i });
  const buttonConfirm = screen.getByRole('button', { name: /Conferma/i });

  expect(comboboxProduct).toBeInTheDocument();

  expect(comboboxMembers).toBeInTheDocument();
  expect(buttonBack).toBeInTheDocument();

  fireEvent.click(buttonBack);
  expect(buttonConfirm).toBeInTheDocument();

  screen.debug();
});
