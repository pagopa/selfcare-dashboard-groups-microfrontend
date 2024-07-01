import { PageRequest } from '@pagopa/selfcare-common-frontend/lib/model/PageRequest';
import { appStateActions } from '@pagopa/selfcare-common-frontend/lib/redux/slices/appStateSlice';
import { buildFetchApi, extractResponse } from '@pagopa/selfcare-common-frontend/lib/utils/api-utils';
import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { PartyGroupOnCreation, PartyGroupOnEdit } from '../model/PartyGroup';
import { ENV } from '../utils/env';
import { PageOfUserGroupPlainResource } from './generated/b4f-dashboard/PageOfUserGroupPlainResource';
import { ProductUserResource } from './generated/b4f-dashboard/ProductUserResource';
import { UserGroupIdResource } from './generated/b4f-dashboard/UserGroupIdResource';
import { UserGroupPlainResource } from './generated/b4f-dashboard/UserGroupPlainResource';
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

  suspendPartyRelation: async (
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

  activatePartyRelation: async (
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

  deleteGroupRelation: async (userGroupId: string, userId: string): Promise<void> => {
    const result = await apiClient.deleteMemberFromUserGroupUsingDELETE({
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

  fetchPartyGroup: async (
    id: string,
    institutionId: string
  ): Promise<UserGroupPlainResource | null> => {
    const result = await apiClient.getUserGroupByIdUsingGET({
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

  updatePartyGroupStatusActivate: async (id: string): Promise<void> => {
    const result = await apiClient.activateUserGroupUsingPOST({
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
};
