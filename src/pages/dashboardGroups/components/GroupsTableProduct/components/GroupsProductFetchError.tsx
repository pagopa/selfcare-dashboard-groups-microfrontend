import { Grid, Link, Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import DissatisfiedIcon from '../../../../../assets/dissatisfied-face.svg?react';

type Props = {
  onRetry: () => void;
};

export default function GroupsProductFetchError({ onRetry }: Props) {
  return (
    <Grid
      container
      direction="row"
      sx={{
        padding: 2,
        backgroundColor: 'white',
      }}
      justifyContent="center"
    >
      <DissatisfiedIcon />
      <Typography>
        <Trans i18nKey="dashboardGroup.groupsProductFetchError.message">
          Spiacenti, qualcosa è andato storto.
          <Link onClick={onRetry} sx={{ textDecoration: 'none!important', cursor: 'pointer' }}>
            <b> Riprova</b>
          </Link>
          .
        </Trans>
      </Typography>
    </Grid>
  );
}
