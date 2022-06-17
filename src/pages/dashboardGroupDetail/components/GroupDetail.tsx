import { Grid, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PartyGroupDetail } from '../../../model/PartyGroup';
import { ProductsMap } from '../../../model/Product';

type Props = {
  partyGroup: PartyGroupDetail;
  productsMap: ProductsMap;
  isSuspended: boolean;
};

function GroupDetail({ partyGroup, productsMap, isSuspended }: Props) {
  function formatDate(data?: Date) {
    const d = new Date(data as Date);
    return d.toLocaleDateString('it', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  const groupStatusClass = isSuspended ? 'CustomDisabledLabel' : 'CustomInfoStyle';
  const groupLabelClass = isSuspended ? 'CustomDisabledLabel' : 'CustomLabelStyle';
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid container item alignContent="center">
        <Grid item xs={3}>
          <Typography variant="body2" className={groupLabelClass}>
            {t('groupDetail.description')}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography
            variant="body2"
            sx={{ color: isSuspended ? '#A2ADB8' : '#5C6F82', fontWeight: '600' }}
          >
            {partyGroup.description}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item alignContent="center">
        <Grid item xs={3}>
          <Typography variant="body2" className={groupLabelClass}>
            {t('groupDetail.product')}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="body2" className={groupStatusClass} sx={{ fontWeight: '600' }}>
            {productsMap[partyGroup.productId].title}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item alignContent="center">
        <Grid item xs={3}>
          <Typography variant="body2" className={groupLabelClass}>
            {t('groupDetail.creationDate')}
          </Typography>
        </Grid>
        <Grid item xs={9} display="flex">
          {partyGroup.createdBy ? (
            <Box>
              <Typography variant="body2" className={groupStatusClass} sx={{ fontWeight: '600' }}>
                {`${partyGroup.createdBy.name} ${partyGroup.createdBy?.surname}`}
              </Typography>
            </Box>
          ) : (
            ''
          )}
          &nbsp; - &nbsp;
          {partyGroup.createdAt ? (
            <Box>
              <Typography variant="body2" className={groupStatusClass} sx={{ fontWeight: '600' }}>
                {formatDate(partyGroup.createdAt)}
              </Typography>
            </Box>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
      <Grid container item alignContent="center">
        <Grid item xs={3}>
          <Typography variant="body2" className={groupLabelClass}>
            {t('groupDetail.modifiedAt')}
          </Typography>
        </Grid>
        <Grid item xs={9} display="flex">
          {partyGroup.modifiedBy ? (
            <Box>
              <Typography
                variant="body2"
                className={groupStatusClass}
                sx={{ fontWeight: '600' }}
              >{`${partyGroup.modifiedBy?.name} ${partyGroup.modifiedBy?.surname}`}</Typography>
            </Box>
          ) : (
            ''
          )}
          &nbsp; - &nbsp;
          {partyGroup.modifiedAt ? (
            <Box>
              <Typography variant="body2" className={groupStatusClass} sx={{ fontWeight: '600' }}>
                {formatDate(partyGroup.modifiedAt)}
              </Typography>
            </Box>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
export default GroupDetail;
