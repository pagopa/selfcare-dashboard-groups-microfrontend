export default {
  session: {
    expired: {
      title: 'Sessione scaduta',
      message: 'Stai per essere rediretto alla pagina di login...',
    },
  },
  groupDetailPage: {
    path: {
      groupDescription: 'Gruppi',
    },
    title: 'Dettaglio Gruppo',
    backActionLabel: 'Indietro',
  },
  groupActions: {
    actionOnUser: "Azioni sull'utente",
    selectedGroupStatusSuspended: 'sospeso',
    selectedGroupStatusActive: 'riattivato',
    selectedGroupStatusErrorSuspended: 'sospensione',
    selectedGroupStatusErrorActive: 'riattivazione',
    editActionLabel: 'Modifica',
    groupActionActive: 'Riattiva',
    groupActionSuspend: 'Sospendi',
    groupDuplicateAction: 'Duplica',
    groupDeleteAction: 'Elimina',
    handleOpenDelete: {
      addNotify: {
        title: 'Elimina gruppo',
        message: `Stai per eliminare il gruppo <1>{{groupName}}</1>. <3/>Vuoi continuare?`,
        confirmLabel: 'Conferma',
        closeLabel: 'Annulla',
      },
    },
    onDelete: {
      toastComponentThen: {
        title: 'GRUPPO ELIMINATO',
        message: `Hai eliminato correttamente il gruppo <1>{{groupName}}</1>.`,
      },
      toastComponentCatch: {
        displayableTitle: "ERRORE DURANTE L'ELIMINAZIONE",
        displayableDescription: `C'è stato un errore durante l'eliminazione del gruppo <1>{{groupName}}</1>.`,
      },
    },
    handleOpen: {
      addNotify: {
        titleActive: 'Sospendi Gruppo',
        titleSuspended: 'Riabilita Gruppo',
        messageActive: 'Stai per sospendere il gruppo',
        messageSuspended: 'Stai per riabilitare il gruppo',
        messageGroup: ` <0>{{groupName}}</0> di <2>{{productTitle}}</2>.<4/>Vuoi continuare?`,
        confirmLabel: 'Conferma',
        closeLabel: 'Annulla',
      },
    },
    confirmChangeStatus: {
      updatePartyGroupStatusThen: {
        title: `GRUPPO {{selectedGroupStatus}}`,
        message: `Hai <1>{{selectedGroupStatus}}</1> correttamente il gruppo <3>{{groupName}}</3>.`,
      },
      updatePartyGroupStatusCatch: {
        displayableTitle: 'ERRORE DURANTE LA {{selectedGroupStatusError}} DEL GRUPPO ',
        displayableDescription: `C'è stato un errore durante la {{selectedGroupStatusError}} del gruppo <3>{{groupName}}</3>.`,
      },
    },
  },
  groupDetail: {
    name: 'NOME',
    description: 'DESCRIZIONE',
    product: 'PRODOTTO',
    referents: 'REFERENTI',
    creationDate: 'DATA CREAZIONE',
    createdByLabel: 'DA',
    modifiedAt: 'DATA ULTIMA MODIFICA',
    modifiedBy: 'DA',
    status: 'Sospeso',
  },
  groupMenu: {
    dissociateMenuItem: {
      label: 'Dissocia dal gruppo',
    },
    suspendMenuItem: {
      suspendLabel: 'Sospendi Referente',
      activeLabel: 'Riabilita Referente',
    },
    confirmAction: {
      titleSuspended: 'Sospendi Ruolo',
      titleActive: 'Riabilita Ruolo',
      message: `<0>{{transcodeProductRole2Title}}</0> di <2>{{productTitle}}</2> assegnato a <4>{{memberMame}}</4>.<6/>Vuoi continuare?`,
      messageActive: 'Stai per riabilitare il ruolo ',
      messageSuspended: 'Stai per sospendere il ruolo ',
      confirmLabel: 'Conferma',
      closeLabel: 'Annulla',
    },
    confirmChangeStatus: {
      selectedUserStatusSuspended: 'sospeso',
      selectedUserStatusActive: 'riabilitato',
      selectedUserStatusErrorSuspended: 'sospensione',
      selectedUserStatusErrorActive: 'riabilitazione',
      updatePartyUserStatusThen: {
        title: `REFERENTE {{selectedUserStatus}}`,
        message: `Hai <1>{{selectedUserStatus}}</1> correttamente <3>{{membersName}}</3>.`,
      },
      updatePartyUserStatusCatch: {
        displayableTitle: `ERRORE DURANTE LA {{selectedUserStatusError}} DELL'UTENTE `,
        displayableDescription: `C'è stato un errore durante la <1>{{selectedUserStatusError}}</1> dell'utente <3>{{memberName}}</3>.`,
      },
    },
    confirmDisociateAction: {
      title: 'Dissocia',
      message: `Stai per dissociare <1>{{memberName}}</1> dal gruppo <3>{{groupName}}</3> di <5>{{productTitle}}</5>.<7/> Vuoi continuare?`,
      confirmLabel: 'Conferma',
      closeLabel: 'Annulla',
    },
    confirmUserDissociation: {
      deleteGroupRelationThen: {
        title: 'UTENTE DISSOCIATO',
        message: ` Hai dissociato correttamente <1>{{memberName}}</1> dal gruppo <3>{{groupName}}</3>.`,
      },
      deleteGroupRelationCatch: {
        displayableTitle: "ERRORE DURANTE LA DISSOCIAZIONE DELL'UTENTE",
        displayableDescription: `C'è stato un errore durante la dissociazione dell'utente <1>{{memberName}}</1>.`,
      },
    },
  },
  membersGroup: {
    currentUser: ' (tu)',
  },
  dashboardGroupEdit: {
    alertRemoveUsersInClone: {
      label: `Alcuni referenti sono stati eliminati dal gruppo duplicato perchè <1> non presenti </1> nel prodotto selezionato o perchè <3>sospesi</3>. Puoi comunque assegnare altri referenti al gruppo duplicato.`,
    },
    groupForm: {
      formLabels: {
        groupName: 'Nome del gruppo',
        groupNameDuplicated: 'Questo nome è già in uso',
        groupNamePlaceholder: 'Inserisci il nome del gruppo',
        description: 'Descrizione',
        descriptionMaxLength: 'Max 200 caratteri',
        descriptionPlaceholder: 'Inserisci una descrizione',
        product: 'Prodotto',
        prductPlaceholter: 'Seleziona il prodotto',
        noProductSelected: 'Nessun prodotto selezionato',
        referents: 'Utenti',
        referentsPlaceholter: 'Seleziona gli utenti che vuoi associare al gruppo',
        cancelActionLabel: 'Indietro',
        confirmActionLabel: 'Conferma',
      },
      notifySuccessfulSave: {
        isEdit: 'Hai modificato correttamente il gruppo ',
        isClone: 'Hai duplicato correttamente il gruppo ',
        isCreate: 'Hai creato correttamente il gruppo ',
        message: `<0>{{valuesName}}</0> per il prodotto <2>{{productSelectedtitle}}</>`,
      },
      notifyErrorOnSave: {
        isEdit: 'ERRORE DURANTE LA MODIFICA ',
        isClone: 'ERRORE DURANTE LA DUPLICAZIONE',
        isCreate: 'ERRORE DURANTE LA CREAZIONE',
        displayableDescriptionEdit: `An error occurred while edit of group {{valuesName}}`,
        displayableDescriptionClone: `An error occurred while clone of group {{valuesName}}`,
        displayableDescriptionCreate: `An error occurred while creation of group {{valuesName}}`,
      },
      save: {
        groupNameAlreadyExists: 'Il nome che hai scelto per il nuovo gruppo è già in uso. Cambialo',
        isEdit: "C'è stato un errore durante la modifica del gruppo. Riprova.",
        isClone: "C'è stato un errore durante la duplicazione del gruppo. Riprova.",
        isCreate: "C'è stato un errore durante la creazione del gruppo. Riprova.",
      },
    },
    addGroupPage: {
      groupPathDescription: 'Gruppi',
      pathDescription: 'Crea un nuovo gruppo',
      title: 'Crea un nuovo gruppo',
      subTitle:
        'Inserisci i dati del gruppo, associa i relativi utenti e seleziona il prodotto che gestirà.',
    },
    cloneGroupPage: {
      groupPathDescription: 'Gruppi',
      pathDescription: 'Duplica gruppo',
      title: 'Duplica gruppo',
      subTitle: `Duplica il gruppo e modifica i dati`,
      placeholderDuplicateName: 'Copia di ',
    },
    editGroupPage: {
      groupPathDescription: 'Gruppi',
      pathDescription: 'Modifica gruppo',
      title: 'Modifica gruppo',
    },
  },
  dashboardGroup: {
    groupsPage: {
      title: 'Gruppi',
      subTitle:
        'I gruppi sono un insieme di utenti, per esempio appartenenti allo stesso ufficio o dipartimento, a cui si affida la gestione dei prodotti. Qui puoi consultare i gruppi dell’ente e creare di nuovi.',
    },
    addGroupButton: {
      createActionLabel: 'Crea gruppo',
    },
    noGroups: {
      noGroupsLabel: 'Non è ancora stato creato alcun Gruppo. <1><0>Crea un gruppo</0></1>',
    },
    groupProductRowActions: {
      toolTipActions: 'Seleziona il tipo di azione',
      modifyActionLink: 'Modifica',
      duplicateActionLink: 'Duplica',
      suspendActionLink: 'Sospendi',
      activateActionLink: 'Riattiva',
      askConfirm: {
        message: `{{message}} il gruppo <2>{{groupName}}</2> di <4>{{productTitle}}</4>.<6 />Vuoi continuare?`,
        confirmLabel: 'Conferma',
      },
      performAction: {
        updatePartyGroupStatusThen: {
          message: `{{message}} il gruppo <2>{{groupName}}</2>.`,
        },
        updatePartyGroupStatusCatch: {
          displayableTitle: 'ERRORE DURANTE LA {{selectedGroupStatusError}} DEL GRUPPO ',
          displayableDescription: `C'è stato un errore durante la {{selectedGroupStatusError}} del gruppo <3>{{groupName}}</3>.`,
          selectedGroupStatusErrorSuspended: 'sospensione ',
          selectedGroupStatusErrorActive: 'riattivazione ',
        },
      },
      handleChangeState: {
        askConfirmSuspend: 'Sospendi Gruppo',
        askConfirmActive: 'Riattiva Gruppo',
        askConfirmBeforeSuspend: 'Stai per sospendere',
        askConfirmBeforeActive: 'Stai per riattivare',
      },
      updateStatus: {
        nextStatusSuspended: 'sospeso',
        nextStatusActive: 'riattivato',
        performActionTitle: `GRUPPO {{selectedUserStatus}}`,
        performActionActionMessage: `Hai {{selectedUserStatus}} correttamente`,
      },
      handleDelete: {
        askConfirmDeleted: 'Elimina Gruppo',
        askConfirmBeforeDeleted: 'Stai per eliminare',
      },
      deleteGroup: {
        performActionTitle: 'GRUPPO ELIMINATO',
        performActionMessage: 'Hai eliminato correttamente',
      },
    },
    groupProductTableColumns: {
      duplicateActionLink: 'Duplica',
      headerFields: {
        name: 'NOME',
        description: 'DESCRIZIONE',
        product: 'PRODOTTO',
        referents: 'N. REFERENTI',
      },
    },
    groupsProductFetchError: {
      message: `Spiacenti, qualcosa è andato storto. <1><0>Riprova</0></1>.`,
    },
    groupsTableLoadMoreData: {
      loadMoreMessage: 'Carica altri',
    },
  },
};
