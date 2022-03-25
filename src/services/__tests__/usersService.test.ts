import {
  mockedInstitutionUserResource,
  mockedProductUserResource,
  mockedProductRoles,
  mockedUserResource,
} from '../../api/__mocks__/DashboardApiClient';
import { DashboardApi } from '../../api/DashboardApiClient';
import { fetchPartyUsers, updatePartyUserStatus } from '../usersService';
import { mockedParties } from '../../microcomponents/mock_dashboard/data/party';
import { mockedPartyProducts } from '../../microcomponents/mock_dashboard/data/product';
import { mockedUser } from '../../__mocks__/@pagopa/selfcare-common-frontend/decorators/withLogin';
import {
  institutionUserResource2PartyUser,
  PartyUser,
  productUserResource2PartyUser,
} from '../../model/PartyUser';
import { mockedProductRoles as mockedProductRolesService } from '../../microcomponents/mock_dashboard/data/product';
import { mockedUsers } from '../__mocks__/usersService';
import { buildProductsMap } from '../../model/Product';

jest.mock('../../api/DashboardApiClient');

beforeEach(() => {
  jest.spyOn(DashboardApi, 'getPartyUsers');
  jest.spyOn(DashboardApi, 'getPartyProductUsers');
  jest.spyOn(DashboardApi, 'suspendPartyRelation');
  jest.spyOn(DashboardApi, 'activatePartyRelation');
});

describe('Test fetchPartyUsers', () => {
  const testNoProductFilter = async (checkPermission: boolean) => {
    const partyUsers = await fetchPartyUsers(
      { page: 0, size: 20 },
      mockedParties[0],
      buildProductsMap(mockedPartyProducts),
      mockedUser,
      checkPermission,
      undefined,
      'ADMIN',
      mockedProductRolesService
    );

    expect(partyUsers).toMatchObject({
      page: {
        number: 0,
        size: mockedInstitutionUserResource.length,
        totalElements: mockedInstitutionUserResource.length,
        totalPages: 1,
      },
      content: mockedInstitutionUserResource.map((u) =>
        institutionUserResource2PartyUser(u, {}, mockedUser)
      ),
    });

    expect(DashboardApi.getPartyUsers).toBeCalledTimes(1);
    expect(DashboardApi.getPartyUsers).toBeCalledWith(
      mockedParties[0].institutionId,
      undefined,
      'ADMIN',
      mockedProductRolesService
    );
    expect(DashboardApi.getPartyProductUsers).toBeCalledTimes(0);
  };

  test('Test CheckPermission True', async () => {
    await testNoProductFilter(true);

    const partyProductUsers = await fetchPartyUsers(
      { page: 0, size: 20 },
      mockedParties[0],
      buildProductsMap(mockedPartyProducts),
      mockedUser,
      true,
      mockedPartyProducts[0],
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
        productUserResource2PartyUser(r, mockedPartyProducts[0], mockedUser)
      ),
    });

    expect(DashboardApi.getPartyUsers).toBeCalledTimes(1);
    expect(DashboardApi.getPartyProductUsers).toBeCalledTimes(1);
    expect(DashboardApi.getPartyProductUsers).toBeCalledWith(
      mockedParties[0].institutionId,
      mockedPartyProducts[0].id,
      'LIMITED',
      undefined
    );
  });

  test('Test CheckPermission False', async () => {
    await testNoProductFilter(false);

    const partyProductUsers = await fetchPartyUsers(
      { page: 0, size: 20 },
      mockedParties[0],
      buildProductsMap(mockedPartyProducts),
      mockedUser,
      false,
      mockedPartyProducts[0],
      'LIMITED'
    );

    expect(partyProductUsers).toMatchObject({
      page: {
        number: 0,
        size: mockedProductUserResource.length,
        totalElements: mockedProductUserResource.length,
        totalPages: 1,
      },
      content: mockedInstitutionUserResource.map((u) =>
        institutionUserResource2PartyUser(u, {}, mockedUser)
      ),
    });

    expect(DashboardApi.getPartyUsers).toBeCalledTimes(2);
    expect(DashboardApi.getPartyUsers).toBeCalledWith(
      mockedParties[0].institutionId,
      mockedPartyProducts[0].id,
      'LIMITED',
      undefined
    );
    expect(DashboardApi.getPartyProductUsers).toBeCalledTimes(0);
  });
});

describe('Test updatePartyUserStatus', () => {
  test('Test updatePartyUserStatus', async () => {
    const partyUser: PartyUser = {
      id: 'id',
      taxCode: 'taxCode',
      name: 'Name',
      surname: 'Surname',
      email: 'email',
      userRole: 'ADMIN',
      products: [
        {
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
      ],
      status: 'ACTIVE',
      isCurrentUser: false,
      certification: true,
    };

    await updatePartyUserStatus(
      mockedParties[0],
      partyUser,
      partyUser.products[0],
      partyUser.products[0].roles[0],
      'SUSPENDED'
    );

    expect(DashboardApi.suspendPartyRelation).toBeCalledWith('relationshipId');
    expect(DashboardApi.activatePartyRelation).toBeCalledTimes(0);

    await updatePartyUserStatus(
      mockedParties[0],
      partyUser,
      partyUser.products[0],
      partyUser.products[0].roles[0],
      'ACTIVE'
    );

    expect(DashboardApi.suspendPartyRelation).toBeCalledTimes(1);
    expect(DashboardApi.activatePartyRelation).toBeCalledWith('relationshipId');
  });
});
