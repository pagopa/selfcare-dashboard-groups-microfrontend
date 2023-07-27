export default {
  session: {
    expired: {
      title: 'Sitzung abgelaufen',
      message: 'Du wirst zur Log-in-Seite weitergeleitet ...',
    },
  },
  groupDetailPage: {
    path: {
      groupDescription: 'Gruppen',
      selectedGroupDescription: 'Personenstand',
    },
    title: 'Personenstand',
    backActionLabel: 'Zurück',
    usersGroupSection: {
      title: 'Benutzer',
      headerFields: {
        name: 'Nome',
        email: 'Email',
        role: 'Ruolo',
      },
    },
    addUser: 'Benutzer hinzufügen',
  },
  groupActions: {
    title: 'Gruppe erfolgreich gelöscht',
    actionOnUser: 'Aktionen zum Benutzer',
    selectedGroupStatusSuspended: 'ausgesetzt',
    selectedGroupStatusActive: 'erneut zugewiesen',
    selectedGroupStatusErrorSuspended: 'Aussetzung',
    selectedGroupStatusErrorActive: 'Erneute Zuweisung',
    editActionLabel: 'Bearbeiten',
    groupActionActive: 'Erneut zuweisen',
    groupActionSuspend: 'Aussetzen',
    groupDuplicateAction: 'Duplizieren',
    groupDeleteAction: 'Löschen',
    handleOpenDelete: {
      addNotify: {
        title: 'Gruppe löschen',
        message: 'Willst du die Gruppe <1>{{groupName}}</1> von <3>{{productName}}</3> löschen?',
        confirmLabel: 'Löschen',
        closeLabel: 'Abbrechen',
      },
    },
    onDelete: {
      toastComponentThen: {
        title: 'Gruppe erfolgreich gelöscht',
      },
      toastComponentCatch: {
        displayableTitle: 'FEHLER BEIM LÖSCHEN',
        displayableDescription:
          'Beim Löschen der Gruppe <1>{{groupName}}</1> ist ein Fehler aufgetreten.',
      },
    },
    handleOpen: {
      addNotify: {
        titleActive: 'Gruppe aussetzen',
        titleSuspended: 'Gruppe erneut zuweisen',
        messageActive: 'Möchtest du die Gruppe aussetzen',
        messageSuspended: 'Möchtest du die Gruppe erneut zuweisen',
        messageGroupActive:
          '<0>{{groupName}}</0> von <2>{{productTitle}}</2>? <4/>Die Gruppe kann jederzeit erneut zugewiesen werden.',
        messageGroupSuspended:
          '<0>{{groupName}}</0> von <2>{{productTitle}}</2>? <4/>Die Gruppe kann jederzeit ausgesetzt werden.',
        confirmLabelSuspend: 'Aussetzen',
        confirmLabelActive: 'Erneut zuweisen',
        closeLabel: 'Abbrechen',
      },
    },
    handleDuplicate: {
      addNotify: {
        title: 'Gruppe duplizieren',
        message:
          'Willst du die Gruppe <1>{{groupName}}</1> von <3>{{productName}}</3> duplizieren?',
        confirmLabel: 'Duplizieren',
        closeLabel: 'Abbrechen',
      },
    },
    confirmChangeStatus: {
      updatePartyGroupStatusThen: {
        title: 'Gruppe {{selectedGroupStatus}} erfolgreich',
        message: '',
      },
      updatePartyGroupStatusCatch: {
        displayableTitle: 'Die Gruppe konnte nicht ausgesetzt werden. Erneut versuchen.',
        displayableDescription: '',
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
    status: 'Ausgesetzt',
    userLabel: 'Benutzer',
    usersLabel: 'Benutzer',
    emptyGroup: 'Es wurde noch kein Benutzer hinzugefügt. <1>Benutzer hinzufügen</1>',
  },
  groupMenu: {
    dissociateMenuItem: {
      label: 'Aus Gruppe entfernen',
    },
    suspendMenuItem: {
      suspendLabel: 'Rolle aussetzen',
      activeLabel: 'Rolle reaktivieren',
    },
    confirmAction: {
      suspend: {
        title: 'Rolle aussetzen',
        message:
          'Willst du <1>{{memberName}}</1> aus der Rolle <3>{{transcodeProductRole2Title}}</3> entfernen? <5 />Nachdem Aussetzen ist ein Zugriff auf <8>{{productTitle}}</8> nicht mehr möglich. <10 />Der Benutzer kann jederzeit reaktiviert werden.',
        confirmLabel: 'Aussetzen',
      },
      reactivate: {
        title: 'Rolle reaktivieren',
        message:
          'Willst du für <1>{{memberName}}</1> die Rolle <3>{{transcodeProductRole2Title}}</3> reaktivieren? <5 /> Durch die Reaktivierung ist ein Zugriff auf <8>{{productTitle}}</8> erneut möglich. <10 />Der Benutzer kann jederzeit ausgesetzt werden.',
        confirmLabel: 'Reaktivieren',
      },
      closeLabel: 'Abbrechen',
    },
    confirmChangeStatus: {
      selectedUserStatusSuspended: 'ausgesetzt',
      selectedUserStatusActive: 'reaktiviert',
      selectedUserStatusErrorSuspended: 'Aussetzung',
      selectedUserStatusErrorActive: 'Reaktivierung',
      updatePartyUserStatusThen: {
        title: 'Rolle {{selectedUserStatus}} erfolgreich.',
        message: '',
      },
      updatePartyUserStatusCatch: {
        displayableTitle: 'Die Rolle konnte nicht ausgesetzt werden. Erneut versuchen.',
        displayableDescription: '',
      },
    },
    confirmDisociateAction: {
      title: 'Entfernen',
      message:
        'Willst du <1>{{member}}</1> aus der Gruppe <3>{{groupName}}</3> von <5>{{productTitle}}</5> entfernen? Der Benutzer kann jederzeit erneut hinzugefügt werden.',
      confirmLabel: 'Entfernen',
      closeLabel: 'Abbrechen',
    },
    confirmUserDissociation: {
      deleteGroupRelationThen: {
        title: 'Benutzer erfolgreich entfernt.',
      },
      deleteGroupRelationCatch: {
        displayableTitle: 'Der Benutzer konnte nicht entfernt werden. Erneut versuchen.',
        displayableDescription: '',
      },
    },
  },
  membersGroup: {
    currentUser: ' (du)',
  },
  dashboardGroupEdit: {
    alertRemoveUsersInClone: {
      label:
        'Einige Benutzer wurden aus der duplizierten Gruppe entfernt, da sie nicht im ausgewählten <1 /> Produkt enthalten sind. Du kannst der duplizierten Gruppe weiterhin andere Benutzer zuweisen.',
    },
    groupForm: {
      formLabels: {
        groupName: 'Namen der Gruppe eingeben',
        groupNameDuplicated: 'Der Name wird bereits benutzt',
        description: 'Gruppe beschreiben und Funktion eingeben',
        productPlaceholter: 'Produkt wählen',
        descriptionMaxLength: 'Max. 200 Zeichen',
        noProductSelected: 'Kein Produkt ausgewählt',
        referentsPlaceholder: 'Benutzer wählen, die der Gruppe zugeordnet werden sollen',
        cancelActionLabel: 'Zurück',
        confirmActionLabel: 'Bestätigen',
      },
      notifySuccessfulSave: {
        isEdit: 'Die Gruppe wurde erfolgreich geändert ',
        isClone: 'Die Gruppe wurde erfolgreich dupliziert ',
        isCreate: 'Die Gruppe wurde erfolgreich erstellt ',
        message: '<0>{{valuesName}}</0> für das Produkt <2>{{productSelectedtitle}}</>',
      },
      notifyErrorOnSave: {
        isEdit: 'Die Gruppe konnte nicht geändert werden. Erneut versuchen. ',
        isClone: 'Die Gruppe konnte nicht dupliziert werden. Erneut versuchen.',
        isCreate: 'Die Gruppe konnte nicht erstellt werden. Erneut versuchen.',
        displayableDescriptionEdit: 'Fehler bei der Bearbeitung der Gruppe {{valuesName}}',
        displayableDescriptionClone: 'Fehler beim Duplizieren der Gruppe {{valuesName}}',
        displayableDescriptionCreate: 'Fehler beim Erstellen der Gruppe {{valuesName}}',
      },
      save: {
        groupNameAlreadyExists: 'Der gewählte Name wird bereits benutzt. Neuen Namen wählen.',
        isEdit: 'Beim Bearbeiten der Gruppe ist ein Fehler aufgetreten. Erneut versuchen.',
        isClone: 'Beim Duplizieren der Gruppe ist ein Fehler aufgetreten. Erneut versuchen.',
        isCreate: 'Beim Erstellen der Gruppe ist ein Fehler aufgetreten. Erneut versuchen.',
      },
    },
    addGroupPage: {
      groupPathDescription: 'Gruppen',
      pathDescription: 'Neue Gruppe erstellen',
      title: 'Neue Gruppe erstellen',
      subTitle:
        'Daten der Gruppe eingeben, jeweilige Benutzer zuordnen und das zu verwaltende Produkt auswählen.',
      pnpgSubTitle:
        'Namen und Beschreibung der Gruppe und der Benutzer eingeben, die ihr zugeordnet werden sollen.',
    },
    cloneGroupPage: {
      groupPathDescription: 'Gruppen',
      pathDescription: 'Gruppe duplizieren',
      title: 'Gruppe duplizieren',
      subTitle: 'Gruppe duplizieren und Daten bearbeiten',
      placeholderDuplicateName: 'Kopie von ',
    },
    editGroupPage: {
      groupPathDescription: 'Gruppen',
      pathDescription: 'Gruppe bearbeiten',
      title: 'Gruppe bearbeiten',
    },
  },
  dashboardGroup: {
    groupsPage: {
      title: 'Gruppen',
      subTitle:
        'Gruppen bestehen aus mehreren Benutzern, die beispielsweise einem Büro oder einer Abteilung angehören und mit der Verwaltung von Produkten betraut sind. Hier kannst du die Gruppen der Körperschaft einsehen und neue erstellen.',
      subTitlePnpg:
        'Gruppen bestehen aus mehreren Benutzern, die beispielsweise einem Büro oder einer Abteilung angehören und mit der Verwaltung von Bescheiden betraut sind. Hier kannst du Firmengruppen verwalten und neue erstellen.',
      tabAll: 'Alle',
    },
    addGroupButton: {
      createActionLabel: 'Gruppe erstellen',
    },
    noGroups: {
      noGroupsLabel: 'Es wurde noch keine Gruppe erstellt. <1><0>Gruppe erstellen</0></1>',
      noGroupsForProduct: 'Für dieses Produkt wurde noch keine Gruppe erstellt.',
    },
    groupProductTableColumns: {
      duplicateActionLink: 'Duplizieren',
      headerFields: {
        name: 'Vorname',
        description: 'Beschreibung',
        referents: 'Anzahl der Benutzer',
      },
    },
    groupsProductFetchError: {
      message: 'Es ist leider ein Fehler aufgetreten. <1><0>Erneut versuchen</0></1>.',
    },
    groupsTableLoadMoreData: {
      loadMoreMessage: 'Weitere laden',
    },
  },
};
