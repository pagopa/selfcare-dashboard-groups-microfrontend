import { Switch } from 'react-router';
import { useEffect, useState } from 'react';
import { DASHBOARD_GROUPS_ROUTES } from '../routes';
import {
  buildRoutes,
  DashboardMicrofrontendPageProps,
} from '../microcomponents/dashboard-routes-utils';
import { ENV } from '../utils/env';
import { configureI18n } from '../locale/locale-utils';
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
}: DashboardMicrofrontendPageProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      configureI18n(i18n);
      setLoaded(true);
    }
    // eslint-disable-next-line functional/immutable-data
    ENV.STORE = store;
  }, []);

  return (
    <RemotePage store={store} history={history} i18n={i18n} theme={theme}>
      <Switch>
        {buildRoutes(
          loaded,
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
};

export default RoutingGroups;
