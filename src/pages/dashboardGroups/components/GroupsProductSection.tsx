import { Grid, Typography } from '@mui/material';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Party } from '../../../model/Party';
import { Product } from '../../../model/Product';
import { ENV } from '../../../utils/env';
import GroupsTableProduct from './GroupsTableProduct/GroupsTableProduct';

type Props = {
  party: Party;
  product: Product;
  currentUser: User;
  selected: boolean;
  onFetchStatusUpdate: (loading: boolean, noData: boolean, error: boolean) => void;
  incrementalLoad: boolean;
  isPnpgTheOnlyProduct?: boolean;
};

export default function GroupsProductSection({
  party,
  product,
  currentUser,
  selected,
  onFetchStatusUpdate,
  incrementalLoad,
  isPnpgTheOnlyProduct,
}: Props) {
  const [fetchStatus, setFetchStatus] = useState({ loading: true, noData: false, error: false });
  const { t } = useTranslation();

  return (
    <Grid container direction="row">
      {!isPnpgTheOnlyProduct && (
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Typography id={product.id} sx={{ fontWeight: 'fontWeightMedium' }}>
            {product.title}
          </Typography>
        </Grid>
      )}
      {fetchStatus.loading ||
        (fetchStatus.noData && (
          <Grid
            container
            direction="row"
            sx={{
              mt: 3,
              padding: 2,
              backgroundColor: 'background.paper',
              border: '0px',
              borderRadius: '4px',
            }}
            justifyContent="center"
          >
            <Grid item xs={12} display="flex" textAlign="center" justifyContent="center">
              <Typography variant={'body2'}>
                {t('dashboardGroup.noGroups.noGroupsForProduct')}
              </Typography>
            </Grid>
          </Grid>
        ))}

      <Grid item xs={12}>
        <GroupsTableProduct
          incrementalLoad={incrementalLoad}
          initialPageSize={
            incrementalLoad ? ENV.PARTY_GROUPS_PAGE_SIZE : ENV.PARTY_PRODUCT_GROUPS_PAGE_SIZE
          }
          party={party}
          selected={selected}
          product={product}
          onCompleteDelete={() => {
            setFetchStatus({ loading: false, noData: true, error: false });
            onFetchStatusUpdate(false, true, false);
          }}
          currentUser={currentUser}
          onFetchStatusUpdate={(isFetching, count, error) => {
            const noData = !count || count === 0;
            setFetchStatus({ loading: isFetching, noData, error });
            onFetchStatusUpdate(isFetching, noData, error);
          }}
        />
      </Grid>
    </Grid>
  );
}
