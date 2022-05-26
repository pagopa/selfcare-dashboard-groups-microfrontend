import { Grid, Typography, Chip, Link, Box } from '@mui/material';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { userSelectors } from '@pagopa/selfcare-common-frontend/redux/slices/userSlice';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import SupervisedUserCircle from '@mui/icons-material/SupervisedUserCircle';
import ArrowBack from '@mui/icons-material/ArrowBack';
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
      description: 'Anagrafe',
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
      <Grid item xs={12} mb={3} display="flex">
        <Box mr={3}>
          <Link
            sx={{
              cursor: 'pointer',
              ml: 1,
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '18px',
              display: 'flex',
            }}
            onClick={goBack}
          >
            <ArrowBack color="primary" fontSize="small" sx={{ marginTop: '3px', mr: 1 }} />
            {t('groupDetailPage.backActionLabel')}
          </Link>
        </Box>
        <Box mr={2}>
          <SupervisedUserCircle />
        </Box>
        <Box>
          <ProductNavigationBar paths={paths} />
        </Box>
      </Grid>
      <Grid container item mb={3}>
        <Grid item xs={6}>
          <Box display="flex">
            <Box>
              <Typography variant="h1">{t('groupDetailPage.title')}</Typography>
            </Box>
            <Box>
              {!isSuspended && (
                <Chip
                  label={t('groupDetail.status')}
                  aria-label="Suspended"
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
      </Grid>
      <Grid container item xs={12} sx={{ backgroundColor: '#FFFFFF', padding: '24px' }}>
        <Grid item mb={3} width="100%">
          <GroupDetail
            partyGroup={partyGroupState}
            productsMap={productsMap}
            isSuspended={isSuspended}
            product={product}
            party={party}
            productRolesLists={productsRolesMap[product.id]}
            canEdit={canEdit}
            onGroupStatusUpdate={onGroupStatusUpdate}
          />
        </Grid>
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
  );
}

export default withGroupDetail(GroupDetailPage);
