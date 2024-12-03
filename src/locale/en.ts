export default {
  session: {
    expired: {
      title: 'Session expired',
      message: 'You are being redirected to the login page...',
    },
  },
  groupDetailPage: {
    path: {
      groupDescription: 'Groups',
      selectedGroupDescription: 'Registry office',
    },
    title: 'Registry office',
    backActionLabel: 'Go back',
    usersGroupSection: {
      title: 'Users',
      headerFields: {
        name: 'Name',
        email: 'Email',
        role: 'Role',
      },
    },
    addUser: 'Add user',
  },
  groupActions: {
    title: 'Group deleted correctly',
    actionOnUser: 'User actions',
    selectedGroupStatusSuspended: 'suspended',
    selectedGroupStatusActive: 'reactivated',
    selectedGroupStatusErrorSuspended: 'suspension',
    selectedGroupStatusErrorActive: 'reactivation',
    editActionLabel: 'Change',
    groupActionActive: 'Reactivate',
    groupActionSuspend: 'Suspend',
    groupDuplicateAction: 'Copy',
    groupDeleteAction: 'Delete',
    handleOpenDelete: {
      addNotify: {
        title: 'Delete group',
        message: 'Do you want to delete group <1>{{groupName}}</1> of <3>{{productName}}</3>?',
        confirmLabel: 'Delete',
        closeLabel: 'Cancel',
      },
    },
    onDelete: {
      toastComponentThen: {
        title: 'Group deleted correctly',
      },
      toastComponentCatch: {
        displayableTitle: 'ERROR WHEN DELETING',
        displayableDescription: 'There was an error deleting group <1>{{groupName}}</1>.',
      },
    },
    handleOpen: {
      addNotify: {
        titleActive: 'Suspend group',
        titleSuspended: 'Reactivate group',
        messageActive: 'You want to suspend the group',
        messageSuspended: 'You want to reactivate the group',
        messageGroupActive:
          ' <0>{{groupName}}</0> of <2>{{productTitle}}</2>? <4/>You can reactivate it at any time.',
        messageGroupSuspended:
          ' <0>{{groupName}}</0> of <2>{{productTitle}}</2>? <4/>You can suspend it again at any time.',
        confirmLabelSuspend: 'Suspend',
        confirmLabelActive: 'Reactivate',
        closeLabel: 'Cancel',
      },
    },
    handleDuplicate: {
      addNotify: {
        title: 'Duplicate group',
        message: 'Do you want to duplicate group <1>{{groupName}}</1> of <3>{{productName}}</3>?',
        confirmLabel: 'Duplicate',
        closeLabel: 'Cancel',
      },
    },
    warningMessageIo: `<1>Attenzione!</1><2/> Questa operazione potrebbe interrompere alcune funzionalità legate a un'API Key su IO. Procedi solo se il gruppo non è più necessario.`,
    confirmChangeStatus: {
      updatePartyGroupStatusThen: {
        title: 'Group {{selectedGroupStatus}} successfully',
        message: '',
      },
      updatePartyGroupStatusCatch: {
        displayableTitle: 'It was not possible to suspend the group. Try again.',
        displayableDescription: `C'è stato un errore durante la
        {{ selectedGroupStatusError }}
        del gruppo
        <1>{partyGroup.name}</1>.`,
      },
    },
  },
  groupDetail: {
    description: 'Description',
    product: 'Product',
    creationDate: 'Created by - on',
    createdByLabel: 'BY',
    modifiedAt: 'Changed by - on',
    modifiedBy: 'BY',
    status: 'Suspended',
    userLabel: 'user',
    usersLabel: 'users',
    emptyGroup: 'No user has been added yet. <1>Add a user</1>',
  },
  groupMenu: {
    dissociateMenuItem: {
      label: 'Remove from the group',
    },
    suspendMenuItem: {
      suspendLabel: 'Suspend role',
      activeLabel: 'Re-enable role',
    },
    confirmAction: {
      suspend: {
        title: 'Suspend role',
        message:
          'Do you want to suspend <1>{{memberName}}</1> from the role of <3>{{transcodeProductRole2Title}}</3>? <5 /> If you suspend them, they will no longer be able to operate on <8>{{productTitle}}</8>. <10 />You can re-enable them at any time.',
        confirmLabel: 'Suspend',
      },
      reactivate: {
        title: 'Re-enable role',
        message:
          'Do you want to re-enable <1>{{memberName}}</1> in the role of <3>{{transcodeProductRole2Title}}</3>? <5 /> If you re-enable them, they will be able to operate on <8>{{productTitle}}</8> again. <10 /> You can suspend them again at any time.',
        confirmLabel: 'Re-enable',
      },
      closeLabel: 'Cancel',
    },
    confirmChangeStatus: {
      selectedUserStatusSuspended: 'suspended',
      selectedUserStatusActive: 're-enabled',
      selectedUserStatusErrorSuspended: 'suspension',
      selectedUserStatusErrorActive: 're-enabling',
      updatePartyUserStatusThen: {
        title: 'Role {{selectedUserStatus}} successfully. ',
        message: '',
      },
      updatePartyUserStatusCatch: {
        displayableTitle: 'The role could not be suspended. Please try again.',
        displayableDescription: '',
      },
    },
    confirmDissociateAction: {
      title: 'Remove',
      message:
        'Do you want to remove <1>{{member}}</1> from the <3>{{groupName}}</3> group of <5>{{productTitle}}</5>? You can add them again at any time.',
      confirmLabel: 'Remove',
      closeLabel: 'Cancel',
    },
    confirmUserDissociation: {
      deleteGroupRelationThen: {
        title: 'User removed correctly.',
      },
      deleteGroupRelationCatch: {
        displayableTitle: 'It was not possible to remove the user. Try again.',
        displayableDescription: ``,
      },
    },
  },
  membersGroup: {
    currentUser: '(you)',
  },
  dashboardGroupEdit: {
    alertRemoveUsersInClone: {
      label:
        'Some users have been removed from the duplicate group because they are not present in the selected <1 /> product. You can still assign other users to the duplicate group.',
    },
    groupForm: {
      formLabels: {
        groupName: 'Enter the name of the group',
        groupNameDuplicated: 'This name is already being used',
        description: 'Describe the group and indicate its function',
        productPlaceholder: 'Select the product',
        descriptionMaxLength: 'Max 200 characters',
        noProductSelected: 'No product selected',
        referentsPlaceholder: 'Select the users you want to associate with the group',
        cancelActionLabel: 'Go back',
        confirmActionLabel: 'Confirm',
      },
      notifySuccessfulSave: {
        isEdit: 'You changed the group correctly ',
        isClone: 'You copied the group correctly ',
        isCreate: 'You created the group correctly ',
        message: `<0>{{valuesName}}</0> per il prodotto <2>{{productSelectedtitle}}</>`,
      },
      notifyErrorOnSave: {
        isEdit: 'It was not possible to change the group. Try again. ',
        isClone: 'It was not possible to copy the group. Try again.',
        isCreate: 'It was not possible to create the group. Try again.',
        displayableDescriptionEdit: `An error occurred while edit of group {{valuesName}}`,
        displayableDescriptionClone: `An error occurred while clone of group {{valuesName}}`,
        displayableDescriptionCreate: `An error occurred while creation of group {{valuesName}}`,
      },
      save: {
        groupNameAlreadyExists: 'The selected name is already being used. Select a new name.',
        isEdit: 'There was an error when changing the group. Try again.',
        isClone: 'There was an error when copying the group. Try again.',
        isCreate: 'There was an error when creating the group. Try again.',
      },
      outcome: {
        created: 'Group created correctly',
        modified: 'Group changed correctly',
        duplicate: 'Group copied correctly',
      },
    },
    addGroupPage: {
      groupPathDescription: 'Groups',
      pathDescription: 'Create a new group',
      title: 'Create a new group',
      subTitle: 'Enter the group data, associate its users and select the product to manage.',
      pnpgSubTitle:
        'Enter the name, the description of the group and the users you want to associate with it.',
    },
    cloneGroupPage: {
      groupPathDescription: 'Groups',
      pathDescription: 'Duplicate group',
      title: 'Duplicate group',
      subTitle: 'Duplicate the group and edit the data',
      placeholderDuplicateName: 'Copy of ',
    },
    editGroupPage: {
      groupPathDescription: 'Groups',
      pathDescription: 'Edit group',
      title: 'Edit group',
    },
  },
  dashboardGroup: {
    groupsPage: {
      title: 'Groups',
      subTitle:
        "Groups are a set of users, for example, belonging to the same office or department, who are entrusted with product management. Here, you can consult the entity's groups and create new ones.",
      subTitlePnpg:
        'Groups are a set of users, for example, belonging to the same office or department, who are entrusted with notification management. Here, you can manage company groups and create new ones.',
      tabAll: 'All',
    },
    addGroupButton: {
      createActionLabel: 'Create group',
    },
    noGroups: {
      createGroup: 'No group was created yet. <1><0>Create a group</0></1>',
      noGroupsForProduct: 'No group was created yet for this product.',
    },
    groupProductTableColumns: {
      duplicateActionLink: 'Copy',
      headerFields: {
        name: 'Name',
        description: 'Description',
        referents: 'no. users',
      },
    },
    groupsProductFetchError: {
      message: 'Sorry, something went wrong. <1><0>Try again</0></1>.',
    },
    groupsTableLoadMoreData: {
      loadMoreMessage: 'Load others',
    },
  },
};
