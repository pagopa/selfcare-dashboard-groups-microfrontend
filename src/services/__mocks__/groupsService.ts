import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { PageResource } from '@pagopa/selfcare-common-frontend/model/PageResource';
import { PageRequest } from '@pagopa/selfcare-common-frontend/model/PageRequest';
import {
  applySort,
  extractPageRequest,
} from '@pagopa/selfcare-common-frontend/hooks/useFakePagination';
import { cloneDeep } from 'lodash';
import { Party } from '../../model/Party';
import {
  PartyUserExt,
  PartyProductUser,
  PartyUserProduct,
  PartyUserSimple,
} from '../../model/PartyUser';
import { Product, ProductsMap } from '../../model/Product';
import {
  PartyGroup,
  PartyGroupDetail,
  PartyGroupOnCreation,
  PartyGroupOnEdit,
  PartyGroupStatus,
} from '../../model/PartyGroup';
import { mockedUsers } from './usersService';

type PartyGroupMock = PartyGroup & {
  membersIds: Array<string>;
  createdByUserId: string;
  modifiedByUserId: string;
};

export const mockedGroups: Array<PartyGroupMock> = [
  {
    id: 'groupId1',
    name: 'Gruppo1',
    description:
      'groupId1: use case ACTIVE group having 1 user on product in which loggedUser is ADMIN',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['uid'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId2',
    name: 'Gruppo2',
    description:
      'groupId2: use case ACTIVE group having 1 user on product in which loggedUser is LIMITED',
    partyId: 'onboarded',
    productId: 'prod-pn',
    status: 'ACTIVE',
    membersIds: ['uid7'],
    createdAt: new Date('2022-01-10'),
    createdByUserId: 'uid7',
    modifiedAt: new Date('2022-01-21 10:00'),
    modifiedByUserId: 'uid7',
  },
  {
    id: 'groupId3',
    name: 'Gruppo3',
    description:
      'groupId3: use case SUSPENDED group having 2 users on product in which loggedUser is ADMIN',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'SUSPENDED',
    membersIds: ['uid', '0'],
    createdAt: new Date('2022-02-01'),
    createdByUserId: '0',
    modifiedAt: new Date('2022-02-08 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId4',
    name: 'Gruppo4',
    description:
      'groupId4: use case SUSPENDED group having 2 user on product in which loggedUser is LIMITED',
    partyId: 'onboarded',
    productId: 'prod-pn',
    status: 'SUSPENDED',
    membersIds: ['uid6', 'uid7'],
    createdAt: new Date('2022-03-01'),
    createdByUserId: 'uid7',
    modifiedAt: new Date('2022-03-01'),
    modifiedByUserId: 'uid7',
  },

  {
    id: 'groupId5',
    name: 'Gruppo5',
    description: 'groupId5 : use case ACTIVE group having 1 user ACTIVE and 1 user SUSPENDED',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['uid', 'uid3'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId6',
    name: 'Gruppo6',
    description: 'groupId6 : use case ACTIVE and user has no privileges ',
    partyId: 'onboarded',
    productId: 'prod-ciban',
    status: 'ACTIVE',
    membersIds: ['uid'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId7',
    name: 'Gruppo7',
    description: 'groupId7 : use case ACTIVE group with loggedUser which is ADMIN in prod-io',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['0'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: '0',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: '0',
  },
  {
    id: 'groupId8',
    name: 'Gruppo8',
    description: 'Group to have a significant number on prod-io',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['uid'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId9',
    // use case management of particulary long group name
    name: 'AparticularylongGroupName9AparticularylongGroupName9AparticularylongGroupName9AparticularylongGroupName9AparticularylongGroupName9AparticularylongGroupName9AparticularylongGroupName9AparticularylongGroupName9AparticularylongGroupName9',
    // use case management of particulary long description
    description:
      'AparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroup',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['uid'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId10',
    name: 'Gruppo10',
    description: 'Group to have a significant number on prod-io',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['uid'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId11',
    name: 'Gruppo11',
    description: 'Group to have a significant number on prod-io',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['uid'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId12',
    name: 'Gruppo12',
    description: 'Group to have a significant number on prod-io',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['uid'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId13',
    name: 'Gruppo13',
    description: 'Group to have a significant number on prod-io',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['uid'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  // Use case introduced for selfcare-pnpg
  {
    id: 'groupId15',
    name: 'Gruppo15',
    description: 'Group to have a significant number on prod-pn-pg',
    partyId: '5b123318-7ff7-48c1-67c8-1111e6707c3d',
    productId: 'prod-pn-pg',
    status: 'SUSPENDED',
    membersIds: ['uid60'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId16',
    name: 'Gruppo16',
    description: 'Group to have a significant number on prod-pn-pg',
    partyId: '5b123318-7ff7-48c1-67c8-1111e6707c3d',
    productId: 'prod-pn-pg',
    status: 'ACTIVE',
    membersIds: ['uid61', 'uid62'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId17',
    name: 'Gruppo17',
    description: 'Group to have a significant number on prod-pn-pg',
    partyId: '5b123318-7ff7-48c1-67c8-1111e6707c3d',
    productId: 'prod-pn-pg',
    status: 'SUSPENDED',
    membersIds: ['uid62'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId18',
    name: 'Gruppo18',
    description: 'Group to have a significant number on prod-pn-pg',
    partyId: '5b123318-7ff7-48c1-67c8-1111e6707c3d',
    productId: 'prod-pn-pg',
    status: 'ACTIVE',
    membersIds: ['uid62'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
].map((o) => ({
  ...o,
  membersCount: o.membersIds.length,
  status: o.status as PartyGroupStatus,
}));

export const fetchPartyGroups = (
  party: Party,
  product: Product,
  _currentUser: User,
  pageRequest: PageRequest
): Promise<PageResource<PartyGroup>> => {
  const filteredContent = mockedGroups
    .slice()
    .filter((u) => {
      if (u.partyId !== party.partyId) {
        return false;
      }
      return product.id.indexOf(u.productId) > -1;
    })
    .map((u) => cloneDeep(u));

  if (pageRequest.sort) {
    applySort(filteredContent, pageRequest.sort);
  }
  return new Promise((resolve) =>
    setTimeout(() => resolve(extractPageRequest(filteredContent, pageRequest)), 100)
  );
};

export const savePartyGroup = (
  _party: Party,
  _product: Product,
  group: PartyGroupOnCreation
): Promise<string> => {
  const errorHttpStatus =
    group.name === 'ERROR' ? 500 : group.name === 'DUPLICATE' ? 409 : undefined;
  if (!errorHttpStatus) {
    const clone: PartyGroupMock = {
      ...group,
      id: `${Date.now()}`,
      status: 'ACTIVE',
      membersIds: group.members.map((m) => m.id),
      membersCount: group.members.length,
      createdAt: new Date(),
      createdByUserId: '0',
      modifiedAt: new Date(),
      modifiedByUserId: '0',
    };
    // eslint-disable-next-line functional/immutable-data
    mockedGroups.push(clone);
  }
  return new Promise((resolve, error) =>
    errorHttpStatus ? error({ httpStatus: errorHttpStatus }) : resolve('newGroupId')
  );
};

export const updatePartyGroup = (
  _party: Party,
  _product: Product,
  group: PartyGroupOnEdit
): Promise<string> => {
  const updatingGroupIndex = mockedGroups.findIndex((u) => u.id === group.id);
  const clone: PartyGroupMock = {
    ...mockedGroups[updatingGroupIndex],
    ...group,
    membersIds: group.members.map((m) => m.id),
    membersCount: group.members.length,
    modifiedAt: new Date(),
    modifiedByUserId: '0',
  };
  // eslint-disable-next-line functional/immutable-data
  mockedGroups.splice(updatingGroupIndex, 1, clone);
  return new Promise((resolve) => resolve(group.id));
};

export const fetchPartyGroup = (
  partyId: string,
  groupId: string,
  _currentUser: User,
  _productsMap: ProductsMap
): Promise<PartyGroupDetail | null> => {
  const mockedGroup = mockedGroups.find((u) => u.id === groupId && u.partyId === partyId) ?? null;

  if (mockedGroup !== null) {
    const clone: PartyGroupMock = cloneDeep(mockedGroup);
    // eslint-disable-next-line functional/immutable-data
    (clone as unknown as PartyGroupDetail).members = clone.membersIds.map((m) => {
      const user = cloneDeep(mockedUsers.find((u) => u.id === m) as PartyUserExt);
      console.log(user);
      const member: PartyProductUser = {
        ...user,
        product: user.products.find((p) => p.id === clone.productId) as PartyUserProduct,
      };
      // eslint-disable-next-line functional/immutable-data
      delete (member as any).products;
      return member;
    });
    // eslint-disable-next-line functional/immutable-data
    (clone as unknown as PartyGroupDetail).createdBy = mockedUsers.find(
      (u) => u.id === clone.createdByUserId
    ) as PartyUserSimple;
    // eslint-disable-next-line functional/immutable-data
    (clone as unknown as PartyGroupDetail).modifiedBy = mockedUsers.find(
      (u) => u.id === clone.modifiedByUserId
    ) as PartyUserSimple;
    return new Promise((resolve) => resolve(clone as unknown as PartyGroupDetail));
  } else {
    return new Promise((resolve) => resolve(null));
  }
};

export const updatePartyGroupStatus = (
  _party: Party,
  _product: Product,
  group: PartyGroup,
  status: PartyGroupStatus
): Promise<any> => {
  if (status === 'ACTIVE' || status === 'SUSPENDED') {
    const clone = { ...group, status } as PartyGroupMock;
    // eslint-disable-next-line functional/immutable-data
    mockedGroups.splice(
      mockedGroups.findIndex((u) => u.id === group.id),
      1,
      clone
    );

    return new Promise<void>((resolve) => resolve());
  } else {
    throw new Error(`Not allowed next status: ${status}`);
  }
};

export const deletePartyGroup = (
  _party: Party,
  _product: Product,
  group: PartyGroup
): Promise<any> => {
  // eslint-disable-next-line functional/immutable-data
  mockedGroups.splice(
    mockedGroups.findIndex((u) => u.id === group.id),
    1
  );
  return new Promise<void>((resolve) => resolve());
};

export const deleteGroupRelation = (
  _party: Party,
  _product: Product,
  group: PartyGroupDetail,
  userId: string
): Promise<any> => {
  const selectedGroup = mockedGroups.find((g) => g.id === group.id);
  // eslint-disable-next-line functional/immutable-data
  selectedGroup?.membersIds.splice(selectedGroup.membersIds.indexOf(userId), 1);
  return new Promise<void>((resolve) => resolve());
};
