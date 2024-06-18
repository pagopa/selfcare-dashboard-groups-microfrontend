import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Box, Button, styled, Grid, Typography, Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRow, GridSortDirection, GridSortModel } from '@mui/x-data-grid';
import React, { useMemo } from 'react';
import { CustomPagination } from '@pagopa/selfcare-common-frontend';
import { Page } from '@pagopa/selfcare-common-frontend/model/Page';
import { useTranslation } from 'react-i18next';
import { theme } from '@pagopa/mui-italia';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useHistory } from 'react-router-dom';
import { Product } from '../../../../../model/Product';
import { Party } from '../../../../../model/Party';
import { PartyGroup, PartyGroupStatus } from '../../../../../model/PartyGroup';
import { useIsMobile } from '../../../../../hooks/useIsMobile';
import { DASHBOARD_GROUPS_ROUTES } from '../../../../../routes';
import { buildColumnDefs } from './GroupProductTableColumns';
import GroupsProductLoading from './GroupsProductLoading';
import GroupsTableLoadMoreData from './GroupsProductLoadMoreData';

interface GroupsTableProps {
  incrementalLoad: boolean;
  loading: boolean;
  noMoreData: boolean;
  party: Party;
  groups: Array<PartyGroup>;
  product: Product;
  fetchPage: (page?: number, size?: number) => void;
  page: Page;
  sort?: string;
  onSortRequest: (sort: string) => void;
  onRowClick: (partyGroup: PartyGroup) => void;
  onDelete: (partyGroup: PartyGroup) => void;
  onStatusUpdate: (partyGroup: PartyGroup, nextStatus: PartyGroupStatus) => void;
}

