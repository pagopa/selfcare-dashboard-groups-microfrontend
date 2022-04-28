import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { UserGroupPlainResource } from '../api/generated/b4f-dashboard/UserGroupPlainResource';
import { UserGroupResource } from '../api/generated/b4f-dashboard/UserGroupResource';
import {
  PartyProductUser,
  PartyUserSimple,
  productUserResource2PartyProductUser,
} from './PartyUser';
import { Product } from './Product';

export type PartyGroupStatus = 'ACTIVE' | 'SUSPENDED';

export type PartyGroup = {
  id: string;
  partyId: string;
  productId: string;
  name: string;
  description: string;
  status: PartyGroupStatus;
  membersCount: number;
  createdAt?: Date;
  modifiedAt?: Date;
};

export type PartyGroupDetail = PartyGroup & {
  members: Array<PartyProductUser>;
  createdBy?: PartyUserSimple;
  modifiedBy?: PartyUserSimple;
};

export type PartyGroupOnCreation = {
  partyId: string;
  productId: string;
  name: string;
  description: string;
  members: Array<PartyProductUser>;
};

export type PartyGroupOnEdit = {
  id: string;
  partyId: string;
  productId: string;
  name: string;
  description: string;
  members: Array<PartyProductUser>;
};

export const usersGroupPlainResource2PartyGroup = (
  resource: UserGroupPlainResource
): PartyGroup => ({
  id: resource.id,
  partyId: resource.institutionId,
  productId: resource.productId,
  name: resource.name,
  description: resource.description,
  status: resource.status,
  membersCount: resource.membersCount,
  createdAt: resource.createdAt,
  modifiedAt: resource.modifiedAt,
});

export const usersGroupResource2PartyGroupDetail = (
  resource: UserGroupResource,
  currentUser: User,
  product: Product
): PartyGroupDetail => ({
  id: resource.id,
  partyId: resource.institutionId,
  productId: resource.productId,
  name: resource.name,
  description: resource.description,
  status: resource.status,
  membersCount: resource.members.length,
  members: resource.members.map((u) =>
    productUserResource2PartyProductUser(u, product, currentUser)
  ),
  createdAt: resource.createdAt,
  createdBy: resource.createdBy,
  modifiedAt: resource.modifiedAt,
  modifiedBy: resource.modifiedBy,
});
