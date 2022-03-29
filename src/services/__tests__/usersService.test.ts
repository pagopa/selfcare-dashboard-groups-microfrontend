import {
  mockedInstitutionUserResource,
  mockedProductUserResource,
} from '../../api/__mocks__/DashboardApiClient';
import { DashboardApi } from '../../api/DashboardApiClient';
import { fetchPartyProductUsers, updatePartyUserStatus } from '../usersService';
import { mockedParties } from '../../microcomponents/mock_dashboard/data/party';
import { mockedPartyProducts } from '../../microcomponents/mock_dashboard/data/product';
import { mockedUser } from '../../__mocks__/@pagopa/selfcare-common-frontend/decorators/withLogin';
import {
  PartyProductUser,
  PartyUser,
  productUserResource2PartyProductUser,
} from '../../model/PartyUser';
import { mockedProductRoles } from '../../microcomponents/mock_dashboard/data/product';
import { buildProductsMap } from '../../model/Product';

jest.mock('../../api/DashboardApiClient');

beforeEach(() => {
  jest.spyOn(DashboardApi, 'getPartyProductUsers');
  jest.spyOn(DashboardApi, 'getPartyProductUsers');
  jest.spyOn(DashboardApi, 'suspendPartyRelation');
  jest.spyOn(DashboardApi, 'activatePartyRelation');
});

describe('Test fetchPartyProductUsers', () => {
  test('Test CheckPermission True', async () => {
    const partyProductUsers = await fetchPartyProductUsers(
      { page: 0, size: 20 },
      mockedParties[0],
      mockedPartyProducts[0],
      mockedUser,
      'LIMITED'
    );

    expect(partyProductUsers).toMatchObject({
      page: {
        number: 0,
        size: mockedProductUserResource.length,
        totalElements: mockedProductUserResource.length,
        totalPages: 1,
      },
      content: mockedProductUserResource.map((r) =>
        productUserResource2PartyProductUser(r, mockedPartyProducts[0], mockedUser)
      ),
    });

    expect(DashboardApi.getPartyProductUsers).toBeCalledTimes(1);
    expect(DashboardApi.getPartyProductUsers).toBeCalledWith(
      mockedParties[0].institutionId,
      mockedPartyProducts[0].id,
      'LIMITED',
      undefined
    );
  });
});

describe('Test updatePartyUserStatus', () => {
  test('Test updatePartyUserStatus', async () => {
    const partyUser: PartyProductUser = {
      id: 'id',
      name: 'Name',
      surname: 'Surname',
      email: 'email',
      userRole: 'ADMIN',
      product: {
        id: 'productId',
        title: 'productTitle',
        roles: [
          {
            relationshipId: 'relationshipId',
            role: 'productRole',
            selcRole: 'ADMIN',
            status: 'ACTIVE',
          },
        ],
      },
      status: 'ACTIVE',
      isCurrentUser: false,
    };

    await updatePartyUserStatus(
      mockedParties[0],
      partyUser,
      partyUser.product,
      partyUser.product.roles[0],
      'SUSPENDED'
    );

    expect(DashboardApi.suspendPartyRelation).toBeCalledWith('relationshipId');
    expect(DashboardApi.activatePartyRelation).toBeCalledTimes(0);

    await updatePartyUserStatus(
      mockedParties[0],
      partyUser,
      partyUser.product,
      partyUser.product.roles[0],
      'ACTIVE'
    );

    expect(DashboardApi.suspendPartyRelation).toBeCalledTimes(1);
    expect(DashboardApi.activatePartyRelation).toBeCalledWith('relationshipId');
  });
});
