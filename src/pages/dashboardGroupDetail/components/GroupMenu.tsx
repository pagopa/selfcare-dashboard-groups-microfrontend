import { Box, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import useLoading from '@pagopa/selfcare-common-frontend/lib/hooks/useLoading';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/lib/hooks/useErrorDispatcher';
import { useState } from 'react';
import useUserNotify from '@pagopa/selfcare-common-frontend/lib/hooks/useUserNotify';
import { useTranslation, Trans } from 'react-i18next';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PartyProductUser, PartyUserProduct, PartyUserProductRole } from '../../../model/PartyUser';
import { deleteGroupRelation } from '../../../services/groupsService';
import { LOADING_TASK_UPDATE_PARTY_USER_STATUS } from '../../../utils/constants';
import { Party, UserStatus } from '../../../model/Party';
import { Product } from '../../../model/Product';
import { PartyGroupDetail } from '../../../model/PartyGroup';
import { updatePartyUserStatus } from '../../../services/usersService';
import { ProductRolesLists, transcodeProductRole2Title } from '../../../model/ProductRole';

type Props = {
  member: PartyProductUser;
  party: Party;
  product: Product;
  partyGroup: PartyGroupDetail;
  userProduct: PartyUserProduct | undefined;
  isSuspended: boolean;
  productRolesLists: ProductRolesLists;
  onMemberStatusUpdate: (
    member: PartyProductUser,
    userProduct: PartyUserProduct,
    nextStatus: UserStatus
  ) => void;
  onMemberDelete: (member: PartyProductUser) => void;
  canEdit: boolean;
};
export default function GroupMenu({
  member,
  party,
  productRolesLists,
  product,
  partyGroup,
  userProduct,
  isSuspended,
  onMemberStatusUpdate,
  onMemberDelete,
  canEdit,
}: Props) {
  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();
  const { t } = useTranslation();

  const setLoading = useLoading(LOADING_TASK_UPDATE_PARTY_USER_STATUS);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const role = userProduct?.roles[0];

  const confirmAction = () => {
    handleClose();
    addNotify({
      component: 'SessionModal',
      id: 'CHANGE_ROLE_STATUS_MODAL',
      title:
        role?.status === 'ACTIVE'
          ? t('groupMenu.confirmAction.suspend.title')
          : t('groupMenu.confirmAction.reactivate.title'),
      message: (
        <>
          {role?.status === 'ACTIVE' ? (
            <Trans
              i18nKey="groupMenu.confirmAction.suspend.message"
              values={{
                memberName: `${party && member.name.toLocaleLowerCase()} ${member.surname}`,
                transcodeProductRole2Title: transcodeProductRole2Title(
                  role?.role as string,
                  productRolesLists
                ).toLocaleLowerCase(),
                productTitle: product.title,
              }}
              components={{ 1: <strong />, 3: <strong />, 8: <strong /> }}
            >
              {`Vuoi sospendere <1>{{memberName}}</1> dal ruolo di <3>{{transcodeProductRole2Title}}</3>? <5 /> Se lo sospendi, non potrà più operare su <8>{{productTitle}}</8>. <10 />Puoi riabilitarlo in qualsiasi momento.`}
            </Trans>
          ) : (
            <Trans
              i18nKey="groupMenu.confirmAction.reactivate.message"
              values={{
                memberName: `${party && member.name.toLocaleLowerCase()} ${member.surname}`,
                transcodeProductRole2Title: transcodeProductRole2Title(
                  role?.role as string,
                  productRolesLists
                ).toLocaleLowerCase(),
                productTitle: product.title,
              }}
              components={{ 1: <strong />, 3: <strong />, 8: <strong /> }}
            >
              {`Vuoi riabilitare <1>{{memberName}}</1> nel ruolo di <3>{{transcodeProductRole2Title}}</3>? <5 /> Se lo riabiliti, potrà operare di nuovo su <8>{{productTitle}}</8>. <10 />Puoi sospenderlo di nuovo in qualsiasi momento.`}
            </Trans>
          )}
        </>
      ),
      confirmLabel:
        role?.status === 'ACTIVE'
          ? t('groupMenu.confirmAction.suspend.confirmLabel')
          : t('groupMenu.confirmAction.reactivate.confirmLabel'),
      closeLabel: t('groupMenu.confirmAction.closeLabel'),
      onConfirm: confirmChangeStatus,
    });
  };

  const confirmChangeStatus = () => {
    const nextStatus: UserStatus | undefined =
      role?.status === 'ACTIVE' ? 'SUSPENDED' : role?.status === 'SUSPENDED' ? 'ACTIVE' : undefined;
    const selectedUserStatus =
      nextStatus === 'SUSPENDED'
        ? t('groupMenu.confirmChangeStatus.selectedUserStatusSuspended')
        : t('groupMenu.confirmChangeStatus.selectedUserStatusActive');
    const selectedUserStatusError =
      role?.status === 'SUSPENDED'
        ? t('groupMenu.confirmChangeStatus.selectedUserStatusErrorSuspended')
        : t('groupMenu.confirmChangeStatus.selectedUserStatusErrorActive');

    if (!nextStatus) {
      addError({
        id: 'INVALID_STATUS_TRANSITION',
        blocking: false,
        error: new Error('INVALID_STATUS_TRANSITION'),
        techDescription: `Invalid status transition while updating party (${party.partyId}) user (${member.id}): ${member.status}`,
        toNotify: true,
      });

      return;
    }

    setLoading(true);
    updatePartyUserStatus(
      party,
      member,
      userProduct as PartyUserProduct,
      role as PartyUserProductRole,
      nextStatus
    )
      .then((_) => {
        onMemberStatusUpdate(member, userProduct as PartyUserProduct, nextStatus);
        addNotify({
          id: 'ACTION_ON_PARTY_USER_COMPLETED',
          title: t('groupMenu.confirmChangeStatus.updatePartyUserStatusThen.title', {
            selectedUserStatus: `${selectedUserStatus}`,
          }),
          message: '',
          component: 'Toast',
        });
      })
      .catch((reason) =>
        addError({
          component: 'Toast',
          id: `UPDATE_PARTY_USER_ERROR-${member.id}`,
          displayableTitle: t(
            'groupMenu.confirmChangeStatus.updatePartyUserStatusCatch.displayableTitle',
            {
              selectedUserStatusError: `${selectedUserStatusError}${member.id}`,
            }
          ),
          techDescription: `C'è stato un errore durante la ${selectedUserStatusError} dell'utente (${member.id}): ${member.status}`,
          blocking: false,
          error: reason,
          toNotify: true,
          displayableDescription: '',
        })
      )
      .finally(() => setLoading(false));
  };

  const confirmDissociateAction = () => {
    handleClose();
    addNotify({
      component: 'SessionModal',
      id: 'DISSOCIATE_ACTION_MODAL',
      title: t('groupMenu.confirmDissociateAction.title'),
      message: (
        <>
          <Trans
            i18nKey="groupMenu.confirmDissociateAction.message"
            values={{
              member: `${member.name} ${member.surname}`,
              groupName: partyGroup.name,
              productTitle: product.title,
            }}
            components={{ 1: <strong />, 3: <strong />, 5: <strong /> }}
          >
            {`Vuoi rimuovere <1>{{member}}</1> dal gruppo <3>{{groupName}}</3> di <5>{{productTitle}}</5>? Puoi aggiungerlo nuovamente in qualsiasi momento.`}
          </Trans>
        </>
      ),
      confirmLabel: t('groupMenu.confirmDissociateAction.confirmLabel'),
      closeLabel: t('groupMenu.confirmDissociateAction.closeLabel'),
      onConfirm: confirmUserDissociation,
    });
  };

  const confirmUserDissociation = () => {
    setLoading(true);
    deleteGroupRelation(party, product, partyGroup, member.id)
      .then((_) => {
        handleClose();
        onMemberDelete(member);
        addNotify({
          id: 'ACTION_ON_PARTY_USER_COMPLETED',
          title: t('groupMenu.confirmUserDissociation.deleteGroupRelationThen.title'),
          message: undefined,
          component: 'Toast',
        });
      })
      .catch((reason) =>
        addError({
          component: 'Toast',
          id: `DISSOCIATE_PARTY_USER_ERROR-${member.id}`,
          displayableTitle: t(
            'groupMenu.confirmUserDissociation.deleteGroupRelationCatch.displayableTitle'
          ),
          techDescription: `C'è stato un errore durante la dissociazione dell'utente (${member.id})`,
          blocking: false,
          error: reason,
          toNotify: true,
          displayableDescription: (
            <>
              <Trans i18nKey="groupMenu.confirmUserDissociation.deleteGroupRelationCatch.displayableDescription"></Trans>
            </>
          ),
        })
      )
      .finally(() => setLoading(false));
  };
  const itemBoxHover = { width: '100%', p: 2 };
  return (
    <>
      {!member.isCurrentUser && canEdit && (
        <Grid item xs={1} display="flex" justifyContent="flex-start">
          <Tooltip
            aria-label="ActionsOnTheUser"
            title={t('groupActions.actionOnUser') as string}
            placement="top"
            arrow={true}
          >
            <IconButton
              sx={{
                p: '0px',
                '&:hover': { backgroundColor: 'transparent' },
              }}
              disableRipple
              onClick={handleClick}
              disabled={isSuspended}
            >
              <MoreVertIcon
                fontSize="medium"
                sx={{ color: isSuspended ? 'text.disabled' : 'primary.main', padding: '3px' }}
              />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '16.5ch',
            paddingTop: '0px',
            paddingBottom: '0px',
          },
        }}
      >
        <Box width="100%" display="flex" justifyContent="start">
          <MenuItem onClick={confirmDissociateAction} sx={itemBoxHover}>
            <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
              {t('groupMenu.dissociateMenuItem.label')}
            </Typography>
          </MenuItem>
        </Box>
        {userProduct?.roles.length === 1 && !member.isCurrentUser && (
          <Box key={userProduct.id}>
            <Box width="100%" display="flex" justifyContent="start">
              <MenuItem onClick={confirmAction} sx={itemBoxHover}>
                <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                  {role?.status === 'ACTIVE'
                    ? t('groupMenu.suspendMenuItem.suspendLabel')
                    : role?.status === 'SUSPENDED'
                    ? t('groupMenu.suspendMenuItem.activeLabel')
                    : ''}
                </Typography>
              </MenuItem>
            </Box>
          </Box>
        )}
      </Menu>
    </>
  );
}
