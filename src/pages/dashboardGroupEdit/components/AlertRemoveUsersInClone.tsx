import { Alert, Grid } from '@mui/material';
import { Trans } from 'react-i18next';

export default function AlertRemoveUsersInClone() {
  return (
    <Grid item xs={8} mb={3} sx={{ marginTop: 3 }}>
      <Alert
        severity="error"
        sx={{
          background: '#FFFFFF',
          fontSize: 'fontSize',
          height: '80px',
          alignItems: 'center',
          color: '#17324D',
          borderLeft: 'solid',
          borderLeftColor: '#FE6666',
          borderLeftWidth: '4px',
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          width: '100%',
        }}
      >
        <Trans i18nKey="dashboardGroupEdit.alertRemoveUsersInClone.label">
          Alcuni utenti sono stati rimossi dal gruppo duplicato perché non presenti nel prodotto
          <br />
          selezionato. Puoi comunque assegnare altri utenti al gruppo duplicato.
        </Trans>
      </Alert>
    </Grid>
  );
}
