import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { mockedUser } from '../../__mocks__/@pagopa/selfcare-common-frontend/decorators/withLogin';
import { DashboardApi } from '../../api/DashboardApiClient';
import { mockedParties } from '../../microcomponents/mock_dashboard/data/party';
import { mockedPartyProducts } from '../../microcomponents/mock_dashboard/data/product';
import {
  PartyGroupDetail,
  PartyGroupOnCreation,
  PartyGroupOnEdit
} from '../../model/PartyGroup';
import { PartyProductUser, PartyUserSimple } from '../../model/PartyUser';
import { buildProductsMap } from '../../model/Product';
import { mockedGroups } from './../__mocks__/groupsService';
import {
  deleteGroupRelation,
  deletePartyGroup,
  fetchPartyGroup,
  fetchPartyGroups,
  savePartyGroup,
  updatePartyGroup,
  updatePartyGroupStatus,
} from './../groupsService';

jest.mock('../../api/DashboardApiClient');

beforeEach(() => {
  jest.spyOn(DashboardApi, 'deletePartyGroup');
  jest.spyOn(DashboardApi, 'deleteGroupRelation');
  jest.spyOn(DashboardApi, 'fetchPartyGroup');
  jest.spyOn(DashboardApi, 'updatePartyGroup');
  jest.spyOn(DashboardApi, 'updatePartyGroupStatusActivate');
  jest.spyOn(DashboardApi, 'updatePartyGroupStatusSuspend');
  jest.spyOn(DashboardApi, 'savePartyGroup');
  jest.spyOn(DashboardApi, 'fetchPartyGroups');
});
console.log('deletePartyGroup', mockedParties[0], mockedPartyProducts[0], mockedGroups[0].id);
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
  partyId: 'partyId',
  productId: 'prod-id',
  name: 'group1',
  description: 'description',
  members: members,
};

const groupOnEdit: PartyGroupOnEdit = {
  id: 'id',
  partyId: 'partyId',
  productId: 'prod-i',
  name: 'group1',
  description: 'description',
  members: members,
};

const groupOnDetail: PartyGroupDetail = {
  id: 'groupId1',
  partyId: 'partyId',
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

test('Test fetchPartyGroups', async () => {
  await fetchPartyGroups(mockedParties[0], mockedPartyProducts[0], currentUser, {
    page: 0,
    size: 20,
  });
  expect(DashboardApi.fetchPartyGroups).toBeCalledWith(
    mockedPartyProducts[0].id,
    mockedParties[0].partyId,
    {
      page: 0,
      size: 20,
    }
  );
});

test('Test fetchPartyGroup', async () => {
  await fetchPartyGroup(
    mockedParties[0].partyId,
    mockedGroups[0].id,
    mockedUser,
    buildProductsMap(mockedPartyProducts)
  );

  expect(DashboardApi.fetchPartyGroup).toBeCalledWith(mockedGroups[0].id, mockedParties[0].partyId);
});

test('Test savePartyGroup', async () => {
  const newGroupId = await savePartyGroup(
    mockedParties[0],
    mockedPartyProducts[0],
    groupOnCreation
  );
  expect(DashboardApi.savePartyGroup).toBeCalledWith(groupOnCreation);
  expect(newGroupId).toBe('newGroupId');
});

test('Test updatePartyGroup', async () => {
  const groupId = await updatePartyGroup(mockedParties[0], mockedPartyProducts[0], groupOnEdit);
  // expect(DashboardApi.updatePartyGroup).toBeCalledTimes(1);
  expect(DashboardApi.updatePartyGroup).toBeCalledWith(groupOnEdit.id, groupOnEdit);
  expect(groupId).toBe(groupOnEdit.id);
});

describe('Test updatePartyGroupStatus', () => {
  test('Test updatePartyGroupStatus', async () => {
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
  });
});

test('Test deletePartyGroup', async () => {
  await deletePartyGroup(mockedParties[0], mockedPartyProducts[0], mockedGroups[0]);
  expect(DashboardApi.deletePartyGroup).toBeCalledTimes(1);
  expect(DashboardApi.deletePartyGroup).toBeCalledWith(groupId);
});

test('Test deleteGroupRelation', async () => {
  await deleteGroupRelation(mockedParties[0], mockedPartyProducts[0], groupOnDetail, 'uid');
  expect(DashboardApi.deleteGroupRelation).toBeCalledTimes(1);
  expect(DashboardApi.deleteGroupRelation).toBeCalledWith(groupId, 'uid');
});
