export default {
  session: {
    expired: {
      title: 'Seja je potekla',
      message: 'Preusmerjeni boste na stran za prijavo...',
    },
  },
  groupDetailPage: {
    path: {
      groupDescription: 'Skupine',
      selectedGroupDescription: 'Register',
    },
    title: 'Register',
    backActionLabel: 'Nazaj',
    usersTitle: 'Uporabniki',
    addUser: 'Dodaj uporabnika',
  },
  groupActions: {
    title: 'Skupina je bila uspešno izbrisana',
    actionOnUser: 'Dejanja na uporabniku',
    selectedGroupStatusSuspended: 'začasno odstavljen',
    selectedGroupStatusActive: 'ponovno aktiviran',
    selectedGroupStatusErrorSuspended: 'začasna odstavitev',
    selectedGroupStatusErrorActive: 'ponovna aktivacija',
    editActionLabel: 'Uredi',
    groupActionActive: 'Ponovno aktiviraj',
    groupActionSuspend: 'Začasno odstavi',
    groupDuplicateAction: 'Podvoji',
    groupDeleteAction: 'Izbriši',
    handleOpenDelete: {
      addNotify: {
        title: 'Izbriši skupino',
        message: 'Ali želite izbrisati skupino <1>{{groupName}}</1> za <3>{{productName}}</3>?',
        confirmLabel: 'Izbriši',
        closeLabel: 'Prekliči',
      },
    },
    onDelete: {
      toastComponentThen: {
        title: 'Skupina je bila uspešno izbrisana',
      },
      toastComponentCatch: {
        displayableTitle: 'NAPAKA PRI BRISANJU',
        displayableDescription: 'Pri brisanju skupine <1>{{groupName}}</1> je prišlo do napake.',
      },
    },
    handleOpen: {
      addNotify: {
        titleActive: 'Začasno odstavi skupino',
        titleSuspended: 'Ponovno aktiviraj skupino',
        messageActive: 'Ali želite začasno odstaviti skupino',
        messageSuspended: 'Ali želite ponovno aktivirati skupino',
        messageGroupActive:
          '<0>{{groupName}}</0> za <2>{{productTitle}}</2>? <4/>Lahko jo kadar koli znova aktivirate.',
        messageGroupSuspended:
          '<0>{{groupName}}</0> za <2>{{productTitle}}</2>? <4/>Lahko jo kadar koli znova začasno odstavite.',
        confirmLabelSuspend: 'Začasno odstavi',
        confirmLabelActive: 'Ponovno aktiviraj',
        closeLabel: 'Prekliči',
      },
    },
    handleDuplicate: {
      addNotify: {
        title: 'Podvoji skupino',
        message: 'Ali želite podvojiti skupino <1>{{groupName}}</1> za <3>{{productName}}</3>?',
        confirmLabel: 'Podvoji',
        closeLabel: 'Prekliči',
      },
    },
    confirmChangeStatus: {
      updatePartyGroupStatusThen: {
        title: 'Skupina {{selectedGroupStatus}} je bila uspešno odstranjena',
        message: '',
      },
      updatePartyGroupStatusCatch: {
        displayableTitle: 'Skupine ni bilo mogoče začasno odstaviti. Poskusite znova.',
        displayableDescription: '',
      },
    },
  },
  groupDetail: {
    description: 'Opis',
    product: 'Izdelek',
    creationDate: 'Ustvaril - dne',
    createdByLabel: 'OD',
    modifiedAt: 'Spremenil - dne',
    modifiedBy: 'OD',
    status: 'Začasno odstavljen',
    userLabel: 'uporabnik',
    usersLabel: 'uporabniki',
    emptyGroup: 'Noben uporabnik še ni bil dodan. <1>Dodaj uporabnika</1>',
  },
  groupMenu: {
    dissociateMenuItem: {
      label: 'Odstrani iz skupine',
    },
    suspendMenuItem: {
      suspendLabel: 'Začasno odstavi vlogo',
      activeLabel: 'Vnovič omogoči vlogo',
    },
    confirmAction: {
      suspend: {
        title: 'Začasno odstavi vlogo',
        message:
          'Ali želite začasno odstaviti <1>{{memberName}}</1> iz vloge <3>{{transcodeProductRole2Title}}</3>? <5 /> Če ga začasno odstavite, ne bo več mogel delovati na <8>{{productTitle}}</8>. <10 />Lahko ga kadar koli vnovič omogočite.',
        confirmLabel: 'Začasno odstavi',
      },
      reactivate: {
        title: 'Vnovič omogoči vlogo',
        message:
          'Ali želite vnovič omogočiti <1>{{memberName}}</1> v vlogi <3>{{transcodeProductRole2Title}}</3>? <5 /> Če ga omogočite, lahko ponovno deluje na <8>{{productTitle}}</8>. <10 />Lahko ga kadar koli znova začasno odstavite.',
        confirmLabel: 'Vnovič omogoči',
      },
      closeLabel: 'Prekliči',
    },
    confirmChangeStatus: {
      selectedUserStatusSuspended: 'začasno odstavljen',
      selectedUserStatusActive: 'vnovič omogočen',
      selectedUserStatusErrorSuspended: 'začasna odstavitev',
      selectedUserStatusErrorActive: 'vnovično omogočanje',
      updatePartyUserStatusThen: {
        title: 'Vloga {{selectedUserStatus}} pravilno omogočena.',
        message: '',
      },
      updatePartyUserStatusCatch: {
        displayableTitle: 'Vloge ni bilo mogoče začasno odstaviti. Poskusite znova.',
        displayableDescription: '',
      },
    },
    confirmDisociateAction: {
      title: 'Odstrani',
      message:
        'Ali želite odstraniti <1>{{member}}</1> iz skupine <3>{{groupName}}</3> za <5>{{productTitle}}</5>? Lahko ga kadar koli znova dodate.',
      confirmLabel: 'Odstrani',
      closeLabel: 'Prekliči',
    },
    confirmUserDissociation: {
      deleteGroupRelationThen: {
        title: 'Uporabnik je bil uspešno odstranjen.',
      },
      deleteGroupRelationCatch: {
        displayableTitle: 'Uporabnika ni bilo mogoče odstraniti. Poskusite znova.',
        displayableDescription: '',
      },
    },
  },
  membersGroup: {
    currentUser: ' (ti)',
  },
  dashboardGroupEdit: {
    alertRemoveUsersInClone: {
      label:
        'Nekateri uporabniki so bili odstranjeni iz podvojene skupine, ker niso prisotni v izbranem <1 /> izdelku. V podvojeno skupino lahko še vedno dodelite druge uporabnike.',
    },
    groupForm: {
      formLabels: {
        groupName: 'Vnesite ime skupine',
        groupNameDuplicated: 'To ime je že v uporabi',
        description: 'Opišite skupino in navedite njeno funkcijo',
        productPlaceholter: 'Izberite izdelek',
        descriptionMaxLength: 'Največ 200 znakov',
        noProductSelected: 'Ni izbranih izdelkov',
        referentsPlaceholder: 'Izberite uporabnike, ki jih želite povezati s skupino',
        cancelActionLabel: 'Nazaj',
        confirmActionLabel: 'Potrdi',
      },
      notifySuccessfulSave: {
        isEdit: 'Uspešno ste spremenili skupino ',
        isClone: 'Uspešno ste podvojili skupino ',
        isCreate: 'Uspešno ste ustvarili skupino ',
        message: '<0>{{valuesName}}</0> za izdelek <2>{{productSelectedtitle}}</>',
      },
      notifyErrorOnSave: {
        isEdit: 'Skupine ni bilo mogoče spremeniti. Poskusi znova. ',
        isClone: 'Skupine ni bilo mogoče podvojiti. Poskusite znova.',
        isCreate: 'Skupine ni bilo mogoče ustvariti. Poskusite znova.',
        displayableDescriptionEdit: 'Pri urejanju skupine je prišlo do napake {{valuesName}}',
        displayableDescriptionClone: 'Pri kloniranju skupine je prišlo do napake {{valuesName}}',
        displayableDescriptionCreate: 'Pri ustvarjanju skupine je prišlo do napake {{valuesName}}',
      },
      save: {
        groupNameAlreadyExists: 'Izbrano ime je že v uporabi. Izberite novo ime.',
        isEdit: 'Pri spreminjanju skupine je prišlo do napake. Poskusite znova.',
        isClone: 'Pri podvajanju skupine je prišlo do napake. Poskusite znova.',
        isCreate: 'Pri ustvarjanju skupine je prišlo do napake. Poskusite znova.',
      },
    },
    addGroupPage: {
      groupPathDescription: 'Skupine',
      pathDescription: 'Ustvari novo skupino',
      title: 'Ustvari novo skupino',
      subTitle:
        'Vnesite podatke skupine, povežite njene uporabnike in izberite izdelek, ki ga želite upravljati.',
      pnpgSubTitle: 'Vnesite ime, opis skupine in uporabnike, ki jih želite pridružiti skupini.',
    },
    cloneGroupPage: {
      groupPathDescription: 'Skupine',
      pathDescription: 'Podvoji skupino',
      title: 'Podvoji skupino',
      subTitle: 'Podvojite skupino in uredite podatke',
      placeholderDuplicateName: 'Kopija ',
    },
    editGroupPage: {
      groupPathDescription: 'Skupine',
      pathDescription: 'Spremeni skupino',
      title: 'Spremeni skupino',
    },
  },
  dashboardGroup: {
    groupsPage: {
      title: 'Skupine',
      subTitle:
        'Skupine so skupek uporabnikov, na primer pripadniki iste pisarne ali oddelka, katerim je zaupano upravljanje izdelkov. Tukaj si lahko ogledate skupine subjekta in ustvarite nove.',
      subTitlePnpg:
        'Skupine so skupek uporabnikov, na primer pripadniki iste pisarne ali oddelka, katerim je zaupano upravljanje obvestil. Tukaj lahko upravljate skupine podjetja in ustvarite nove.',
      tabAll: 'Vsi',
    },
    addGroupButton: {
      createActionLabel: 'Ustvari skupino',
    },
    noGroups: {
      noGroupsLabel: 'Nobena skupina še ni bila ustvarjena. <1><0>Ustvarite skupino</0></1>',
      noGroupsForProduct: 'Nobena skupina še ni bila ustvarjena za ta izdelek.',
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
      message: 'Žal, nekaj je šlo narobe. <1><0>Poskusite znova</0></1>.',
    },
    groupsTableLoadMoreData: {
      loadMoreMessage: 'Naloži več',
    },
  },
};
