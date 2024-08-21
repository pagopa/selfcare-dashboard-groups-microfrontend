import { renderWithProviders } from '../../../utils/test-utils';
import GroupDetailPage from '../GroupDetailPage';
import React from 'react'

test('render GroupDetailPage', () => {
  renderWithProviders(
    <GroupDetailPage
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
      productsRolesMap={{}}
    />
  );
});
