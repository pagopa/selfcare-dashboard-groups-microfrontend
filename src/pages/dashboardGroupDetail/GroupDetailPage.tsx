import { Grid, Typography, Chip, Link, Box } from '@mui/material';
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
      trackEvent('OPEN_USER_DETAIL', { group_id: partyGroup.id });
    }
  }, [partyGroup]);

  useEffect(() => {
    setPartyGroupState(partyGroup);
  }, [partyGroup, partyGroup.modifiedAt]);

  const goBack = () =>
    history.push(
      resolvePathVariables(DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.MAIN.path, {
        institutionId: party.institutionId,
      })
    );

  const paths = [
    {
      description: t('groupDetailPage.path.groupDescription'),
      onClick: goBack,
    },
    {
      description: `${partyGroupState.name}`,
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
      px={2}
      mt={10}
      sx={{ width: '985px', backgroundColor: 'transparent !important' }}
    >
      <Grid item xs={12} mb={3}>
        <ProductNavigationBar paths={paths} />
      </Grid>
      <Grid container item mb={3}>
        <Grid item xs={6}>
          <Box display="flex">
            <Box>
              <Typography variant="h1">{t('groupDetailPage.title')}</Typography>
            </Box>
            <Box>
              {isSuspended && (
                <Chip
                  label="Sospeso"
                  variant="outlined"
                  sx={{
                    fontWeight: '600',
                    fontSize: '14px',
                    background: '#E0E0E0',
                    border: 'none',
                    borderRadius: '16px',
                    width: '76px',
                    height: '24px',
                    marginTop: '23px',
                    marginLeft: '20px',
                  }}
                />
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} display="flex" alignItems="center" justifyContent="flex-end">
          <Link
            sx={{
              fontWeight: 600,
              cursor: 'pointer',
            }}
            onClick={goBack}
          >
            {t('groupDetailPage.backActionLabel')}
          </Link>
        </Grid>
      </Grid>
      <Grid container item xs={11}>
        <Grid item mb={3} width="100%">
          <GroupDetail
            partyGroup={partyGroupState}
            productsMap={productsMap}
            isSuspended={isSuspended}
            product={product}
            party={party}
            productRolesLists={productsRolesMap[product.id]}
            canEdit={canEdit}
          />
        </Grid>
        <Grid item mb={3} mt={15} width="100%">
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
    </Grid>
  );
}

export default withGroupDetail(GroupDetailPage);
