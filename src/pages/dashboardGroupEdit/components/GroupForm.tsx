import {
  Box,
  Button,
  Checkbox,
  Chip,
  Grid,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
  OutlinedInput,
  FormControl,
  InputLabel,
} from '@mui/material';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import {
  useUnloadEventInterceptor,
  useUnloadEventOnExit,
} from '@pagopa/selfcare-common-frontend/hooks/useUnloadEventInterceptor';
import useUserNotify from '@pagopa/selfcare-common-frontend/hooks/useUserNotify';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { userSelectors } from '@pagopa/selfcare-common-frontend/redux/slices/userSlice';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ClearCircleIcon } from '../../../assets/clear.svg';
import { Party } from '../../../model/Party';
import { PartyGroupOnCreation, PartyGroupOnEdit } from '../../../model/PartyGroup';
import { PartyProductUser } from '../../../model/PartyUser';
import { Product, ProductsMap } from '../../../model/Product';
import { DASHBOARD_GROUPS_ROUTES } from '../../../routes';
import { savePartyGroup, updatePartyGroup } from '../../../services/groupsService';
import { LOADING_TASK_FETCH_USER_PRODUCT, LOADING_TASK_SAVE_GROUP } from '../../../utils/constants';
import { fetchPartyProductUsers } from '../../../services/usersService';
import { useAppSelector } from '../../../redux/hooks';
import AlertRemoveUsersInClone from '../components/AlertRemoveUsersInClone';
import { ProductsRolesMap, transcodeProductRole2Title } from '../../../model/ProductRole';

const CustomBox = styled(Box)({
  '&::-webkit-scrollbar': {
    width: 8,
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: `inset 10px 10px  #E6E9F2`,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#0073E6',
  },
  overflowY: 'auto',
  height: '100%',
  maxHeight: '200px',
});

