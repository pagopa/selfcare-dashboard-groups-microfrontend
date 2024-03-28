import { PageRequest } from '@pagopa/selfcare-common-frontend/model/PageRequest';
import { appStateActions } from '@pagopa/selfcare-common-frontend/redux/slices/appStateSlice';
import { buildFetchApi, extractResponse } from '@pagopa/selfcare-common-frontend/utils/api-utils';
import { storageTokenOps } from '@pagopa/selfcare-common-frontend/utils/storage';
import { PartyGroupOnCreation, PartyGroupOnEdit } from '../model/PartyGroup';
import { ProductRole } from '../model/ProductRole';
import { ENV } from '../utils/env';
import { PageOfUserGroupPlainResource } from './generated/b4f-dashboard/PageOfUserGroupPlainResource';
import { ProductUserResource } from './generated/b4f-dashboard/ProductUserResource';
import { UserGroupIdResource } from './generated/b4f-dashboard/UserGroupIdResource';
import { UserGroupPlainResource } from './generated/b4f-dashboard/UserGroupPlainResource';
import { UserGroupResource } from './generated/b4f-dashboard/UserGroupResource';
import { WithDefaultsT, createClient } from './generated/b4f-dashboard/client';

const withBearerAndInstitutionId: WithDefaultsT<'bearerAuth'> =
  (wrappedOperation) => (params: any) => {
    const token = storageTokenOps.read();
    return wrappedOperation({
      ...params,
      bearerAuth: `Bearer ${token}`,
    });
  };

const apiClient = createClient({
  baseUrl: ENV.URL_API.API_DASHBOARD,
  basePath: '',
  fetchApi: buildFetchApi(ENV.API_TIMEOUT_MS.DASHBOARD),
  withDefaults: withBearerAndInstitutionId,
});

const onRedirectToLogin = () =>
  ENV.STORE.dispatch(
    appStateActions.addError({
      id: 'tokenNotValid',
      error: new Error(),
      techDescription: 'token expired or not valid',
      toNotify: false,
      blocking: false,
      displayableTitle: ENV.i18n.t('session.expired.title'),
      displayableDescription: ENV.i18n.t('session.expired.message'),
    })
  );

export const DashboardApi = {
  getPartyProductUsers: async (
    institutionId: string,
    productId: string,
    role?: string,
    productRoles?: Array<ProductRole>
  ): Promise<Array<ProductUserResource>> => {
    const result = await apiClient.getInstitutionProductUsersUsingGET({
      institutionId,
      productId,
      role,
      productRoles: productRoles?.map((r) => r.productRole).join(','),
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  getPartyProductUsersV2: async (
    institutionId: string,
    productId?: string
    // productRoles?: Array<ProductRole>
  ): Promise<Array<ProductUserResource>> => {
    const result = await apiClient.v2GetUsersUsingGET({
      institutionId,
      productId,
      // productRoles: productRoles?.map((r) => r.productRole).join(','),
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  suspendPartyRelation: async (relationshipId: string): Promise<void> => {
    const result = await apiClient.suspendRelationshipUsingPOST({
      relationshipId,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  suspendPartyRelationV2: async (
    userId: string,
    institutionId: string,
    productId: string
  ): Promise<void> => {
    const result = await apiClient.v2SuspendRelationshipUsingPOST({
      userId,
      institutionId,
      productId,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  activatePartyRelation: async (relationshipId: string): Promise<void> => {
    const result = await apiClient.activateRelationshipUsingPOST({
      relationshipId,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  activatePartyRelationV2: async (
    userId: string,
    institutionId: string,
    productId: string
  ): Promise<void> => {
    const result = await apiClient.v2ActivateRelationshipUsingPOST({
      userId,
      institutionId,
      productId,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  deletePartyGroup: async (id: string): Promise<void> => {
    const result = await apiClient.deleteUserGroupUsingDELETE({
      id,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  deletePartyGroupV2: async (id: string): Promise<void> => {
    const result = await apiClient.deleteUserGroupUsingDELETE_1({
      id,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  deleteGroupRelation: async (userGroupId: string, userId: string): Promise<void> => {
    const result = await apiClient.deleteMemberFromUserGroupUsingDELETE({
      userGroupId,
      userId,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  deleteGroupRelationV2: async (userGroupId: string, userId: string): Promise<void> => {
    const result = await apiClient.deleteMemberFromUserGroupUsingDELETE_1({
      userGroupId,
      userId,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  fetchPartyGroups: async (
    productId: string,
    institutionId: string,
    pageRequest: PageRequest
  ): Promise<PageOfUserGroupPlainResource> => {
    const result = await apiClient.getUserGroupsUsingGET({
      institutionId,
      page: pageRequest.page,
      size: pageRequest.size,
      sort: pageRequest.sort ? [pageRequest.sort] : undefined,
      productId,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  fetchPartyGroupsV2: async (
    productId: string,
    institutionId: string,
    pageRequest: PageRequest
  ): Promise<PageOfUserGroupPlainResource> => {
    const result = await apiClient.getUserGroupsUsingGET_1({
      institutionId,
      page: pageRequest.page,
      size: pageRequest.size,
      sort: pageRequest.sort ? [pageRequest.sort] : undefined,
      productId,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  fetchPartyGroup: async (id: string, institutionId: string): Promise<UserGroupResource | null> => {
    const result = await apiClient.getUserGroupByIdUsingGET({
      id,
      institutionId,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  fetchPartyGroupV2: async (
    id: string,
    institutionId: string
  ): Promise<UserGroupPlainResource | null> => {
    const result = await apiClient.getUserGroupByIdUsingGET_1({
      id,
      institutionId,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  updatePartyGroup: async (id: string, group: PartyGroupOnEdit): Promise<void> => {
    const result = await apiClient.updateUserGroupUsingPUT({
      id,
      body: {
        description: group.description,
        members: group.members.map((u) => u.id),
        name: group.name,
      },
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  updatePartyGroupV2: async (id: string, group: PartyGroupOnEdit): Promise<void> => {
    const result = await apiClient.updateUserGroupUsingPUT_1({
      id,
      body: {
        description: group.description,
        members: group.members.map((u) => u.id),
        name: group.name,
      },
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  updatePartyGroupStatusActivate: async (id: string): Promise<void> => {
    const result = await apiClient.activateUserGroupUsingPOST({
      id,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  updatePartyGroupStatusActivateV2: async (id: string): Promise<void> => {
    const result = await apiClient.activateUserGroupUsingPOST_1({
      id,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  updatePartyGroupStatusSuspend: async (id: string): Promise<void> => {
    const result = await apiClient.suspendUserGroupUsingPOST({
      id,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  updatePartyGroupStatusSuspendV2: async (id: string): Promise<void> => {
    const result = await apiClient.suspendUserGroupUsingPOST_1({
      id,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  savePartyGroup: async (group: PartyGroupOnCreation): Promise<UserGroupIdResource> => {
    const result = await apiClient.createUserGroupUsingPOST({
      body: {
        description: group.description,
        institutionId: group.partyId,
        members: group.members.map((u) => u.id),
        name: group.name,
        productId: group.productId,
      },
    });
    return extractResponse(result, 201, onRedirectToLogin);
  },

  savePartyGroupV2: async (group: PartyGroupOnCreation): Promise<UserGroupIdResource> => {
    const result = await apiClient.createUserGroupUsingPOST_1({
      body: {
        description: group.description,
        institutionId: group.partyId,
        members: group.members.map((u) => u.id),
        name: group.name,
        productId: group.productId,
      },
    });
    return extractResponse(result, 201, onRedirectToLogin);
  },
};
