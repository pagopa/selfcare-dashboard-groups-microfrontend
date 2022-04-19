import { screen, render, waitFor } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from '../../redux/store';
import { DashboardMicrofrontendPageProps } from '../../microcomponents/dashboard-routes-utils';
import App from '../../microcomponents/mock_dashboard/App';
import { DASHBOARD_GROUPS_ROUTES } from '../../routes';
import { ENV } from '../../utils/env';
import RoutingGroups from '../RoutingGroups';
import '../../locale';

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

  render(
    <Router history={history}>
      <Provider store={store}>
        <Switch>
          <Route path={ENV.ROUTES.OVERVIEW} exact={false}>
            <App AppRouting={appRouting} store={store} />
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
  const { history } = renderComponent();
  await toVerifyPath('/dashboard/onboarded/groups/groupId1', 'Dettaglio Gruppo', history);
});