const CustomTextField = styled(TextField)({
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
}: Props) {
  const currentUser = useAppSelector(userSelectors.selectLoggedUser);
  const { t } = useTranslation();

  const setLoadingSaveGroup = useLoading(LOADING_TASK_SAVE_GROUP);
  const setLoadingFetchUserProduct = useLoading(LOADING_TASK_FETCH_USER_PRODUCT);

  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();

  const history = useHistory();

  const [productSelected, setProductSelected] = useState<Product>();
  const [productUsers, setProductUsers] = useState<Array<PartyProductUser>>([]);
  const [automaticRemove, setAutomaticRemove] = useState(false);
  const [isNameDuplicated, setIsNameDuplicated] = useState(false);
  const [productInPage, setProductInPage] = useState<boolean>();

  const { registerUnloadEvent, unregisterUnloadEvent } = useUnloadEventInterceptor();
  const onExit = useUnloadEventOnExit();

  const isEdit = !!(initialFormData as PartyGroupOnEdit).id;

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
    }
  }, [initialFormData.productId]);

  useEffect(() => {
    const isEnabled = products.filter(
      (p) => p.authorized && p.userRole === 'ADMIN' && p.productOnBoardingStatus === 'ACTIVE'
    );
    setProductInPage((isClone || isAddPage) && Object.keys(isEnabled).length === 1);
    if (productInPage) {
      setProductSelected(isEnabled[0]);
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
      })
    );

  const notifySuccessfulSave = (_values: PartyGroupOnCreation | PartyGroupOnEdit) =>
    addNotify({
      component: 'Toast',
      id: isEdit ? 'EDIT_GROUP' : isClone ? 'GROUP_CLONE' : 'GROUP_CREATE',
      title: isEdit
        ? 'Gruppo modificato correttamente'
        : isClone
        ? 'Gruppo duplicato correttamente'
        : 'Gruppo creato correttamente',
      message: '',
    });

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
        : isEdit
        ? t('dashboardGroupEdit.groupForm.notifyErrorOnSave.isEdit')
        : isClone
        ? t('dashboardGroupEdit.groupForm.notifyErrorOnSave.isClone')
        : t('dashboardGroupEdit.groupForm.notifyErrorOnSave.isCreate'),
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
    fontSize: number = 16
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
        setProductUsers(productUsersPage.content);
        if (!isEdit && !isClone) {
          void formik.setFieldValue('members', [], true);
        } else if (isEdit) {
          void formik.setFieldValue('members', (initialFormData as PartyGroupOnEdit).members, true);
        } else if (isClone) {
          const selectedIds = formik.values.members.reduce((acc, u) => {
            // eslint-disable-next-line functional/immutable-data
            acc[u.id] = true;
            return acc;
          }, {} as { [userId: string]: boolean });
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

  // const onItemSelectedTest = () => {
  //   void formik.setFieldValue('members', [], true);
  // };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container direction="column" sx={{ backgroundColor: 'background.paper' }} p={3}>
          {/* Name */}
          <Grid item xs={12} mb={3}>
            <CustomTextField
              inputProps={{ maxLength: 50 }}
              {...baseTextFieldProps(
                'name',
                t('dashboardGroupEdit.groupForm.formLabels.groupName'),
                '',
                600,
                16
              )}
              onChange={(e) => {
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
              '& textarea#description': { fontSize: 'fontSize', fontWeight: 'fontWeightMedium' },
            }}
          >
            <CustomTextField
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
          <Grid item xs={12} mb={3}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel
                id="select-label-products"
                sx={{
                  '.MuiInputLabel-root.Mui-focused': {
                    color: 'text.primary',
                    fontWeight: 'fontWeightBold',
                  },
                }}
              >
                {t('dashboardGroupEdit.groupForm.formLabels.prductPlaceholter')}
              </InputLabel>
              <Select
                error={isProductError}
                id="product-select"
                disabled={isEdit || productInPage}
                fullWidth
                value={productSelected?.title ?? ''}
                displayEmpty
                variant="outlined"
                labelId="select-label-products"
                label={t('dashboardGroupEdit.groupForm.formLabels.prductPlaceholter')}
                input={
                  <OutlinedInput
                    label={t('dashboardGroupEdit.groupForm.formLabels.prductPlaceholter')}
                  />
                }
                renderValue={(productSelected) => (
                  <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                    {productSelected}
                  </Typography>
                )}
              >
                {products
                  .filter((p) => p.userRole === 'ADMIN')
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
          {/* Members */}
          <Grid item xs={12} width="100%">
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="select-label-members">
                {t('dashboardGroupEdit.groupForm.formLabels.referentsPlaceholder')}
              </InputLabel>
              <Select
                // TODO
                // endAdornment={
                //   <InputAdornment position="end">
                //     <IconButton sx={{ right: '24px' }}>
                //       <ClearIcon fontSize="small" onClick={onItemSelectedTest} />
                //     </IconButton>
                //   </InputAdornment>
                // }
                id="members-select"
                disabled={!productSelected}
                multiple
                displayEmpty
                fullWidth
                label={t('dashboardGroupEdit.groupForm.formLabels.referentsPlaceholder')}
                labelId="select-label-members"
                value={formik.values.members}
                input={
                  <OutlinedInput
                    label={t('dashboardGroupEdit.groupForm.formLabels.referentsPlaceholder')}
                  />
                }
                renderValue={(selectedUser: Array<PartyProductUser>) => (
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
                    {selectedUser.map((su) => su.name + ' ' + su.surname).join(', ')}
                  </Typography>
                )}
                sx={{
                  '& .MuiSelect-select.MuiSelect-outlined.MuiSelect-multiple.MuiOutlinedInput-input.MuiInputBase-input.css-12l43fo-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
                    {
                      display: 'block !important',
                    },
                }}
              >
                <CustomBox
                  my={1}
                  sx={{
                    /* width */
                    '::-webkit-scrollbar': {
                      width: '4px',
                    },
                    /* Track */
                    '::-webkit-scrollbar-track': {
                      boxShadow: 'inset 0 0 5px #F2F6FA',
                      borderRadius: '20px',
                    },
                    /* Handle */
                    '::-webkit-scrollbar-thumb': {
                      background: 'primary.main',
                      backgroundClip: 'padding-box',
                      borderRadius: '20px',
                      height: '54px',
                    },

                    /* Handle on hover */
                    '::-webkit-scrollbar-thumb:hover': {
                      background: 'primary.main',
                    },
                  }}
                >
                  {Object.values(productUsers).map((u: PartyProductUser) => {
                    const checkedIndex = formik.values.members.findIndex((s) => s.id === u.id);
                    const isChecked = checkedIndex > -1;
                    const onItemSelected = () => {
                      const nextUsersSelected = isChecked
                        ? formik.values.members.filter((_s, index) => index !== checkedIndex)
                        : formik.values.members.concat(u);
                      if (automaticRemove && containsInitialUsers(nextUsersSelected)) {
                        setAutomaticRemove(false);
                      }
                      void formik.setFieldValue('members', nextUsersSelected, true);
                    };
                    const isAllMemeberSuspended = !u.product.roles.find(
                      (r: any) => r.status !== 'SUSPENDED'
                    );
                    return (
                      <MenuItem
                        key={u.id}
                        value={u.name}
                        sx={{
                          width: '100%',
                          height: '70px',
                          pl: 0,
                          pr: 3,
                        }}
                      >
                        <Checkbox checked={isChecked} onClick={onItemSelected} />
                        <Grid container>
                          <Grid
                            container
                            item
                            xs={8}
                            sx={{
                              width: '250px',
                            }}
                          >
                            <Grid item xs={12}>
                              <Typography
                                variant="body1"
                                sx={{
                                  height: 'auto',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  fontSize: 'fontSize',
                                  fontWeight: 'fontWeightMedium',
                                }}
                              >
                                {u.name} {u.surname}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <div
                                style={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: 'text.secondary',
                                  }}
                                >
                                  {u.email}
                                </Typography>
                              </div>
                            </Grid>
                          </Grid>
                          <Grid container item xs={4} display="flex" justifyContent="end">
                            <Box display="flex">
                              {isAllMemeberSuspended && (
                                <Box justifyContent="center" display="flex" flexDirection="column">
                                  <Chip
                                    label={t('groupDetail.status')}
                                    aria-label="Suspended"
                                    variant="outlined"
                                    sx={{
                                      mr: 2,
                                      fontWeight: 'fontWeightMedium',
                                      fontSize: '14px',
                                      backgroundColor: 'warning.light',
                                      border: 'none',
                                      borderRadius: '16px',
                                      width: '78px',
                                      height: '24px',
                                    }}
                                  />
                                </Box>
                              )}
                              <Box
                                justifyContent="center"
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-end"
                              >
                                {u.product.roles.map((r, indexRole) => (
                                  <Box display="flex" key={indexRole}>
                                    {r.status === 'SUSPENDED' && !isAllMemeberSuspended && (
                                      <Box>
                                        <Chip
                                          label={t('groupDetail.status')}
                                          aria-label="Suspended"
                                          variant="outlined"
                                          sx={{
                                            mr: 2,
                                            fontWeight: 'fontWeightMedium',
                                            fontSize: '14px',
                                            backgroundColor: 'warning.light',
                                            border: 'none',
                                            borderRadius: '16px',
                                            width: '78px',
                                            height: '24px',
                                          }}
                                        />
                                      </Box>
                                    )}

                                    <Box>
                                      <Typography
                                        color={'text.primary'}
                                        variant="caption"
                                        sx={{ fontWeight: 'fontWeightMedium' }}
                                      >
                                        {transcodeProductRole2Title(
                                          r.role,
                                          productsRolesMap[u.product.id]
                                        )}
                                      </Typography>
                                    </Box>
                                  </Box>
                                ))}
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </MenuItem>
                    );
                  })}
                </CustomBox>
              </Select>
            </FormControl>
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
                  onDelete={() =>
                    formik.setFieldValue(
                      'members',
                      formik.values.members.filter((us) => us !== s),
                      true
                    )
                  }
                  deleteIcon={<ClearCircleIcon onMouseDown={(e) => e.stopPropagation()} />}
                />
              ))}
            </Grid>
          </Grid>

          {/* Actions */}
          {isClone && automaticRemove && <AlertRemoveUsersInClone />}
        </Grid>
        <Grid item container display="flex" justifyContent="space-between" mt={5}>
          <Grid item xs={3} justifyContent="flex-start" display="flex">
            <Button color="primary" variant="outlined" onClick={() => onExit(goBackInner)}>
              {t('dashboardGroupEdit.groupForm.formLabels.cancelActionLabel')}
            </Button>
          </Grid>
          <Grid item xs={3} justifyContent="flex-end" display="flex">
            <Button
              disabled={(!isClone && !formik.dirty) || !formik.isValid}
              color="primary"
              variant="contained"
              type="submit"
            >
              {t('dashboardGroupEdit.groupForm.formLabels.confirmActionLabel')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
export default GroupForm;
