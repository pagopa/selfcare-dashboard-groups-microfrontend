import { Grid, Link, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

type Props = {
  fetchNextPage: () => void;
};

export default function GroupsTableLoadMoreData({ fetchNextPage }: Props) {
  const { t } = useTranslation();
  return (
    <Grid
      container
      direction="row"
      sx={{
        mt: 1,
        backgroundColor: 'white',
      }}
      justifyContent="center"
    >
      <Typography>
        <Link
          onClick={fetchNextPage}
          sx={{
            textDecoration: 'none!important',
            cursor: 'pointer',
            position: 'relative',
            fontWeight: 'fontWeightMedium',
          }}
        >
          {t('dashboardGroup.groupsTableLoadMoreData.loadMoreMessage')}
          <ExpandMore fontSize="small" sx={{ position: 'absolute', bottom: 0 }} />
        </Link>
      </Typography>
    </Grid>
  );
}
