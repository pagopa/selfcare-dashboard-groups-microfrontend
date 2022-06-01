import {
  usersGroupPlainResource2PartyGroup,
  usersGroupResource2PartyGroupDetail,
} from '../PartyGroup';
import { mockedUser } from '../../__mocks__/@pagopa/selfcare-common-frontend/decorators/withLogin';
import { mockedPartyProducts } from './../../microcomponents/mock_dashboard/data/product';
import { userGroupPlainResource, usersGroupResource } from '../../api/__mocks__/DashboardApiClient';

test('Test usersGroupPlainResource2PartyGroup', () => {
  const partyGroup = usersGroupPlainResource2PartyGroup(userGroupPlainResource);
  expect(partyGroup).toStrictEqual({
    id: 'groupId1',
    partyId: 'onboarded',
    productId: 'prod-io',
    name: 'Gruppo1',
    description: 'groupId1: descriptoion',
    status: 'ACTIVE',
    membersCount: 1,
    createdAt: new Date('2022-01-01'),
    modifiedAt: new Date('2022-01-01 16:00'),
  });
});

test('Test usersGroupResource2PartyGroupDetail', () => {
  const partyGroup = usersGroupResource2PartyGroupDetail(
    usersGroupResource,
    mockedUser,
    mockedPartyProducts[0]
  );
  expect(partyGroup).toStrictEqual({
    id: 'groupId1',
    partyId: 'onboarded',
    productId: 'prod-io',
    name: 'Gruppo1',
    description: 'groupId1: descriptoion',
    status: 'ACTIVE',
    membersCount: 1,
    createdAt: undefined,
    modifiedAt: undefined,
    members: [
      {
        email: 'address',
        id: '1',
        isCurrentUser: false,
        name: 'Name',
        product: {
          id: 'productId',
          roles: [
            {
              relationshipId: 'relationshipId',
              role: 'ADMIN',
              selcRole: 'ADMIN',
              status: 'ACTIVE',
            },
          ],
          title: 'App IO',
        },
        userRole: 'ADMIN',
        status: 'PENDING',
        surname: 'LIMITED',
      },
    ],
    createdBy: undefined,
    modifiedBy: undefined,
  });
});
