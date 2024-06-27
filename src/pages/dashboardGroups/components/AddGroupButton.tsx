import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useUnloadEventOnExit } from '@pagopa/selfcare-common-frontend/lib/hooks/useUnloadEventInterceptor';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { useTranslation } from 'react-i18next';
import { Party } from '../../../model/Party';
import { DASHBOARD_GROUPS_ROUTES } from '../../../routes';

interface AddGroupButtonProps {
  party: Party;
}

export default function AddGroupButton({ party }: AddGroupButtonProps) {
  const history = useHistory();
  const onExit = useUnloadEventOnExit();
  const { t } = useTranslation();

  return (
    <Button
      variant="contained"
      sx={{ py: '10px' }}
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
      {t('dashboardGroup.addGroupButton.createActionLabel')}
    </Button>
  );
}
