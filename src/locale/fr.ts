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
    actionOnUser: 'Actions sur l’utilisateur',
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
        message:
          'Voulez-vous supprimer le groupe <1>{{groupName}} </1> de <3>{{productName}} </3> ?',
        confirmLabel: 'Supprimer',
        closeLabel: 'Annuler',
      },
    },
    onDelete: {
      toastComponentThen: {
        title: 'Groupe correctement éliminé',
      },
      toastComponentCatch: {
        displayableTitle: 'ERREUR DURANT LA SUPPRESSION',
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
        title: 'Dupliquer groupe',
        message:
          'Voulez-vous dupliquer le groupe <1>{{groupName}} </1> de <3>{{productName}} </3> ?',
        confirmLabel: 'Dupliquer',
        closeLabel: 'Annuler',
      },
    },
    warningMessageIo: `<1>Attenzione!</1><2/> Questa operazione potrebbe interrompere alcune funzionalità legate a un'API Key su IO. Procedi solo se il gruppo non è più necessario.`,
    confirmChangeStatus: {
      updatePartyGroupStatusThen: {
        title: 'Groupe  {{selectedGroupStatus}} correctement',
        message: '',
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
      selectedUserStatusSuspended: 'en attente',
      selectedUserStatusActive: 'réactivé',
      selectedUserStatusErrorSuspended: 'suspension',
      selectedUserStatusErrorActive: 'réactivation',
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
        title: 'Utilisateur correctement supprimé.',
      },
      deleteGroupRelationCatch: {
        displayableTitle: 'L’utilisateur n’a pas pu être supprimé. Réessayer.',
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
        groupNameAlreadyExists: 'Le nom choisi est déjà utilisé. Choisissez un nouveau nom.',
        isEdit: 'Une erreur s’est produite lors de la modification du groupe. Réessayer.',
        isClone: 'Une erreur s’est produite lors de la duplication du groupe. Réessayer.',
        isCreate: 'Une erreur s’est produite lors de la création du groupe. Réessayer.',
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
        'Saisissez les données du groupe, associez ses utilisateurs et sélectionnez le produit à gérer.',
      pnpgSubTitle:
        'Saisissez le nom, la description du groupe et les utilisateurs que vous souhaitez y associer.',
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
        "Les groupes sont un ensemble d'utilisateurs, par exemple appartenant au même bureau ou département, auxquels est confiée la gestion des produits. Ici, vous pouvez consulter les groupes de l'entité et en créer de nouveaux.",
      subTitlePnpg:
        "Les groupes sont un ensemble d'utilisateurs, par exemple appartenant au même bureau ou département, auxquels est confiée la gestion des notifications. Ici, vous pouvez gérer les groupes de l'entreprise et en créer de nouveaux.",
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
      message: "Désolés, une erreur s'est produite. <1><2>Réessayer</2></1>.",
    },
    groupsTableLoadMoreData: {
      loadMoreMessage: 'Télécharger autres',
    },
  },
};
