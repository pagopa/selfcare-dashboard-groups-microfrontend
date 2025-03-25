import CopyAllIcon from '@mui/icons-material/CopyAll';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Box, Stack } from '@mui/material';
import { ButtonNaked, theme } from '@pagopa/mui-italia';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/lib/hooks/useErrorDispatcher';
import useLoading from '@pagopa/selfcare-common-frontend/lib/hooks/useLoading';
import useUserNotify from '@pagopa/selfcare-common-frontend/lib/hooks/useUserNotify';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { Trans, useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { Party } from '../../../model/Party';
import { PartyGroupDetail, PartyGroupStatus } from '../../../model/PartyGroup';
import { Product, ProductsMap } from '../../../model/Product';
import { DASHBOARD_GROUPS_ROUTES } from '../../../routes';
import { deletePartyGroup, updatePartyGroupStatus } from '../../../services/groupsService';
import { LOADING_TASK_UPDATE_PARTY_USER_STATUS } from '../../../utils/constants';

type Props = {
  partyGroup: PartyGroupDetail;
  isSuspended: boolean;
  party: Party;
  product: Product;
  productsMap: ProductsMap;
  onGroupStatusUpdate: (nextGroupStatus: PartyGroupStatus) => void;
  nextGroupStatus: PartyGroupStatus | undefined;
  canEdit: boolean;
  goEdit: () => void;
};
export default function GroupActions({
  partyGroup,
  isSuspended,
  party,
  product,
  productsMap,
  onGroupStatusUpdate,
  nextGroupStatus,
  canEdit,
  goEdit,
}: Readonly<Props>) {
  const activeGroup = partyGroup.status === 'ACTIVE';
  const setLoading = useLoading(LOADING_TASK_UPDATE_PARTY_USER_STATUS);
  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();
  const history = useHistory();
  const { t } = useTranslation();
  const isMobile = useIsMobile('md');

  const selectedGroupStatus =
    nextGroupStatus === 'SUSPENDED'
      ? t('groupActions.selectedGroupStatusSuspended')
      : t('groupActions.selectedGroupStatusActive');
  const selectedGroupStatusError =
    partyGroup.status === 'SUSPENDED'
      ? t('groupActions.selectedGroupStatusErrorSuspended')
      : t('groupActions.selectedGroupStatusErrorActive');

  const handleOpenDelete = () => {
    addNotify({
      component: 'SessionModal',
      id: 'Notify_Example',
      title: t('groupActions.handleOpenDelete.addNotify.title'),
      message: (
        <Box>
          <Trans
            i18nKey="groupActions.handleOpenDelete.addNotify.message"
            values={{ groupName: partyGroup.name, productName: product.title }}
            components={{ 1: <strong />, 3: <strong /> }}
          >
            {`Vuoi eliminare il gruppo <1>{{groupName}}</1> di <3>{{productName}}</3>?`}
          </Trans>
          {partyGroup.productId === 'prod-io' && (
            <Box pt={1}>
              <Trans
                i18nKey="groupActions.warningMessageIo"
                components={{ 1: <strong />, 2: <br /> }}
              >
                {`<1>Attenzione!</1><2/> Questa operazione potrebbe interrompere alcune funzionalità legate a un'API Key su IO. Procedi solo se il gruppo non è più necessario.`}
              </Trans>
            </Box>
          )}
        </Box>
      ),
      confirmLabel: t('groupActions.handleOpenDelete.addNotify.confirmLabel'),
      closeLabel: t('groupActions.handleOpenDelete.addNotify.closeLabel'),
      onConfirm: onDelete,
    });
  };

  const onDelete = () => {
    setLoading(true);
    deletePartyGroup(party, product, partyGroup)
      .then((_) => {
        history.push(
          resolvePathVariables(DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.path, {
            partyId: partyGroup.partyId,
          })
        );
        addNotify({
          component: 'Toast',
          id: 'DELETE_PARTY_USER',
          title: t('groupActions.title'),
          message: '',
        });
      })
      .catch((reason) =>
        addError({
          component: 'Toast',
          id: `DELETE_PARTY_GROUP_ERROR-${partyGroup.id}`,
          displayableTitle: t('groupActions.onDelete.toastComponentCatch.displayableTitle'),
          techDescription: `C'è stato un errore durante l'eliminazione del gruppo ${partyGroup.name}`,
          blocking: false,
          error: reason,
          toNotify: true,
          displayableDescription: (
            <Trans
              i18nKey="groupActions.onDelete.toastComponentCatch.displayableDescription"
              values={{ groupName: partyGroup.name }}
              component={{ 1: <strong /> }}
            >
              {`C'è stato un errore durante l'eliminazione del gruppo <1>{{groupName}}</1>.`}
            </Trans>
          ),
        })
      )
      .finally(() => setLoading(false));
  };

  const handleOpen = () => {
    addNotify({
      component: 'SessionModal',
      id: 'Notify_Example',
      title: activeGroup
        ? t('groupActions.handleOpen.addNotify.titleActive')
        : t('groupActions.handleOpen.addNotify.titleSuspended'),
      message: (
        <>
          {activeGroup
            ? t('groupActions.handleOpen.addNotify.messageActive')
            : t('groupActions.handleOpen.addNotify.messageSuspended')}
          <Trans
            i18nKey={
              activeGroup
                ? 'groupActions.handleOpen.addNotify.messageGroupActive'
                : 'groupActions.handleOpen.addNotify.messageGroupSuspended'
            }
            values={{
              groupName: partyGroup.name,
              productTitle: productsMap[partyGroup.productId].title,
            }}
            components={{ 1: <strong />, 3: <strong />, 5: <br /> }}
          >
            {` <1>{{groupName}}</1> di <2>{{productTitle}}</2>? <4/>Puoi riattivarlo in qualsiasi momento.`}
          </Trans>
          {partyGroup.productId === 'prod-io' && (
            <Box pt={1}>
              <Trans
                i18nKey="groupActions.warningMessageIo"
                components={{ 1: <strong />, 2: <br /> }}
              >
                {`<1>Attenzione!</1><2/> Questa operazione potrebbe interrompere alcune funzionalità legate a un'API Key su IO. Procedi solo se il gruppo non è più necessario.`}
              </Trans>
            </Box>
          )}
        </>
      ),
      confirmLabel:
        partyGroup.status === 'ACTIVE'
          ? t('groupActions.handleOpen.addNotify.confirmLabelSuspend')
          : t('groupActions.handleOpen.addNotify.confirmLabelActive'),
      closeLabel: t('groupActions.handleOpen.addNotify.closeLabel'),
      onConfirm: confirmChangeStatus,
    });
  };

  const confirmChangeStatus = () => {
    if (!nextGroupStatus) {
      addError({
        id: 'INVALID_STATUS_TRANSITION',
        blocking: false,
        error: new Error('INVALID_STATUS_TRANSITION'),
        techDescription: `Invalid status transition while updating group (${partyGroup.id})`,
        toNotify: true,
      });
      return;
    }
    setLoading(true);
    updatePartyGroupStatus(party, product, partyGroup, nextGroupStatus)
      .then((_) => {
        onGroupStatusUpdate(nextGroupStatus);
        addNotify({
          id: 'ACTION_ON_PARTY_GROUP_COMPLETED',
          title: t('groupActions.confirmChangeStatus.updatePartyGroupStatusThen.title', {
            selectedGroupStatus: `${selectedGroupStatus}`,
          }),
          message: (
            <Trans i18nKey="groupActions.confirmChangeStatus.updatePartyGroupStatusThen.message"></Trans>
          ),
          component: 'Toast',
        });
      })
      .catch((reason) =>
        addError({
          component: 'Toast',
          id: `'UPDATE_PARTY_GROUP_ERROR-${partyGroup.id}`,
          displayableTitle: t(
            'groupActions.confirmChangeStatus.updatePartyGroupStatusCatch.displayableTitle',
            {
              selectedGroupStatusError: `${selectedGroupStatusError}`,
            }
          ),
          techDescription: `C'è stato un errore durante la ${selectedGroupStatusError} del gruppo (${partyGroup.name}) con id (${partyGroup.id}): ${partyGroup.status}`,
          blocking: false,
          error: reason,
          toNotify: true,
          displayableDescription: (
            <Trans
              i18nKey="groupActions.confirmChangeStatus.updatePartyGroupStatusCatch.displayableDescription"
              values={{ selectedGroupStatusError, groupName: partyGroup.name }}
              components={{ 1: <strong /> }}
            >
              {`C'è stato un errore durante la
                {{ selectedGroupStatusError }}
                del gruppo
                <1>{partyGroup.name}</1>.`}
            </Trans>
          ),
        })
      )
      .finally(() => setLoading(false));
  };

  const handleOpenDuplicate = () => {
    addNotify({
      component: 'SessionModal',
      id: 'Notify_Example',
      title: t('groupActions.handleDuplicate.addNotify.title'),
      message: (
        <Trans
          i18nKey="groupActions.handleDuplicate.addNotify.message"
          values={{ groupName: partyGroup.name, productName: product.title }}
          components={{ 1: <strong />, 3: <strong /> }}
        >
          {`Vuoi duplicare il gruppo <1>{{groupName}}</1> di <3>{{productName}}</3>?`}
        </Trans>
      ),
      confirmLabel: t('groupActions.handleDuplicate.addNotify.confirmLabel'),
      closeLabel: t('groupActions.handleDuplicate.addNotify.closeLabel'),
      onConfirm: onDuplicate,
    });
  };

  const onDuplicate = () =>
    history.push(
      resolvePathVariables(DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.PARTY_GROUP_CLONE.path, {
        partyId: partyGroup.partyId,
        groupId: partyGroup.id,
      })
    );

  return (
    <Stack
      direction="row"
      spacing={isMobile ? 0 : 4}
      sx={{
        [theme.breakpoints.down('sm')]: {
          flexWrap: 'wrap',
        },
      }}
    >
      {canEdit && (
        <ButtonNaked
          component="button"
          onClick={handleOpenDelete}
          startIcon={<DeleteOutlinedIcon />}
          sx={{
            color: 'primary.main',
            [theme.breakpoints.down('md')]: {
              marginRight: 4,
            },
          }}
          weight="default"
        >
          {t('groupActions.groupDeleteAction')}
        </ButtonNaked>
      )}

      {!isSuspended && canEdit && (
        <ButtonNaked
          component="button"
          onClick={goEdit}
          startIcon={<EditIcon />}
          sx={{
            color: 'primary.main',
            [theme.breakpoints.down('md')]: {
              marginRight: 4,
            },
          }}
          weight="default"
        >
          {t('groupActions.editActionLabel')}
        </ButtonNaked>
      )}
      {canEdit && (
        <ButtonNaked
          component="button"
          onClick={handleOpen}
          startIcon={isSuspended ? <RestartAltIcon /> : <HourglassEmptyIcon />}
          sx={{
            color: 'primary.main',
            [theme.breakpoints.down('md')]: {
              marginRight: 4,
            },
            [theme.breakpoints.down('sm')]: {
              marginRight: '22px',
            },
          }}
          weight="default"
        >
          {partyGroup.status === 'SUSPENDED'
            ? t('groupActions.groupActionActive')
            : partyGroup.status === 'ACTIVE'
              ? t('groupActions.groupActionSuspend')
              : ''}
        </ButtonNaked>
      )}
      {!isSuspended && (
        <ButtonNaked
          component="button"
          onClick={handleOpenDuplicate}
          startIcon={<CopyAllIcon />}
          sx={{
            color: 'primary.main',
          }}
          weight="default"
        >
          {t('groupActions.groupDuplicateAction')}
        </ButtonNaked>
      )}
    </Stack>
  );
}
