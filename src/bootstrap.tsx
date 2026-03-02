import { Route } from 'react-router-dom';
import { DASHBOARD_GROUPS_ROUTES } from './routes';
import RoutingGroups from './remotes/RoutingGroups';
import { ENV } from './utils/env';
import { DashboardMicrofrontendPageProps } from './microcomponents/dashboard-routes-utils';
import { IS_DEVELOP } from './utils/constants';

if (IS_DEVELOP) {
  // eslint-disable-next-line functional/immutable-data
  (window as any).AppRouting = (props: DashboardMicrofrontendPageProps) => [
    <Route key="RoutingGroups" path={ENV.ROUTES.GROUPS} exact={false}>
      <RoutingGroups {...props} />
    </Route>,
  ];
  // eslint-disable-next-line functional/immutable-data
  (window as any).appRoutes = DASHBOARD_GROUPS_ROUTES;
  void import('./microcomponents/mock_dashboard/indexMicrofrontend');
}
