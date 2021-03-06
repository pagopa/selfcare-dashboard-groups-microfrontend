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
      selectedGroupDescription: 'Anagrafe',
    },
    title: 'Anagrafe',
    backActionLabel: 'Indietro',
    usersTitle: 'Utenti',
    addUser: 'Aggiungi utente',
  },
  groupActions: {
    title: 'Gruppo eliminato correttamente',
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
        message: `Vuoi eliminare il gruppo <1>{{groupName}}</1> di <3>{{productName}}</3>?`,
        confirmLabel: 'Conferma',
        closeLabel: 'Annulla',
      },
    },
    onDelete: {
      toastComponentThen: {
        title: 'Gruppo eliminato correttamente',
      },
      toastComponentCatch: {
        displayableTitle: "ERRORE DURANTE L'ELIMINAZIONE",
        displayableDescription: `C'è stato un errore durante l'eliminazione del gruppo <1>{{groupName}}</1>.`,
      },
    },
    handleOpen: {
      addNotify: {
        titleActive: 'Sospendi gruppo',
        titleSuspended: 'Riattiva gruppo',
        messageActive: 'Vuoi sospendere il gruppo',
        messageSuspended: 'Vuoi riattivare il gruppo',
        messageGroupActive: ` <0>{{groupName}}</0> di <2>{{productTitle}}</2>? <4/>Puoi riattivarlo in qualsiasi momento.`,
        messageGroupSuspended: ` <0>{{groupName}}</0> di <2>{{productTitle}}</2>? <4/>Puoi sospenderlo di nuovo in qualsiasi momento.`,
        confirmLabelSuspend: 'Sospendi',
        confirmLabelActive: 'Riattiva',
        closeLabel: 'Annulla',
      },
    },
    confirmChangeStatus: {
      updatePartyGroupStatusThen: {
        title: `Gruppo {{selectedGroupStatus}} correttamente`,
        message: ``,
      },
      updatePartyGroupStatusCatch: {
        displayableTitle: 'Non è stato possibile sospendere il gruppo. Riprova.',
        displayableDescription: ``,
      },
    },
  },
  groupDetail: {
    description: 'Descrizione',
    product: 'Prodotto',
    creationDate: 'Creato da - in data',
    createdByLabel: 'DA',
    modifiedAt: 'Modificato da - in data',
    modifiedBy: 'DA',
    status: 'Sospeso',
  },
  groupMenu: {
    dissociateMenuItem: {
      label: 'Rimuovi dal gruppo',
    },
    suspendMenuItem: {
      suspendLabel: 'Sospendi ruolo',
      activeLabel: 'Riabilita ruolo',
    },
    confirmAction: {
      titleSuspended: 'Sospendi ruolo',
      titleActive: 'Riabilita ruolo',
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
        title: `Ruolo {{selectedUserStatus}} correttamente. `,
        message: '',
      },
      updatePartyUserStatusCatch: {
        displayableTitle: `Non è stato possibile sospendere il ruolo. Riprova.`,
        displayableDescription: ``,
      },
    },
    confirmDisociateAction: {
      title: 'Rimuovi',
      message: `Vuoi rimuovere <1>{{memberName}}</1> dal gruppo <3>{{groupName}}</3> di <5>{{productTitle}}</5>? Puoi aggiungerlo nuovamente in qualsiasi momento.`,
      confirmLabel: 'Rimuovi',
      closeLabel: 'Annulla',
    },
    confirmUserDissociation: {
      deleteGroupRelationThen: {
        title: 'Utente rimosso correttamente.',
      },
      deleteGroupRelationCatch: {
        displayableTitle: 'Non è stato possibile rimuovere l’utente. Riprova.',
        displayableDescription: ``,
      },
    },
  },
  membersGroup: {
    currentUser: ' (tu)',
  },
  dashboardGroupEdit: {
    alertRemoveUsersInClone: {
      label: `Alcuni utenti sono stati rimossi dal gruppo duplicato perché non presenti nel prodotto <1 /> selezionato. Puoi comunque assegnare altri utenti al gruppo duplicato.`,
    },
    groupForm: {
      formLabels: {
        groupName: 'Inserisci il nome del gruppo',
        groupNameDuplicated: 'Questo nome è già in uso',
        description: 'Descrivi il gruppo e indica la sua funzione',
        prductPlaceholter: 'Seleziona il prodotto',
        descriptionMaxLength: 'Max 200 caratteri',
        noProductSelected: 'Nessun prodotto selezionato',
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
        isEdit: 'Non è stato possibile modificare il gruppo. Riprova. ',
        isClone: 'Non è stato possibile duplicare il gruppo. Riprova.',
        isCreate: 'Non è stato possibile creare il gruppo. Riprova.',
        displayableDescriptionEdit: `An error occurred while edit of group {{valuesName}}`,
        displayableDescriptionClone: `An error occurred while clone of group {{valuesName}}`,
        displayableDescriptionCreate: `An error occurred while creation of group {{valuesName}}`,
      },
      save: {
        groupNameAlreadyExists: 'Il nome scelto è già in uso. Scegli un nuovo nome.',
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
        'Inserisci i dati del gruppo, associa i relativi utenti e seleziona il prodotto da gestire.',
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
    groupProductTableColumns: {
      duplicateActionLink: 'Duplica',
      headerFields: {
        name: 'Nome',
        description: 'Descrizione',
        referents: 'n. utenti',
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
