import { Redirect, useParams } from 'react-router';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { ENV } from './utils/env';
import AddGroupPage from './pages/dashboardGroupEdit/AddGroupPage';
import EditGroupPage from './pages/dashboardGroupEdit/EditGroupPage';
import CloneGroupPage from './pages/dashboardGroupEdit/CloneGroupPage';
import GroupsPage from './pages/dashboardGroups/GroupsPage';
import GroupsDetailPage from './pages/dashboardGroupDetail/GroupDetailPage';

export const BASE_ROUTE = ENV.PUBLIC_URL;

export type RoutesObject = { [key: string]: RouteConfig };

export type RouteConfig = {
  path: string;
  exact?: boolean;
  subRoutes?: RoutesObject;
  component?: React.ComponentType<any>;
  withProductRolesMap?: boolean;
  withSelectedProduct?: boolean;
  withSelectedProductRoles?: boolean;
};

const buildRedirectToBasePath = (basePath: string): RoutesObject => ({
  SUBPATH_DEFAULT: {
    path: `${basePath}/*`,
    component: (): React.FunctionComponentElement<any> => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const pathVariables: { [key: string]: string } = useParams();
      const effectiveBasePath = resolvePathVariables(basePath, pathVariables);
      return <Redirect to={`${effectiveBasePath || basePath}`} />;
    },
  },
});

export const DASHBOARD_GROUPS_ROUTES = {
  PARTY_GROUPS: {
    path: ENV.ROUTES.GROUPS,
    exact: false,
    subRoutes: {
      MAIN: {
        path: ENV.ROUTES.GROUPS,
        exact: true,
        component: GroupsPage,
      },
      PARTY_GROUP_ADD: {
        path: `${ENV.ROUTES.GROUPS}/add`,
        exact: true,
        component: AddGroupPage,
        withProductRolesMap: true,
      },
      PARTY_GROUP_DETAIL: {
        path: ENV.ROUTES.GROUP_DETAIL,
        exact: true,
        component: GroupsDetailPage,
        withProductRolesMap: true,
      },
      PARTY_GROUP_EDIT: {
        path: `${ENV.ROUTES.GROUPS}/:groupId/edit`,
        exact: true,
        component: EditGroupPage,
        withProductRolesMap: true,
      },
      PARTY_GROUP_CLONE: {
        path: `${ENV.ROUTES.GROUPS}/:groupId/clone`,
        exact: true,
        component: CloneGroupPage,
        withProductRolesMap: true,
      },
    },
    ...buildRedirectToBasePath(ENV.ROUTES.GROUPS),
  },
};
