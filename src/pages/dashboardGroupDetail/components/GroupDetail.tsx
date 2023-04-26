import { Grid, Typography, Box, Tooltip } from '@mui/material';
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
  const { t } = useTranslation();

  const disabledText = isSuspended ? 'text.disabled' : 'text.primary';
  const isPnpg = partyGroup.productId.startsWith('prod-pn-pg');

  return (
    <Grid container spacing={2}>
      <Grid container item alignContent="center">
        <Grid item xs={3}>
          <Typography variant="body2" sx={{ color: disabledText }}>
            {t('groupDetail.description')}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Tooltip
            title={partyGroup.description.length >= 215 ? partyGroup.description : ''}
            placement="top"
            arrow={true}
          >
            <Typography
              variant="body2"
              sx={{
                color: disabledText,
                fontWeight: 'fontWeightMedium',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical' as const,
                maxWidth: '100%',
              }}
            >
              {partyGroup.description}
            </Typography>
          </Tooltip>
        </Grid>
      </Grid>
      {!isPnpg && (
        <Grid container item alignContent="center">
          <Grid item xs={3}>
            <Typography variant="body2" sx={{ color: disabledText }}>
              {t('groupDetail.product')}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'fontWeightMedium',
                color: disabledText,
              }}
            >
              {productsMap[partyGroup.productId].title}
            </Typography>
          </Grid>
        </Grid>
      )}
      <Grid container item alignContent="center">
        <Grid item xs={3}>
          <Typography variant="body2" sx={{ color: disabledText }}>
            {t('groupDetail.creationDate')}
          </Typography>
        </Grid>
        <Grid item xs={9} display="flex">
          {partyGroup.createdBy ? (
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'fontWeightMedium',
                  color: disabledText,
                }}
              >
                {`${partyGroup.createdBy.name} ${partyGroup.createdBy?.surname}`} &nbsp;- &nbsp;
              </Typography>
            </Box>
          ) : (
            ''
          )}
          {partyGroup.createdAt ? (
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'fontWeightMedium',
                  color: disabledText,
                }}
              >
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
          <Typography variant="body2" sx={{ color: disabledText }}>
            {t('groupDetail.modifiedAt')}
          </Typography>
        </Grid>
        <Grid item xs={9} display="flex">
          {partyGroup.modifiedBy ? (
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'fontWeightMedium',
                  color: disabledText,
                }}
              >
                {`${partyGroup.modifiedBy?.name} ${partyGroup.modifiedBy?.surname}`} &nbsp;- &nbsp;
              </Typography>
            </Box>
          ) : (
            ''
          )}
          {partyGroup.modifiedAt ? (
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'fontWeightMedium',
                  color: disabledText,
                }}
              >
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
