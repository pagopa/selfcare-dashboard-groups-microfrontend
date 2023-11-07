export default {
  session: {
    expired: {
      title: 'Sitzung abgelaufen',
      message: 'Du wirst zur Login-Seite weitergeleitet...',
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
        name: 'Name',
        email: 'E-Mail-Adresse',
        role: 'Rolle',
      },
    },
    addUser: 'Benutzer hinzufügen',
  },
  groupActions: {
    title: 'Gruppe erfolgreich gelöscht',
    actionOnUser: 'Benutzeraktionen',
    selectedGroupStatusSuspended: 'ausgesetzt',
    selectedGroupStatusActive: 'reaktiviert',
    selectedGroupStatusErrorSuspended: 'Aussetzung',
    selectedGroupStatusErrorActive: 'Reaktivierung',
    editActionLabel: 'Bearbeiten',
    groupActionActive: 'Erneut aktivieren',
    groupActionSuspend: 'Aussetzen',
    groupDuplicateAction: 'Duplizieren',
    groupDeleteAction: 'Löschen',
    handleOpenDelete: {
      addNotify: {
        title: 'Gruppe löschen',
        message: 'Möchtest du <1>{{groupName}}</1> Gruppe <3>{{productName}}</3> löschen?',
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
        titleSuspended: 'Gruppe reaktivieren',
        messageActive: 'Möchtest du die Gruppe aussetzen',
        messageSuspended: 'Möchtest du die Gruppe reaktivieren',
        messageGroupActive:
          ' <0>{{groupName}}</0> von <2>{{productTitle}}</2>? <4/>Du kannst sie jederzeit wieder aktivieren.',
        messageGroupSuspended:
          ' <0>{{groupName}}</0> von <2>{{productTitle}}</2>? <4/>Du kannst sie jederzeit wieder aussetzen.',
        confirmLabelSuspend: 'Aussetzen',
        confirmLabelActive: 'Erneut aktivieren',
        closeLabel: 'Abbrechen',
      },
    },
    handleDuplicate: {
      addNotify: {
        title: 'Gruppe duplizieren',
        message:
          'Möchtest du die Gruppe <1>{{groupName}}</1> von <3>{{productName}}</3> duplizieren?',
        confirmLabel: 'Duplizieren',
        closeLabel: 'Abbrechen',
      },
    },
    confirmChangeStatus: {
      updatePartyGroupStatusThen: {
        title: 'Gruppe {{selectedGroupStatus}} richtig',
        message: '',
      },
      updatePartyGroupStatusCatch: {
        displayableTitle: 'Die Gruppe konnte nicht ausgesetzt werden. Nochmals versuchen.',
        displayableDescription: '',
      },
    },
  },
  groupDetail: {
    description: 'Beschreibung',
    product: 'Produkt',
    creationDate: 'Von ... am erfasst',
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
          'Möchtest du <1>{{memberName}}</1> von der Rolle des <3>{{transcodeProductRole2Title}}</3> aussetzen? <5 /> Wenn du ihn aussetzt, kann er nicht mehr auf <8>{{productTitle}}</8> zugreifen. <10 />Du kannst ihn jederzeit wieder aktivieren.',
        confirmLabel: 'Aussetzen',
      },
      reactivate: {
        title: 'Rolle reaktivieren',
        message:
          'Möchtest du <1>{{memberName}}</1> in der Rolle als <3>{{transcodeProductRole2Title}}</3> reaktivieren? <5 /> Wenn du ihn reaktivierst, kann er wieder auf <8>{{productTitle}}</8> zugreifen. <10 />Du kannst ihn jederzeit wieder aussetzen',
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
        title: 'Rolle {{selectedUserStatus}} korrekt. ',
        message: '',
      },
      updatePartyUserStatusCatch: {
        displayableTitle: 'Die Rolle konnte nicht ausgesetzt werden. Nochmals versuchen.',
        displayableDescription: '',
      },
    },
    confirmDisociateAction: {
      title: 'Entfernen',
      message:
        'Möchtest du <1>{{member}}</1> aus der Gruppe <3>{{groupName}}</3> von <5>{{productTitle}}</5> entfernen? Du kannst ihn jederzeit wieder hinzufügen.',
      confirmLabel: 'Entfernen',
      closeLabel: 'Abbrechen',
    },
    confirmUserDissociation: {
      deleteGroupRelationThen: {
        title: 'Benutzer erfolgreich entfernt.',
      },
      deleteGroupRelationCatch: {
        displayableTitle: 'Der Benutzer konnte nicht entfernt werden. Nochmals versuchen.',
        displayableDescription: '',
      },
    },
  },
  membersGroup: {
    currentUser: '(du)',
  },
  dashboardGroupEdit: {
    alertRemoveUsersInClone: {
      label:
        'Einige Benutzer wurden aus der duplizierten Gruppe entfernt, weil sie im ausgewählten Produkt <1 /> nicht vorhanden sind. Du kannst der duplizierten Gruppe jedoch weitere Benutzer zuweisen.',
    },
    groupForm: {
      formLabels: {
        groupName: 'Namen der Gruppe eingeben',
        groupNameDuplicated: 'Der Name wird bereits genutzt',
        description: 'Beschreibe die Gruppe und gib ihre Funktion an',
        productPlaceholder: 'Produkt wählen',
        descriptionMaxLength: 'Max. 200 Zeichen',
        noProductSelected: 'Kein Produkt ausgewählt',
        referentsPlaceholder: 'Wähle die Benutzer aus, die du der Gruppe zuordnen möchtest',
        cancelActionLabel: 'Zurück',
        confirmActionLabel: 'Bestätigen',
      },
      notifySuccessfulSave: {
        isEdit: 'Du hast die Gruppe korrekt geändert ',
        isClone: 'Du hast die Gruppe korrekt dupliziert ',
        isCreate: 'Du hast die Gruppe korrekt erstellt ',
        message: '<0>{{valuesName}}</0> für das Produkt <2>{{productSelectedtitle}}</>',
      },
      notifyErrorOnSave: {
        isEdit: 'Die Gruppe konnte nicht geändert werden. Nochmals versuchen. ',
        isClone: 'Die Gruppe konnte nicht dupliziert werden. Nochmals versuchen.',
        isCreate: 'Die Gruppe konnte nicht angelegt werden. Nochmals versuchen.',
        displayableDescriptionEdit:
          'Es ist ein Fehler bei der Bearbeitung der Gruppe {{valuesName}} aufgetreten ',
        displayableDescriptionClone:
          'Es ist ein Fehler beim Duplizieren der {{valuesName}} aufgetreten',
        displayableDescriptionCreate:
          'Es ist ein Fehler beim Anlegen der Gruppe {{valuesName}} aufgetreten',
      },
      save: {
        groupNameAlreadyExists:
          'Der gewählte Name wird bereits verwendet. Wähle einen neuen Namen.',
        isEdit: 'Beim Bearbeiten der Gruppe ist ein Fehler aufgetreten. Nochmals versuchen.',
        isClone: 'Beim Duplizieren der Gruppe ist ein Fehler aufgetreten. Nochmals versuchen.',
        isCreate: 'Beim Anlegen der Gruppe ist ein Fehler aufgetreten. Nochmals versuchen.',
      },
      outcome: {
        created: 'Gruppe erfolgreich erstellt',
        modified: 'Gruppe erfolgreich geändert',
        duplicate: 'Gruppe erfolgreich dupliziert',
      },
    },
    addGroupPage: {
      groupPathDescription: 'Gruppen',
      pathDescription: 'Neue Gruppe anlegen',
      title: 'Neue Gruppe anlegen',
      subTitle:
        'Gib die Daten der Gruppe ein, verknüpfe die entsprechenden Benutzer und wähle das zu verwaltende Produkt aus.',
      pnpgSubTitle:
        'Gib den Namen, die Beschreibung der Gruppe und die Benutzer ein, die du zuordnen möchtest.',
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
        'Gruppen sind eine Gruppe von Benutzern, die zum Beispiel demselben Büro oder derselben Abteilung angehören und mit der Verwaltung der Produkte betraut sind. Hier kannst du die Gruppen der Körperschaft sehen und neue erstellen.',
      subTitlePnpg:
        'Gruppen sind eine Gruppe von Benutzern, die beispielsweise demselben Büro oder derselben Abteilung angehören und mit der Verwaltung von Bescheiden betraut sind. Hier kannst du Unternehmensgruppen verwalten und neue erstellen.',
      tabAll: 'Alle',
    },
    addGroupButton: {
      createActionLabel: 'Gruppe erstellen',
    },
    noGroups: {
      createGroup: 'Es wurden noch keine Gruppen angelegt. <1><0> Gruppe erstellen </0></1>',
      noGroupsLabel: 'Es wurde noch keine Gruppe für dieses Produkt erstellt.',
      noGroupsForProduct: 'Es wurde noch keine Gruppe für dieses Produkt erstellt.',
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
      message: 'Es ist leider ein Fehler aufgetreten. <1><0>Nochmals versuchen</0></1>.',
    },
    groupsTableLoadMoreData: {
      loadMoreMessage: 'Weitere laden',
    },
  },
};
