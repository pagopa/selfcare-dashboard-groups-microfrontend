import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { usePermissions } from '@pagopa/selfcare-common-frontend/lib';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/lib/hooks/useErrorDispatcher';
import useLoading from '@pagopa/selfcare-common-frontend/lib/hooks/useLoading';
import {
  useUnloadEventInterceptor,
  useUnloadEventOnExit,
} from '@pagopa/selfcare-common-frontend/lib/hooks/useUnloadEventInterceptor';
import useUserNotify from '@pagopa/selfcare-common-frontend/lib/hooks/useUserNotify';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { userSelectors } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import { Actions } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ClearCircleIcon } from '../../../assets/clear.svg';
import { Party } from '../../../model/Party';
import { PartyGroupOnCreation, PartyGroupOnEdit } from '../../../model/PartyGroup';
import { PartyProductUser } from '../../../model/PartyUser';
import { Product, ProductsMap } from '../../../model/Product';
import { ProductsRolesMap, transcodeProductRole2Title } from '../../../model/ProductRole';
import { useAppSelector } from '../../../redux/hooks';
import { DASHBOARD_GROUPS_ROUTES } from '../../../routes';
import { savePartyGroup, updatePartyGroup } from '../../../services/groupsService';
import { fetchPartyProductUsers } from '../../../services/usersService';
import { LOADING_TASK_FETCH_USER_PRODUCT, LOADING_TASK_SAVE_GROUP } from '../../../utils/constants';
import { TableChip } from '../../../utils/helpers';
import AlertRemoveUsersInClone from '../components/AlertRemoveUsersInClone';

const CustomTextField: any = styled(TextField)({
  '.MuiInputLabel-asterisk': {
    display: 'none',
  },
  '.MuiInput-root': {
    '&:after': {
      borderBottom: '2px solid text.primary',
    },
  },
  '.MuiInputLabel-root.Mui-focused': {
    color: 'text.primary',
    fontWeight: 'fontWeightBold',
  },
  '.MuiInputLabel-root': {
    color: 'text.primary',
    fontWeight: 'fontWeightBold',
    top: '-1px',
  },
  input: {
    '&::placeholder': {
      fontSize: 'fontSize',
      fontWeight: 'fontWeightRegular',
      color: 'text.primary',
      opacity: '1',
      pointerEvents: 'auto',
    },
  },
  textArea: {
    '&::placeholder': {
      fontStyle: 'italic',
      fontSize: 'fontSize',
      fontWeight: 'fontWeightRegular',
      color: 'text.primary',
      opacity: '1',
    },
  },
});

const requiredError = 'Required';

type Props = {
  products: Array<Product>;
  party: Party;
  productsMap: ProductsMap;
  initialFormData: PartyGroupOnCreation | PartyGroupOnEdit;
  isClone: boolean;
  partyGroupCloneId?: string;
  goBack?: () => void;
  productsRolesMap: ProductsRolesMap;
  isAddPage?: boolean;
};

