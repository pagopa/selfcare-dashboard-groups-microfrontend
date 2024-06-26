import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { EmailString } from '@pagopa/ts-commons/lib/strings';
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
  id?: string;
  name?: string;
  surname?: string;
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
  id: resource.id ?? '',
  name: resource.name ?? '',
  surname: resource.surname ?? '',
  email: resource?.email as EmailString,
  userRole: resource.role as UserRole,
  product: productInfoResource2PartyUserProduct(product, resource?.product),
  status: resource.status as UserStatus,
  isCurrentUser: currentUser.uid === resource.id,
});

export const productInfoResource2PartyUserProduct = (
  product: Product,
  productInfo?: ProductInfoResource
): PartyUserProduct => ({
  id: productInfo?.id ?? product.id,
  title: productInfo?.title ?? product.title,
  roles: productInfo?.roleInfos?.map((r) => ({
    relationshipId: r.relationshipId,
    role: r.role,
    selcRole: r.selcRole as UserRole,
    status: r.status as UserStatus,
  })) as Array<PartyUserProductRole>,
});
