import { Switch, Router } from 'react-router';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import { useEffect, useState } from 'react';
import { DASHBOARD_GROUPS_ROUTES } from '../routes';
import {
  buildRoutes,
  DashboardMicrofrontendPageProps,
} from '../microcomponents/dashboard-routes-utils';
import { ENV } from '../utils/env';
import it from '../locale/it';

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
  // eslint-disable-next-line functional/immutable-data
  ENV.STORE = store;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      i18n.addResourceBundle('it', 'translation', it, true);
      setLoaded(true);
    }
  }, []);

  return (
    <Provider store={store}>
      <Router history={history}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
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
          </ThemeProvider>
        </I18nextProvider>
      </Router>
    </Provider>
  );
};

export default RoutingGroups;
