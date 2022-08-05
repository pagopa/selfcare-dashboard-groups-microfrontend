import { Grid, Tab, Tabs } from '@mui/material';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { useEffect, useMemo, useState } from 'react';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { userSelectors } from '@pagopa/selfcare-common-frontend/redux/slices/userSlice';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { Product, ProductsMap } from '../../model/Product';
import { Party } from '../../model/Party';
import { useAppSelector } from '../../redux/hooks';
import { ENV } from '../../utils/env';
import AddGroupButton from './components/AddGroupButton';
import NoGroups from './components/NoGroups';
import GroupsProductSection from './components/GroupsProductSection';

interface Props {
  party: Party;
  activeProducts: Array<Product>;
  productsMap: ProductsMap;
}

function GroupsPage({ party, activeProducts, productsMap }: Props) {
  const history = useHistory();

  const selectedProductSection =
    window.location.hash !== '' ? window.location.hash.substring(1) : undefined;
  const selectedProducts = activeProducts.filter(
    (p: Product) => !selectedProductSection || p.id === selectedProductSection
  );

  useEffect(() => {
    if (party.userRole !== 'ADMIN') {
      history.push(resolvePathVariables(ENV.ROUTES.OVERVIEW, { partyId: party.partyId }));
    }
  }, [party.partyId]);

  useEffect(() => trackEvent('GROUP_LIST', { party_id: party.partyId }), [party]);
  const { t } = useTranslation();

  const setSelectedProductSection = (productId?: string) =>
    // eslint-disable-next-line functional/immutable-data
    (window.location.hash = productId ?? '');

  const currentUser = useAppSelector(userSelectors.selectLoggedUser) as User;

  const mappedProducts = (product: Product) => (
    <Grid key={product.id} item xs={12}>
      <GroupsProductSection
        currentUser={currentUser}
        party={party}
        product={product}
        onFetchStatusUpdate={(loading, noData) => {
          setProductsFetchStatus((previousState) => ({
            ...previousState,
            [product.id]: { loading, noData },
          }));
        }}
        incrementalLoad={!selectedProductSection}
      />
    </Grid>
  );

  const productsSection = useMemo(
    () => selectedProducts.map(mappedProducts),
    [selectedProductSection]
  );

  const [productsFetchStatus, setProductsFetchStatus] = useState<
    Record<string, { loading: boolean; noData: boolean }>
  >(() =>
    Object.fromEntries(activeProducts.map((p) => [[p.id], { loading: true, noData: false }]))
  );

  const productHavingGroups = useMemo(
    () =>
      Object.entries(productsFetchStatus)
        .filter(([_productId, { noData }]) => !noData)
        .map(([productId]) => productsMap[productId]),
    [productsFetchStatus]
  );

  const isLoading: boolean = useMemo(
    () => !!Object.entries(productsFetchStatus).find(([_productId, { loading }]) => loading),
    [productsFetchStatus]
  );

  const mbTitle = 2;

  const moreThanOneActiveProduct = activeProducts.length > 1;

  return (
    <Grid container px={3} mt={3} sx={{ width: '100%', backgroundColor: 'transparent !important' }}>
      <Grid container item display="flex" justifyContent="space-between">
        <Grid item xs={9}>
          <TitleBox
            title={t('dashboardGroup.groupsPage.title')}
            variantTitle="h4"
            variantSubTitle="body1"
            mbTitle={mbTitle}
            subTitle={t('dashboardGroup.groupsPage.subTitle')}
          />
        </Grid>
        <Grid item xs={3} display="flex" alignItems="center" justifyContent="end">
          <AddGroupButton party={party} />
        </Grid>
      </Grid>
      {productHavingGroups.length !== 0 ||
        (moreThanOneActiveProduct && (
          <Grid
            item
            xs={12}
            mt={5}
            sx={{
              borderBottom: 1,
              borderBottomWidth: '2px',
              borderColor: 'divider',
              position: 'sticky',
              top: 0,
              zIndex: 100,
              backgroundColor: '#F5F6F7',
            }}
          >
            <Tabs variant="fullWidth" scrollButtons="auto" value={selectedProductSection ?? 'all'}>
              <Tab
                label={t('dashboardGroup.groupsPage.tabAll')}
                value="all"
                onClick={() => setSelectedProductSection(undefined)}
              />
              {activeProducts.map((p) => (
                <Tab
                  key={p.id}
                  label={p.title}
                  value={p.id}
                  onClick={() => setSelectedProductSection(p.id)}
                />
              ))}
            </Tabs>
          </Grid>
        ))}
      <Grid item xs={12} sx={{ height: '100%' }}>
        <Grid
          container
          direction="row"
          alignItems={'center'}
          sx={{ backgroundColor: 'background.default' }}
          px={3}
          pb={3}
          mt={productHavingGroups.length > 1 ? 0 : 5}
        >
          {productHavingGroups.length !== 0 ? productsSection : <></>}
          {!isLoading && productHavingGroups.length === 0 && <NoGroups party={party} />}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GroupsPage;
