import { Grid } from '@mui/material';
import { TitleBox } from '@pagopa/selfcare-common-frontend';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SupervisedUserCircle } from '@mui/icons-material';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import { Party } from '../../model/Party';
import { PartyGroupOnCreation } from '../../model/PartyGroup';
import { Product, ProductsMap } from '../../model/Product';
import { DASHBOARD_GROUPS_ROUTES } from '../../routes';
import { ProductsRolesMap } from '../../model/ProductRole';
import GroupForm from './components/GroupForm';

type Props = {
  party: Party;
  productsMap: ProductsMap;
  activeProducts: Array<Product>;
  productsRolesMap: ProductsRolesMap;
};

function AddGroupPage({ party, activeProducts, productsMap, productsRolesMap }: Props) {
  const history = useHistory();
  const { t } = useTranslation();

  const goBack = () =>
    history.push(
      resolvePathVariables(DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.MAIN.path, {
        partyId: party.partyId,
      })
    );

  const isPnpg = !!activeProducts.find((p) => p.id === 'prod-pn-pg');

  const paths = [
    {
      icon: isPnpg ? undefined : SupervisedUserCircle,
      description: t('dashboardGroupEdit.addGroupPage.groupPathDescription'),
      onClick: goBack,
    },
    {
      description: t('dashboardGroupEdit.addGroupPage.pathDescription'),
    },
  ];

  return (
    <Grid
      xs={12}
      lg={8}
      container
      alignItems={'center'}
      px={3}
      mt={4}
      sx={{ width: '100%', backgroundColor: 'transparent !important' }}
    >
      <Grid container item>
        <Grid item xs={12} mb={3}>
          <ProductNavigationBar paths={paths} showBackComponent={true} goBack={goBack} />
        </Grid>
        <Grid item xs={12} mb={5}>
          <TitleBox
            mbTitle={1}
            variantTitle="h4"
            variantSubTitle="body1"
            title={t('dashboardGroupEdit.addGroupPage.title')}
            subTitle={
              isPnpg
                ? t('dashboardGroupEdit.addGroupPage.pnpgSubTitle')
                : t('dashboardGroupEdit.addGroupPage.subTitle')
            }
          />
        </Grid>
        <Grid item xs={12}>
          <GroupForm
            productsRolesMap={productsRolesMap}
            party={party}
            products={activeProducts}
            productsMap={productsMap}
            initialFormData={
              {
                name: '',
                description: '',
                members: [],
                partyId: party.partyId,
                productId: '',
              } as PartyGroupOnCreation
            }
            isClone={false}
            goBack={goBack}
            isAddPage={true}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AddGroupPage;