const CustomDataGrid = styled(DataGrid)({
  border: 'none !important',
  '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, &.MuiDataGrid-root .MuiDataGrid-cell:focus-within':
    { outline: 'none' },
  '&.MuiDataGrid-root .MuiDataGrid-cell': {
    whiteSpace: 'normal !important',
    wordWrap: 'break-word !important',
    lineHeight: '25px !important',
  },
  '&.MuiDataGrid-columnHeaders': { borderBottom: 'none !important' },
  '.justifyContentBold': {
    fontSize: '16px',
    fontWeight: 'fontWeightMedium',
    '&>div': {
      display: 'flex !important',
      alignItems: 'center',
    },
  },
  '.MuiDataGrid-columnSeparator': { display: 'none' },
  '.MuiDataGrid-cell ': { padding: '0px', borderBottom: 'none' },
  '.MuiDataGrid-columnHeaders': { borderBottom: 'none' },
  '.MuiDataGrid-virtualScroller': {
    backgroundColor: '#F2F2F2',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  '.MuiDataGrid-row': {
    backgroundColor: 'white',
    // borderBottom: '1px solid #CCD4DC',
    marginBottom: '-1px',
    '&.Mui-selected': {
      backgroundColor: 'transparent',
      '&:hover': { backgroundColor: 'transparent' },
    },
  },
  '.MuiDataGrid-row:first-child': { borderRadius: '4px 4px 0 0' },
  '.MuiDataGrid-row:last-child': { borderRadius: '0 0 4px 4px' },
  '.MuiDataGrid-row:first-child:last-child': {
    borderRadius: '4px',
  },
  '.justifyContentNormal': {
    fontSize: '16px',
    fontWeight: 'normal',
    '&>div': {
      display: 'flex !important',
      alignItems: 'center',
    },
  },
  '.justifyContentNormalRight': {
    fontSize: '16px',
    fontWeight: 'normal',
    '&>div': {
      display: 'flex !important',
      alignItems: 'center',
      justifyContent: 'right',
    },
  },
});

export default function GroupsProductTable({
  incrementalLoad,
  loading,
  fetchPage,
  noMoreData,
  party,
  product,
  page,
  groups,
  sort,
  onSortRequest,
  onRowClick,
}: GroupsTableProps) {
  const sortSplitted = sort && sort !== '' ? sort.split(',') : undefined;
  const { t } = useTranslation();
  const isMobile = useIsMobile('lg');
  const history = useHistory();

  const rowHeight = isMobile ? 250 : 80;
  const headerHeight = isMobile ? 10 : 56;

  const columns: Array<GridColDef> = useMemo(
    () => buildColumnDefs(onRowClick, t),
    [party, product, groups]
  );

  return (
    <React.Fragment>
      <Box
        id="GroupsSearchTableBox"
        sx={{
          position: 'relative',
          width: '100% !important',
          border: 'none',
        }}
        justifyContent="start"
      >
        <CustomDataGrid
          className="CustomDataGrid"
          autoHeight={true}
          rows={groups}
          rowCount={Math.max(page?.totalElements ?? 0, groups.length)}
          getRowId={(r) => r.id}
          columns={isMobile ? [] : columns}
          rowHeight={groups.length === 0 && loading ? 0 : rowHeight}
          headerHeight={headerHeight}
          hideFooterSelectedRowCount={true}
          components={{
            Row: (props) => {
              const group = props.row;
              const groupSuspended = group.status === 'SUSPENDED';
              if (isMobile) {
                return (
                  <Box
                    key={group.id}
                    sx={{
                      marginBottom: 2,
                      width: 'calc(100vw - 110px)',
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
                          resolvePathVariables(
                            DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.PARTY_GROUP_DETAIL.path,
                            { partyId: party.partyId, groupId: group.id }
                          )
                        )
                      }
                    >
                      <Grid container spacing={2}>
                        <Grid item sx={{ width: '100%' }}>
                          <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                            {t('dashboardGroup.groupProductTableColumns.headerFields.name')}
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
                            {group.name}
                          </Typography>
                        </Grid>

                        <Grid item sx={{ width: '100%' }}>
                          <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                            {t('dashboardGroup.groupProductTableColumns.headerFields.description')}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 'fontSize',
                              fontWeight: 'fontWeightRegular',
                              color: groupSuspended ? 'text.disabled' : 'text.primary',
                              wordWrap: 'break-word',
                              overflowWrap: 'break-word',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {group.description}
                          </Typography>
                        </Grid>

                        <Grid item sx={{ width: '100%' }}>
                          <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                            {t('dashboardGroup.groupProductTableColumns.headerFields.referents')}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 'fontSize',
                              fontWeight: 'fontWeightRegular',
                              color: groupSuspended ? 'text.disabled' : 'text.primary',
                              wordWrap: 'break-word',
                              overflowWrap: 'break-word',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {group.membersCount}
                          </Typography>
                        </Grid>
                        {groupSuspended && (
                          <Grid item sx={{ width: '100%' }}>
                            <Chip
                              label={t('groupDetail.status')}
                              aria-label={'Suspended'}
                              color='warning'
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
            Footer:
              loading || incrementalLoad
                ? () =>
                    loading ? (
                      <GroupsProductLoading />
                    ) : !noMoreData ? (
                      <GroupsTableLoadMoreData fetchNextPage={fetchPage} />
                    ) : (
                      <></>
                    )
                : undefined,
            Pagination: incrementalLoad
              ? undefined
              : () => (
                  <CustomPagination
                    sort={sort}
                    page={page}
                    onPageRequest={(nextPage) => fetchPage(nextPage.page, nextPage.size)}
                  />
                ),
            NoRowsOverlay: () => <></>,
            NoResultsOverlay: () => <></>,
            ColumnSortedAscendingIcon: () => <ArrowDropDown sx={{ color: '#5C6F82' }} />,
            ColumnSortedDescendingIcon: () => <ArrowDropUp sx={{ color: '#5C6F82' }} />,
          }}
          paginationMode="server"
          filterMode="server"
          sortingMode="server"
          onSortModelChange={(model: GridSortModel) =>
            onSortRequest(model.map((m) => `${m.field},${m.sort}`)[0] ?? '')
          }
          sortModel={
            sortSplitted
              ? [{ field: sortSplitted[0], sort: sortSplitted[1] as GridSortDirection }]
              : []
          }
        />
      </Box>
    </React.Fragment>
  );
}
