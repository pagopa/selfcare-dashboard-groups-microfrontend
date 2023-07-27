export default {
  session: {
    expired: {
      title: 'Session expirée',
      message: 'Vous allez être redirigé(e) vers la page de connexion...',
    },
  },
  groupDetailPage: {
    path: {
      groupDescription: 'Groupes',
      selectedGroupDescription: 'État civil',
    },
    title: 'État civil',
    backActionLabel: 'Retour',
    usersTitle: 'Utilisateurs',
    addUser: 'Ajouter utilisateur',
  },
  groupActions: {
    title: 'Groupe supprimé correctement',
    actionOnUser: "Actions sur l'utilisateur",
    selectedGroupStatusSuspended: 'suspendu',
    selectedGroupStatusActive: 'réhabilité',
    selectedGroupStatusErrorSuspended: 'suspension',
    selectedGroupStatusErrorActive: 'réhabilitation',
    editActionLabel: 'Modifier',
    groupActionActive: 'Réhabiliter',
    groupActionSuspend: 'Suspendre',
    groupDuplicateAction: 'Dupliquer',
    groupDeleteAction: 'Supprimer',
    handleOpenDelete: {
      addNotify: {
        title: 'Supprimer groupe',
        message: 'Voulez-vous supprimer le groupe <1>{{groupName}}</1> de <3>{{productName}}</3> ?',
        confirmLabel: 'Supprimer',
        closeLabel: 'Annuler',
      },
    },
    onDelete: {
      toastComponentThen: {
        title: 'Groupe supprimé correctement',
      },
      toastComponentCatch: {
        displayableTitle: 'ERREUR LORS DE LA SUPPRESSION',
        displayableDescription:
          "Une erreur s'est produite lors de la suppression du groupe <1>{{groupName}}</1>.",
      },
    },
    handleOpen: {
      addNotify: {
        titleActive: 'Suspendre groupe',
        titleSuspended: 'Réhabiliter groupe',
        messageActive: 'Voulez-vous suspendre le groupe ?',
        messageSuspended: 'Voulez-vous réhabiliter le groupe ?',
        messageGroupActive:
          '<0>{{groupName}}</0> de <2>{{productTitle}}</2> ? <4/>Vous pourrez le réhabiliter à tout moment.',
        messageGroupSuspended:
          '<0>{{groupName}}</0> de <2>{{productTitle}}</2> ? <4/>Vous pourrez à nouveau suspendre le groupe à tout moment.',
        confirmLabelSuspend: 'Suspendre',
        confirmLabelActive: 'Réhabiliter',
        closeLabel: 'Annuler',
      },
    },
    handleDuplicate: {
      addNotify: {
        title: 'Dupliquer groupe',
        message: 'Voulez-vous dupliquer le groupe <1>{{groupName}}</1> de <3>{{productName}}</3> ?',
        confirmLabel: 'Dupliquer',
        closeLabel: 'Annuler',
      },
    },
    confirmChangeStatus: {
      updatePartyGroupStatusThen: {
        title: 'Groupe {{selectedGroupStatus}} correctement',
        message: '',
      },
      updatePartyGroupStatusCatch: {
        displayableTitle: "Il n'a pas été possible de suspendre le groupe. Réessayer.",
        displayableDescription: '',
      },
    },
  },
  groupDetail: {
    description: 'Description',
    product: 'Produit',
    creationDate: 'Créé par - en date du',
    createdByLabel: 'DU',
    modifiedAt: 'Modifié par - en date du',
    modifiedBy: 'DU',
    status: 'Suspendue',
    userLabel: 'utilisateur',
    usersLabel: 'utilisateurs',
    emptyGroup: "Aucun utilisateur n'a encore été ajouté. <1>Ajouter un utilisateur</1>",
  },
  groupMenu: {
    dissociateMenuItem: {
      label: 'Supprimer utilisateur du groupe',
    },
    suspendMenuItem: {
      suspendLabel: 'Suspendre fonction',
      activeLabel: 'Réhabiliter fonction',
    },
    confirmAction: {
      suspend: {
        title: 'Suspendre fonction',
        message:
          'Voulez-vous suspendre <1>{{memberName}}</1> de la fonction de <3>{{transcodeProductRole2Title}}</3> ? <5 /> En cas de suspension, il/elle ne pourra plus utiliser <8>{{productTitle}}</8>. <10 />Vous pourrez réhabiliter la fonction à tout moment.',
        confirmLabel: 'Suspendre',
      },
      reactivate: {
        title: 'Réhabiliter fonction',
        message:
          'Voulez-vous réhabiliter <1>{{memberName}}</1> à la fonction de <3>{{transcodeProductRole2Title}}</3> ? <5 /> En cas de réhabilitation, il/elle pourra à nouveau utiliser <8>{{productTitle}}</8>. <10 /> Vous pourrez à nouveau suspendre la fonction à tout moment.',
        confirmLabel: 'Réhabiliter',
      },
      closeLabel: 'Annuler',
    },
    confirmChangeStatus: {
      selectedUserStatusSuspended: 'suspendu',
      selectedUserStatusActive: 'réhabilité',
      selectedUserStatusErrorSuspended: 'suspension',
      selectedUserStatusErrorActive: 'réhabilitation',
      updatePartyUserStatusThen: {
        title: 'Fonction {{selectedUserStatus}} correctement.',
        message: '',
      },
      updatePartyUserStatusCatch: {
        displayableTitle: "Il n'a pas été possible de suspendre la fonction. Réessayer.",
        displayableDescription: '',
      },
    },
    confirmDisociateAction: {
      title: 'Supprimer',
      message:
        "Voulez-vous supprimer <1>{{member}}</1> du groupe <3>{{groupName}}</3> de <5>{{productTitle}}</5> ? Vous pourrez à nouveau l'ajouter à tout moment.",
      confirmLabel: 'Supprimer',
      closeLabel: 'Annuler',
    },
    confirmUserDissociation: {
      deleteGroupRelationThen: {
        title: 'Utilisateur supprimé correctement.',
      },
      deleteGroupRelationCatch: {
        displayableTitle: "Il n'a pas été possible de supprimer l'utilisateur. Réessayer.",
        displayableDescription: '',
      },
    },
  },
  membersGroup: {
    currentUser: '(vous)',
  },
  dashboardGroupEdit: {
    alertRemoveUsersInClone: {
      label:
        "Certains utilisateurs ont été supprimés du groupe dupliqué car ils ne figuraient pas dans le produit <1 /> sélectionné. Vous pouvez toujours affecter d'autres utilisateurs au groupe dupliqué.",
    },
    groupForm: {
      formLabels: {
        groupName: 'Saisir le nom du groupe',
        groupNameDuplicated: 'Ce nom est déjà utilisé',
        description: 'Décrire le groupe et indiquer sa fonction',
        productPlaceholter: 'Sélectionner le produit',
        descriptionMaxLength: '200 caractères max',
        noProductSelected: 'Aucun produit sélectionné',
        referentsPlaceholder: 'Sélectionner les utilisateurs que vous souhaitez associer au groupe',
        cancelActionLabel: 'Retour',
        confirmActionLabel: 'Confirmer',
      },
      notifySuccessfulSave: {
        isEdit: 'Vous avez modifié le groupe correctement ',
        isClone: 'Vous avez dupliqué le groupe correctement ',
        isCreate: 'Vous avez créé le groupe correctement ',
        message: '<0>{{valuesName}} </0> pour le produit <2>{{productSelectedtitle}}</>',
      },
      notifyErrorOnSave: {
        isEdit: "Il n'a pas été possible de modifier le groupe. Réessayer. ",
        isClone: "Il n'a pas été possible de dupliquer le groupe. Réessayer.",
        isCreate: "Il n'a pas été possible de créer le groupe. Réessayer.",
        displayableDescriptionEdit: 'An error occurred while edit of group {{valuesName}}',
        displayableDescriptionClone: 'An error occurred while clone of group {{valuesName}}',
        displayableDescriptionCreate: 'An error occurred while creation of group {{valuesName}}',
      },
      save: {
        groupNameAlreadyExists: 'Le nom choisi est déjà utilisé. Choisir un nouveau nom.',
        isEdit: "Une erreur s'est produite lors de la modification du groupe. Réessayer.",
        isClone: "Une erreur s'est produite lors de la duplication du groupe. Réessayer.",
        isCreate: "Une erreur s'est produite lors de la création du groupe. Réessayer.",
      },
    },
    addGroupPage: {
      groupPathDescription: 'Groupes',
      pathDescription: 'Créer un nouveau groupe',
      title: 'Créer un nouveau groupe',
      subTitle:
        'Saisir les informations concernant le groupe, associer les utilisateurs correspondants et sélectionner le produit à gérer.',
      pnpgSubTitle:
        'Saisir le nom, la description du groupe et les utilisateurs que vous souhaitez associer.',
    },
    cloneGroupPage: {
      groupPathDescription: 'Groupes',
      pathDescription: 'Dupliquer groupe',
      title: 'Dupliquer groupe',
      subTitle: 'Dupliquer le groupe et modifier les informations',
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
        "Les groupes sont un ensemble d'utilisateurs qui, par exemple, appartiennent au même bureau ou département, à qui la gestion des produits est confiée. Vous pouvez consulter les groupes de l'organisme et en créer de nouveaux ici.",
      subTitlePnpg:
        "Les groupes sont un ensemble d'utilisateurs qui, par exemple, appartiennent au même bureau ou département, à qui la gestion des notifications est confiée. Vous pouvez gérer les groupes de l'entreprise et en créer de nouveaux ici.",
      tabAll: 'Tous',
    },
    addGroupButton: {
      createActionLabel: 'Créer groupe',
    },
    noGroups: {
      noGroupsLabel: "Aucun groupe n'a encore été créé. <1><0>Créer un groupe</0></1>",
      noGroupsForProduct: "Aucun groupe n'a encore été créé pour ce produit.",
    },
    groupProductTableColumns: {
      duplicateActionLink: 'Dupliquer',
      headerFields: {
        name: 'Prénom',
        description: 'Description',
        referents: "nb d'utilisateurs",
      },
    },
    groupsProductFetchError: {
      message: "Désolé, une erreur s'est produite. <1><0>Réessayer</0></1>.",
    },
    groupsTableLoadMoreData: {
      loadMoreMessage: 'Charger autres',
    },
  },
};
