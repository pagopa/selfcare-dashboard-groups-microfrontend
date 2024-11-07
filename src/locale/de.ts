export default {
  session: {
    expired: {
      title: 'Sitzung abgelaufen',
      message: 'Du wirst zur Anmeldeseite weitergeleitet...',
    },
  },
  groupDetailPage: {
    path: {
      groupDescription: 'Gruppen',
      selectedGroupDescription: 'Register',
    },
    title: 'Register',
    backActionLabel: 'Zurück',
    usersGroupSection: {
      title: 'Benutzer',
      headerFields: {
        name: 'Name',
        email: 'E-Mail',
        role: 'Funktion',
      },
    },
    addUser: 'Benutzer hinzufügen',
  },
  groupActions: {
    title: 'Gruppe erfolgreich gelöscht',
    actionOnUser: "Aktionen am Benutzer",
    selectedGroupStatusSuspended: 'gesperrt',
    selectedGroupStatusActive: 'reaktiviert',
    selectedGroupStatusErrorSuspended: 'Sperre',
    selectedGroupStatusErrorActive: 'Reaktivierung',
    editActionLabel: 'Ändern',
    groupActionActive: 'Reaktivieren',
    groupActionSuspend: 'Sperren',
    groupDuplicateAction: 'Duplizieren',
    groupDeleteAction: 'Entfernen',
    handleOpenDelete: {
      addNotify: {
        title: 'Gruppe entfernen',
        message: `Vuoi eliminare il gruppo <1>{{groupName}}</1> di <3>{{productName}}</3>?`,
        confirmLabel: 'Entfernen',
        closeLabel: 'Abbrechen',
      },
    },
    onDelete: {
      toastComponentThen: {
        title: 'Gruppe korrekt gelöscht',
      },
      toastComponentCatch: {
        displayableTitle: "FEHLER BEIM ENTFERNEN",
        displayableDescription: `C'è stato un errore durante l'eliminazione del gruppo <1>{{groupName}}</1>.`,
      },
    },
    handleOpen: {
      addNotify: {
        titleActive: 'Gruppe sperren',
        titleSuspended: 'Gruppe reaktivieren',
        messageActive: 'Möchtest du die Gruppe sperren',
        messageSuspended: 'Möchtest du die Gruppe reaktivieren',
        messageGroupActive: ` <1>{{groupName}}</1> di <3>{{productTitle}}</3>? <5/>Puoi riattivarlo in qualsiasi momento.`,
        messageGroupSuspended: ` <1>{{groupName}}</1> di <3>{{productTitle}}</3>? <5/>Puoi sospenderlo di nuovo in qualsiasi momento.`,
        confirmLabelSuspend: 'Sperren',
        confirmLabelActive: 'Reaktivieren',
        closeLabel: 'Abbrechen',
      },
    },
    handleDuplicate: {
      addNotify: {
        title: 'Gruppe duplizieren',
        message: `Vuoi duplicare il gruppo <1>{{groupName}}</1> di <3>{{productName}}</3>?`,
        confirmLabel: 'Duplizieren',
        closeLabel: 'Abbrechen',
      },
    },
    warningMessageIo: `<1>Attenzione!</1><2/> Questa operazione potrebbe interrompere alcune funzionalità legate a un'API Key su IO. Procedi solo se il gruppo non è più necessario.`,
    confirmChangeStatus: {
      updatePartyGroupStatusThen: {
        title: `Gruppo {{selectedGroupStatus}} correttamente`,
        message: ``,
      },
      updatePartyGroupStatusCatch: {
        displayableTitle: 'Die Gruppe konnte nicht gesperrt werden Erneut versuchen.',
        displayableDescription: `C'è stato un errore durante la
        {{ selectedGroupStatusError }}
        del gruppo
        <1>{partyGroup.name}</1>.`,
      },
    },
  },
  groupDetail: {
    description: 'Beschreibung',
    product: 'Produkt',
    creationDate: 'Erstellt von - am',
    createdByLabel: 'VON',
    modifiedAt: 'Geändert von - am',
    modifiedBy: 'VON',
    status: 'Gesperrt',
    userLabel: 'Benutzer',
    usersLabel: 'Benutzer',
    emptyGroup: 'Es wurde noch kein Benutzer hinzugefügt. <1>Einen Benutzer hinzufügen</1>',
  },
  groupMenu: {
    dissociateMenuItem: {
      label: 'Aus der Gruppe entfernen',
    },
    suspendMenuItem: {
      suspendLabel: 'Funktion sperren',
      activeLabel: 'Funktion reaktivieren',
    },
    confirmAction: {
      suspend: {
        title: 'Funktion sperren',
        message:
          'Vuoi sospendere <1>{{memberName}}</1> dal ruolo di <3>{{transcodeProductRole2Title}}</3>? <5 /> Se lo sospendi, non potrà più operare su <8>{{productTitle}}</8>. <10 />Puoi riabilitarlo in qualsiasi momento.',
        confirmLabel: 'Sperren',
      },
      reactivate: {
        title: 'Funktion reaktivieren',
        message:
          'Vuoi riabilitare <1>{{memberName}}</1> nel ruolo di <3>{{transcodeProductRole2Title}}</3>? <5 /> Se lo riabiliti, potrà operare di nuovo su <8>{{productTitle}}</8>. <10 />Puoi sospenderlo di nuovo in qualsiasi momento.',
        confirmLabel: 'Reaktivieren',
      },
      closeLabel: 'Abbrechen',
    },
    confirmChangeStatus: {
      selectedUserStatusSuspended: 'gesperrt',
      selectedUserStatusActive: 'reaktiviert',
      selectedUserStatusErrorSuspended: 'Sperre',
      selectedUserStatusErrorActive: 'Reaktivierung',
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
      title: 'Entfernen',
      message: `Vuoi rimuovere <1>{{member}}</1> dal gruppo <3>{{groupName}}</3> di <5>{{productTitle}}</5>? Puoi aggiungerlo nuovamente in qualsiasi momento.`,
      confirmLabel: 'Entfernen',
      closeLabel: 'Abbrechen',
    },
    confirmUserDissociation: {
      deleteGroupRelationThen: {
        title: 'Benutzer erfolgreich entfernt.',
      },
      deleteGroupRelationCatch: {
        displayableTitle: 'Der Benutzer konnte nicht entfernt werden Erneut versuchen.',
        displayableDescription: ``,
      },
    },
  },
  membersGroup: {
    currentUser: ' (du)',
  },
  dashboardGroupEdit: {
    alertRemoveUsersInClone: {
      label: `Alcuni utenti sono stati rimossi dal gruppo duplicato perché non presenti nel prodotto <1 /> selezionato. Puoi comunque assegnare altri utenti al gruppo duplicato.`,
    },
    groupForm: {
      formLabels: {
        groupName: 'Name der Gruppe eingeben',
        groupNameDuplicated: 'Dieser Name wird bereits verwendet',
        description: 'Gruppe beschreiben und ihre Funktion angeben',
        productPlaceholder: 'Produkt wählen',
        descriptionMaxLength: 'Max. 200 Zeichen',
        noProductSelected: 'Kein Produkt gewählt',
        referentsPlaceholder: 'Wähle die Benutzer, die du mit der Gruppe verknüpfen möchtest',
        cancelActionLabel: 'Zurück',
        confirmActionLabel: 'Bestätigen',
      },
      notifySuccessfulSave: {
        isEdit: 'Du hast die Gruppe erfolgreich geändert ',
        isClone: 'Du hast die Gruppe erfolgreich dupliziert ',
        isCreate: 'Du hast die Gruppe erfolgreich erstellt ',
        message: `<0>{{valuesName}}</0> per il prodotto <2>{{productSelectedtitle}}</>`,
      },
      notifyErrorOnSave: {
        isEdit: 'Die Gruppe konnte nicht geändert werden. Erneut versuchen. ',
        isClone: 'Die Gruppe konnte nicht dupliziert werden. Erneut versuchen.',
        isCreate: 'Die Gruppe konnte nicht erstellt werden. Erneut versuchen.',
        displayableDescriptionEdit: `An error occurred while edit of group {{valuesName}}`,
        displayableDescriptionClone: `An error occurred while clone of group {{valuesName}}`,
        displayableDescriptionCreate: `An error occurred while creation of group {{valuesName}}`,
      },
      save: {
        groupNameAlreadyExists: 'Der gewählte Name wird bereits verwendet. Einen neuen Namen wählen.',
        isEdit: "Es ist ein Fehler beim Ändern der Gruppe aufgetreten. Erneut versuchen.",
        isClone: "Es ist ein Fehler beim Duplizieren der Gruppe aufgetreten. Erneut versuchen.",
        isCreate: "Es ist ein Fehler beim Erstellen der Gruppe aufgetreten. Erneut versuchen.",
      },
      outcome: {
        created: 'Gruppe erfolgreich erstellt',
        modified: 'Gruppe erfolgreich geändert',
        duplicate: 'Gruppe erfolgreich dupliziert',
      },
    },
    addGroupPage: {
      groupPathDescription: 'Gruppen',
      pathDescription: 'Eine neue Gruppe erstellen',
      title: 'Eine neue Gruppe erstellen',
      subTitle:
        'Inserisci i dati del gruppo, associa i relativi utenti e seleziona il prodotto da gestire.',
      pnpgSubTitle:
        'Inserisci il nome, la descrizione del gruppo e gli utenti che vuoi associarvi.',
    },
    cloneGroupPage: {
      groupPathDescription: 'Gruppen',
      pathDescription: 'Gruppe duplizieren',
      title: 'Gruppe duplizieren',
      subTitle: `Duplica il gruppo e modifica i dati`,
      placeholderDuplicateName: 'Kopie von ',
    },
    editGroupPage: {
      groupPathDescription: 'Gruppen',
      pathDescription: 'Gruppe ändern',
      title: 'Gruppe ändern',
    },
  },
  dashboardGroup: {
    groupsPage: {
      title: 'Gruppen',
      subTitle:
        'I gruppi sono un insieme di utenti, per esempio appartenenti allo stesso ufficio o dipartimento, a cui si affida la gestione dei prodotti. Qui puoi consultare i gruppi dell’ente e creare di nuovi.',
      subTitlePnpg:
        'I gruppi sono un insieme di utenti, per esempio appartenenti allo stesso ufficio o dipartimento, a cui si affida la gestione delle notifiche. Qui puoi gestire i gruppi dell’impresa e crearne di nuovi.',
      tabAll: 'Alle',
    },
    addGroupButton: {
      createActionLabel: 'Gruppe erstellen',
    },
    noGroups: {
      createGroup: 'Es wurde noch keine Gruppe erstellt. <1><0>Eine Gruppe erstellen</0></1>',
      noGroupsForProduct: 'Es wurde noch keine Gruppe für dieses Produkt erstellt.',
    },
    groupProductTableColumns: {
      duplicateActionLink: 'Duplizieren',
      headerFields: {
        name: 'Name',
        description: 'Beschreibung',
        referents: 'Anz. Benutzer',
      },
    },
    groupsProductFetchError: {
      message: `Spiacenti, qualcosa è andato storto. <1><0>Riprova</0></1>.`,
    },
    groupsTableLoadMoreData: {
      loadMoreMessage: 'Andere laden',
    },
  },
};
