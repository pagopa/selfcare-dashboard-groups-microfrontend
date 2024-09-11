import { usePermissions } from '@pagopa/selfcare-common-frontend/lib';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/lib/hooks/useErrorDispatcher';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useGroupDetail } from '../../../hooks/useGroupDetail';
import { mockedParties } from '../../../microcomponents/mock_dashboard/data/party';
import {
  mockedPartyProducts,
  mockedProductRoles,
  mockedProductsMap,
} from '../../../microcomponents/mock_dashboard/data/product';
import { productRoles2ProductRolesList } from '../../../model/ProductRole';
import { renderWithProviders } from '../../../utils/test-utils';
import GroupDetailPage from '../GroupDetailPage';
import { screen } from '@testing-library/react';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
  useHistory: jest.fn(),
}));

jest.mock('../../../hooks/useGroupDetail');
jest.mock('@pagopa/selfcare-common-frontend/lib/hooks/useErrorDispatcher');
jest.mock('@pagopa/selfcare-common-frontend/lib', () => ({
  usePermissions: jest.fn(),
}));

beforeEach(() => {
  (useParams as jest.Mock).mockReturnValue({ partyId: 'party1', groupId: 'group1' });
  (useGroupDetail as jest.Mock).mockReturnValue((partyId, groupId, productsMap) =>
    Promise.resolve({
      members: [{ name: 'Member One' }, { name: 'Member Two' }],
    })
  );
  (useErrorDispatcher as jest.Mock).mockReturnValue(jest.fn());
  (usePermissions as jest.Mock).mockReturnValue({
    getAllProductsWithPermission: jest.fn(() => ['manageProductGroups']),
  });
  (useHistory as jest.Mock).mockReturnValue({ push: jest.fn() });
});

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

test('render GroupDetailPage with products', () => {
  renderWithProviders(
    <GroupDetailPage
      party={mockedParties[0]}
      productsMap={mockedProductsMap}
      productsRolesMap={{
        [mockedPartyProducts[0].id]: productRoles2ProductRolesList(mockedProductRoles),
      }}
    />
  );
});
