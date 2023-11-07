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
      selectedGroupDescription: 'État civil',
    },
    title: 'État civil',
    backActionLabel: 'Retour',
    usersGroupSection: {
      title: 'Utilisateurs',
      headerFields: {
        name: 'Prénom',
        email: 'Adresse e-mail',
        role: 'Fonction',
      },
    },
    addUser: 'Ajouter utilisateur',
  },
  groupActions: {
    title: 'Groupe supprimé correctement',
    actionOnUser: 'Actions utilisateur',
    selectedGroupStatusSuspended: 'suspendu',
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
        message:
          'Voulez-vous supprimer le groupe <1>{{groupName}} </1> de <3>{{productName}} </3> ?',
        confirmLabel: 'Supprimer',
        closeLabel: 'Annuler',
      },
    },
    onDelete: {
      toastComponentThen: {
        title: 'Groupe supprimé correctement',
      },
      toastComponentCatch: {
        displayableTitle: 'Erreur lors de la suppression.',
        displayableDescription:
          'Il y a eu une erreur lors de la suppression du groupe <1>{{groupName}} </1>.',
      },
    },
    handleOpen: {
      addNotify: {
        titleActive: 'Suspendre le groupe',
        titleSuspended: 'Réactiver le groupe',
        messageActive: 'Voulez-vous suspendre le groupe',
        messageSuspended: 'Voulez-vous réactiver le groupe',
        messageGroupActive:
          ' <0>{{groupName}} </0> de <2>{{productTitle}} </2> ? <4/>Vous pouvez le réactiver à tout moment.',
        messageGroupSuspended:
          ' <0>{{groupName}} </0> de <2>{{productTitle}} </2> ? <4/>Vous pouvez le suspendre à tout moment.',
        confirmLabelSuspend: 'Suspendre',
        confirmLabelActive: 'Réactiver',
        closeLabel: 'Annuler',
      },
    },
    handleDuplicate: {
      addNotify: {
        title: 'Dupliquer le groupe',
        message:
          'Voulez-vous dupliquer le groupe <1>{{groupName}} </1> de <3>{{productName}} </3> ?',
        confirmLabel: 'Dupliquer',
        closeLabel: 'Annuler',
      },
    },
    confirmChangeStatus: {
      updatePartyGroupStatusThen: {
        title: 'Groupe  {{selectedGroupStatus}} correctement',
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
    creationDate: 'Créé en date',
    createdByLabel: 'DA',
    modifiedAt: 'Modifié par - le',
    modifiedBy: 'DA',
    status: 'Suspendu',
    userLabel: 'utilisateur',
    usersLabel: 'utilisateurs',
    emptyGroup: "Aucun utilisateur n'a encore été ajouté. Ajouter un utilisateur",
  },
  groupMenu: {
    dissociateMenuItem: {
      label: 'Supprimer du groupe',
    },
    suspendMenuItem: {
      suspendLabel: 'Suspendre le rôle',
      activeLabel: 'Réhabiliter le rôle',
    },
    confirmAction: {
      suspend: {
        title: 'Suspendre le rôle',
        message:
          'Voulez-vous suspendre <1>{{memberName}} </1> du rôle de <3>{{transcodeProductRole2Title}} </3> ? <5 /> Si vous le suspendez, il ne pourra plus travailler sur <8>{{productTitle}} </8>. <8 />Vous pouvez le réactiver à tout moment.',
        confirmLabel: 'Suspendre',
      },
      reactivate: {
        title: 'Réhabiliter le rôle',
        message:
          'Voulez-vous réhabiliter <1>{{memberName}} </1> dans le rôle de <3>{{transcodeProductRole2Title}} </3> ? <5 /> Si vous le réhabilitez, il pourra à nouveau opérer sur <8>{{productTitle}} </8>. <8 /> Vous pouvez le suspendre à tout moment.',
        confirmLabel: 'Réinitialiser',
      },
      closeLabel: 'Annuler',
    },
    confirmChangeStatus: {
      selectedUserStatusSuspended: 'suspendu',
      selectedUserStatusActive: 'réaffecté',
      selectedUserStatusErrorSuspended: 'suspension',
      selectedUserStatusErrorActive: 'rééducation',
      updatePartyUserStatusThen: {
        title: 'Rôle  {{selectedUserStatus}} correctement. ',
        message: '',
      },
      updatePartyUserStatusCatch: {
        displayableTitle: 'Impossible de suspendre le rôle. Réessayer.',
        displayableDescription: '',
      },
    },
    confirmDisociateAction: {
      title: 'Supprimer',
      message:
        "Voulez-vous supprimer <1>{{member}} </1> du groupe <3>{{groupName}} </3> de <5>{{productTitle}} </5> ? Vous pouvez l'ajouter à nouveau à tout moment.",
      confirmLabel: 'Supprimer',
      closeLabel: 'Annuler',
    },
    confirmUserDissociation: {
      deleteGroupRelationThen: {
        title: 'Utilisateur supprimé correctement',
      },
      deleteGroupRelationCatch: {
        displayableTitle: "Impossible de supprimer l'utilisateur. Réessayer.",
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
        "Certains utilisateurs ont été supprimés du groupe dupliqué parce qu'ils n'étaient pas présents dans le produit <1 /> sélectionné. Vous pouvez toujours affecter d'autres utilisateurs au groupe dupliqué.",
    },
    groupForm: {
      formLabels: {
        groupName: 'Le nom du groupe',
        groupNameDuplicated: 'Ce nom est déjà utilisé',
        description: 'Décrivez le groupe et indiquez sa fonction',
        productPlaceholder: 'Sélection du produit',
        descriptionMaxLength: '200 caractères maximum',
        noProductSelected: 'Aucun produit sélectionné',
        referentsPlaceholder: 'Sélectionnez les utilisateurs que vous souhaitez associer au groupe',
        cancelActionLabel: 'Retour',
        confirmActionLabel: 'Confirmer',
      },
      notifySuccessfulSave: {
        isEdit: 'Vous avez correctement modifié le groupe ',
        isClone: 'Vous avez correctement dupliqué le groupe ',
        isCreate: 'Vous avez créé le groupe avec succès ',
        message: '<0>{{valuesName}} </0> pour le produit <2>{{productSelectedtitle}} </>',
      },
      notifyErrorOnSave: {
        isEdit: 'Impossible de modifier le groupe. Réessayer. ',
        isClone: 'Impossible de dupliquer le groupe. Réessayer.',
        isCreate: "Le groupe n'a pas pu être créé. Réessayer.",
        displayableDescriptionEdit:
          "Une erreur s'est produite lors de la modification du groupe {{valuesName}}",
        displayableDescriptionClone:
          "Une erreur s'est produite lors du clonage du groupe {{valuesName}} ",
        displayableDescriptionCreate:
          "Une erreur s'est produite lors de la création du groupe {{valuesName}} ",
      },
      save: {
        groupNameAlreadyExists: 'Le nom choisi est déjà utilisé. Chosissez un nouveau nom',
        isEdit: 'Il y a eu une erreur lors de la modification du groupe. Réessayer.',
        isClone: 'Il y a eu une erreur lors de la duplication du groupe. Réessayer.',
        isCreate: 'Il y a eu une erreur lors de la création du groupe. Réessayer.',
      },
      outcome: {
        created: 'Groupe créé avec succès',
        modified: 'Groupe modifié avec succès',
        duplicate: 'Groupe dupliqué avec succès',
      },
    },
    addGroupPage: {
      groupPathDescription: 'Groupes',
      pathDescription: 'Créer un nouveau groupe',
      title: 'Créer un nouveau groupe',
      subTitle:
        'Saisissez les données du groupe, associez ses utilisateurs et sélectionnez le produit à gérer.',
      pnpgSubTitle:
        'Saisissez le nom, la description du groupe et les utilisateurs que vous souhaitez y associer.',
    },
    cloneGroupPage: {
      groupPathDescription: 'Groupes',
      pathDescription: 'Dupliquer le groupe',
      title: 'Dupliquer le groupe',
      subTitle: 'Dupliquer le groupe et modifier les données',
      placeholderDuplicateName: 'Copie de : ',
    },
    editGroupPage: {
      groupPathDescription: 'Groupes',
      pathDescription: 'Modifier le groupe',
      title: 'Modifier le groupe',
    },
  },
  dashboardGroup: {
    groupsPage: {
      title: 'Groupes',
      subTitle:
        "Les groupes sont un ensemble d'utilisateurs, par exemple appartenant au même bureau ou département, auxquels est confiée la gestion des produits. Ici, vous pouvez consulter les groupes de l'entité et en créer de nouveaux.",
      subTitlePnpg:
        "Les groupes sont un ensemble d'utilisateurs, par exemple appartenant au même bureau ou département, auxquels est confiée la gestion des notifications. Ici, vous pouvez gérer les groupes de l'entreprise et en créer de nouveaux.",
      tabAll: 'Tous',
    },
    addGroupButton: {
      createActionLabel: 'Créer un groupe',
    },
    noGroups: {
      createGroup: "Aucun groupe n'a encore été créé. <1><0>Créer un groupe</0></1>",
      noGroupsLabel: "Aucun groupe n'a encore été créé pour ce produit.",
      noGroupsForProduct: "Aucun groupe n'a encore été créé pour ce produit.",
    },
    groupProductTableColumns: {
      duplicateActionLink: 'Dupliquer',
      headerFields: {
        name: 'Prénom',
        description: 'Description',
        referents: 'n. utilisateurs',
      },
    },
    groupsProductFetchError: {
      message: "Désolés, une erreur s'est produite. <1><2>Réessayer</2></1>.",
    },
    groupsTableLoadMoreData: {
      loadMoreMessage: 'Charger plus',
    },
  },
};
