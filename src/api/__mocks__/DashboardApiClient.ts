import { PageRequest } from '@pagopa/selfcare-common-frontend/model/PageRequest';
import { PartyGroupOnEdit } from '../../model/PartyGroup';
import {
  InstitutionUserResource,
  RoleEnum,
} from '../generated/b4f-dashboard/InstitutionUserResource';
import { SelcRoleEnum } from '../generated/b4f-dashboard/ProductRoleInfoResource';
import { ProductUserResource } from '../generated/b4f-dashboard/ProductUserResource';
import {
  StatusEnum,
  UserGroupPlainResource,
} from '../generated/b4f-dashboard/UserGroupPlainResource';
import { UserGroupResource } from './../generated/b4f-dashboard/UserGroupResource';

export const mockedInstitutionUserResource: Array<InstitutionUserResource> = [
  {
    id: '1',
    name: 'Name',
    surname: 'Surname',
    status: 'PENDING',
    role: 'LIMITED' as RoleEnum,
    email: 'address',
    products: [
      {
        id: 'productId',
        title: 'productTitle',
        roleInfos: [
          {
            relationshipId: 'relId',
            role: 'incaricato-ente-creditore',
            selcRole: SelcRoleEnum.ADMIN,
            status: 'ACTIVE',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Name2',
    surname: 'Surname2',
    status: 'ACTIVE',
    role: 'ADMIN' as RoleEnum,
    email: 'address',
    products: [
      {
        id: 'productId2',
        title: 'productTitle2',
        roleInfos: [
          {
            relationshipId: 'relId',
            role: 'incaricato-ente-creditore',
            selcRole: SelcRoleEnum.ADMIN,
            status: 'ACTIVE',
          },
        ],
      },
    ],
  },
];

export const mockedProductUserResource: Array<ProductUserResource> = [
  {
    id: '1',
    name: 'Name',
    surname: 'Surname',
    status: 'PENDING',
    role: 'LIMITED' as RoleEnum,
    email: 'address',
    product: {
      id: 'prod-io',
      title: 'App IO',
      roleInfos: [
        {
          relationshipId: 'relationshipId',
          role: 'incaricato-ente-creditore',
          selcRole: SelcRoleEnum.ADMIN,
          status: 'ACTIVE',
        },
      ],
    },
  },
  {
    id: '2',
    name: 'Name2',
    surname: 'Surname2',
    status: 'ACTIVE',
    role: 'ADMIN' as RoleEnum,
    email: 'address2',
    product: {
      id: 'prod-io',
      title: 'App IO',
      roleInfos: [
        {
          relationshipId: 'relationshipId2',
          role: 'incaricato-ente-creditore',
          selcRole: SelcRoleEnum.ADMIN,
          status: 'ACTIVE',
        },
      ],
    },
  },
];

export const usersGroupResource: UserGroupResource = {
  description: 'groupId1: descriptoion',
  id: 'groupId1',
  institutionId: 'onboarded',
  members: [
    {
      email: 'address',
      id: '1',
      name: 'Name',
      product: {
        id: 'productId',
        roleInfos: [
          {
            relationshipId: 'relationshipId',
            role: RoleEnum.ADMIN,
            selcRole: SelcRoleEnum.ADMIN,
            status: 'ACTIVE',
          },
        ],
      },
      role: RoleEnum.ADMIN,
      status: 'PENDING',
      surname: 'LIMITED',
    },
  ],
  name: 'Gruppo1',
  productId: 'prod-io',
  status: StatusEnum.ACTIVE,
};

export const userGroupPlainResource: UserGroupPlainResource = {
  description: 'groupId1: descriptoion',
  id: 'groupId1',
  institutionId: 'onboarded',
  membersCount: 1,
  name: 'Gruppo1',
  productId: 'prod-io',
  status: StatusEnum.ACTIVE,
  createdAt: new Date('2022-01-01'),
  createdBy: 'uid',
  modifiedAt: new Date('2022-01-01 16:00'),
  modifiedBy: 'uid',
};

export const userGroupPlainResourceArray: Array<UserGroupPlainResource> = [
  {
    description: 'groupId1: descriptoion',
    id: 'groupId1',
    institutionId: 'onboarded',
    membersCount: 1,
    name: 'Gruppo1',
    productId: 'prod-io',
    status: StatusEnum.ACTIVE,
    createdAt: new Date('2022-01-01'),
    createdBy: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedBy: 'uid',
  },
];

export const DashboardApi = {
  getPartyProductUsers: async (
    _institutionId: string,
    _productId: string,
    _role?: string
  ): Promise<Array<ProductUserResource>> =>
    new Promise((resolve) => resolve(mockedProductUserResource)),

  suspendPartyRelation: async (_relationshipId: string): Promise<void> =>
    new Promise((resolve) => resolve()),

  activatePartyRelation: async (_relationshipId: string): Promise<void> =>
    new Promise((resolve) => resolve()),

  deletePartyGroup: async (_id: string): Promise<void> => new Promise((resolve) => resolve()),

  deleteGroupRelation: async (_userGroupId: string, _userId: string): Promise<void> =>
    new Promise((resolve) => resolve()),

  fetchPartyGroup: async (_id: string, _institutionId: string): Promise<UserGroupResource | null> =>
    new Promise((resolve) => resolve(usersGroupResource)),

  fetchPartyGroups: async (
    _productId: string,
    _institutionId: string,
    _pageRequest: PageRequest
  ): Promise<Array<UserGroupPlainResource>> =>
    new Promise((resolve) => resolve(userGroupPlainResourceArray)),

  updatePartyGroup: async (_id: string, _group: PartyGroupOnEdit): Promise<void> =>
    new Promise((resolve) => resolve()),

  updatePartyGroupStatusActivate: async (_id: string): Promise<void> =>
    new Promise((resolve) => resolve()),

  updatePartyGroupStatusSuspend: async (_id: string): Promise<void> =>
    new Promise((resolve) => resolve()),

  savePartyGroup: async (_id: string): Promise<void> => new Promise((resolve) => resolve()),
};
