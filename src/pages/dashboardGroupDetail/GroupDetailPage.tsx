import AddIcon from '@mui/icons-material/Add';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { usePermissions } from '@pagopa/selfcare-common-frontend/lib';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { userSelectors } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import { Actions } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import withGroupDetail, { withGroupDetailProps } from '../../decorators/withGroupDetail';
import { useIsMobile } from '../../hooks/useIsMobile';
import { PartyGroupDetail, PartyGroupStatus } from '../../model/PartyGroup';
import { ProductsRolesMap } from '../../model/ProductRole';
import { DASHBOARD_GROUPS_ROUTES } from '../../routes';
import { TableChip } from '../../utils/helpers';
import GroupActions from './components/GroupActions';
import GroupDetail from './components/GroupDetail';
import MembersGroup from './components/MembersGroup';
type Props = withGroupDetailProps & {
  productsRolesMap: ProductsRolesMap;
};

function GroupDetailPage({ partyGroup, party, productsMap, productsRolesMap }: Props) {
  const history = useHistory();
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile('lg');
  const loggedUser = useSelector(userSelectors.selectLoggedUser) as User;
  const { hasPermission } = usePermissions();

  const [partyGroupState, setPartyGroupState] = React.useState<PartyGroupDetail>(partyGroup);

  useEffect(() => {
    if (partyGroup) {
      trackEvent('OPEN_GROUP_DETAIL', { party_id: party.partyId });
    }
  }, [partyGroup]);

  useEffect(() => {
    setPartyGroupState(partyGroup);
  }, [partyGroup]);

  const goBack = () => history.goBack();

  const goEdit = () =>
    history.push(
      resolvePathVariables(DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.PARTY_GROUP_EDIT.path, {
        partyId: partyGroup.partyId,
        groupId: partyGroup.id,
      })
    );

  const nextGroupStatus: PartyGroupStatus | undefined =
    partyGroupState.status === 'ACTIVE'
      ? 'SUSPENDED'
      : partyGroupState.status === 'SUSPENDED'
        ? 'ACTIVE'
        : undefined;

  const product = productsMap[partyGroupState.productId];
  const canEdit = !!party.products.find(
    (pp) =>
      pp.productId === product.id &&
      hasPermission(pp.productId, Actions.ManageProductGroups) &&
      pp.productOnBoardingStatus === 'ACTIVE'
  );

  const isSuspended = partyGroupState.status === 'SUSPENDED';

  const paths = [
    {
      description: t('groupDetailPage.path.groupDescription'),
      onClick: () =>
        history.push(
          resolvePathVariables(DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.MAIN.path, {
            partyId: party.partyId,
          })
        ),
    },
    {
      description: `${partyGroup.name}`,
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

  const goEditCustom = () => {
    history.push(
      resolvePathVariables(
        DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.PARTY_GROUP_EDIT.path + '#users',
        {
          partyId: partyGroup.partyId,
          groupId: partyGroup.id,
        }
      )
    );
  };

  return (
    <Grid
      container
      alignItems={'center'}
      px={3}
      mt={4}
      sx={{ width: '100%', backgroundColor: 'transparent !important' }}
    >
      <Grid item xs={12} mb={3} display="flex">
        <Box>
          <ProductNavigationBar
            paths={paths}
            showBackComponent={true}
            goBack={goBack}
            backLabel={paths[0].description}
          />
        </Box>
      </Grid>
      <Grid container item mb={3} display="flex" justifyContent="space-between">
        <Grid item xs={12} lg={7}>
          <Box
            sx={{
              display: 'flex',
              [theme.breakpoints.down('lg')]: {
                flexDirection: 'column',
              },
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  display: 'inline-block',
                  maxWidth: '35ch',
                  wordWrap: 'break-word',
                }}
              >
                {partyGroup.name}
              </Typography>
            </Box>
            {isSuspended && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  [theme.breakpoints.down('lg')]: {
                    marginLeft: 0,
                    marginTop: '12px',
                  },
                }}
                display="flex"
                alignItems="center"
                ml={2}
              >
                <TableChip text={t('groupDetail.status')} />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={5}
          display="flex"
          alignItems="center"
          justifyContent={isMobile ? 'start' : 'end'}
          mt={isMobile ? 2 : 0}
          minWidth={'250px'}
        >
          <GroupActions
            partyGroup={partyGroupState}
            isSuspended={isSuspended}
            party={party}
            product={product}
            productsMap={productsMap}
            nextGroupStatus={nextGroupStatus}
            onGroupStatusUpdate={onGroupStatusUpdate}
            canEdit={canEdit}
            goEdit={goEdit}
          />
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sx={{ backgroundColor: 'background.paper', padding: '24px', borderRadius: '4px' }}
      >
        <Grid item width="100%">
          <GroupDetail
            partyGroup={partyGroupState}
            productsMap={productsMap}
            isSuspended={isSuspended}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item container display="flex" alignItems="center">
          <Grid item xs={8} mt={5}>
            <Typography sx={{ fontSize: '24px', fontWeight: 'fontWeightMedium' }}>
              {t('groupDetailPage.usersGroupSection.title')}
            </Typography>
          </Grid>
          {!isSuspended && canEdit && (
            <Grid item xs={4} display="flex" justifyContent="flex-end" pr={1}>
              <ButtonNaked
                component="button"
                onClick={goEditCustom}
                startIcon={<AddIcon />}
                sx={{ color: 'primary.main' }}
                weight="default"
              >
                {t('groupDetailPage.addUser')}
              </ButtonNaked>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <Grid sx={{ pointerEvents: isSuspended ? 'none' : 'auto' }}>
            <MembersGroup
              partyGroup={partyGroupState}
              party={party}
              product={product}
              isSuspended={isSuspended}
              productRolesLists={productsRolesMap[product.id]}
              canEdit={canEdit}
              onGroupStatusUpdate={onGroupStatusUpdate}
              isGroupSuspended={isSuspended}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withGroupDetail(GroupDetailPage);
