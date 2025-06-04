import useErrorDispatcher from '@pagopa/selfcare-common-frontend/lib/hooks/useErrorDispatcher';
import useLoading from '@pagopa/selfcare-common-frontend/lib/hooks/useLoading';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { useState } from 'react';
import { Party } from '../../../../../model/Party';
import { PartyProductUser } from '../../../../../model/PartyUser';
import { Product } from '../../../../../model/Product';
import { fetchPartyProductUsers } from '../../../../../services/usersService';
import { LOADING_TASK_FETCH_USER_PRODUCT } from '../../../../../utils/constants';

export const useProductUsers = (party: Party, currentUser: User | undefined) => {
  const [productUsers, setProductUsers] = useState<Array<PartyProductUser>>([]);
  const setLoadingFetchUserProduct = useLoading(LOADING_TASK_FETCH_USER_PRODUCT);
  const addError = useErrorDispatcher();

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
        const sortedProductUsers = productUsersPage.content
          ? [...productUsersPage.content].sort((a, b) => a.name.localeCompare(b.name))
          : [];
        setProductUsers(sortedProductUsers);
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

  return {
    productUsers,
    fetchProductUsers,
    setProductUsers,
  };
};
