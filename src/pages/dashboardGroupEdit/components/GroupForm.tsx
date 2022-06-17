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
import { useTranslation, Trans } from 'react-i18next';
import { ReactComponent as ClearIcon } from '../../../assets/clear.svg';
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
      borderBottom: '2px solid #5C6F82',
      color: 'green',
    },
  },
  '.MuiInputLabel-root.Mui-focused': {
    color: '#5C6F82',
    fontWeight: '700',
  },
  '.MuiInputLabel-root': {
    color: '#5C6F82',
    fontSize: '16px',
    fontWeight: '700',
  },
  input: {
    '&::placeholder': {
      fontStyle: 'italic',
      fontSize: '16px',
      fontWeight: '400',
      color: '#5C6F82',
      opacity: '1',
    },
  },
  textArea: {
    '&::placeholder': {
      fontStyle: 'italic',
      fontSize: '16px',
      fontWeight: '400',
      color: '#5C6F82',
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
};

export default function GroupForm({
  products,
  party,
  initialFormData,
  productsMap,
  isClone,
  partyGroupCloneId,
  goBack,
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

  const { registerUnloadEvent, unregisterUnloadEvent } = useUnloadEventInterceptor();
  const onExit = useUnloadEventOnExit();

  const isEdit = !!(initialFormData as PartyGroupOnEdit).id;

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
      Object.assign(
        {
          party_id: party.partyId,
        },
        isEdit
          ? { group_id: (initialFormData as PartyGroupOnEdit).id }
          : isClone
          ? { cloned_group_id: partyGroupCloneId }
          : {}
      )
    );

  const notifySuccessfulSave = (values: PartyGroupOnCreation | PartyGroupOnEdit) =>
    addNotify({
      component: 'Toast',
      id: isEdit ? 'EDIT_GROUP' : isClone ? 'GROUP_CLONE' : 'GROUP_CREATE',
      title: isEdit ? 'GRUPPO MODIFICATO' : isClone ? 'GRUPPO DUPLICATO' : 'GRUPPO CREATO',
      message: (
        <>
          {isEdit
            ? t('dashboardGroupEdit.groupForm.notifySuccessfulSave.isEdit')
            : isClone
            ? t('dashboardGroupEdit.groupForm.notifySuccessfulSave.isClone')
            : t('dashboardGroupEdit.groupForm.notifySuccessfulSave.isCreate')}
          <Trans i18nKey="dashboardGroupEdit.groupForm.notifySuccessfulSave.message">
            <strong>{{ valuesName: values.name }}</strong>
            per il prodotto
            <strong>{{ productSelectedtitle: productSelected?.title }}</strong>
          </Trans>
        </>
      ),
    });

  const notifyErrorOnSave = (
    values: PartyGroupOnCreation | PartyGroupOnEdit,
    reason: any,
    displayableDescription: string
  ) =>
    addError({
      component: 'Toast',
      id: isEdit ? 'EDIT_GROUP_ERROR' : isClone ? 'CLONE_GROUP_ERROR' : 'SAVE_GROUP_ERROR',
      blocking: false,
      displayableTitle: isEdit
        ? t('dashboardGroupEdit.groupForm.notifyErrorOnSave.isEdit')
        : isClone
        ? t('dashboardGroupEdit.groupForm.notifyErrorOnSave.isClone')
        : t('dashboardGroupEdit.groupForm.notifyErrorOnSave.isCreate'),
      displayableDescription,
      techDescription: isEdit
        ? t('dashboardGroupEdit.groupForm.notifyErrorOnSave.displayableDescriptionEdit', {
            valuesName: `${values.name}`,
          })
        : isClone
        ? t('dashboardGroupEdit.groupForm.notifyErrorOnSave.displayableDescriptionClone', {
            valuesName: `${values.name}`,
          })
        : t('dashboardGroupEdit.groupForm.notifyErrorOnSave.displayableDescriptionCreate', {
            valuesName: `${values.name}`,
          }),
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
      .then(() => {
        unregisterUnloadEvent();
        trackSaveEvent();
        notifySuccessfulSave(values);
        goBackInner();
      })
      .catch((reason) => {
        if (reason.httpStatus === 409) {
          setIsNameDuplicated(true);
          notifyErrorOnSave(
            values,
            reason,
            t('dashboardGroupEdit.groupForm.save.groupNameAlreadyExists')
          );
        } else {
          setIsNameDuplicated(false);
          notifyErrorOnSave(
            values,
            reason,
            isEdit
              ? t('dashboardGroupEdit.groupForm.save.isEdit')
              : isClone
              ? t('dashboardGroupEdit.groupForm.save.isClone')
              : t('dashboardGroupEdit.groupForm.save.isCreate')
          );
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
    if (formik.dirty) {
      registerUnloadEvent();
    } else {
      unregisterUnloadEvent();
    }
  }, [formik.dirty]);

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
          color: '#5C6F82',
          textAlign: 'start' as const,
          paddingLeft: '16px',
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

          // const nextMembers = formik.values.members.filter((u) => cannot use this if we are fetching just the current product setting
          //   u.products.find((p) => p.id === productSelected?.id)

          // ); // u.status === 'ACTIVE' we want also the suspended users, however the status should be evaluated from user.products[current Product].status
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container direction="column" sx={{ backgroundColor: 'background.paper' }} p={3}>
        {/* Name */}
        <Grid item xs={12} mb={3}>
          <CustomTextField
            {...baseTextFieldProps(
              'name',
              t('dashboardGroupEdit.groupForm.formLabels.groupName'),
              t('dashboardGroupEdit.groupForm.formLabels.groupNamePlaceholder'),
              700,
              20
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
        <Grid item xs={12} mb={3}>
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
        </Grid>
        {/* Product */}
        <Grid item xs={12} mb={3}>
          <Select
            id="product-select"
            disabled={isEdit}
            fullWidth
            value={productSelected?.title ?? ''}
            displayEmpty
            variant="outlined"
            renderValue={(productSelected) =>
              productSelected === '' ? (
                <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                  {t('dashboardGroupEdit.groupForm.formLabels.prductPlaceholter')}
                </Typography>
              ) : (
                <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                  {productSelected}
                </Typography>
              )
            }
          >
            {products
              .filter((p) => p.userRole === 'ADMIN')
              .map((p) => (
                <MenuItem
                  key={p.id}
                  value={p.title}
                  sx={{ fontSize: '14px', color: '#000000' }}
                  onClick={() => setProductSelected(p)}
                >
                  {p.title}
                </MenuItem>
              ))}
          </Select>
          {isClone && productSelected === undefined ? (
            <Typography color="#F83E5A" sx={{ fontSize: '14px' }}>
              {t('dashboardGroupEdit.groupForm.formLabels.noProductSelected')}
            </Typography>
          ) : undefined}
        </Grid>
        {/* Referents */}
        <Grid item xs={12} mb={3}>
          <Select
            disabled={!productSelected}
            id="member-check-selection"
            variant="outlined"
            multiple
            fullWidth
            value={formik.values.members}
            displayEmpty
            renderValue={(selectedUsers) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {selectedUsers.length === 0 ? (
                  <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                    {t('dashboardGroupEdit.groupForm.formLabels.referentsPlaceholter')}
                  </Typography>
                ) : undefined}
              </Box>
            )}
          >
            <CustomBox>
              {Object.values(productUsers).map((u) => {
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

                return (
                  <MenuItem
                    key={u.id}
                    value={u.name}
                    sx={{
                      fontSize: '14px',
                      color: '#000000',
                      borderBottom: 'solid',
                      borderBottomWidth: 'thin',
                      borderBottomColor: '#CFDCE6',
                      width: '554px',
                      height: '48px',
                    }}
                  >
                    <Checkbox checked={isChecked} onClick={onItemSelected} />
                    {u.name} {u.surname} aaa
                  </MenuItem>
                );
              })}
            </CustomBox>
          </Select>
          <Grid>
            {formik.values.members.map((s) => (
              <Chip
                sx={{
                  fontWeight: 600,
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
                deleteIcon={<ClearIcon onMouseDown={(e) => e.stopPropagation()} />}
              />
            ))}
          </Grid>
        </Grid>

        {/* Actions */}
        {isClone && automaticRemove && <AlertRemoveUsersInClone />}
        <Grid item container display="flex" justifyContent="space-between">
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
      </Grid>
    </form>
  );
}
