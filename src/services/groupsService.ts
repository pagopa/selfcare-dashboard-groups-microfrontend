import { PageRequest } from '@pagopa/selfcare-common-frontend/model/PageRequest';
import { PageResource } from '@pagopa/selfcare-common-frontend/model/PageResource';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { DashboardApi } from '../api/DashboardApiClient';
import { Party } from '../model/Party';
import {
  PartyGroup,
  PartyGroupDetail,
  PartyGroupOnCreation,
  PartyGroupOnEdit,
  PartyGroupStatus,
  usersGroupPlainResource2PartyGroup,
  usersGroupResource2PartyGroupDetail,
} from '../model/PartyGroup';
import { Product, ProductsMap } from '../model/Product';
import { ENV } from '../utils/env';
import {
  deleteGroupRelation as deleteGroupRelationMocked,
  deletePartyGroup as deletePartyGroupMocked,
  fetchPartyGroup as fetchPartyGroupMocked,
  fetchPartyGroups as fetchPartyGroupsMocked,
  savePartyGroup as savePartyGroupMocked,
  updatePartyGroup as updatePartyGroupMocked,
  updatePartyGroupStatus as updatePartyGroupStatusMocked,
} from './__mocks__/groupsService';

export const fetchPartyGroups = (
  party: Party,
  product: Product,
  currentUser: User,
  pageRequest: PageRequest
): Promise<PageResource<PartyGroup>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_GROUPS === 'true') {
    return fetchPartyGroupsMocked(party, product, currentUser, pageRequest);
  } else {
    const fetchPartyGroupsApi = ENV.USER.ENABLE_USER_V2
      ? DashboardApi.fetchPartyGroupsV2
      : DashboardApi.fetchPartyGroups;
    return fetchPartyGroupsApi(product.id, party.partyId, pageRequest).then((resources) => ({
      content: resources?.content?.map(usersGroupPlainResource2PartyGroup) ?? [],
      page: {
        number: resources.number,
        size: resources.size,
        totalElements: resources.totalElements,
        totalPages: resources.totalPages,
      },
    }));
  }
};

export const fetchPartyGroup = (
  partyId: string,
  groupId: string,
  currentUser: User,
  productsMap: ProductsMap
): Promise<PartyGroupDetail | null> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_GROUPS === 'true') {
    return fetchPartyGroupMocked(partyId, groupId, currentUser, productsMap);
  } else {
    const fetchPartyGroupApi = ENV.USER.ENABLE_USER_V2
      ? DashboardApi.fetchPartyGroupV2
      : DashboardApi.fetchPartyGroup;
    return fetchPartyGroupApi(groupId, partyId).then((resource) =>
      resource && resource.productId
        ? usersGroupResource2PartyGroupDetail(
            resource,
            currentUser,
            productsMap[resource.productId]
          )
        : null
    );
  }
};

export const savePartyGroup = (
  party: Party,
  product: Product,
  group: PartyGroupOnCreation
): Promise<string> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_GROUPS === 'true') {
    return savePartyGroupMocked(party, product, group);
  } else {
    if (ENV.USER.ENABLE_USER_V2) {
      return DashboardApi.savePartyGroupV2(group).then((idResource) => idResource.id);
    }
    return DashboardApi.savePartyGroup(group).then((idResource) => idResource.id);
  }
};

export const updatePartyGroup = (
  party: Party,
  product: Product,
  group: PartyGroupOnEdit
): Promise<string> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_GROUPS === 'true') {
    return updatePartyGroupMocked(party, product, group);
  } else {
    if (ENV.USER.ENABLE_USER_V2) {
      return DashboardApi.updatePartyGroupV2(group.id, group).then((_) => group.id);
    }
    return DashboardApi.updatePartyGroup(group.id, group).then((_) => group.id);
  }
};

export const updatePartyGroupStatus = (
  party: Party,
  product: Product,
  group: PartyGroup,
  status: PartyGroupStatus
): Promise<any> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_GROUPS === 'true') {
    return updatePartyGroupStatusMocked(party, product, group, status);
  }
  if (status === 'ACTIVE') {
    trackEvent('GROUP_RESUME', {
      party_id: party.partyId,
      product_id: product.id,
    });
    return ENV.USER.ENABLE_USER_V2
      ? DashboardApi.updatePartyGroupStatusActivateV2(group.id)
      : DashboardApi.updatePartyGroupStatusActivate(group.id);
  } else if (status === 'SUSPENDED') {
    trackEvent('GROUP_SUSPEND', {
      party_id: party.partyId,
      product_id: product.id,
    });
    return ENV.USER.ENABLE_USER_V2
      ? DashboardApi.updatePartyGroupStatusSuspendV2(group.id)
      : DashboardApi.updatePartyGroupStatusSuspend(group.id);
  } else {
    throw new Error(`Not allowed next status: ${status}`);
  }
};

export const deletePartyGroup = (
  party: Party,
  product: Product,
  group: PartyGroup
): Promise<any> => {
  trackEvent('GROUP_DELETE', {
    party_id: party.partyId,
    product_id: product.id,
  });
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_GROUPS === 'true') {
    return deletePartyGroupMocked(party, product, group);
  } else {
    if (ENV.USER.ENABLE_USER_V2) {
      return DashboardApi.deletePartyGroupV2(group.id);
    }
    return DashboardApi.deletePartyGroup(group.id);
  }
};

export const deleteGroupRelation = (
  party: Party,
  product: Product,
  group: PartyGroupDetail,
  userId: string
): Promise<any> => {
  trackEvent('RELATION_GROUP_USER_DELETE', {
    party_id: party.partyId,
    product_id: product.id,
  });
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_GROUPS === 'true') {
    return deleteGroupRelationMocked(party, product, group, userId);
  } else {
    if (ENV.USER.ENABLE_USER_V2) {
      return DashboardApi.deleteGroupRelationV2(group.id, userId);
    }
    return DashboardApi.deleteGroupRelation(group.id, userId);
  }
};
