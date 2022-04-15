import { DashboardApi } from '../../api/DashboardApiClient';
import { mockedParties } from '../../microcomponents/mock_dashboard/data/party';
import { mockedGroups } from './../__mocks__/groupsService';
import {
  deletePartyGroup,
  deleteGroupRelation,
  updatePartyGroupStatus,
  updatePartyGroup,
  savePartyGroup,
  fetchPartyGroup,
  fetchPartyGroups,
} from './../groupsService';
import { buildProductsMap, Product } from '../../model/Product';
import { RoleEnum } from '../../api/generated/b4f-dashboard/InstitutionUserResource';
import { SelcRoleEnum } from '../../api/generated/b4f-dashboard/ProductRoleInfoResource';
import { mockedPartyProducts } from '../../microcomponents/mock_dashboard/data/product';
import {
  PartyGroupDetail,
  PartyGroupOnCreation,
  PartyGroupOnEdit,
  usersGroupPlainResource2PartyGroup,
} from '../../model/PartyGroup';
import { mockedUser } from '../../__mocks__/@pagopa/selfcare-common-frontend/decorators/withLogin';
import { PartyProductUser, PartyUserSimple } from '../../model/PartyUser';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { mockedInstitutionUserResource } from '../../api/__mocks__/DashboardApiClient';
import { UserGroupPlainResource } from '../../api/generated/b4f-dashboard/UserGroupPlainResource';

jest.mock('../../api/DashboardApiClient');

beforeEach(() => {
  jest.spyOn(DashboardApi, 'deletePartyGroup');
  jest.spyOn(DashboardApi, 'deleteGroupRelation');
  jest.spyOn(DashboardApi, 'fetchPartyGroup');
  jest.spyOn(DashboardApi, 'updatePartyGroup');
  jest.spyOn(DashboardApi, 'updatePartyGroupStatusActivate');
  jest.spyOn(DashboardApi, 'updatePartyGroupStatusSuspend');
  jest.spyOn(DashboardApi, 'savePartyGroup');
});

const members: Array<PartyProductUser> = [
  {
    id: 'uid',
    name: 'Name',
    surname: 'LIMITED',
    email: 'address',
    userRole: 'ADMIN',
    status: 'ACTIVE',
    isCurrentUser: true,
    product: {
      id: 'productId',
      title: 'title',
      roles: [
        {
          relationshipId: 'relationshipId',
          role: 'role',
          selcRole: 'ADMIN',
          status: 'ACTIVE',
        },
      ],
    },
  },
];
const users: PartyUserSimple = { id: 'id', name: 'Mario', surname: 'Rossi' };

const groupOnCreation: PartyGroupOnCreation = {
  institutionId: 'institutionId',
  productId: 'prod-i',
  name: 'group1',
  description: 'description',
  members: members,
};

const groupOnEdit: PartyGroupOnEdit = {
  id: 'id',
  institutionId: 'institutionId',
  productId: 'prod-i',
  name: 'group1',
  description: 'description',
  members: members,
};

const groupOnDetail: PartyGroupDetail = {
  id: 'groupId1',
  institutionId: 'onboarded',
  productId: 'prod-io',
  name: 'Gruppo1',
  description: 'description groupId1',
  status: 'ACTIVE',
  membersCount: 1,
  createdAt: new Date('2022-01-01'),
  modifiedAt: new Date('2022-01-01 16:00'),
  members: members,
  createdBy: users,
  modifiedBy: users,
};

const groupId = 'groupId1';

const currentUser: User = {
  name: 'NAME',
  surname: 'SURNAME',
  uid: 'UID',
  taxCode: 'AAAAAA00A00A000A',
  email: 'a@a.aa',
};

test.skip('Test fetchPartyGroups', async () => {
  await fetchPartyGroups(mockedParties[0], mockedPartyProducts[0], currentUser, {
    page: 0,
    size: 20,
  });

  // expect(DashboardApi.fetchPartyGroups).toMatchObject((r) => ({
  //   content: r?.map(usersGroupPlainResource2PartyGroup) ?? [],
  //   page: {
  //     number: 0,
  //     size: 20,
  //     totalElements: -1,
  //     totalPages: -1,
  //   },
  // }));
  expect(DashboardApi.fetchPartyGroups).toBeCalledWith(mockedGroups[0].id, 'institutionId');
});

test.skip('Test fetchPartyGroup', async () => {
  await fetchPartyGroup(
    mockedParties[0].institutionId,
    mockedGroups[0].id,
    mockedUser,
    buildProductsMap(mockedPartyProducts)
  );

  expect(DashboardApi.fetchPartyGroup).toBeCalledWith(
    mockedGroups[0].id,
    mockedParties[0].institutionId
  );
});

test.skip('Test savePartyGroup', async () => {
  await savePartyGroup(mockedParties[0], mockedPartyProducts[0], groupOnCreation);
  expect(DashboardApi.savePartyGroup).toBeCalledTimes(1);
  expect(DashboardApi.savePartyGroup).toBeCalledWith(mockedGroups[0]);
});

test.skip('Test updatePartyGroup', async () => {
  await updatePartyGroup(mockedParties[0], mockedPartyProducts[0], groupOnEdit);
  expect(DashboardApi.updatePartyGroup).toBeCalledTimes(1);
  expect(DashboardApi.updatePartyGroup).toBeCalledWith(groupId, mockedGroups[0]);
});

describe('Test updatePartyGroupStatus', () => {
  test.skip('Test updatePartyGroupStatus', async () => {
    await updatePartyGroupStatus(
      mockedParties[0],
      mockedPartyProducts[0],
      mockedGroups[0],
      'ACTIVE'
    );
    expect(DashboardApi.updatePartyGroupStatusActivate).toBeCalledTimes(1);
    expect(DashboardApi.updatePartyGroupStatusActivate).toBeCalledWith(groupId);
    expect(DashboardApi.updatePartyGroupStatusSuspend).toBeCalledTimes(0);

    await updatePartyGroupStatus(
      mockedParties[0],
      mockedPartyProducts[0],
      mockedGroups[0],
      'SUSPENDED'
    );
    expect(DashboardApi.updatePartyGroupStatusSuspend).toBeCalledTimes(1);
    expect(DashboardApi.updatePartyGroupStatusSuspend).toBeCalledWith(groupId);
    expect(DashboardApi.updatePartyGroupStatusActivate).toBeCalledTimes(0);
  });
});

test('Test deletePartyGroup', async () => {
  await deletePartyGroup(mockedParties[0], mockedPartyProducts[0], mockedGroups[0]);

  expect(DashboardApi.deletePartyGroup).toBeCalledTimes(1);
  expect(DashboardApi.deletePartyGroup).toBeCalledWith('groupId1');
});

test.skip('Test deleteGroupRelation', async () => {
  await deleteGroupRelation(mockedParties[0], mockedPartyProducts[0], groupOnDetail, 'uid');
  expect(DashboardApi.deleteGroupRelation).toBeCalledTimes(1);
  expect(DashboardApi.deleteGroupRelation).toBeCalledWith('groupId1');
});
