import { RoleEnum } from '../../api/generated/b4f-dashboard/InstitutionUserResource';
import { SelcRoleEnum } from '../../api/generated/b4f-dashboard/ProductRoleInfoResource';
import { ProductUserResource } from '../../api/generated/b4f-dashboard/ProductUserResource';
import { mockedPartyProducts } from '../../microcomponents/mock_dashboard/data/product';
import { mockedUser } from '../../__mocks__/@pagopa/selfcare-common-frontend/decorators/withLogin';
import { productUserResource2PartyProductUser } from '../PartyUser';

test('Test productUserResource2PartyUser', () => {
  const productUserResource: ProductUserResource = {
    id: '1',
    name: 'Name',
    surname: 'Surname',
    status: 'PENDING',
    role: 'LIMITED' as RoleEnum,
    email: 'address',
    certification: true,
    product: {
      id: 'productId',
      title: 'productTitle',
      roleInfos: [
        {
          relationshipId: 'relationshipId',
          role: 'productRole',
          selcRole: SelcRoleEnum.ADMIN,
          status: 'ACTIVE',
        },
      ],
    },
  };

  const partyUser = productUserResource2PartyProductUser(
    productUserResource,
    mockedPartyProducts[0],
    mockedUser
  );
  expect(partyUser).toStrictEqual({
    id: '1',
    name: 'Name',
    surname: 'Surname',
    status: 'PENDING',
    userRole: 'LIMITED',
    email: 'address',
    product: {
      id: 'productId',
      title: 'productTitle',
      roles: [
        {
          relationshipId: 'relationshipId',
          role: 'productRole',
          selcRole: 'ADMIN',
          status: 'ACTIVE',
        },
      ],
    },
    isCurrentUser: false,
  });

  productUserResource.id = mockedUser.uid;
  expect(
    productUserResource2PartyProductUser(productUserResource, mockedPartyProducts[0], mockedUser)
      .isCurrentUser
  ).toBeTruthy();
});
