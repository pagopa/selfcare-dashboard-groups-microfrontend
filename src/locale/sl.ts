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
    actionOnUser: 'Dejanja na uporabniku',
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
        titleActive: 'Prekini skupino',
        titleSuspended: 'Ponovno aktiviraj skupino',
        messageActive: 'Ali želite prekiniti skupino',
        messageSuspended: 'Ali želite ponovno aktivirati skupino',
        messageGroupActive:
          ' <0>{{groupName}}</0> za <2>{{productTitle}}</2>? <4/>Kadarkoli jo lahko ponovno aktivirate.',
        messageGroupSuspended:
          ' <0>{{groupName}}</0> za <2>{{productTitle}}</2>? <4/>Kadarkoli jo lahko ponovno prekinete.',
        confirmLabelSuspend: 'Prekini',
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
    warningMessageIo: `<1>Attenzione!</1><2/> Questa operazione potrebbe interrompere alcune funzionalità legate a un'API Key su IO. Procedi solo se il gruppo non è più necessario.`,
    confirmChangeStatus: {
      updatePartyGroupStatusThen: {
        title: 'Skupina je {{selectedGroupStatus}} uspešno',
        message: '',
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
          'Ali želite prekiniti <1>{{memberName}}</1> iz vloge <3>{{transcodeProductRole2Title}}</3>? <5 /> Če ga prekinete, ne bo več mogel delovati na <8>{{productTitle}}</8>. <10 />Kadarkoli ga lahko ponovno omogočite.',
        confirmLabel: 'Prekini',
      },
      reactivate: {
        title: 'Ponovno omogoči vlogo',
        message:
          'Ali želite ponovno omogočiti <1>{{memberName}}</1> v vlogi <3>{{transcodeProductRole2Title}}</3>? <5 /> Če ga ponovno omogočite, bo lahko ponovno deloval na <8>{{productTitle}}</8>. <10 />Kadarkoli ga lahko ponovno prekinete.',
        confirmLabel: 'Ponovno omogoči',
      },
      closeLabel: 'Prekliči',
    },
    confirmChangeStatus: {
      selectedUserStatusSuspended: 'prekinjeno',
      selectedUserStatusActive: 'ponovno vzpostavljeno',
      selectedUserStatusErrorSuspended: 'prekinitev',
      selectedUserStatusErrorActive: 'ponovna vzpostavitev',
      updatePartyUserStatusThen: {
        title: 'Vloga je {{selectedUserStatus}} uspešno. ',
        message: '',
      },
      updatePartyUserStatusCatch: {
        displayableTitle: 'Vloge ni bilo mogoče prekiniti. Poskusite znova.',
        displayableDescription: '',
      },
    },
    confirmDisociateAction: {
      title: 'Odstrani',
      message:
        'Ali želite odstraniti <1>{{member}}</1> iz skupine <3>{{groupName}}</3> za <5>{{productTitle}}</5>? Kadarkoli ga lahko znova dodate.',
      confirmLabel: 'Odstrani',
      closeLabel: 'Prekliči',
    },
    confirmUserDissociation: {
      deleteGroupRelationThen: {
        title: 'Uporabnik uspešno odstranjen.',
      },
      deleteGroupRelationCatch: {
        displayableTitle: 'Uporabnika ni bilo mogoče odstraniti. Poskusi ponovno.',
        displayableDescription: '',
      },
    },
  },
  membersGroup: {
    currentUser: '(ti)',
  },
  dashboardGroupEdit: {
    alertRemoveUsersInClone: {
      label:
        'Nekateri uporabniki so bili odstranjeni iz podvojene skupine, ker niso prisotni v izbranem <1 /> izdelku. Podvojeni skupini lahko še vedno dodelite druge uporabnike.',
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
        message: '<0>{{valuesName}}</0> za izdelek <2>{{productSelectedtitle}}</>',
      },
      notifyErrorOnSave: {
        isEdit: 'Skupine ni bilo mogoče urediti. Poskusite znova. ',
        isClone: 'Podvajanje skupine ni uspelo. Poskusite znova.',
        isCreate: 'Skupine ni bilo mogoče ustvariti. Poskusite znova.',
        displayableDescriptionEdit: 'Pri urejanju skupine {{valuesName}} je prišlo do napake',
        displayableDescriptionClone: 'Med kloniranjem skupine {{valuesName}} je prišlo do napake ',
        displayableDescriptionCreate: 'Pri ustvarjanju skupine {{valuesName}} je prišlo do napake',
      },
      save: {
        groupNameAlreadyExists: 'Izbrano ime je že v uporabi. Izberite novo ime.',
        isEdit: 'Med urejanjem skupine je prišlo do napake. Poskusi ponovno.',
        isClone: 'Med podvajanjem skupine je prišlo do napake. Poskusi ponovno.',
        isCreate: 'Pri ustvarjanju skupine je prišlo do napake. Poskusi ponovno.',
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
        'Vnesite podatke skupine, povežite njene uporabnike in izberite izdelek, ki ga želite upravljati.',
      pnpgSubTitle: 'Vnesite ime, opis skupine in uporabnike, s katerimi se želite povezati.',
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
      pathDescription: 'Uredi skupino',
      title: 'Uredi skupino',
    },
  },
  dashboardGroup: {
    groupsPage: {
      title: 'Skupine',
      subTitle:
        'Skupine so skupek uporabnikov, ki na primer pripadajo isti pisarni ali oddelku in jim je zaupano upravljanje izdelkov. Tukaj se lahko posvetujete s skupinami organizacije in ustvarite nove.',
      subTitlePnpg:
        'Skupine so skupek uporabnikov, ki na primer pripadajo isti pisarni ali oddelku in jim je zaupano upravljanje obvestil. Tukaj lahko upravljate skupine podjetja in ustvarjate nove.',
      tabAll: 'Vsi',
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
      message: 'Žal, nekaj je šlo narobe. <1><0>Poskusite znova</0></1>.',
    },
    groupsTableLoadMoreData: {
      loadMoreMessage: 'Naloži druge',
    },
  },
};
