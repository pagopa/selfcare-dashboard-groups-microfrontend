import { Grid, Typography, Link } from '@mui/material';
import { Trans } from 'react-i18next';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useHistory } from 'react-router-dom';
import { useUnloadEventOnExit } from '@pagopa/selfcare-common-frontend/hooks/useUnloadEventInterceptor';
import { Party } from '../../../model/Party';
import { DASHBOARD_GROUPS_ROUTES } from '../../../routes';

type Props = {
  party: Party;
};

export default function NoGroups({ party }: Props) {
  const history = useHistory();
  const onExit = useUnloadEventOnExit();

  return (
    <Grid
      container
      direction="row"
      sx={{
        mt: 5,
        padding: 2,
        backgroundColor: 'white',
        border: '24px solid #EEEEEE',
      }}
      justifyContent="center"
    >
      <Grid item xs={12} display="flex" textAlign="center" justifyContent="center">
        <Typography variant="body2">
          <Trans i18nKey="dashboardGroup.noGroups.noGroupsLabel">
            Non è ancora stato creato alcun Gruppo.
            <Link
              sx={{ textDecoration: 'none!important', cursor: 'pointer', fontWeight: 'bold' }}
              onClick={() =>
                onExit(() =>
                  history.push(
                    resolvePathVariables(
                      DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.PARTY_GROUP_ADD.path,
                      {
                        partyId: party.partyId,
                      }
                    )
                  )
                )
              }
            >
              <b>Crea gruppo</b>
            </Link>
          </Trans>
        </Typography>
      </Grid>
    </Grid>
  );
}
