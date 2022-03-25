import { storageTokenOps } from '@pagopa/selfcare-common-frontend/utils/storage';
import { appStateActions } from '@pagopa/selfcare-common-frontend/redux/slices/appStateSlice';
import { buildFetchApi, extractResponse } from '@pagopa/selfcare-common-frontend/utils/api-utils';
import { PageRequest } from '@pagopa/selfcare-common-frontend/model/PageRequest';
import { ENV } from '../utils/env';
import { PartyGroupOnCreation, PartyGroupOnEdit } from '../model/PartyGroup';
import { ProductRole } from '../model/ProductRole';
import { createClient, WithDefaultsT } from './generated/b4f-dashboard/client';
import { InstitutionUserResource } from './generated/b4f-dashboard/InstitutionUserResource';
import { ProductUserResource } from './generated/b4f-dashboard/ProductUserResource';
import { UserGroupPlainResource } from './generated/b4f-dashboard/UserGroupPlainResource';
import { UserGroupResource } from './generated/b4f-dashboard/UserGroupResource';

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
      displayableTitle: 'Sessione scaduta',
      displayableDescription: 'Stai per essere rediretto alla pagina di login...',
    })
  );

export const DashboardApi = {
  getPartyUsers: async (
    institutionId: string,
    productId?: string,
    role?: string,
    productRoles?: Array<ProductRole>
  ): Promise<Array<InstitutionUserResource>> => {
    const result = await apiClient.getInstitutionUsersUsingGET({
      institutionId,
      role,
      productId,
      productRoles: productRoles?.map((r) => r.productRole).join(','),
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

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

  suspendPartyRelation: async (relationshipId: string): Promise<void> => {
    const result = await apiClient.suspendRelationshipUsingPOST({
      relationshipId,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  activatePartyRelation: async (relationshipId: string): Promise<void> => {
    const result = await apiClient.activateRelationshipUsingPOST({
      relationshipId,
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
  ): Promise<Array<UserGroupPlainResource>> => {
    const result = await apiClient.getUserGroupsUsingGET({
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

  fetchUserGroups: async (
    institutionId: string,
    productId: string,
    userId: string
  ): Promise<Array<UserGroupPlainResource>> => {
    const result = await apiClient.getUserGroupsUsingGET({
      institutionId,
      productId,
      userId,
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

  savePartyGroup: async (group: PartyGroupOnCreation): Promise<void> => {
    const result = await apiClient.createUserGroupUsingPOST({
      body: {
        description: group.description,
        institutionId: group.institutionId,
        members: group.members.map((u) => u.id),
        name: group.name,
        productId: group.productId,
      },
    });
    return extractResponse(result, 201, onRedirectToLogin);
  },
};
