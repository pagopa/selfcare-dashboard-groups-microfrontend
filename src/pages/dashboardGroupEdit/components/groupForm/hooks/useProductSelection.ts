// hooks/useProductSelection.ts
import { usePermissions } from '@pagopa/selfcare-common-frontend/lib';
import { Actions } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { useEffect, useState } from 'react';
import { Party } from '../../../../../model/Party';
import { PartyGroupOnCreation, PartyGroupOnEdit } from '../../../../../model/PartyGroup';
import { Product, ProductsMap } from '../../../../../model/Product';

export const useProductSelection = (
  products: Array<Product>,
  party: Party,
  productsMap: ProductsMap,
  initialFormData: PartyGroupOnCreation | PartyGroupOnEdit,
  isClone: boolean,
  isAddPage?: boolean
) => {
  const [productSelected, setProductSelected] = useState<Product>();
  const [productInPage, setProductInPage] = useState<boolean>();
  const { hasPermission } = usePermissions();

  const prodPnpg = products.find((p) => p.id === 'prod-pn-pg');

  const otherEnvironmentProdPnpg =
    prodPnpg &&
    products.filter((p) =>
      party.products.some((pp) => pp.productId === p.id && pp.productOnBoardingStatus === 'ACTIVE')
    ).length === 1;

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

  return {
    productSelected,
    setProductSelected,
    otherEnvironmentProdPnpg,
    productInPage,
  };
};
