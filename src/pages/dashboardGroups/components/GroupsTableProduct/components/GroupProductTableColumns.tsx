import { Chip, Typography, Grid, Box, IconButton } from '@mui/material';
import { GridColDef, GridColumnHeaderParams, GridRenderCellParams } from '@mui/x-data-grid';
import React, { CSSProperties, ReactNode } from 'react';
import { TFunction } from 'i18next';
import i18n from '@pagopa/selfcare-common-frontend/lib/locale/locale-utils';
import GroupIcon from '@mui/icons-material/Group';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { PartyGroup } from '../../../../../model/PartyGroup';

export function buildColumnDefs(
  onRowClick: (partyGroup: PartyGroup) => void,
  t: TFunction<'translation', undefined>
) {
  return [
    {
      field: 'name',
      cellClassName: 'justifyContentBold',
      headerName: t('dashboardGroup.groupProductTableColumns.headerFields.name'),
      align: 'left',
      headerAlign: 'left',
      width: 403,
      editable: false,
      disableColumnMenu: true,
      renderHeader: showCustomHeader,
      renderCell: (params) => showName(params, false, onRowClick),
      sortable: true,
      flex: 4,
    },
    {
      field: 'description',
      cellClassName: 'justifyContentNormal',
      headerName: t('dashboardGroup.groupProductTableColumns.headerFields.description'),
      align: 'left',
      headerAlign: 'left',
      width: 404,
      editable: false,
      disableColumnMenu: true,
      renderHeader: showCustomHeader,
      renderCell: (params) => renderCell(params, undefined, onRowClick),
      sortable: false,
      flex: 4,
    },
    {
      field: 'referenti',
      cellClassName: 'justifyContentNormalRight',
      headerName: t('dashboardGroup.groupProductTableColumns.headerFields.referents'),
      align: 'left',
      headerAlign: 'left',
      width: 403,
      hideSortIcons: true,
      disableColumnMenu: true,
      editable: false,
      valueGetter: (params) => (params.row as PartyGroup).membersCount,
      renderCell: (params) => showReferents(params, onRowClick),
      renderHeader: showCustomHeader,
      sortable: false,
      flex: 3,
    },
    {
      field: 'status',
      cellClassName: 'justifyContentNormalRight',
      headerName: '',
      align: 'center',
      width: 150,
      hideSortIcons: true,
      disableColumnMenu: true,
      editable: false,
      renderCell: (params) => showStatus(params, onRowClick),
      sortable: false,
      flex: 2,
    },
    {
      field: 'azioni',
      cellClassName: 'justifyContentNormalRight',
      headerName: '',
      align: 'right',
      width: 100,
      hideSortIcons: true,
      disableColumnMenu: true,
      editable: false,
      renderCell: (p) => (
        <Box
          display="flex"
          justifyContent="flex-end"
          width="100%"
          mr={2}
          sx={{ cursor: 'pointer' }}
        >
          <IconButton
            onClick={onRowClick ? () => onRowClick(p.row) : undefined}
            sx={{ width: '100%', '&:hover': { backgroundColor: 'transparent !important' } }}
          >
            <ArrowForwardIosIcon fontSize="small" sx={{ color: 'primary.main', p: '4px' }} />
          </IconButton>
        </Box>
      ),
      sortable: false,
      flex: 1,
    },
  ] as Array<GridColDef>;
}

function renderCell(
  params: GridRenderCellParams,
  value: ReactNode = params.value,
  onRowClick?: (partyGroup: PartyGroup) => void,
  overrideStyle: CSSProperties = {}
) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        paddingRight: '24px',
        paddingLeft: '24px',
        paddingTop: '-16px',
        paddingBottom: '-16px',
        cursor: 'pointer',
        WebkitBoxOrient: 'vertical' as const,
        ...overrideStyle,
      }}
      onClick={onRowClick ? () => onRowClick(params.row) : undefined}
    >
      <Box
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical' as const,
          width: '100%',
          color: params.row.status === 'SUSPENDED' ? 'text.disabled' : undefined,
          fontSize: '14px',
        }}
      >
        {value}
      </Box>
    </Box>
  );
}

function isGroupSuspended(partyGroup: PartyGroup): boolean {
  return partyGroup.status === 'SUSPENDED';
}

function showCustomHeader(params: GridColumnHeaderParams) {
  return (
    <React.Fragment>
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 'fontWeightMedium',
          outline: 'none',
          paddingLeft: '14px',
        }}
      >
        {params.colDef.headerName}
      </Typography>
    </React.Fragment>
  );
}

function showName(
  params: GridRenderCellParams,
  canShowChip: boolean,
  onRowClick: (partyGroup: PartyGroup) => void
) {
  const isSuspended = isGroupSuspended(params.row as PartyGroup);
  const showChip = canShowChip && isSuspended;
  return (
    <React.Fragment>
      {renderCell(
        params,
        <>
          <Grid container sx={{ width: '100%' }}>
            <Grid item xs={showChip ? 7 : 12} sx={{ width: '100%' }}>
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  fontWeight: 'fontWeightMedium',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const,
                }}
              >
                {params.row.name}
              </Typography>
            </Grid>
            {showChip && (
              <Grid
                item
                xs={5}
                sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
              >
                <TableChip text={i18n.t('groupDetail.status')} />
              </Grid>
            )}
          </Grid>
        </>,
        onRowClick
      )}
    </React.Fragment>
  );
}

function showReferents(params: GridRenderCellParams, onRowClick: (partyGroup: PartyGroup) => void) {
  return (
    <React.Fragment>
      {renderCell(
        params,
        <Box display="flex">
          <Box>
            <GroupIcon color={isGroupSuspended(params.row as PartyGroup) ? 'disabled' : 'action'} />
          </Box>
          <Box>
            <Typography
              variant="caption"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical' as const,
                width: '100%',
                color: params.row.status === 'SUSPENDED' ? 'text.disabled' : undefined,
                fontSize: '14px',
                padding: '4px',
              }}
            >
              {`${(params.row as PartyGroup).membersCount}  ${
                (params.row as PartyGroup).membersCount > 1
                  ? i18n.t('groupDetail.usersLabel')
                  : i18n.t('groupDetail.userLabel')
              }`}
            </Typography>
          </Box>
        </Box>,
        onRowClick
      )}
    </React.Fragment>
  );
}

function TableChip({ text }: { text: string }) {
  return (
    <Chip
      label={text}
      aria-label="Suspended"
      color='warning'
      sx={{
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'fontWeightMedium',
        paddingBottom: '1px',
        height: '24px',
        width: '78px',
      }}
    />
  );
}

function showStatus(params: GridRenderCellParams, onRowClick: (partyGroup: PartyGroup) => void) {
  const showChip = isGroupSuspended(params.row as PartyGroup);
  return renderCell(
    params,
    <>
      {showChip && (
        <Box sx={{ cursor: 'pointer' }}>
          <TableChip text={i18n.t('groupDetail.status')} />
        </Box>
      )}
    </>,
    onRowClick,
    {
      paddingLeft: 0,
      paddingRight: 0,
      textAlign: 'right',
    }
  );
}
