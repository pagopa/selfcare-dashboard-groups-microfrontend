import { usePermissions } from '@pagopa/selfcare-common-frontend/lib';
import useLoading from '@pagopa/selfcare-common-frontend/lib/hooks/useLoading';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { userSelectors } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import { PartyGroupDetail } from '../model/PartyGroup';
import { ProductsMap } from '../model/Product';
import { useAppSelector } from '../redux/hooks';
import { fetchPartyGroup, getMyUserGroupByIdService } from '../services/groupsService';
import { LOADING_TASK_FETCH_PARTY_GROUP } from '../utils/constants';

export const useGroupDetail = (): ((
  groupId: string,
  productsMap: ProductsMap
) => Promise<PartyGroupDetail | null>) => {
  const setLoading = useLoading(LOADING_TASK_FETCH_PARTY_GROUP);
  const currentUser = useAppSelector(userSelectors.selectLoggedUser) as User;
  const { getAllProductsWithPermission } = usePermissions();

  const hasManage = getAllProductsWithPermission('manageProductGroups').length > 0;
  const hasList = getAllProductsWithPermission('listProductGroups').length > 0;

  return (groupId: string, productsMap: ProductsMap): Promise<PartyGroupDetail | null> => {
    const apiToCall =
      hasManage && hasList
        ? fetchPartyGroup(groupId, currentUser, productsMap)
        : hasList
          ? getMyUserGroupByIdService(groupId, currentUser, productsMap)
          : Promise.reject('User has no permissions to fetch groups');

    setLoading(true);
    return apiToCall.finally(() => setLoading(false));
  };
};
