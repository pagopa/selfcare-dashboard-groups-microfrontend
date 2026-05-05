import { Button } from '@mui/material';
import { useUnloadEventOnExit } from '@pagopa/selfcare-common-frontend/lib/hooks/useUnloadEventInterceptor';
import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Party } from '../../../model/Party';
import { DASHBOARD_GROUPS_ROUTES } from '../../../routes';
import { EVENTS } from '../../../utils/constants';

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
        onExit(() => {
          trackEvent(EVENTS.GROUP_CREATE_START, { party_id: party.partyId }, () => {
            history.push(
              resolvePathVariables(
                DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.PARTY_GROUP_ADD.path,
                { partyId: party.partyId }
              )
            );
          });
        })
      }
    >
      {t('dashboardGroup.addGroupButton.createActionLabel')}
    </Button>
  );
}
