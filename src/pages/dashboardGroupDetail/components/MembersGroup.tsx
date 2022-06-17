import { Link, Typography, Box, Tooltip } from '@mui/material';
import { useHistory } from 'react-router';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { PartyGroupDetail, PartyGroupStatus } from '../../../model/PartyGroup';
import { Product } from '../../../model/Product';
import { Party, UserStatus } from '../../../model/Party';
import { ProductRolesLists, transcodeProductRole2Title } from '../../../model/ProductRole';
import { PartyProductUser, PartyUserProduct, PartyUserProductRole } from '../../../model/PartyUser';
import { ENV } from '../../../utils/env';
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

  const [members, setMembers] = useState<Array<PartyProductUser>>([]);
  const { t } = useTranslation();

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
      headerName: 'Nome',
      flex: 1,
      minWidth: 300,
      renderCell: (member: GridRenderCellParams<any, any, any>) => (
        <Link
          component="button"
          disabled={isSuspended}
          sx={{
            width: '100%',
            textDecoration: 'none',
            fontWeight: 600,
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
          >
            <Typography
              className="ShowDots"
              sx={{
                fontSize: 'fontSize',
                fontWeight: 'fontWeightMedium',
                color: isSuspended ? '#a2adb8' : '#0073E6',
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
      headerName: 'Email',
      flex: 1,
      minWidth: 350,
      renderCell: (member: GridRenderCellParams<any, any, any>) => {
        const userProduct = member.row.product;
        const isMemeberSuspended =
          member.row.status === 'SUSPENDED' ||
          !userProduct?.roles.find((r: PartyUserProductRole) => r.status !== 'SUSPENDED');
        return (
          <Typography
            sx={{ fontSize: '14px' }}
            variant="body2"
            className="ShowDots"
            color={isMemeberSuspended || isSuspended ? '#9E9E9E' : undefined}
            title={member.row.email}
            width="100%"
          >
            {member.row.email}
          </Typography>
        );
      },
    },
    {
      field: 'role',
      headerName: 'Ruolo',
      flex: 1,
      minWidth: 320,
      renderCell: (member: GridRenderCellParams<any, any, any>) => {
        console.log('member', member);
        const userProduct = member.row.product;

        return userProduct?.roles?.map((r: PartyUserProductRole, index: number) => (
          <Typography
            key={index}
            variant="body2"
            sx={{ fontSize: '14px' }}
            title={transcodeProductRole2Title(r.role, productRolesLists)}
            className="ShowDots"
            width="100%"
            color={r.status === 'SUSPENDED' || isSuspended ? '#9E9E9E' : undefined}
          >
            {transcodeProductRole2Title(r.role, productRolesLists)}
          </Typography>
        ));
      },
    },
    {
      field: 'actions',
      headerName: '',
      flex: 1,
      minWidth: 50,
      sortable: false,
      renderCell: (member: GridRenderCellParams<any, any, any>) => {
        const userProduct = member.row.product;

        return (
          !isGroupSuspended && (
            <Box width="100%" display="flex" justifyContent="flex-end" pr={2}>
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

  return (
    <DataGrid
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
          '&:hover': { backgroundColor: 'white' },
        },
        '& .MuiDataGrid-columnHeader:focus-within': {
          outline: 'none',
        },
        '& .MuiDataGrid-cell:focus': { outline: 'none !important' },
        '& .MuiDataGrid-cell:focus-within': { outline: 'none !important' },
      }}
      rows={members}
      columns={columns}
      autoHeight
      hideFooter={true}
      showCellRightBorder={false}
      showColumnRightBorder={false}
    />
  );
}
