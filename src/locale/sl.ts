export default {
  session: {
    expired: {
      title: 'Seja je potekla',
      message: 'Preusmerjeni boste na stran za prijavo ...',
    },
  },
  groupDetailPage: {
    path: {
      groupDescription: 'Skupine',
      selectedGroupDescription: 'Register',
    },
    title: 'Register',
    backActionLabel: 'Nazaj',
    usersGroupSection: {
      title: 'Uporabniki',
      headerFields: {
        name: 'Ime',
        email: 'E-pošta',
        role: 'Vloga',
      },
    },
    addUser: 'Dodaj uporabnika',
  },
  groupActions: {
    title: 'Skupina je bila uspešno izbrisana',
    actionOnUser: "Dejanja na uporabniku",
    selectedGroupStatusSuspended: 'prekinjeno',
    selectedGroupStatusActive: 'ponovno aktivirano',
    selectedGroupStatusErrorSuspended: 'prekinitev',
    selectedGroupStatusErrorActive: 'ponovno aktiviranje',
    editActionLabel: 'Spremeni',
    groupActionActive: 'Ponovno aktiviraj',
    groupActionSuspend: 'Prekini',
    groupDuplicateAction: 'Podvoji',
    groupDeleteAction: 'Izbriši',
    handleOpenDelete: {
      addNotify: {
        title: 'Izbriši skupino',
        message: `Vuoi eliminare il gruppo <1>{{groupName}}</1> di <3>{{productName}}</3>?`,
        confirmLabel: 'Izbriši',
        closeLabel: 'Prekliči',
      },
    },
    onDelete: {
      toastComponentThen: {
        title: 'Skupina je bila uspešno izbrisana',
      },
      toastComponentCatch: {
        displayableTitle: "NAPAKA MED BRISANJEM",
        displayableDescription: `C'è stato un errore durante l'eliminazione del gruppo <1>{{groupName}}</1>.`,
      },
    },
    handleOpen: {
      addNotify: {
        titleActive: 'Prekini skupino',
        titleSuspended: 'Ponovno aktiviraj skupino',
        messageActive: 'Želite prekiniti skupino',
        messageSuspended: 'Želite ponovno aktivirati skupino',
        messageGroupActive: ` <1>{{groupName}}</1> di <3>{{productTitle}}</3>? <5/>Puoi riattivarlo in qualsiasi momento.`,
        messageGroupSuspended: ` <1>{{groupName}}</1> di <3>{{productTitle}}</3>? <5/>Puoi sospenderlo di nuovo in qualsiasi momento.`,
        confirmLabelSuspend: 'Prekini',
        confirmLabelActive: 'Ponovno aktiviraj',
        closeLabel: 'Prekliči',
      },
    },
    handleDuplicate: {
      addNotify: {
        title: 'Podvojena skupina',
        message: `Vuoi duplicare il gruppo <1>{{groupName}}</1> di <3>{{productName}}</3>?`,
        confirmLabel: 'Podvoji',
        closeLabel: 'Prekliči',
      },
    },
    warningMessageIo: `<1>Attenzione!</1><2/> Questa operazione potrebbe interrompere alcune funzionalità legate a un'API Key su IO. Procedi solo se il gruppo non è più necessario.`,
    confirmChangeStatus: {
      updatePartyGroupStatusThen: {
        title: `Gruppo {{selectedGroupStatus}} correttamente`,
        message: ``,
      },
      updatePartyGroupStatusCatch: {
        displayableTitle: 'Skupine ni bilo mogoče prekiniti. Poskusi ponovno.',
        displayableDescription: `C'è stato un errore durante la
        {{ selectedGroupStatusError }}
        del gruppo
        <1>{partyGroup.name}</1>.`,
      },
    },
  },
  groupDetail: {
    description: 'Opis',
    product: 'Produkt',
    creationDate: 'Ustvaril/-a – dne',
    createdByLabel: 'OD',
    modifiedAt: 'Spremenil/-a – dne',
    modifiedBy: 'OD',
    status: 'Prekinjeno',
    userLabel: 'uporabnik',
    usersLabel: 'uporabniki',
    emptyGroup: 'Ni dodan še noben uporabnik. <1>Dodaj uporabnika</1>',
  },
  groupMenu: {
    dissociateMenuItem: {
      label: 'Odstrani iz skupine',
    },
    suspendMenuItem: {
      suspendLabel: 'Prekini vlogo',
      activeLabel: 'Ponovno vzpostavi vlogo',
    },
    confirmAction: {
      suspend: {
        title: 'Prekini vlogo',
        message:
          'Vuoi sospendere <1>{{memberName}}</1> dal ruolo di <3>{{transcodeProductRole2Title}}</3>? <5 /> Se lo sospendi, non potrà più operare su <8>{{productTitle}}</8>. <10 />Puoi riabilitarlo in qualsiasi momento.',
        confirmLabel: 'Prekini',
      },
      reactivate: {
        title: 'Ponovno vzpostavi vlogo',
        message:
          'Vuoi riabilitare <1>{{memberName}}</1> nel ruolo di <3>{{transcodeProductRole2Title}}</3>? <5 /> Se lo riabiliti, potrà operare di nuovo su <8>{{productTitle}}</8>. <10 />Puoi sospenderlo di nuovo in qualsiasi momento.',
        confirmLabel: 'Ponovno vzpostavi',
      },
      closeLabel: 'Prekliči',
    },
    confirmChangeStatus: {
      selectedUserStatusSuspended: 'prekinjeno',
      selectedUserStatusActive: 'ponovno vzpostavljeno',
      selectedUserStatusErrorSuspended: 'prekinitev',
      selectedUserStatusErrorActive: 'ponovna vzpostavitev',
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
      title: 'Odstrani',
      message: `Vuoi rimuovere <1>{{member}}</1> dal gruppo <3>{{groupName}}</3> di <5>{{productTitle}}</5>? Puoi aggiungerlo nuovamente in qualsiasi momento.`,
      confirmLabel: 'Odstrani',
      closeLabel: 'Prekliči',
    },
    confirmUserDissociation: {
      deleteGroupRelationThen: {
        title: 'Uporabnik uspešno odstranjen.',
      },
      deleteGroupRelationCatch: {
        displayableTitle: 'Uporabnika ni bilo mogoče odstraniti. Poskusi ponovno.',
        displayableDescription: ``,
      },
    },
  },
  membersGroup: {
    currentUser: ' (ti)',
  },
  dashboardGroupEdit: {
    alertRemoveUsersInClone: {
      label: `Alcuni utenti sono stati rimossi dal gruppo duplicato perché non presenti nel prodotto <1 /> selezionato. Puoi comunque assegnare altri utenti al gruppo duplicato.`,
    },
    groupForm: {
      formLabels: {
        groupName: 'Vnesite ime skupine',
        groupNameDuplicated: 'To ime je že v uporabi',
        description: 'Opišite skupino in navedite njeno funkcijo',
        productPlaceholder: 'Izberite produkt',
        descriptionMaxLength: 'Največ 200 znakov',
        noProductSelected: 'Izbran ni noben produkt',
        referentsPlaceholder: 'Izberite uporabnike, ki jih želite povezati s skupino',
        cancelActionLabel: 'Nazaj',
        confirmActionLabel: 'Potrdi',
      },
      notifySuccessfulSave: {
        isEdit: 'Uspešno ste uredili skupino ',
        isClone: 'Uspešno ste podvojili skupino ',
        isCreate: 'Uspešno ste ustvarili skupino ',
        message: `<0>{{valuesName}}</0> per il prodotto <2>{{productSelectedtitle}}</>`,
      },
      notifyErrorOnSave: {
        isEdit: 'Skupine ni bilo mogoče spremeniti. Poskusi ponovno. ',
        isClone: 'Skupine ni bilo mogoče podvojiti. Poskusi ponovno.',
        isCreate: 'Skupine ni bilo mogoče ustvariti. Poskusi ponovno.',
        displayableDescriptionEdit: `An error occurred while edit of group {{valuesName}}`,
        displayableDescriptionClone: `An error occurred while clone of group {{valuesName}}`,
        displayableDescriptionCreate: `An error occurred while creation of group {{valuesName}}`,
      },
      save: {
        groupNameAlreadyExists: 'Izbrano ime je že v uporabi. Izberite novo ime.',
        isEdit: "Med urejanjem skupine je prišlo do napake. Poskusi ponovno.",
        isClone: "Med podvajanjem skupine je prišlo do napake. Poskusi ponovno.",
        isCreate: "Pri ustvarjanju skupine je prišlo do napake. Poskusi ponovno.",
      },
      outcome: {
        created: 'Skupina je bila uspešno ustvarjena',
        modified: 'Skupina je bila uspešno spremenjena',
        duplicate: 'Skupina je bila uspešno podvojena',
      },
    },
    addGroupPage: {
      groupPathDescription: 'Skupine',
      pathDescription: 'Ustvarite novo skupino',
      title: 'Ustvarite novo skupino',
      subTitle:
        'Inserisci i dati del gruppo, associa i relativi utenti e seleziona il prodotto da gestire.',
      pnpgSubTitle:
        'Inserisci il nome, la descrizione del gruppo e gli utenti che vuoi associarvi.',
    },
    cloneGroupPage: {
      groupPathDescription: 'Skupine',
      pathDescription: 'Podvojena skupina',
      title: 'Podvojena skupina',
      subTitle: `Duplica il gruppo e modifica i dati`,
      placeholderDuplicateName: 'Kopiraj ',
    },
    editGroupPage: {
      groupPathDescription: 'Skupine',
      pathDescription: 'Uredi skupino',
      title: 'Uredi skupino',
    },
  },
  dashboardGroup: {
    groupsPage: {
      title: 'Skupine',
      subTitle:
        'I gruppi sono un insieme di utenti, per esempio appartenenti allo stesso ufficio o dipartimento, a cui si affida la gestione dei prodotti. Qui puoi consultare i gruppi dell’ente e creare di nuovi.',
      subTitlePnpg:
        'I gruppi sono un insieme di utenti, per esempio appartenenti allo stesso ufficio o dipartimento, a cui si affida la gestione delle notifiche. Qui puoi gestire i gruppi dell’impresa e crearne di nuovi.',
      tabAll: 'Vse',
    },
    addGroupButton: {
      createActionLabel: 'Ustvari skupino',
    },
    noGroups: {
      createGroup: 'Nobena skupina še ni bila ustvarjena. <1><0>Ustvari eno skupino</0></1>',
      noGroupsForProduct: 'Za ta produkt še ni bila ustvarjena nobena skupina.',
    },
    groupProductTableColumns: {
      duplicateActionLink: 'Podvoji',
      headerFields: {
        name: 'Ime',
        description: 'Opis',
        referents: 'št. uporabnikov',
      },
    },
    groupsProductFetchError: {
      message: `Spiacenti, qualcosa è andato storto. <1><0>Riprova</0></1>.`,
    },
    groupsTableLoadMoreData: {
      loadMoreMessage: 'Naloži druge',
    },
  },
};
