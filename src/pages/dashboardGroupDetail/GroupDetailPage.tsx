import { Grid, Typography, Chip, Box } from '@mui/material';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { userSelectors } from '@pagopa/selfcare-common-frontend/redux/slices/userSlice';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import withGroupDetail, { withGroupDetailProps } from '../../decorators/withGroupDetail';
import { DASHBOARD_GROUPS_ROUTES } from '../../routes';
import { PartyGroupDetail, PartyGroupStatus } from '../../model/PartyGroup';
import { ProductsRolesMap } from '../../model/ProductRole';
import GroupActions from './components/GroupActions';
import GroupDetail from './components/GroupDetail';
import MembersGroup from './components/MembersGroup';

type Props = withGroupDetailProps & {
  fetchPartyGroup: () => void;
  productsRolesMap: ProductsRolesMap;
};

function GroupDetailPage({ partyGroup, party, productsMap, productsRolesMap }: Props) {
  const history = useHistory();

  const [partyGroupState, setPartyGroupState] = React.useState<PartyGroupDetail>(partyGroup);
  const loggedUser = useSelector(userSelectors.selectLoggedUser) as User;

  const { t } = useTranslation();

  const nextGroupStatus: PartyGroupStatus | undefined =
    partyGroupState.status === 'ACTIVE'
      ? 'SUSPENDED'
      : partyGroupState.status === 'SUSPENDED'
      ? 'ACTIVE'
      : undefined;

  const product = productsMap[partyGroupState.productId];
  const canEdit = product.userRole === 'ADMIN' && product.status === 'ACTIVE';

  const isSuspended = partyGroupState.status === 'SUSPENDED';

  useEffect(() => {
    if (partyGroup) {
      trackEvent('OPEN_GROUP_DETAIL', { group_id: partyGroup.id });
    }
  }, [partyGroup]);

  useEffect(() => {
    setPartyGroupState(partyGroup);
  }, [partyGroup]);

  const goBack = () =>
    history.push(
      resolvePathVariables(DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.MAIN.path, {
        partyId: party.partyId,
      })
    );

  const paths = [
    {
      description: t('groupDetailPage.path.groupDescription'),
      onClick: goBack,
    },
    {
      description: t('groupDetailPage.path.selectedGroupDescription'),
    },
  ];

  const onGroupStatusUpdate = (nextGroupStatus: PartyGroupStatus) => {
    setPartyGroupState({
      ...partyGroupState,
      status: nextGroupStatus,
      modifiedAt: new Date(),
      modifiedBy: { name: loggedUser.name, surname: loggedUser.surname, id: loggedUser.uid },
    });
  };

  return (
    <Grid
      container
      alignItems={'center'}
      px={3}
      mt={10}
      sx={{ width: '100%', backgroundColor: 'transparent !important' }}
    >
      <Grid item xs={12} mb={3} display="flex">
        <Box>
          <ProductNavigationBar paths={paths} />
        </Box>
      </Grid>
      <Grid container item mb={3} display="flex" justifyContent="space-between">
        <Grid item xs={4}>
          <Box display="flex">
            <Box>
              <Typography variant="h2">{t('groupDetailPage.title')}</Typography>
            </Box>
            <Box display="flex" alignItems="center" ml={2}>
              {isSuspended && (
                <Chip
                  label={t('groupDetail.status')}
                  aria-label="Suspended"
                  variant="outlined"
                  sx={{
                    fontWeight: '600',
                    fontSize: '14px',
                    background: '#FFD25E',
                    border: 'none',
                    borderRadius: '16px',
                    width: '76px',
                    height: '24px',
                  }}
                />
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={7} display="flex" alignItems="center" justifyContent="end">
          <GroupActions
            partyGroup={partyGroupState}
            isSuspended={isSuspended}
            goBack={goBack}
            party={party}
            product={product}
            productsMap={productsMap}
            nextGroupStatus={nextGroupStatus}
            onGroupStatusUpdate={onGroupStatusUpdate}
            canEdit={canEdit}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} sx={{ backgroundColor: '#FFFFFF', padding: '24px' }}>
        <Grid item mb={3} width="100%">
          <GroupDetail
            partyGroup={partyGroupState}
            productsMap={productsMap}
            isSuspended={isSuspended}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12} my={3}>
          <Typography variant="h4">{t('groupDetailPage.usersTitle')}</Typography>
        </Grid>

        <Grid item xs={12}>
          <MembersGroup
            partyGroup={partyGroupState}
            party={party}
            product={product}
            isSuspended={isSuspended}
            productRolesLists={productsRolesMap[product.id]}
            canEdit={canEdit}
            onGroupStatusUpdate={onGroupStatusUpdate}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withGroupDetail(GroupDetailPage);
