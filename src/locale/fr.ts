export default {
  session: {
    expired: {
      title: 'Session expirée',
      message: 'Vous allez être redirigé vers la page de connexion...',
    },
  },
  groupDetailPage: {
    path: {
      groupDescription: 'Groupes',
      selectedGroupDescription: 'Registre',
    },
    title: 'Registre',
    backActionLabel: 'Retour',
    usersGroupSection: {
      title: 'Utilisateurs',
      headerFields: {
        name: 'Prénom',
        email: 'Email',
        role: 'Rôle',
      },
    },
    addUser: 'Ajouter utilisateur',
  },
  groupActions: {
    title: 'Groupe correctement éliminé',
    actionOnUser: "Actions sur l’utilisateur",
    selectedGroupStatusSuspended: 'en attente',
    selectedGroupStatusActive: 'réactivé',
    selectedGroupStatusErrorSuspended: 'suspension',
    selectedGroupStatusErrorActive: 'réactivation',
    editActionLabel: 'Modifier',
    groupActionActive: 'Réactiver',
    groupActionSuspend: 'Suspendre',
    groupDuplicateAction: 'Dupliquer',
    groupDeleteAction: 'Supprimer',
    handleOpenDelete: {
      addNotify: {
        title: 'Supprimer groupe',
        message: `Vuoi eliminare il gruppo <1>{{groupName}}</1> di <3>{{productName}}</3>?`,
        confirmLabel: 'Supprimer',
        closeLabel: 'Annuler',
      },
    },
    onDelete: {
      toastComponentThen: {
        title: 'Groupe correctement éliminé',
      },
      toastComponentCatch: {
        displayableTitle: "ERREUR DURANT LA SUPPRESSION",
        displayableDescription: `C'è stato un errore durante l'eliminazione del gruppo <1>{{groupName}}</1>.`,
      },
    },
    handleOpen: {
      addNotify: {
        titleActive: 'Suspendre groupe',
        titleSuspended: 'Réactiver groupe',
        messageActive: 'Vous souhaitez suspendre le groupe',
        messageSuspended: 'Vous souhaitez réactiver le groupe',
        messageGroupActive: ` <1>{{groupName}}</1> di <3>{{productTitle}}</3>? <5/>Puoi riattivarlo in qualsiasi momento.`,
        messageGroupSuspended: ` <1>{{groupName}}</1> di <3>{{productTitle}}</3>? <5/>Puoi sospenderlo di nuovo in qualsiasi momento.`,
        confirmLabelSuspend: 'Suspendre',
        confirmLabelActive: 'Réactiver',
        closeLabel: 'Annuler',
      },
    },
    handleDuplicate: {
      addNotify: {
        title: 'Dupliquer groupe',
        message: `Vuoi duplicare il gruppo <1>{{groupName}}</1> di <3>{{productName}}</3>?`,
        confirmLabel: 'Dupliquer',
        closeLabel: 'Annuler',
      },
    },
    warningMessageIo: `<1>Attenzione!</1><2/> Questa operazione potrebbe interrompere alcune funzionalità legate a un'API Key su IO. Procedi solo se il gruppo non è più necessario.`,
    confirmChangeStatus: {
      updatePartyGroupStatusThen: {
        title: `Gruppo {{selectedGroupStatus}} correttamente`,
        message: ``,
      },
      updatePartyGroupStatusCatch: {
        displayableTitle: 'Le groupe n’a pas pu être suspendu. Réessayer.',
        displayableDescription: `C'è stato un errore durante la
        {{ selectedGroupStatusError }}
        del gruppo
        <1>{partyGroup.name}</1>.`,
      },
    },
  },
  groupDetail: {
    description: 'Description',
    product: 'Produit',
    creationDate: 'Créé par - le',
    createdByLabel: 'PAR',
    modifiedAt: 'Modifié par - le',
    modifiedBy: 'PAR',
    status: 'En attente',
    userLabel: 'utilisateur',
    usersLabel: 'utilisateurs',
    emptyGroup: 'Aucun utilisateur n’a encore été ajouté. <1>Ajouter un utilisateur</1>',
  },
  groupMenu: {
    dissociateMenuItem: {
      label: 'Supprimer du groupe',
    },
    suspendMenuItem: {
      suspendLabel: 'Suspendre rôle',
      activeLabel: 'Réactiver rôle',
    },
    confirmAction: {
      suspend: {
        title: 'Suspendre rôle',
        message:
          'Vuoi sospendere <1>{{memberName}}</1> dal ruolo di <3>{{transcodeProductRole2Title}}</3>? <5 /> Se lo sospendi, non potrà più operare su <8>{{productTitle}}</8>. <10 />Puoi riabilitarlo in qualsiasi momento.',
        confirmLabel: 'Suspendre',
      },
      reactivate: {
        title: 'Réactiver rôle',
        message:
          'Vuoi riabilitare <1>{{memberName}}</1> nel ruolo di <3>{{transcodeProductRole2Title}}</3>? <5 /> Se lo riabiliti, potrà operare di nuovo su <8>{{productTitle}}</8>. <10 />Puoi sospenderlo di nuovo in qualsiasi momento.',
        confirmLabel: 'Réactiver',
      },
      closeLabel: 'Annuler',
    },
    confirmChangeStatus: {
      selectedUserStatusSuspended: 'en attente',
      selectedUserStatusActive: 'réactivé',
      selectedUserStatusErrorSuspended: 'suspension',
      selectedUserStatusErrorActive: 'réactivation',
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
      title: 'Supprimer',
      message: `Vuoi rimuovere <1>{{member}}</1> dal gruppo <3>{{groupName}}</3> di <5>{{productTitle}}</5>? Puoi aggiungerlo nuovamente in qualsiasi momento.`,
      confirmLabel: 'Supprimer',
      closeLabel: 'Annuler',
    },
    confirmUserDissociation: {
      deleteGroupRelationThen: {
        title: 'Utilisateur correctement supprimé.',
      },
      deleteGroupRelationCatch: {
        displayableTitle: 'L’utilisateur n’a pas pu être supprimé. Réessayer.',
        displayableDescription: ``,
      },
    },
  },
  membersGroup: {
    currentUser: ' (vous)',
  },
  dashboardGroupEdit: {
    alertRemoveUsersInClone: {
      label: `Alcuni utenti sono stati rimossi dal gruppo duplicato perché non presenti nel prodotto <1 /> selezionato. Puoi comunque assegnare altri utenti al gruppo duplicato.`,
    },
    groupForm: {
      formLabels: {
        groupName: 'Saisissez le nom du groupe',
        groupNameDuplicated: 'Ce nom est déjà utilisé',
        description: 'Décrivez le groupe et indiquez sa fonction',
        productPlaceholder: 'Sélectionner le produit',
        descriptionMaxLength: '200 caractères maximu.',
        noProductSelected: 'Aucun produit sélectionné',
        referentsPlaceholder: 'Sélectionnez les utilisateurs que vous souhaitez associer au groupe',
        cancelActionLabel: 'Retour',
        confirmActionLabel: 'Confirmer',
      },
      notifySuccessfulSave: {
        isEdit: 'Vous avez correctement modifié le groupe ',
        isClone: 'Vous avez correctement dupliqué le groupe ',
        isCreate: 'Vous avez correctement créé le groupe ',
        message: `<0>{{valuesName}}</0> per il prodotto <2>{{productSelectedtitle}}</>`,
      },
      notifyErrorOnSave: {
        isEdit: 'Le groupe n’a pas pu être modifié. Réessayer. ',
        isClone: 'Le groupe n’a pas pu être dupliqué. Réessayer.',
        isCreate: 'Le groupe n’a pas pu être créé. Réessayer.',
        displayableDescriptionEdit: `An error occurred while edit of group {{valuesName}}`,
        displayableDescriptionClone: `An error occurred while clone of group {{valuesName}}`,
        displayableDescriptionCreate: `An error occurred while creation of group {{valuesName}}`,
      },
      save: {
        groupNameAlreadyExists: 'Le nom choisi est déjà utilisé. Choisissez un nouveau nom.',
        isEdit: "Une erreur s’est produite lors de la modification du groupe. Réessayer.",
        isClone: "Une erreur s’est produite lors de la duplication du groupe. Réessayer.",
        isCreate: "Une erreur s’est produite lors de la création du groupe. Réessayer.",
      },
      outcome: {
        created: 'Groupe correctement créé',
        modified: 'Groupe correctement modifié',
        duplicate: 'Groupe correctement dupliqué',
      },
    },
    addGroupPage: {
      groupPathDescription: 'Groupes',
      pathDescription: 'Créer un nouveau groupe',
      title: 'Créer un nouveau groupe',
      subTitle:
        'Inserisci i dati del gruppo, associa i relativi utenti e seleziona il prodotto da gestire.',
      pnpgSubTitle:
        'Inserisci il nome, la descrizione del gruppo e gli utenti che vuoi associarvi.',
    },
    cloneGroupPage: {
      groupPathDescription: 'Groupes',
      pathDescription: 'Dupliquer groupe',
      title: 'Dupliquer groupe',
      subTitle: `Duplica il gruppo e modifica i dati`,
      placeholderDuplicateName: 'Copie de ',
    },
    editGroupPage: {
      groupPathDescription: 'Groupes',
      pathDescription: 'Modifier groupe',
      title: 'Modifier groupe',
    },
  },
  dashboardGroup: {
    groupsPage: {
      title: 'Groupes',
      subTitle:
        'I gruppi sono un insieme di utenti, per esempio appartenenti allo stesso ufficio o dipartimento, a cui si affida la gestione dei prodotti. Qui puoi consultare i gruppi dell’ente e creare di nuovi.',
      subTitlePnpg:
        'I gruppi sono un insieme di utenti, per esempio appartenenti allo stesso ufficio o dipartimento, a cui si affida la gestione delle notifiche. Qui puoi gestire i gruppi dell’impresa e crearne di nuovi.',
      tabAll: 'Tous',
    },
    addGroupButton: {
      createActionLabel: 'Créer groupe',
    },
    noGroups: {
      createGroup: 'Aucun groupe n’a encore été créé. <1><0>Créer un groupe</0></1>',
      noGroupsForProduct: 'Aucun groupe n’a encore été créé pour ce produit.',
    },
    groupProductTableColumns: {
      duplicateActionLink: 'Dupliquer',
      headerFields: {
        name: 'Prénom',
        description: 'Description',
        referents: 'nbre utilisateurs',
      },
    },
    groupsProductFetchError: {
      message: `Spiacenti, qualcosa è andato storto. <1><0>Riprova</0></1>.`,
    },
    groupsTableLoadMoreData: {
      loadMoreMessage: 'Télécharger autres',
    },
  },
};
