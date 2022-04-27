import { PageRequest } from '@pagopa/selfcare-common-frontend/model/PageRequest';
import { PageResource } from '@pagopa/selfcare-common-frontend/model/PageResource';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { Party, UserRole, UserStatus } from '../model/Party';
import { Product } from '../model/Product';
import {
  PartyProductUser,
  PartyUserProduct,
  PartyUserProductRole,
  productUserResource2PartyProductUser,
} from '../model/PartyUser';
import { ProductRole } from '../model/ProductRole';
import { DashboardApi } from '../api/DashboardApiClient';
import {
  fetchPartyProductUsers as fetchPartyProductUsersMocked,
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

export const fetchPartyProductUsers = (
  pageRequest: PageRequest,
  party: Party,
  product: Product,
  currentUser: User,
  selcRole?: UserRole,
  productRoles?: Array<ProductRole>
): Promise<PageResource<PartyProductUser>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return fetchPartyProductUsersMocked(
      pageRequest,
      party,
      product,
      currentUser,
      selcRole,
      productRoles
    );
  } else {
    return DashboardApi.getPartyProductUsers(
      party.partyId,
      product.id,
      selcRole,
      productRoles
    ).then((r) =>
      // TODO fixme when API will support pagination
      toFakePagination(r.map((u) => productUserResource2PartyProductUser(u, product, currentUser)))
    );
  }
};

export const updatePartyUserStatus = (
  party: Party,
  user: PartyProductUser,
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
      party_id: party.partyId,
      product: product.id,
      product_role: user.userRole,
    });
    return DashboardApi.activatePartyRelation(role.relationshipId);
  } else if (status === 'SUSPENDED') {
    trackEvent('USER_SUSPEND', {
      party_id: party.partyId,
      product: product.id,
      product_role: user.userRole,
    });
    return DashboardApi.suspendPartyRelation(role.relationshipId);
  } else {
    throw new Error(`Not allowed next status: ${status}`);
  }
};
