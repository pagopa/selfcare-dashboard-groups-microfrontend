import { PageRequest } from '@pagopa/selfcare-common-frontend/model/PageRequest';
import { PageResource } from '@pagopa/selfcare-common-frontend/model/PageResource';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { Party, UserRole, UserStatus } from '../model/Party';
import { Product, ProductsMap } from '../model/Product';
import {
  institutionUserResource2PartyUser,
  PartyUser,
  PartyUserProduct,
  PartyUserProductRole,
  productUserResource2PartyUser,
} from '../model/PartyUser';
import { ProductRole } from '../model/ProductRole';
import { DashboardApi } from '../api/DashboardApiClient';
import {
  fetchPartyUsers as fetchPartyUsersMocked,
  updatePartyUserStatus as updatePartyUserStatusMocked,
} from './__mocks__/usersService';

const toFakePagination = <T>(content: Array<T>): PageResource<T> => ({
  content,
  page: {
    number: 0,
    size: content.length,
    totalElements: content.length,
    totalPages: 1,
  },
});

export const fetchPartyUsers = (
  pageRequest: PageRequest,
  party: Party,
  productsMap: ProductsMap,
  currentUser: User,
  fetchOnlyCurrentProduct: boolean,
  product?: Product,
  selcRole?: UserRole,
  productRoles?: Array<ProductRole>
): Promise<PageResource<PartyUser>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return fetchPartyUsersMocked(
      pageRequest,
      party,
      currentUser,
      fetchOnlyCurrentProduct,
      product,
      selcRole,
      productRoles
    );
  } else {
    if (product && fetchOnlyCurrentProduct) {
      return DashboardApi.getPartyProductUsers(
        party.institutionId,
        product.id,
        selcRole,
        productRoles
      ).then(
        (
          r // TODO fixme when API will support pagination
        ) => toFakePagination(r.map((u) => productUserResource2PartyUser(u, product, currentUser)))
      );
    } else {
      return DashboardApi.getPartyUsers(
        party.institutionId,
        product?.id,
        selcRole,
        productRoles
      ).then(
        (
          r // TODO fixme when API will support pagination
        ) =>
          toFakePagination(
            r.map((u) => institutionUserResource2PartyUser(u, productsMap, currentUser))
          )
      );
    }
  }
};

export const updatePartyUserStatus = (
  party: Party,
  user: PartyUser,
  product: PartyUserProduct,
  role: PartyUserProductRole,
  status: UserStatus
): Promise<any> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return updatePartyUserStatusMocked(party, user, product, role, status);
  }
  if (status === 'ACTIVE') {
    trackEvent('USER_RESUME', {
      party_id: party.institutionId,
      product: product.id,
      product_role: user.userRole,
    });
    return DashboardApi.activatePartyRelation(role.relationshipId);
  } else if (status === 'SUSPENDED') {
    trackEvent('USER_SUSPEND', {
      party_id: party.institutionId,
      product: product.id,
      product_role: user.userRole,
    });
    return DashboardApi.suspendPartyRelation(role.relationshipId);
  } else {
    throw new Error(`Not allowed next status: ${status}`);
  }
};
