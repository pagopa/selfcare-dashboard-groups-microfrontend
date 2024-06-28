import useLoading from '@pagopa/selfcare-common-frontend/lib/hooks/useLoading';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { userSelectors } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import { PartyGroupDetail } from '../model/PartyGroup';
import { ProductsMap } from '../model/Product';
import { useAppSelector } from '../redux/hooks';
import { fetchPartyGroup } from '../services/groupsService';
import { LOADING_TASK_FETCH_PARTY_GROUP } from '../utils/constants';

export const useGroupDetail = (): ((
  partyId: string,
  groupId: string,
  productsMap: ProductsMap
) => Promise<PartyGroupDetail | null>) => {
  const setLoading = useLoading(LOADING_TASK_FETCH_PARTY_GROUP);
  const currentUser = useAppSelector(userSelectors.selectLoggedUser) as User;

  return (
    partyId: string,
    groupId: string,
    productsMap: ProductsMap
  ): Promise<PartyGroupDetail | null> => {
    setLoading(true);
    return fetchPartyGroup(partyId, groupId, currentUser, productsMap).finally(() =>
      setLoading(false)
    );
  };
};
