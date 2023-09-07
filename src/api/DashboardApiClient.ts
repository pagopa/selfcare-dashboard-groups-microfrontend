import { appStateActions } from '@pagopa/selfcare-common-frontend/redux/slices/appStateSlice';
import { buildFetchApi, extractResponse } from '@pagopa/selfcare-common-frontend/utils/api-utils';
import { PageRequest } from '@pagopa/selfcare-common-frontend/model/PageRequest';
import { ENV } from '../utils/env';
import { PartyGroupOnCreation, PartyGroupOnEdit } from '../model/PartyGroup';
import { ProductRole } from '../model/ProductRole';
import { createClient, WithDefaultsT } from './generated/b4f-dashboard/client';
import { ProductUserResource } from './generated/b4f-dashboard/ProductUserResource';
import { UserGroupPlainResource } from './generated/b4f-dashboard/UserGroupPlainResource';
import { UserGroupResource } from './generated/b4f-dashboard/UserGroupResource';
import { UserGroupIdResource } from './generated/b4f-dashboard/UserGroupIdResource';
import { PageOfUserGroupPlainResource } from './generated/b4f-dashboard/PageOfUserGroupPlainResource';

const withBearerAndInstitutionId: WithDefaultsT<'bearerAuth'> =
  (wrappedOperation) => (params: any) => {
    const token =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF82ZDplNTphNDo4NToyYjplMDpjYjplYToyZDo5Yzo1MjoxMjpmZTphNTpmMjo2MCJ9.eyJlbWFpbCI6ImZ1cmlvdml0YWxlQG1hcnRpbm8uaXQiLCJmYW1pbHlfbmFtZSI6IlNhcnRvcmkiLCJmaXNjYWxfbnVtYmVyIjoiU1JUTkxNMDlUMDZHNjM1UyIsIm5hbWUiOiJBbnNlbG1vIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6IjUwOTZlNGM2LTI1YTEtNDVkNS05YmRmLTJmYjk3NGE3YzFjOCIsImxldmVsIjoiTDIiLCJpYXQiOjE2OTQwODkxMTMsImV4cCI6MTY5NDEyMTUxMywiYXVkIjoiYXBpLmRldi5zZWxmY2FyZS5wYWdvcGEuaXQiLCJpc3MiOiJTUElEIiwianRpIjoiXzhiODczYWUyM2RjN2E1N2MyNmRkIn0.I8a1NAWpnw6LyYWw27hqmg5iH2uSya1TXfe3pcESfSKgcpFs3-aQXPXxWLvspcSqtz4vprSsBg7RMep_VIDqBA-C46Vqz7ieM5f8ee1bYeusvAMxVf5XCnVN3MWTkoBB5-hVTLvcdmXrxRIwvcVISlEoUYUyce38kRIo-AX-zBGo6QubaNOteSvhLz-MgRxABZoIvWgOPAXSTpLT7x-RpYbVRVMBjm_uYmMfw8akMqqiFE3vHaqYcpaUhKQzfeRhu9geLDuGvVjcavESLvsLh7PRSMyb_hyFwdm9fOKPCfPfPv5yl8zbBi17yjhzAxZcC83tao4RXL5MQHFe_JNymA';
    // const token = storageTokenOps.read();
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
