import React from 'react';
import { renderWithProviders } from '../../../utils/test-utils';
import GroupsPage from '../GroupsPage';
import { mockedParties } from '../../../microcomponents/mock_dashboard/data/party';
import { mockedPartyProducts } from '../../../microcomponents/mock_dashboard/data/product';
import { fireEvent, screen } from '@testing-library/react';

beforeEach(() => {
  process.env.REACT_APP_API_MOCK_PARTY_GROUPS = 'true';
  process.env.REACT_APP_API_MOCK_PARTY_USERS = 'true';
});

test('render groups page empty', async () => {
  renderWithProviders(
    <GroupsPage
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
      activeProducts={[]}
      productsMap={{}}
    />
  );

  const noGroups = await screen.findByText('Non è ancora stato creato alcun gruppo.');
  7;

  expect(noGroups).toBeInTheDocument();

  const creatOneGroup = await screen.findByText('Crea un gruppo');
  expect(creatOneGroup).toBeInTheDocument();
  fireEvent.click(creatOneGroup);
});

test('render groups page', async () => {
  renderWithProviders(
    <GroupsPage party={mockedParties[0]} activeProducts={mockedPartyProducts} productsMap={{}} />
  );

  const createGroup = await screen.findByText('Crea gruppo');

  expect(createGroup).toBeInTheDocument();

  fireEvent.click(createGroup);
});
