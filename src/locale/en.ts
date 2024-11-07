export default {
  session: {
    expired: {
      title: 'Session expired',
      message: 'You are being redirected to the login page...',
    },
  },
  groupDetailPage: {
    path: {
      groupDescription: 'Groups',
      selectedGroupDescription: 'Registry office',
    },
    title: 'Registry office',
    backActionLabel: 'Go back',
    usersGroupSection: {
      title: 'Users',
      headerFields: {
        name: 'Name',
        email: 'Email',
        role: 'Role',
      },
    },
    addUser: 'Add user',
  },
  groupActions: {
    title: 'Group deleted correctly',
    actionOnUser: "User actions",
    selectedGroupStatusSuspended: 'suspended',
    selectedGroupStatusActive: 'reactivated',
    selectedGroupStatusErrorSuspended: 'suspension',
    selectedGroupStatusErrorActive: 'reactivation',
    editActionLabel: 'Change',
    groupActionActive: 'Reactivate',
    groupActionSuspend: 'Suspend',
    groupDuplicateAction: 'Copy',
    groupDeleteAction: 'Delete',
    handleOpenDelete: {
      addNotify: {
        title: 'Delete group',
        message: `Vuoi eliminare il gruppo <1>{{groupName}}</1> di <3>{{productName}}</3>?`,
        confirmLabel: 'Delete',
        closeLabel: 'Cancel',
      },
    },
    onDelete: {
      toastComponentThen: {
        title: 'Group deleted correctly',
      },
      toastComponentCatch: {
        displayableTitle: "ERROR WHEN DELETING",
        displayableDescription: `C'è stato un errore durante l'eliminazione del gruppo <1>{{groupName}}</1>.`,
      },
    },
    handleOpen: {
      addNotify: {
        titleActive: 'Suspend group',
        titleSuspended: 'Reactivate group',
        messageActive: 'You want to suspend the group',
        messageSuspended: 'You want to reactivate the group',
        messageGroupActive: ` <1>{{groupName}}</1> di <3>{{productTitle}}</3>? <5/>Puoi riattivarlo in qualsiasi momento.`,
        messageGroupSuspended: ` <1>{{groupName}}</1> di <3>{{productTitle}}</3>? <5/>Puoi sospenderlo di nuovo in qualsiasi momento.`,
        confirmLabelSuspend: 'Suspend',
        confirmLabelActive: 'Reactivate',
        closeLabel: 'Cancel',
      },
    },
    handleDuplicate: {
      addNotify: {
        title: 'Copy group',
        message: `Vuoi duplicare il gruppo <1>{{groupName}}</1> di <3>{{productName}}</3>?`,
        confirmLabel: 'Copy',
        closeLabel: 'Cancel',
      },
    },
    warningMessageIo: `<1>Attenzione!</1><2/> Questa operazione potrebbe interrompere alcune funzionalità legate a un'API Key su IO. Procedi solo se il gruppo non è più necessario.`,
    confirmChangeStatus: {
      updatePartyGroupStatusThen: {
        title: `Gruppo {{selectedGroupStatus}} correttamente`,
        message: ``,
      },
      updatePartyGroupStatusCatch: {
        displayableTitle: 'It was not possible to suspend the group. Try again.',
        displayableDescription: `C'è stato un errore durante la
        {{ selectedGroupStatusError }}
        del gruppo
        <1>{partyGroup.name}</1>.`,
      },
    },
  },
  groupDetail: {
    description: 'Description',
    product: 'Product',
    creationDate: 'Created by - on',
    createdByLabel: 'BY',
    modifiedAt: 'Changed by - on',
    modifiedBy: 'BY',
    status: 'Suspended',
    userLabel: 'user',
    usersLabel: 'users',
    emptyGroup: 'No user has been added yet. <1>Add a user</1>',
  },
  groupMenu: {
    dissociateMenuItem: {
      label: 'Remove from the group',
    },
    suspendMenuItem: {
      suspendLabel: 'Suspend role',
      activeLabel: 'Re-enable role',
    },
    confirmAction: {
      suspend: {
        title: 'Suspend role',
        message:
          'Vuoi sospendere <1>{{memberName}}</1> dal ruolo di <3>{{transcodeProductRole2Title}}</3>? <5 /> Se lo sospendi, non potrà più operare su <8>{{productTitle}}</8>. <10 />Puoi riabilitarlo in qualsiasi momento.',
        confirmLabel: 'Suspend',
      },
      reactivate: {
        title: 'Re-enable role',
        message:
          'Vuoi riabilitare <1>{{memberName}}</1> nel ruolo di <3>{{transcodeProductRole2Title}}</3>? <5 /> Se lo riabiliti, potrà operare di nuovo su <8>{{productTitle}}</8>. <10 />Puoi sospenderlo di nuovo in qualsiasi momento.',
        confirmLabel: 'Re-enable',
      },
      closeLabel: 'Cancel',
    },
    confirmChangeStatus: {
      selectedUserStatusSuspended: 'suspended',
      selectedUserStatusActive: 're-enabled',
      selectedUserStatusErrorSuspended: 'suspension',
      selectedUserStatusErrorActive: 're-enabling',
      updatePartyUserStatusThen: {
        title: `Ruolo {{selectedUserStatus}} correttamente. `,
        message: '',
      },
      updatePartyUserStatusCatch: {
        displayableTitle: `Non è stato possibile sospendere il ruolo. Riprova.`,
        displayableDescription: ``,
      },
    },
    confirmDissociateAction: {
      title: 'Remove',
      message: `Vuoi rimuovere <1>{{member}}</1> dal gruppo <3>{{groupName}}</3> di <5>{{productTitle}}</5>? Puoi aggiungerlo nuovamente in qualsiasi momento.`,
      confirmLabel: 'Remove',
      closeLabel: 'Cancel',
    },
    confirmUserDissociation: {
      deleteGroupRelationThen: {
        title: 'User removed correctly.',
      },
      deleteGroupRelationCatch: {
        displayableTitle: 'It was not possible to remove the user. Try again.',
        displayableDescription: ``,
      },
    },
  },
  membersGroup: {
    currentUser: ' (you)',
  },
  dashboardGroupEdit: {
    alertRemoveUsersInClone: {
      label: `Alcuni utenti sono stati rimossi dal gruppo duplicato perché non presenti nel prodotto <1 /> selezionato. Puoi comunque assegnare altri utenti al gruppo duplicato.`,
    },
    groupForm: {
      formLabels: {
        groupName: 'Enter the name of the group',
        groupNameDuplicated: 'This name is already being used',
        description: 'Describe the group and indicate its function',
        productPlaceholder: 'Select the product',
        descriptionMaxLength: 'Max 200 characters',
        noProductSelected: 'No product selected',
        referentsPlaceholder: 'Select the users you want to associate with the group',
        cancelActionLabel: 'Go back',
        confirmActionLabel: 'Confirm',
      },
      notifySuccessfulSave: {
        isEdit: 'You changed the group correctly ',
        isClone: 'You copied the group correctly ',
        isCreate: 'You created the group correctly ',
        message: `<0>{{valuesName}}</0> per il prodotto <2>{{productSelectedtitle}}</>`,
      },
      notifyErrorOnSave: {
        isEdit: 'It was not possible to change the group. Try again. ',
        isClone: 'It was not possible to copy the group. Try again.',
        isCreate: 'It was not possible to create the group. Try again.',
        displayableDescriptionEdit: `An error occurred while edit of group {{valuesName}}`,
        displayableDescriptionClone: `An error occurred while clone of group {{valuesName}}`,
        displayableDescriptionCreate: `An error occurred while creation of group {{valuesName}}`,
      },
      save: {
        groupNameAlreadyExists: 'The selected name is already being used. Select a new name.',
        isEdit: "There was an error when changing the group. Try again.",
        isClone: "There was an error when copying the group. Try again.",
        isCreate: "There was an error when creating the group. Try again.",
      },
      outcome: {
        created: 'Group created correctly',
        modified: 'Group changed correctly',
        duplicate: 'Group copied correctly',
      },
    },
    addGroupPage: {
      groupPathDescription: 'Groups',
      pathDescription: 'Create a new group',
      title: 'Create a new group',
      subTitle:
        'Inserisci i dati del gruppo, associa i relativi utenti e seleziona il prodotto da gestire.',
      pnpgSubTitle:
        'Inserisci il nome, la descrizione del gruppo e gli utenti che vuoi associarvi.',
    },
    cloneGroupPage: {
      groupPathDescription: 'Groups',
      pathDescription: 'Copy group',
      title: 'Copy group',
      subTitle: `Duplica il gruppo e modifica i dati`,
      placeholderDuplicateName: 'Copy of ',
    },
    editGroupPage: {
      groupPathDescription: 'Groups',
      pathDescription: 'Change group',
      title: 'Change group',
    },
  },
  dashboardGroup: {
    groupsPage: {
      title: 'Groups',
      subTitle:
        'I gruppi sono un insieme di utenti, per esempio appartenenti allo stesso ufficio o dipartimento, a cui si affida la gestione dei prodotti. Qui puoi consultare i gruppi dell’ente e creare di nuovi.',
      subTitlePnpg:
        'I gruppi sono un insieme di utenti, per esempio appartenenti allo stesso ufficio o dipartimento, a cui si affida la gestione delle notifiche. Qui puoi gestire i gruppi dell’impresa e crearne di nuovi.',
      tabAll: 'All',
    },
    addGroupButton: {
      createActionLabel: 'Create group',
    },
    noGroups: {
      createGroup: 'No group was created yet. <1><0>Create a group</0></1>',
      noGroupsForProduct: 'No group was created yet for this product.',
    },
    groupProductTableColumns: {
      duplicateActionLink: 'Copy',
      headerFields: {
        name: 'Name',
        description: 'Description',
        referents: 'no. users',
      },
    },
    groupsProductFetchError: {
      message: `Spiacenti, qualcosa è andato storto. <1><0>Riprova</0></1>.`,
    },
    groupsTableLoadMoreData: {
      loadMoreMessage: 'Load others',
    },
  },
};
