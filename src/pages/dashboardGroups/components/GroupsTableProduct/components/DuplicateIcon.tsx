import { IconButton, Box, Tooltip } from '@mui/material';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { useHistory } from 'react-router-dom';
import { TFunction } from 'i18next';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DASHBOARD_GROUPS_ROUTES } from '../../../../../routes';
import { PartyGroup } from '../../../../../model/PartyGroup';
import { Party } from '../../../../../model/Party';

type Props = {
  party: Party;
  p: GridRenderCellParams<any, any, any>;
  t: TFunction<'translation', undefined>;
};
export default function DuplicateIcon({ party, p, t }: Props) {
  const history = useHistory();
  return (
    <Box textAlign="right">
      <Tooltip
        aria-label="DuplicateAction"
        title={t('dashboardGroup.groupProductTableColumns.duplicateActionLink') as string}
        placement="top"
        arrow={true}
      >
        <IconButton
          sx={{
            pr: 0,
          }}
          onClick={() =>
            history.push(
              resolvePathVariables(
                DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.PARTY_GROUP_CLONE.path,
                {
                  partyId: party.partyId,
                  groupId: (p.row as PartyGroup).id,
                }
              )
            )
          }
        >
          <ArrowForwardIosIcon fontSize="small" sx={{ padding: '3px' }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
