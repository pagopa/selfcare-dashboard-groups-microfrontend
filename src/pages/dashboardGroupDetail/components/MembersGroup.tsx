import { Link, Typography, Box, Tooltip, Chip, Paper, Button, Grid } from '@mui/material';
import { useHistory } from 'react-router';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { useEffect, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { DataGrid, GridRenderCellParams, GridRow } from '@mui/x-data-grid';
import { theme } from '@pagopa/mui-italia';
import { roleLabels, UserRole } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { PartyGroupDetail, PartyGroupStatus } from '../../../model/PartyGroup';
import { Product } from '../../../model/Product';
import { Party, UserStatus } from '../../../model/Party';
import { ProductRolesLists, transcodeProductRole2Title } from '../../../model/ProductRole';
import { PartyProductUser, PartyUserProduct, PartyUserProductRole } from '../../../model/PartyUser';
import { ENV } from '../../../utils/env';
import { DASHBOARD_GROUPS_ROUTES } from '../../../routes';
import { useIsMobile } from '../../../hooks/useIsMobile';
import GroupMenu from './GroupMenu';

type Props = {
  partyGroup: PartyGroupDetail;
  product: Product;
  party: Party;
  isSuspended: boolean;
  productRolesLists: ProductRolesLists;
  canEdit: boolean;
  onGroupStatusUpdate: (nextGroupStatus: PartyGroupStatus) => void;
  isGroupSuspended: boolean;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function MembersGroup({
  partyGroup,
  product,
  party,
  isSuspended,
  productRolesLists,
  canEdit,
  onGroupStatusUpdate,
  isGroupSuspended,
}: Props) {
  const history = useHistory();
  const { t } = useTranslation();
  const isMobile = useIsMobile('lg');

  const [members, setMembers] = useState<Array<PartyProductUser>>([]);

  const rowHeight = isMobile ? 250 : 64;
  const headerHeight = isMobile ? 10 : 56;

  useEffect(() => {
    setMembers(partyGroup.members);
  }, [partyGroup]);

  const onMemberDelete = (member: PartyProductUser) => {
    const nextMembers = members.filter((u) => u.id !== member.id);
    setMembers(nextMembers);
    // eslint-disable-next-line functional/immutable-data
    partyGroup.members = nextMembers;
    // eslint-disable-next-line functional/immutable-data
    partyGroup.membersCount = nextMembers.length;
    onGroupStatusUpdate(partyGroup.status);
  };

  const onMemberStatusUpdate = (
    member: PartyProductUser,
    userProduct: PartyUserProduct,
    nextStatus: UserStatus
  ) => {
    // eslint-disable-next-line functional/immutable-data
    member.status = nextStatus;
    // eslint-disable-next-line functional/immutable-data
    userProduct.roles[0].status = nextStatus;
    setMembers(members.slice());
  };

  const length = 19;

  const columns = [
    {
      field: 'name',
      headerName: t('groupDetailPage.usersGroupSection.headerFields.name'),
      flex: 2,
      width: 300,
      renderCell: (member: GridRenderCellParams<any, any, any>) => (
        <Link
          component="button"
          disabled={isSuspended}
          sx={{
            width: '100%',
            textDecoration: 'none',
            fontWeight: 'fontWeightMedium',
            cursor: isSuspended ? 'text' : 'pointer',
            display: 'flex',
          }}
          onClick={() =>
            history.push(
              resolvePathVariables(ENV.ROUTES.USERS_DETAIL, {
                partyId: partyGroup.partyId,
                userId: member.row.id,
              })
            )
          }
        >
          <Tooltip
            title={
              // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
              member.row.name.length + member.row.surname.length > length + 1
                ? `${member.row.name} ${member.row.surname}`
                : ''
            }
            placement="top"
            arrow={true}
          >
            <Typography
              className="ShowDots"
              sx={{
                pl: 1,
                fontSize: 'fontSize',
                fontWeight: 'fontWeightMedium',
                color: isSuspended ? 'text.disabled' : 'primary.main',
                justifyContent: 'flexStart',
              }}
            >
              {`${member.row.name} ${member.row.surname}
              ${member.row.isCurrentUser ? t('membersGroup.currentUser') : ''}`}
            </Typography>
          </Tooltip>
        </Link>
      ),
    },
    {
      field: 'email',
      headerName: t('groupDetailPage.usersGroupSection.headerFields.email'),
      flex: 2,
      width: 300,
      renderCell: (member: GridRenderCellParams<any, any, any>) => {
        const userProduct = member.row.product;
        const isMemberSuspended =
          member.row.status === 'SUSPENDED' ||
          !userProduct?.roles.find((r: PartyUserProductRole) => r.status !== 'SUSPENDED');
        return (
          <Tooltip
            title={member.row.email?.length > 48 ? member.row.email : ''}
            placement="top"
            arrow={true}
          >
            <Typography
              sx={{ fontSize: '14px' }}
              variant="body2"
              className="ShowDots"
              color={isMemberSuspended || isSuspended ? 'text.disabled' : undefined}
              width="100%"
            >
              {member.row.email ?? '-'}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      field: 'role',
      headerName: t('groupDetailPage.usersGroupSection.headerFields.role'),
      flex: 2,
      width: 300,
      sortable: false,
      renderCell: (member: GridRenderCellParams<any, any, any>) => {
        const userProduct = member.row.product;
        return (
          <Box display="flex" flexDirection="column">
            {userProduct?.roles?.map((r: any, index: number) => (
              <Box key={index}>
                <Tooltip
                  title={
                    r.role.length > 35 ? transcodeProductRole2Title(r.role, productRolesLists) : ''
                  }
                  placement="top"
                  arrow={true}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontSize: '14px' }}
                    className="ShowDots"
                    width="35ch"
                    color={r.status === 'SUSPENDED' || isSuspended ? 'text.disabled' : undefined}
                  >
                    {transcodeProductRole2Title(r.role, productRolesLists)}
                  </Typography>
                </Tooltip>
              </Box>
            ))}
          </Box>
        );
      },
    },
    {
      field: 'status',
      headerName: '',
      flex: 1,
      width: 100,
      sortable: false,
      renderCell: (member: GridRenderCellParams<any, any, any>) => {
        const userProduct = member.row.product;
        const isMemberSuspended =
          member.row.status === 'SUSPENDED' ||
          !userProduct?.roles.find((r: any) => r.status !== 'SUSPENDED');
        return (
          isMemberSuspended && (
            <Box display="flex" justifyContent="center" width="100%">
              {isMemberSuspended && (
                <Chip
                  label={t('groupDetail.status')}
                  aria-label="Suspended"
                  color="warning"
                  sx={{
                    fontWeight: 'fontWeightMedium',
                    fontSize: '14px',
                    borderRadius: '16px',
                    width: '78px',
                    height: '24px',
                  }}
                />
              )}
            </Box>
          )
        );
      },
    },
    {
      field: 'actions',
      headerName: '',
      flex: 1,
      width: 100,
      sortable: false,
      renderCell: (member: GridRenderCellParams<any, any, any>) => {
        const userProduct = member.row.product;

        return (
          !isGroupSuspended && (
            <Box width="100%" display="flex" justifyContent="flex-end" pr={3}>
              <GroupMenu
                member={member.row}
                party={party}
                product={product}
                partyGroup={partyGroup}
                userProduct={userProduct}
                isSuspended={isSuspended}
                productRolesLists={productRolesLists}
                onMemberStatusUpdate={onMemberStatusUpdate}
                onMemberDelete={onMemberDelete}
                canEdit={canEdit}
              />
            </Box>
          )
        );
      },
    },
  ];

  return members.length !== 0 ? (
    <DataGrid
      rowHeight={rowHeight}
      headerHeight={headerHeight}
      disableSelectionOnClick
      disableColumnMenu
      sx={{
        border: 'none',
        '& .MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-columnHeaders': {
          borderBottom: 'transparent',
          fontSize: '14px',
        },
        '& .MuiDataGrid-row': {
          backgroundColor: 'white',
          marginTop: '-2px',
        },
        '& .MuiDataGrid-row:first-child': { borderRadius: '4px 4px 0 0' },
        '& .MuiDataGrid-row:last-child': { borderRadius: '0 0 4px 4px' },
        '& .MuiDataGrid-row:first-child:last-child': {
          borderRadius: '4px',
        },
        '& .MuiDataGrid-columnHeader:focus-within': {
          outline: 'none',
        },
        '& .MuiDataGrid-cell:focus': { outline: 'none !important' },
        '& .MuiDataGrid-cell:focus-within': { outline: 'none !important' },
        '.MuiDataGrid-virtualScroller': {
          backgroundColor: '#F2F2F2',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      }}
      rows={members}
      columns={isMobile ? [] : columns}
      autoHeight
      hideFooter={true}
      showCellRightBorder={false}
      showColumnRightBorder={false}
      components={{
        Row: (props) => {
          const user = props.row;
          const userProduct = user.product;
          const userSuspended =
            user.status === 'SUSPENDED' ||
            userProduct.roles.find((r: any) => r.status === 'SUSPENDED');
          const userRole = user.userRole as UserRole;

          if (isMobile) {
            return (
              <Box
                key={user.id}
                sx={{
                  marginBottom: 2,
                  width: 'calc(100vw - 47px)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  sx={{
                    textAlign: 'start',
                    marginTop: 2,
                    paddingY: 3,
                    width: '100%',
                    height: '100%',
                    justifyItems: '-moz-initial',
                    flexDirection: 'row',
                    backgroundColor: 'background.paper',
                    borderRadius: theme.spacing(2),
                    boxShadow:
                      '0px 8px 10px -5px rgba(0, 43, 85, 0.1), 0px 16px 24px 2px rgba(0, 43, 85, 0.05), 0px 6px 30px 5px rgba(0, 43, 85, 0.1)',
                  }}
                  onClick={() =>
                    history.push(
                      resolvePathVariables(ENV.ROUTES.USERS_DETAIL, {
                        partyId: partyGroup.partyId,
                        userId: user.id,
                      })
                    )
                  }
                >
                  <Grid container spacing={2}>
                    <Grid item sx={{ width: '100%' }}>
                      <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                        {t('groupDetailPage.usersGroupSection.headerFields.name')}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 'fontSize',
                          fontWeight: 'fontWeightRegular',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {user.name.concat(' ', user.surname)}
                      </Typography>
                    </Grid>

                    <Grid item sx={{ width: '100%' }}>
                      <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                        {t('groupDetailPage.usersGroupSection.headerFields.email')}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 'fontSize',
                          fontWeight: 'fontWeightRegular',
                          color: userSuspended ? 'text.disabled' : 'text.primary',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {user.email}
                      </Typography>
                    </Grid>

                    <Grid item sx={{ width: '100%' }}>
                      <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                        {t('groupDetailPage.usersGroupSection.headerFields.role')}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 'fontSize',
                          fontWeight: 'fontWeightRegular',
                          color: userSuspended ? 'text.disabled' : 'text.primary',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {t(roleLabels[userRole].longLabelKey)}
                      </Typography>
                    </Grid>
                    {userSuspended && (
                      <Grid item sx={{ width: '100%' }}>
                        <Chip
                          label={t('groupDetail.status')}
                          aria-label={'Suspended'}
                          color="warning"
                          sx={{
                            fontSize: '14px',
                            fontWeight: 'fontWeightMedium',
                            paddingBottom: '1px',
                            height: '24px',
                            cursor: 'pointer',
                          }}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Button>
              </Box>
            );
          }
          return <GridRow {...props} />;
        },
      }}
    />
  ) : (
    <Paper
      sx={{
        height: '56px',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 'fontSize',
        marginTop: 2,
        paddingTop: 2,
      }}
    >
      <Trans
        i18nKey="groupDetail.emptyGroup"
        components={{
          1: (
            <Link
              sx={{
                variant: 'body2',
                fontWeight: 'bold',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              onClick={() => {
                history.push(
                  resolvePathVariables(
                    DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.PARTY_GROUP_EDIT.path + '#users',
                    {
                      partyId: partyGroup.partyId,
                      groupId: partyGroup.id,
                    }
                  )
                );
              }}
            />
          ),
        }}
      />
    </Paper>
  );
}
