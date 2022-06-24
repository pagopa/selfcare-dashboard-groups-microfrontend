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

  const paths = [
    {
      icon: SupervisedUserCircle,
      description: t('dashboardGroupEdit.addGroupPage.groupPathDescription'),
      onClick: goBack,
    },
    {
      description: t('dashboardGroupEdit.addGroupPage.pathDescription'),
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <Grid
        container
        alignItems={'center'}
        px={3}
        mt={10}
        sx={{ width: '100%', backgroundColor: 'transparent !important' }}
      >
        <Grid container item xs={9}>
          <Grid item xs={12} mb={3}>
            <ProductNavigationBar
              paths={paths}
              showBackComponent={true}
              backLinkTextDecoration="none"
              backLinkFontWeight="700"
              backLinkFontSize="16px"
              goBack={goBack}
            />
          </Grid>
          <Grid item xs={12} mb={9}>
            <TitleBox
              variantTitle="h4"
              variantSubTitle="body1"
              title={t('dashboardGroupEdit.addGroupPage.title')}
              subTitle={t('dashboardGroupEdit.addGroupPage.subTitle')}
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
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddGroupPage;
