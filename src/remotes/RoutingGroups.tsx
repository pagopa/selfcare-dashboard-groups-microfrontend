import { Switch } from 'react-router';
import { CONFIG } from '@pagopa/selfcare-common-frontend/config/env';
import { DASHBOARD_GROUPS_ROUTES } from '../routes';
import {
  buildRoutes,
  DashboardMicrofrontendPageProps,
} from '../microcomponents/dashboard-routes-utils';
import RemotePage from './RemotePage';

const RoutingGroups = ({
  history,
  store,
  i18n,
  theme,
  party,
  products,
  activeProducts,
  productsMap,
  decorators,
}: DashboardMicrofrontendPageProps) => (
  <RemotePage store={store} history={history} i18n={i18n} theme={theme} CONFIG={CONFIG}>
    <Switch>
      {buildRoutes(
        party,
        products,
        activeProducts,
        productsMap,
        decorators,
        DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes
      )}
    </Switch>
  </RemotePage>
);

export default RoutingGroups;
