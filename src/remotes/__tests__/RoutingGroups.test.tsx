import { screen, render, waitFor } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
// import { useTheme } from '@mui/material';
// import i18n from '@pagopa/selfcare-common-frontend/locale/locale-utils';
// import RoutingGroups from '../RoutingGroups';
import { createStore } from '../../redux/store';
import { DashboardMicrofrontendPageProps } from '../../microcomponents/dashboard-routes-utils';
// import { buildProductsMap } from '../../model/Product';
import App from '../../microcomponents/mock_dashboard/App';
import { DASHBOARD_GROUPS_ROUTES } from '../../routes';
import { ENV } from '../../utils/env';
import RoutingGroups from '../RoutingGroups';

// import { mockedPartyProducts } from './../../microcomponents/mock_dashboard/data/product';

// const store = createStore();
// const history = createMemoryHistory();

// const withProductRolesMap = jest.mock(
//   '@pagopa/selfcare-common-frontend/decorators/withProductRolesMap'
// );

// const props: DashboardMicrofrontendPageProps = {
//   party: {
//     fiscalCode: 'Bari',
//     description: 'Comune di Bari',
//     urlLogo: 'image',
//     status: 'PENDING',
//     institutionId: '1',
//     digitalAddress: '',
//     userRole: 'ADMIN',
//   },
//   products: mockedPartyProducts,
//   activeProducts: mockedPartyProducts,
//   productsMap: buildProductsMap(mockedPartyProducts),
//   history,
//   theme: useTheme(),
//   store,
//   i18n,
// };

jest.mock('../../services/groupsService');
jest.mock('@pagopa/selfcare-common-frontend/decorators/withLogin');

// eslint-disable-next-line functional/immutable-data
(window as any).appRoutes = DASHBOARD_GROUPS_ROUTES;

const renderComponent = (
  injectedStore?: ReturnType<typeof createStore>,
  injectedHistory?: ReturnType<typeof createMemoryHistory>
) => {
  const store = injectedStore ? injectedStore : createStore();
  const history = injectedHistory ? injectedHistory : createMemoryHistory();
  const appRouting = (props: DashboardMicrofrontendPageProps) => [
    <Route key="RoutingGroups" path={ENV.ROUTES.GROUPS} exact={false}>
      <RoutingGroups {...props} />
    </Route>,
  ];

  const Component = () => <App AppRouting={appRouting} store={store} />;

  render(
    <Router history={history}>
      <Provider store={store}>
        <Switch>
          <Route path={ENV.ROUTES.OVERVIEW} exact={false} component={Component} />
          <Route path="*" exact={false}>
            Root
          </Route>
        </Switch>
      </Provider>
    </Router>
  );
  return { store, history };
};

const toVerifyPath = async (path: string, title: string, history: History) => {
  expect(screen.queryByText(title)).toBeNull();
  history.push(path);
  await waitFor(() => screen.getByText(title));
};

test('test routing dashboardGroupsDetail', async () => {
  const history = createMemoryHistory();
  history.push('/dashboard/onboarded/groups/groupId1');
  renderComponent(undefined, history);
  await toVerifyPath('/dashboard/onboarded/groups/groupId1', 'Dettaglio Gruppo', history);
});
