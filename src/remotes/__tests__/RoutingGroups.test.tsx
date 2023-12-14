import { screen, render, waitFor, fireEvent } from '@testing-library/react';
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
  expect(screen.queryByPlaceholderText(title)).toBeNull();
  history.push(path);
  await waitFor(() => screen.queryByPlaceholderText(title));
};

test('test routing group detail', async () => {
  const { history } = renderComponent();
  await toVerifyPath('/dashboard/onboarded/groups/groupId1', 'Dettaglio Gruppo', history);
});

test('test routing group list', async () => {
  const { history } = renderComponent();
  await toVerifyPath('/dashboard/onboarded/groups', 'Gruppi', history);
});

test('test routing modify group from group detail', async () => {
  const { history } = renderComponent();
  await toVerifyPath('/dashboard/onboarded/groups/groupId1', 'Dettaglio Gruppo', history);
  const modifyButton = screen.getByText('Modifica');
  fireEvent.click(modifyButton);
  await toVerifyPath('/dashboard/onboarded/groups/groupId1/modify', 'Modifica gruppo', history);
});

test('test routing clone group from group detail', async () => {
  const { history } = renderComponent();
  await toVerifyPath('/dashboard/onboarded/groups/groupId1', 'Dettaglio Gruppo', history);
  const cloneButton = screen.getByText('Duplica');
  await waitFor(() => fireEvent.click(cloneButton));
  await toVerifyPath('/dashboard/onboarded/groups/groupId1/clone', 'Duplica gruppo', history);
});

test('suspend group button should be visible and open suspend modal', async () => {
  const { history } = renderComponent();
  await toVerifyPath('/dashboard/onboarded/groups/groupId1', 'Dettaglio Gruppo', history);
  const suspendButton = screen.getByText('Sospendi');
  await waitFor(() => fireEvent.click(suspendButton));
  const suspendModalTitle = await screen.findByText('Sospendi gruppo');
  expect(suspendModalTitle).toBeInTheDocument();
  const closeModalButton = await screen.findByText('Annulla');
  await waitFor(() => fireEvent.click(closeModalButton));
});

test('delete group button should be visible and open delete modal', async () => {
  const { history } = renderComponent();
  await toVerifyPath('/dashboard/onboarded/groups/groupId1', 'Dettaglio Gruppo', history);
  const deleteButton = screen.getByText('Elimina');
  await waitFor(() => fireEvent.click(deleteButton));
  const deleteModalTitle = await screen.findByText('Elimina gruppo');
  expect(deleteModalTitle).toBeInTheDocument();
  const closeModalButton = await screen.findByText('Annulla');
  await waitFor(() => fireEvent.click(closeModalButton));
});

test('test routing add new group', async () => {
  const { history } = renderComponent();
  await toVerifyPath('/dashboard/onboarded/groups/add', 'Crea un nuovo gruppo', history);
});

test('test routing modify group', async () => {
  const { history } = renderComponent();
  await toVerifyPath('dashboard/onboarded/groups/groupId1/edit', 'Modifica gruppo', history);
});

test('test routing clone group', async () => {
  const { history } = renderComponent();
  await toVerifyPath('/dashboard/onboarded/groups/groupId1/clone', 'Duplica gruppo', history);
});
