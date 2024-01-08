import { Stack } from '@mui/material';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import useUserNotify from '@pagopa/selfcare-common-frontend/hooks/useUserNotify';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useHistory } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { ButtonNaked, theme } from '@pagopa/mui-italia';
import { deletePartyGroup, updatePartyGroupStatus } from '../../../services/groupsService';
import { LOADING_TASK_UPDATE_PARTY_USER_STATUS } from '../../../utils/constants';
import { PartyGroupDetail, PartyGroupStatus } from '../../../model/PartyGroup';
import { Party } from '../../../model/Party';
import { Product, ProductsMap } from '../../../model/Product';
import { DASHBOARD_GROUPS_ROUTES } from '../../../routes';
import { useIsMobile } from '../../../hooks/useIsMobile';

type Props = {
  partyGroup: PartyGroupDetail;
  isSuspended: boolean;
  goBack: () => void;
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
  goBack,
  party,
  product,
  productsMap,
  onGroupStatusUpdate,
  nextGroupStatus,
  canEdit,
  goEdit,
}: Props) {
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
        <>
          <Trans
            i18nKey="groupActions.handleOpenDelete.addNotify.message"
            value={{ groupName: partyGroup.name, productName: product.title }}
          >
            Vuoi eliminare il gruppo <strong>{partyGroup.name}</strong> di
            <strong>{product.title}</strong>?
          </Trans>
        </>
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
        goBack();
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
            <>
              <Trans
                i18nKey="groupActions.onDelete.toastComponentCatch.displayableDescription"
                value={{ groupName: partyGroup.name }}
              >
                C&apos;è stato un errore durante l&apos;eliminazione del gruppo
                <strong>{partyGroup.name}</strong>.
              </Trans>
            </>
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
            value={{
              groupName: partyGroup.name,
              productTitle: productsMap[partyGroup.productId].title,
            }}
          >
            <strong>{partyGroup.name}</strong>
            di
            <strong>{productsMap[partyGroup.productId].title}</strong>
            .
            <br />
            Puoi riattivarlo in qualsiasi momento.
          </Trans>
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
            <>
              <Trans i18nKey="groupActions.confirmChangeStatus.updatePartyGroupStatusThen.message"></Trans>
            </>
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
            <>
              <Trans
                i18nKey="groupActions.confirmChangeStatus.updatePartyGroupStatusCatch.displayableDescription"
                value={{ groupName: partyGroup.name }}
              >
                C&apos;è stato un errore durante la
                {{ selectedGroupStatusError }}
                del gruppo
                <strong>{partyGroup.name}</strong>.
              </Trans>
            </>
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
        <>
          <Trans
            i18nKey="groupActions.handleDuplicate.addNotify.message"
            value={{ groupName: partyGroup.name, productName: product.title }}
          >
            Vuoi duplicare il gruppo <strong>{partyGroup.name}</strong> di
            <strong>{product.title}</strong>?
          </Trans>
        </>
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
