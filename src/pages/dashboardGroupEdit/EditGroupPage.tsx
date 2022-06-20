import { Grid } from '@mui/material';
import { TitleBox } from '@pagopa/selfcare-common-frontend';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import withGroupDetail, { withGroupDetailProps } from '../../decorators/withGroupDetail';
import { PartyGroupOnEdit } from '../../model/PartyGroup';
import { Product } from '../../model/Product';
import { DASHBOARD_GROUPS_ROUTES } from '../../routes';
import GroupForm from './components/GroupForm';

type Props = {
  activeProducts: Array<Product>;
} & withGroupDetailProps;

function EditGroupPage({ party, activeProducts, productsMap, partyGroup }: Props) {
  const history = useHistory();
  const { t } = useTranslation();

  const goBack = () =>
    history.push(
      resolvePathVariables(DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.PARTY_GROUP_DETAIL.path, {
        partyId: party.partyId,
        groupId: partyGroup.id,
      })
    );

  const paths = [
    {
      description: t('dashboardGroupEdit.editGroupPage.groupPathDescription'),
      onClick: () =>
        history.push(
          resolvePathVariables(DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.MAIN.path, {
            partyId: party.partyId,
            groupId: partyGroup.id,
          })
        ),
    },
    {
      description: `${partyGroup.name}`,
      onClick: goBack,
    },
    {
      description: t('dashboardGroupEdit.editGroupPage.pathDescription'),
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
        <TitleBox title={t('dashboardGroupEdit.editGroupPage.title')} />
      </Grid>
      <Grid item xs={12}>
        <GroupForm
          party={party}
          products={activeProducts}
          productsMap={productsMap}
          initialFormData={
            {
              id: partyGroup.id,
              name: partyGroup.name,
              description: partyGroup.description,
              members: partyGroup.members,
              partyId: partyGroup.partyId,
              productId: partyGroup.productId,
            } as PartyGroupOnEdit
          }
          isClone={false}
        />
      </Grid>
    </Grid>
  );
}

export default withGroupDetail(EditGroupPage);
