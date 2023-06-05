import { Grid, Typography, Link } from '@mui/material';
import { Trans } from 'react-i18next';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useHistory } from 'react-router-dom';
import { useUnloadEventOnExit } from '@pagopa/selfcare-common-frontend/hooks/useUnloadEventInterceptor';
import { Party } from '../../../model/Party';
import { DASHBOARD_GROUPS_ROUTES } from '../../../routes';

type Props = {
  party: Party;
  isPnpg: boolean;
};

export default function NoGroups({ party, isPnpg }: Props) {
  const history = useHistory();
  const onExit = useUnloadEventOnExit();

  const addGroupRedirect = () => {
    history.push(
      resolvePathVariables(DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.PARTY_GROUP_ADD.path, {
        partyId: party.partyId,
      })
    );
  };

  return (
    <Grid
      container
      direction="row"
      sx={{
        mt: isPnpg ? 0 : 3,
        padding: 2,
        backgroundColor: 'background.paper',
        border: '0px',
      }}
      justifyContent="center"
    >
      <Grid item xs={12} display="flex" textAlign="center" justifyContent="center">
        <Typography variant="body2">
          <Trans i18nKey="dashboardGroup.noGroups.noGroupsLabel">
            Non è ancora stato creato alcun gruppo.
            <Link
              sx={{
                textDecoration: 'none!important',
                cursor: 'pointer',
                fontWeight: 'fontWeightBold',
              }}
              onClick={() => onExit(() => addGroupRedirect())}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addGroupRedirect();
                }
              }}
              tabIndex={0}
            >
              <b>Crea gruppo</b>
            </Link>
          </Trans>
        </Typography>
      </Grid>
    </Grid>
  );
}
