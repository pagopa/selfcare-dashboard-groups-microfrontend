import { Grid } from '@mui/material';
import { TitleBox } from '@pagopa/selfcare-common-frontend';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SupervisedUserCircle } from '@mui/icons-material';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import withGroupDetail, { withGroupDetailProps } from '../../decorators/withGroupDetail';
import { PartyGroupOnEdit } from '../../model/PartyGroup';
import { Product } from '../../model/Product';
import { DASHBOARD_GROUPS_ROUTES } from '../../routes';
import { ProductsRolesMap } from '../../model/ProductRole';
import GroupForm from './components/GroupForm';

type Props = {
  activeProducts: Array<Product>;
  productsRolesMap: ProductsRolesMap;
} & withGroupDetailProps;

function CloneGroupPage({
  party,
  activeProducts,
  productsMap,
  partyGroup,
  productsRolesMap,
}: Props) {
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
      icon: SupervisedUserCircle,
      description: t('dashboardGroupEdit.cloneGroupPage.groupPathDescription'),
      onClick: () =>
        history.push(
          resolvePathVariables(DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.MAIN.path, {
            partyId: party.partyId,
            groupId: partyGroup.id,
          })
        ),
    },
    {
      description: t('dashboardGroupEdit.cloneGroupPage.pathDescription'),
    },
  ];

  return (
    <Grid
      container
      alignItems={'center'}
      px={3}
      mt={10}
      sx={{ width: '100%', backgroundColor: 'transparent !important' }}
    >
      <Grid container item xs={8}>
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
            title={t('dashboardGroupEdit.cloneGroupPage.title')}
            subTitle={t('dashboardGroupEdit.cloneGroupPage.subTitle')}
          />
        </Grid>
        <Grid item xs={12}>
          <GroupForm
            productsRolesMap={productsRolesMap}
            party={party}
            products={activeProducts}
            productsMap={productsMap}
            partyGroupCloneId={partyGroup.id}
            initialFormData={
              {
                id: '',
                name:
                  t('dashboardGroupEdit.cloneGroupPage.placeholderDuplicateName') + partyGroup.name,
                description: partyGroup.description,
                members: partyGroup.members,
                partyId: partyGroup.partyId,
                productId:
                  productsMap[partyGroup.productId]?.userRole === 'ADMIN'
                    ? partyGroup.productId
                    : undefined,
              } as PartyGroupOnEdit
            }
            isClone={true}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withGroupDetail(CloneGroupPage);