function GroupForm({
  products,
  party,
  initialFormData,
  productsMap,
  isClone,
  goBack,
  productsRolesMap,
  isAddPage,
}: Readonly<Props>) {
  const currentUser = useAppSelector(userSelectors.selectLoggedUser);
  const { t } = useTranslation();

  const setLoadingSaveGroup = useLoading(LOADING_TASK_SAVE_GROUP);
  const setLoadingFetchUserProduct = useLoading(LOADING_TASK_FETCH_USER_PRODUCT);

  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();

  const history = useHistory();

  const { registerUnloadEvent, unregisterUnloadEvent } = useUnloadEventInterceptor();
  const onExit = useUnloadEventOnExit();

  const [productSelected, setProductSelected] = useState<Product>();
  const [productUsers, setProductUsers] = useState<Array<PartyProductUser>>([]);
  const [automaticRemove, setAutomaticRemove] = useState(false);
  const [isNameDuplicated, setIsNameDuplicated] = useState(false);
  const [productInPage, setProductInPage] = useState<boolean>();
  const [announcement, setAnnouncement] = useState<string>();

  const { hasPermission } = usePermissions();

  const isEdit = !!(initialFormData as PartyGroupOnEdit).id;
  const prodPnpg = products.find((p) => p.id === 'prod-pn-pg');

  const otherEnvironmentProdPnpg =
    prodPnpg &&
    products.filter((p) =>
      party.products.some((pp) => pp.productId === p.id && pp.productOnBoardingStatus === 'ACTIVE')
    ).length === 1;

  useEffect(() => {
    if (window.location.hash === '#users' && isEdit && productSelected && productUsers) {
      const event = new MouseEvent('mousedown', { bubbles: true });
      document.getElementById('members-select')?.dispatchEvent(event);
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [isEdit, productSelected, productUsers]);

  useEffect(() => {
    if (productSelected) {
      fetchProductUsers(productSelected);
    }
  }, [productSelected]);

  useEffect(() => {
    if (initialFormData.productId) {
      setProductSelected(productsMap[initialFormData.productId]);
    } else if (prodPnpg && !otherEnvironmentProdPnpg) {
      setProductSelected(prodPnpg);
    }
  }, [initialFormData.productId]);

  useEffect(() => {
    const enabledProducts = products.filter((p) =>
      party.products.some(
        (pp) => p.id === pp.productId && hasPermission(pp.productId, Actions.ManageProductGroups)
      )
    );
    setProductInPage((isClone || isAddPage) && Object.keys(enabledProducts).length === 1);
    if (productInPage) {
      setProductSelected(enabledProducts[0]);
    }
  }, [productInPage]);

  const goBackInner =
    goBack ??
    (() =>
      history.push(
        resolvePathVariables(
          isEdit
            ? DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.PARTY_GROUP_DETAIL.path
            : DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.MAIN.path,
          {
            partyId: party.partyId,
            groupId: (initialFormData as PartyGroupOnEdit).id,
          }
        )
      ));

  const validate = (values: Partial<PartyGroupOnCreation>) =>
    Object.fromEntries(
      Object.entries({
        name: !values.name ? requiredError : undefined,
        partyId: !values.partyId ? requiredError : undefined,
        productId: !productSelected ? requiredError : undefined,
        description: !values.description ? requiredError : undefined,
        members: values.members?.length === 0 ? requiredError : undefined,
      }).filter(([_key, value]) => value)
    );

  const trackSaveEvent = () =>
    trackEvent(
      isEdit ? 'GROUP_UPDATE' : isClone ? 'GROUP_CLONE' : 'GROUP_CREATE',
      Object.assign({
        party_id: party.partyId,
        product_id: productSelected?.id,
      })
    );

  const notifySuccessfulSave = (_values: PartyGroupOnCreation | PartyGroupOnEdit) =>
    addNotify({
      component: 'Toast',
      id: isEdit ? 'EDIT_GROUP' : isClone ? 'GROUP_CLONE' : 'GROUP_CREATE',
      title: isEdit
        ? t('dashboardGroupEdit.groupForm.outcome.modified')
        : isClone
          ? t('dashboardGroupEdit.groupForm.outcome.duplicate')
          : t('dashboardGroupEdit.groupForm.outcome.created'),
      message: '',
    });

  const isCloneOrCreate = isClone ? 'isClone' : 'isCreate';
  const errorMessage = isEdit
    ? t('dashboardGroupEdit.groupForm.notifyErrorOnSave.isEdit')
    : t(`dashboardGroupEdit.groupForm.notifyErrorOnSave.${isCloneOrCreate}`);

  const notifyErrorOnSave = (
    _values: PartyGroupOnCreation | PartyGroupOnEdit,
    reason: any,
    alreadyExistentGroupNameError: boolean
  ) =>
    addError({
      component: 'Toast',
      id: isEdit ? 'EDIT_GROUP_ERROR' : isClone ? 'CLONE_GROUP_ERROR' : 'SAVE_GROUP_ERROR',
      blocking: false,
      displayableTitle: '',
      displayableDescription: alreadyExistentGroupNameError
        ? t('dashboardGroupEdit.groupForm.save.groupNameAlreadyExists')
        : errorMessage,
      techDescription: '',
      error: reason,
      toNotify: true,
    });

  const save = (values: PartyGroupOnCreation) => {
    // eslint-disable-next-line functional/immutable-data
    values.productId = (productSelected as Product).id;
    setLoadingSaveGroup(true);
    (isEdit ? updatePartyGroup : savePartyGroup)(
      party,
      productSelected as Product,
      values as PartyGroupOnEdit
    )
      .then((groupId) => {
        unregisterUnloadEvent();
        trackSaveEvent();
        notifySuccessfulSave(values);
        history.push(
          resolvePathVariables(
            DASHBOARD_GROUPS_ROUTES.PARTY_GROUPS.subRoutes.PARTY_GROUP_DETAIL.path,
            {
              partyId: party.partyId,
              groupId,
            }
          )
        );
      })
      .catch((reason) => {
        if (reason.httpStatus === 409) {
          setIsNameDuplicated(true);
          notifyErrorOnSave(values, reason, true);
        } else {
          setIsNameDuplicated(false);
          notifyErrorOnSave(values, reason, false);
        }
      })
      .finally(() => setLoadingSaveGroup(false));
  };

  const formik = useFormik<PartyGroupOnCreation>({
    initialValues: initialFormData,
    validate,
    onSubmit: (values) => {
      save(values);
    },
  });

  useEffect(() => {
    if (formik.dirty || (productSelected && !isEdit) || (!productSelected && isClone)) {
      registerUnloadEvent();
    } else {
      unregisterUnloadEvent();
    }
  }, [formik.dirty, productSelected, isEdit, isClone]);

  const baseTextFieldProps = (
    field: keyof PartyGroupOnCreation,
    label: string,
    placeholder: string,
    fontWeight: number = 400,
    fontSize: number = 18
  ) => {
    const isError = !!formik.errors[field] && formik.errors[field] !== requiredError;
    return {
      id: field,
      type: 'text',
      value: formik.values[field],
      label,
      placeholder,
      error: isError,
      helperText: isError ? formik.errors[field] : undefined,
      required: true,
      variant: 'outlined' as const,
      onChange: formik.handleChange,
      sx: { width: '100%' },
      InputProps: {
        style: {
          fontSize,
          fontWeight,
          lineHeight: '24px',
          color: 'text.primary',
          textAlign: 'start' as const,
        },
      },
    };
  };

  const containsInitialUsers = (productUsers: Array<PartyProductUser>) =>
    initialFormData.members.every((u) => productUsers.find((p) => p.id === u.id));

  const fetchProductUsers = (productSelected: Product) => {
    setLoadingFetchUserProduct(true);
    fetchPartyProductUsers(
      { page: 0, size: 2000 },
      party,
      productSelected,
      currentUser ?? ({ uid: 'NONE' } as User),
      undefined,
      []
    )
      .then((productUsersPage) => {
        // suspended users have to be listed
        // setProductUsers(productUsersPage.content.filter((user) => user.status === 'ACTIVE')); // the status should be evaluated from user.products[current Product].status
        const sortedProductUsers = productUsersPage.content
          ? [...productUsersPage.content].sort((a, b) => a.name.localeCompare(b.name))
          : [];

        setProductUsers(sortedProductUsers);
        if (!isEdit && !isClone) {
          void formik.setFieldValue('members', [], true);
        } else if (isEdit) {
          void formik.setFieldValue('members', (initialFormData as PartyGroupOnEdit).members, true);
        } else if (isClone) {
          const selectedIds = formik.values.members.reduce(
            (acc, u) => {
              // eslint-disable-next-line functional/immutable-data
              acc[u.id] = true;
              return acc;
            },
            {} as { [userId: string]: boolean }
          );
          const nextMembers = productUsersPage.content.filter((u) => selectedIds[u.id]);
          if (!containsInitialUsers(nextMembers)) {
            setAutomaticRemove(true);
          }
          void formik.setFieldValue('members', nextMembers, true);
        }
      })
      .catch((reason) =>
        addError({
          id: 'FETCH_PRODUCT_USERS',
          blocking: false,
          error: reason,
          techDescription: `An error occurred while fetching product users ${party.partyId} of product ${productSelected.id}`,
          toNotify: true,
        })
      )
      .finally(() => setLoadingFetchUserProduct(false));
  };
  const isProductError = isClone && productSelected === undefined;

  const groupMemberToRemove = (member: PartyProductUser) => {
    setAnnouncement(
      t('accessibility.announcement.groupMemberRemoved', {
        name: member.name,
        surname: member.surname,
      })
    );
    void formik.setFieldValue(
      'members',
      formik.values.members.filter((us) => us !== member),
      true
    );
  };

  const selectedIds = formik.values.members.map((u) => u.id);

  const handleChange = (event: SelectChangeEvent<Array<string>>) => {
    const selectedIds = event.target.value as Array<string>;
    const nextUsersSelected = Object.values(productUsers).filter((u) => selectedIds.includes(u.id));

    if (automaticRemove && containsInitialUsers(nextUsersSelected)) {
      setAutomaticRemove(false);
    }

    void formik.setFieldValue('members', nextUsersSelected, true);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        direction="column"
        sx={{ backgroundColor: 'background.paper', borderRadius: '4px' }}
        p={3}
      >
        {/* Name */}
        <Grid item xs={12} mb={3}>
          <CustomTextField
            inputProps={{ maxLength: 50 }}
            size="small"
            {...baseTextFieldProps(
              'name',
              t('dashboardGroupEdit.groupForm.formLabels.groupName'),
              '',
              600,
              17
            )}
            onChange={(e: any) => {
              formik.handleChange(e);
              setIsNameDuplicated(false);
            }}
          />
          {isNameDuplicated ? (
            <Typography color="#F83E5A" sx={{ fontSize: '14px', paddingLeft: '15px' }}>
              {t('dashboardGroupEdit.groupForm.formLabels.groupNameDuplicated')}
            </Typography>
          ) : undefined}
        </Grid>
        {/* Description */}
        <Grid
          item
          xs={12}
          mb={3}
          sx={{
            '& textarea#description': {
              fontSize: 'fontSize',
              fontWeight: 'fontWeightMedium',
            },
          }}
        >
          <CustomTextField
            size="small"
            {...baseTextFieldProps(
              'description',
              t('dashboardGroupEdit.groupForm.formLabels.description'),
              ''
            )}
            variant="outlined"
            multiline
            rows={2}
            inputProps={{ maxLength: 200 }}
          />
          <Typography sx={{ fontWeight: 'fontWeight', fontSize: '12px', paddingLeft: 2 }}>
            {t('dashboardGroupEdit.groupForm.formLabels.descriptionMaxLength')}
          </Typography>
        </Grid>
        {/* Product */}
        {!otherEnvironmentProdPnpg && (
          <Grid item xs={12} mb={3}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel
                id="select-label-products"
                size="small"
                sx={{
                  '.MuiInputLabel-root.Mui-focused': {
                    color: 'text.primary',
                    fontWeight: 'fontWeightBold',
                  },
                }}
              >
                {t('dashboardGroupEdit.groupForm.formLabels.productPlaceholder')}
              </InputLabel>
              <Select
                error={isProductError}
                id="product-select"
                size="small"
                disabled={isEdit || productInPage}
                fullWidth
                value={productSelected?.title ?? ''}
                variant="outlined"
                labelId="select-label-products"
                label={t('dashboardGroupEdit.groupForm.formLabels.productPlaceholder')}
                input={
                  <OutlinedInput
                    label={t('dashboardGroupEdit.groupForm.formLabels.productPlaceholder')}
                  />
                }
                renderValue={(productSelected) => (
                  <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                    {productSelected}
                  </Typography>
                )}
              >
                {products
                  .filter((p) =>
                    party.products.some(
                      (pp) =>
                        pp.productId === p.id &&
                        hasPermission(pp.productId, Actions.ManageProductGroups)
                    )
                  )
                  .map((p: Product, index) => (
                    <MenuItem
                      key={index}
                      value={p.title}
                      sx={{ fontSize: '14px', color: '#000000' }}
                      onClick={() => setProductSelected(p)}
                    >
                      {p.title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {isProductError ? (
              <Typography color="#F83E5A" sx={{ fontSize: '14px' }}>
                {t('dashboardGroupEdit.groupForm.formLabels.noProductSelected')}
              </Typography>
            ) : undefined}
          </Grid>
        )}

        {/* Members */}
        <Grid item xs={12} width="100%">
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="select-label-members" size="small">
              {t('dashboardGroupEdit.groupForm.formLabels.referentsPlaceholder')}
            </InputLabel>

            <Box id="members-description" sx={{ display: 'none' }}>
              {formik.values.members.map((u) => `${u.name} ${u.surname}`).join(', ')}
            </Box>

            <Select
              id="members-select"
              size="small"
              disabled={!productSelected}
              multiple
              fullWidth
              label={t('dashboardGroupEdit.groupForm.formLabels.referentsPlaceholder')}
              labelId="select-label-members"
              value={selectedIds}
              onChange={handleChange}
              input={
                <OutlinedInput
                  label={t('dashboardGroupEdit.groupForm.formLabels.referentsPlaceholder')}
                />
              }
              inputProps={{
                'aria-label': t('dashboardGroupEdit.groupForm.formLabels.referentsPlaceholder'),
                'aria-describedby': 'members-description',
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
              renderValue={(selected) => {
                const selectedUsers = Object.values(productUsers).filter((u) =>
                  selected.includes(u.id)
                );
                return (
                  <Typography
                    sx={{
                      height: 'auto',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      fontSize: 'fontSize',
                      fontWeight: 'fontWeightMedium',
                    }}
                  >
                    {selectedUsers.map((u) => `${u.name} ${u.surname}`).join(', ')}
                  </Typography>
                );
              }}
            >
              {Object.values(productUsers).map((u) => {
                const isChecked = selectedIds.includes(u.id);

                return (
                  <MenuItem key={u.id} value={u.id}>
                    <Checkbox checked={isChecked} />
                    <Grid container>
                      <Grid item xs={8}>
                        <Typography variant="body1" noWrap fontWeight="fontWeightMedium">
                          {u.name} {u.surname}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {u.email}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} display="flex" justifyContent="flex-end">
                        <Box display="flex" flexDirection="column" alignItems="flex-end">
                          {u.product.roles.map((r, indexRole) => (
                            <Box key={indexRole} display="flex">
                              {r.status === 'SUSPENDED' && (
                                <TableChip text={t('groupDetail.status')} />
                              )}
                              <Typography
                                color="text.primary"
                                variant="caption"
                                fontWeight="fontWeightMedium"
                                ml={1}
                              >
                                {transcodeProductRole2Title(r.role, productsRolesMap[u.product.id])}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Grid>
                    </Grid>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <Box
            sx={{
              position: 'absolute',
              width: 1,
              height: 1,
              overflow: 'hidden',
              clip: 'rect(0 0 0 0)',
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            {announcement}
          </Box>

          {/* Box */}
          <Grid>
            {formik.values.members.map((s) => (
              <Chip
                sx={{
                  fontWeight: 'fontWeightMedium',
                  marginTop: 2.2,
                  marginRight: 1.6,
                }}
                color="default"
                size="medium"
                variant="outlined"
                key={s.id}
                label={s.name + ' ' + s.surname}
                onDelete={() => groupMemberToRemove(s)}
                deleteIcon={
                  <ClearCircleIcon
                    onMouseDown={(e) => e.stopPropagation()}
                    aria-label={`Rimuovi ${s.name} ${s.surname}`}
                    tabIndex={0}
                    onKeyDownCapture={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        groupMemberToRemove(s);
                      }
                    }}
                  />
                }
              />
            ))}
          </Grid>
        </Grid>

        {/* Actions */}
        {isClone && automaticRemove && <AlertRemoveUsersInClone />}
      </Grid>
      <Stack direction="row" display="flex" justifyContent="space-between" mt={5}>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => onExit(goBackInner)}
          size="medium"
        >
          {t('dashboardGroupEdit.groupForm.formLabels.cancelActionLabel')}
        </Button>
        <Button
          disabled={(!isClone && !formik.dirty) || !formik.isValid}
          color="primary"
          variant="contained"
          type="submit"
          size="medium"
        >
          {t('dashboardGroupEdit.groupForm.formLabels.confirmActionLabel')}
        </Button>
      </Stack>
    </form>
  );
}
export default GroupForm;
