import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { ProductInfoResource } from '../api/generated/b4f-dashboard/ProductInfoResource';
import { ProductUserResource } from '../api/generated/b4f-dashboard/ProductUserResource';
import { UserRole, UserStatus } from './Party';
import { Product } from './Product';

export type BasePartyUser = {
  id: string;
  name: string;
  surname: string;
  email: string;
  userRole: UserRole;
  status: UserStatus;
  isCurrentUser: boolean;
};

export type PartyProductUser = BasePartyUser & {
  product: PartyUserProduct;
};

export type PartyUser = BasePartyUser & {
  products: Array<PartyUserProduct>;
};

export type PartyUserExt = PartyUser & {
  taxCode: string;
};

export type PartyUserSimple = {
  id: string;
  name: string;
  surname: string;
};

export type PartyUserProduct = {
  id: string;
  title: string;
  roles: Array<PartyUserProductRole>;
};

export type PartyUserProductRole = {
  relationshipId: string;
  role: string;
  selcRole: UserRole;
  status: UserStatus;
};

export const productUserResource2PartyProductUser = (
  resource: ProductUserResource,
  product: Product,
  currentUser: User
): PartyProductUser => ({
  id: resource.id,
  name: resource.name,
  surname: resource.surname,
  email: resource.email,
  userRole: resource.role,
  product: productInfoResource2PartyUserProduct(resource.product, product),
  status: resource.status as UserStatus,
  isCurrentUser: currentUser.uid === resource.id,
});

export const productInfoResource2PartyUserProduct = (
  productInfo: ProductInfoResource,
  product: Product
): PartyUserProduct => ({
  id: productInfo.id,
  title: productInfo.title ?? product.title,
  roles: productInfo.roleInfos.map((r) => ({
    relationshipId: r.relationshipId,
    role: r.role,
    selcRole: r.selcRole as UserRole,
    status: r.status as UserStatus,
  })),
});
