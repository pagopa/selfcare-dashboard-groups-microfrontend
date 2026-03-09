import { usePermissions } from '@pagopa/selfcare-common-frontend/lib';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/lib/hooks/useErrorDispatcher';
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
import { Mock } from 'vitest';

vi.mock('react-router', () => ({
  useParams: vi.fn(),
  useHistory: vi.fn(),
}));

vi.mock('../../../hooks/useGroupDetail');
vi.mock('@pagopa/selfcare-common-frontend/lib/hooks/useErrorDispatcher');
vi.mock('@pagopa/selfcare-common-frontend/lib', () => ({
  usePermissions: vi.fn(),
}));

beforeEach(() => {
  (useParams as Mock).mockReturnValue({ partyId: 'party1', groupId: 'group1' });
  (useGroupDetail as Mock).mockReturnValue(() =>
    Promise.resolve({
      members: [{ name: 'Member One' }, { name: 'Member Two' }],
    })
  );
  (useErrorDispatcher as Mock).mockReturnValue(vi.fn());
  (usePermissions as Mock).mockReturnValue({
    getAllProductsWithPermission: vi.fn(() => ['manageProductGroups']),
  });
  (useHistory as Mock).mockReturnValue({ push: vi.fn() });
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
