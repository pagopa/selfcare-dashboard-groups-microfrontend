import { setProductPermissions } from '@pagopa/selfcare-common-frontend/lib/redux/slices/permissionsSlice';
import { Actions } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { fireEvent, screen } from '@testing-library/react';
import { mockedParties } from '../../../microcomponents/mock_dashboard/data/party';
import { mockedPartyProducts } from '../../../microcomponents/mock_dashboard/data/product';
import { Party } from '../../../model/Party';
import { renderWithProviders } from '../../../utils/test-utils';
import GroupsPage from '../GroupsPage';

beforeAll(() => {
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

  expect(noGroups).toBeInTheDocument();

  const creatOneGroup = screen.queryByText('Crea un gruppo');
  expect(creatOneGroup).not.toBeInTheDocument();
});

test('render groups page', async () => {
  const { store } = renderWithProviders(
    <GroupsPage
      party={mockedParties.find((p) => p.partyId === 'onboarded') as Party}
      activeProducts={mockedPartyProducts}
      productsMap={{}}
    />
  );
  store.dispatch(
    setProductPermissions([
      {
        productId: 'prod-io',
        actions: [Actions.ListProductGroups, Actions.ManageProductGroups],
      },
    ])
  );

  const createGroup = await screen.findByText('Crea gruppo');

  expect(createGroup).toBeInTheDocument();

  fireEvent.click(createGroup);
});
