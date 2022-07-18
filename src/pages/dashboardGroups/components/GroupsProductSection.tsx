import { Grid, Typography } from '@mui/material';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { useState } from 'react';
import { Party } from '../../../model/Party';
import { Product } from '../../../model/Product';
import { ENV } from '../../../utils/env';
import GroupsTableProduct from './GroupsTableProduct/GroupsTableProduct';

type Props = {
  party: Party;
  product: Product;
  currentUser: User;
  onFetchStatusUpdate: (loading: boolean, noData: boolean, error: boolean) => void;
  incrementalLoad: boolean;
};

export default function GroupsProductSection({
  party,
  product,
  currentUser,
  onFetchStatusUpdate,
  incrementalLoad,
}: Props) {
  const [fetchStatus, setFetchStatus] = useState({ loading: true, noData: false, error: false });

  return (
    <Grid container direction="row">
      {fetchStatus.loading || !fetchStatus.noData ? (
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Typography id={product.id} sx={{ fontWeight: 'fontWeightMedium' }}>
            {product.title}
          </Typography>
        </Grid>
      ) : (
        <></>
      )}

      <Grid item xs={12}>
        <GroupsTableProduct
          incrementalLoad={incrementalLoad}
          initialPageSize={
            incrementalLoad ? ENV.PARTY_GROUPS_PAGE_SIZE : ENV.PARTY_PRODUCT_GROUPS_PAGE_SIZE
          }
          party={party}
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
