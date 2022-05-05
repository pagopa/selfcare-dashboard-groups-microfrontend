import { Grid } from '@mui/material';
import { TitleBox } from '@pagopa/selfcare-common-frontend';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import { Party } from '../../model/Party';
import { PartyGroupOnCreation } from '../../model/PartyGroup';
import { Product, ProductsMap } from '../../model/Product';
import { DASHBOARD_GROUPS_ROUTES } from '../../routes';
import GroupForm from './components/GroupForm';

type Props = {
  party: Party;
  productsMap: ProductsMap;
  activeProducts: Array<Product>;
};

function AddGroupPage({ party, activeProducts, productsMap }: Props) {
  const history = useHistory();
  const { t } = useTranslation();
  const paths = [
    {
      description: t('dashboardGroupEdit.addGroupPage.groupPathDescription'),
      onClick: () =>
        history.push(
          resolvePathVariables(DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.MAIN.path, {
            partyId: party.partyId,
          })
        ),
    },
    {
      description: t('dashboardGroupEdit.addGroupPage.pathDescription'),
    },
  ];

  return (
    <Grid
      container
      alignItems={'center'}
      px={2}
      mt={10}
      sx={{ width: '985px', backgroundColor: 'transparent !important' }}
    >
      <Grid item xs={12} mb={3}>
        <ProductNavigationBar paths={paths} />
      </Grid>
      <Grid item xs={12} mb={9}>
        <TitleBox
          title={t('dashboardGroupEdit.addGroupPage.title')}
          subTitle={t('dashboardGroupEdit.addGroupPage.subTitle')}
        />
      </Grid>
      <Grid item xs={12}>
        <GroupForm
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
  );
}

export default AddGroupPage;
