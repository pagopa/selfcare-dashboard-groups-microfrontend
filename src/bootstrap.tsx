import { Route } from 'react-router-dom';
import { DASHBOARD_GROUPS_ROUTES } from './routes';
import RoutingGroups from './remotes/RoutingGroups';
import { ENV } from './utils/env';
import { DashboardMicrofrontendPageProps } from './microcomponents/dashboard-routes-utils';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line functional/immutable-data
  (window as any).AppRouting = (props: DashboardMicrofrontendPageProps) => [
    <Route key="RoutingGroups" path={ENV.ROUTES.GROUPS} exact={false}>
      <RoutingGroups {...props} />
    </Route>,
  ];
  // eslint-disable-next-line functional/immutable-data
  (window as any).appRoutes = DASHBOARD_GROUPS_ROUTES;
  require('./microcomponents/mock_dashboard/indexMicrofrontend');
}
