import { Grid, Tab, Tabs } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import { usePermissions } from '@pagopa/selfcare-common-frontend/lib';
import TitleBox from '@pagopa/selfcare-common-frontend/lib/components/TitleBox';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { userSelectors } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import { Actions } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Party } from '../../model/Party';
import { Product, ProductsMap } from '../../model/Product';
import { useAppSelector } from '../../redux/hooks';
import { ENV } from '../../utils/env';
import AddGroupButton from './components/AddGroupButton';
import GroupsProductSection from './components/GroupsProductSection';
import NoGroups from './components/NoGroups';

interface Props {
  party: Party;
  activeProducts: Array<Product>;
  productsMap: ProductsMap;
}

function GroupsPage({ party, activeProducts, productsMap }: Props) {
  const history = useHistory();
  const { getAllProductsWithPermission } = usePermissions();
  const canSeeGroups = getAllProductsWithPermission(Actions.ManageProductGroups).length > 0;

  const selectedProductSection =
    window.location.hash !== '' ? window.location.hash.substring(1) : undefined;
  const selectedProducts = activeProducts.filter(
    (p: Product) => !selectedProductSection || p.id === selectedProductSection
  );

  useEffect(() => {
    if (!canSeeGroups) {
      history.push(resolvePathVariables(ENV.ROUTES.OVERVIEW, { partyId: party.partyId }));
    }
  }, [party.partyId, canSeeGroups]);

  useEffect(() => trackEvent('GROUP_LIST', { party_id: party.partyId }), [party]);
  const { t } = useTranslation();

  const setSelectedProductSection = (productId?: string) =>
    // eslint-disable-next-line functional/immutable-data
    (window.location.hash = productId ?? '');

  const currentUser = useAppSelector(userSelectors.selectLoggedUser) as User;

  const isPnpg = !!activeProducts.find((p) => p.id.startsWith('prod-pn-pg'));
  const isPnpgTheOnlyProduct =
    !!activeProducts.find((p) => p.id.startsWith('prod-pn-pg')) && activeProducts.length === 1;

  const mappedProducts = (product: Product) => (
    <Grid key={product.id} item xs={12}>
      <GroupsProductSection
        currentUser={currentUser}
        party={party}
        product={product}
        selected={product.id === selectedProductSection}
        onFetchStatusUpdate={(loading, noData) => {
          setProductsFetchStatus((previousState) => ({
            ...previousState,
            [product.id]: { loading, noData },
          }));
        }}
        incrementalLoad={!selectedProductSection}
        isPnpgTheOnlyProduct={isPnpgTheOnlyProduct}
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
    <Grid
      container
      px={3}
      mt={3}
      sx={{ width: '100%', backgroundColor: 'transparent !important', alignItems: 'center' }}
    >
      <Grid item xs={9}>
        <TitleBox
          title={t('dashboardGroup.groupsPage.title')}
          variantTitle="h4"
          variantSubTitle="body1"
          mbTitle={mbTitle}
          subTitle={
            !isPnpg
              ? t('dashboardGroup.groupsPage.subTitle')
              : t('dashboardGroup.groupsPage.subTitlePnpg')
          }
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={3}
        sx={{
          display: 'flex',
          justifyContent: 'end',
          [theme.breakpoints.down('lg')]: {
            justifyContent: 'start',
            marginTop: 3,
          },
        }}
      >
        <AddGroupButton party={party} />
      </Grid>
      {productHavingGroups.length !== 0 && moreThanOneActiveProduct && (
        <Grid
          item
          xs={12}
          mt={5}
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: '#F5F6F7',
          }}
        >
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={selectedProductSection ?? 'all'}
            sx={{
              '& .MuiTab-root': {
                minWidth: 0,
                flex: '1 0 auto',
                maxWidth: 'none',
              },
            }}
          >
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
      )}
      <Grid item xs={12} sx={{ height: '100%' }}>
        <Grid
          container
          direction="row"
          alignItems={'center'}
          sx={{ backgroundColor: '#EEEEEE' }}
          px={isPnpgTheOnlyProduct ? 0 : 3}
          pb={isPnpgTheOnlyProduct ? 0 : 3}
          mt={productHavingGroups.length > 1 ? 0 : 5}
        >
          {productHavingGroups.length !== 0 ? productsSection : <></>}
          {!isLoading && productHavingGroups.length === 0 && (
            <NoGroups party={party} isPnpg={isPnpg} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GroupsPage;
