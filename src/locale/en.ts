export default {
  session: {
    expired: {
      title: 'Session expired',
      message: 'You are about to be redirected to the login page...',
    },
  },
  groupDetailPage: {
    path: {
      groupDescription: 'Groups',
      selectedGroupDescription: 'Registry office',
    },
    title: 'Registry office',
    backActionLabel: 'Back',
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
    title: 'Group successfully deleted',
    actionOnUser: 'User actions',
    selectedGroupStatusSuspended: 'suspended',
    selectedGroupStatusActive: 'reactivated',
    selectedGroupStatusErrorSuspended: 'suspension',
    selectedGroupStatusErrorActive: 'reactivation',
    editActionLabel: 'Edit',
    groupActionActive: 'Reactivate',
    groupActionSuspend: 'Suspend',
    groupDuplicateAction: 'Duplicate',
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
        title: 'Group successfully deleted',
      },
      toastComponentCatch: {
        displayableTitle: 'ERROR WHILE DELETING',
        displayableDescription: 'There was an error deleting group <1>{{groupName}}</1>.',
      },
    },
    handleOpen: {
      addNotify: {
        titleActive: 'Suspend group',
        titleSuspended: 'Reactivate group',
        messageActive: 'Do you want to suspend the group',
        messageSuspended: 'Do you want to reactivate the group',
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
    confirmChangeStatus: {
      updatePartyGroupStatusThen: {
        title: 'Group {{selectedGroupStatus}} successfully',
        message: '',
      },
      updatePartyGroupStatusCatch: {
        displayableTitle: 'The group could not be suspended. Please try again.',
        displayableDescription: '',
      },
    },
  },
  groupDetail: {
    description: 'Description',
    product: 'Product',
    creationDate: 'Created by – on',
    createdByLabel: 'BY',
    modifiedAt: 'Edited by – on',
    modifiedBy: 'BY',
    status: 'Suspended',
    userLabel: 'user',
    usersLabel: 'users',
    emptyGroup: 'No users have been added yet. <1>Add a user</1>',
  },
  groupMenu: {
    dissociateMenuItem: {
      label: 'Remove from group',
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
    confirmDisociateAction: {
      title: 'Remove',
      message:
        'Do you want to remove <1>{{member}}</1> from the <3>{{groupName}}</3> group of <5>{{productTitle}}</5>? You can add them again at any time.',
      confirmLabel: 'Remove',
      closeLabel: 'Cancel',
    },
    confirmUserDissociation: {
      deleteGroupRelationThen: {
        title: 'User successfully removed.',
      },
      deleteGroupRelationCatch: {
        displayableTitle: 'Could not remove user. Please try again.',
        displayableDescription: '',
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
        groupNameDuplicated: 'This name already exists',
        description: 'Describe the group and indicate its function',
        productPlaceholder: 'Select product',
        descriptionMaxLength: 'Max 200 characters',
        noProductSelected: 'No products selected',
        referentsPlaceholder: 'Select the users you want to associate to the group',
        cancelActionLabel: 'Back',
        confirmActionLabel: 'Confirm',
      },
      notifySuccessfulSave: {
        isEdit: 'You have successfully edited the group ',
        isClone: 'You have successfully duplicated the group ',
        isCreate: 'You have successfully created the group ',
        message: '<0>{{valuesName}}</0> for product <2>{{productSelectedtitle}}</>',
      },
      notifyErrorOnSave: {
        isEdit: 'The group could not be edited. Please try again. ',
        isClone: 'Group could not be duplicated. Please try again.',
        isCreate: 'Group could not be created. Please try again.',
        displayableDescriptionEdit: 'An error occurred during the editing of group {{valuesName}} ',
        displayableDescriptionClone:
          'An error occurred during the cloning of group {{valuesName}} ',
        displayableDescriptionCreate: 'An error occurred while creating group {{valuesName}} ',
      },
      save: {
        groupNameAlreadyExists: 'The chosen name is already in use. Please choose a new name.',
        isEdit: 'There was an error while editing the group. Please try again.',
        isClone: 'There was an error while duplicating the group. Please try again.',
        isCreate: 'There was an error while creating the group. Please try again.',
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
      createGroup: 'No groups have been created yet. <1><0>Create a group</0></1>',
      noGroupsLabel: 'No groups have been created for this product yet.',
      noGroupsForProduct: 'No groups have been created for this product yet.',
    },
    groupProductTableColumns: {
      duplicateActionLink: 'Duplicate',
      headerFields: {
        name: 'Name',
        description: 'Description',
        referents: 'no. of users',
      },
    },
    groupsProductFetchError: {
      message: 'Sorry, something went wrong. <1><0>Try again</0></1>.',
    },
    groupsTableLoadMoreData: {
      loadMoreMessage: 'Load more ',
    },
  },
};
