import { PageRequest } from '@pagopa/selfcare-common-frontend/model/PageRequest';
import { PageResource } from '@pagopa/selfcare-common-frontend/model/PageResource';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import {
  applySort,
  extractPageRequest,
} from '@pagopa/selfcare-common-frontend/hooks/useFakePagination';
import { cloneDeep } from 'lodash';
import { Party, UserRole, UserStatus } from '../../model/Party';
import {
  PartyProductUser,
  PartyUserExt,
  PartyUserProduct,
  PartyUserProductRole,
} from '../../model/PartyUser';
import { ProductRole } from '../../model/ProductRole';
import { Product } from '../../model/Product';

export const mockedUsers: Array<PartyUserExt> = [
  // use case ACTIVE on 1 product/role
  {
    id: 'uid',
    taxCode: 'AAAAAA11A11A123K',
    name: 'ElenaElenaElenaElenaElenaElenaElenaElenaElenaElenaElenaElenaElenaElenaElenaElenaElenaElenaElenaElenaElenaElenaElenaElenaElenaElenaElena',
    surname:
      'VerdiVerdiVerdiVerdiVerdiVerdiVerdiVerdiVerdiVerdiVerdiVerdiVerdiVerdiVerdiVerdiVerdiVerdiVerdiVerdiVerdiVerdiVerdiVerdi',
    email:
      'simone.v@comune.milano.itsimone.v@comune.milano.itsimone.v@comune.milano.itsimone.v@comune.milano.itsimone.v@comune.milano.itsimone.v@comune.milano.itsimone.v@comune.milano.itsimone.v@comune.milano.itsimone.v@comune.milano.itsimone.v@comune.milano.itsimone.v@comune.milano.itsimone.v@comune.milano.itsimone.v@comune.milano.itsimone.v@comune.milano.itsimone.v@comune.milano.itsimone.v@comune.milano.itsimone.v@comune.milano.it',
    userRole: 'ADMIN',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel1',
            role: 'incaricato-ente-creditore',
            selcRole: 'ADMIN',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },

  // logged user
  {
    id: '0',
    taxCode: 'AAAAAA11A11A124A',
    name: 'loggedName',
    surname: 'loggedSurname',
    email: 'loggedName.b@email.it',
    userRole: 'ADMIN',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel2',
            role: 'incaricato-ente-creditore',
            selcRole: 'ADMIN',
            status: 'ACTIVE',
          },
        ],
      },
      {
        title: 'Piattaforma Notifiche',
        id: 'prod-pn',
        roles: [
          {
            relationshipId: 'rel2',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
      {
        title: 'App IO',
        id: 'prod-pagopa',
        roles: [
          {
            relationshipId: 'rel2',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: true,
  },

  // use case SUSPENDED having just 1 product/role
  {
    id: 'uid3',
    taxCode: 'TAXCOD03A00A123P',
    name: 'Simone3',
    surname: 'Bianchi3 Verdi Verdi Verdi',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'SUSPENDED',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel3',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },

  // use case ACTIVE having 1 product and 2 roles (ACTIVE and SUSPENDED)
  {
    id: 'uid4',
    taxCode: 'TAXCOD04A00A123P',
    name: 'Simone',
    surname: 'Simonetti',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'PDND',
        id: 'prod-interop',
        roles: [
          {
            relationshipId: 'rel4',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
          {
            relationshipId: 'rel4_2',
            role: 'operatore-sicurezza',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },

  // use case SUSPENDED having 1 product and 2 roles
  {
    id: 'uid5',
    taxCode: 'TAXCOD05A00A123P',
    name: 'Simone',
    surname: 'Franceschini Alberti',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'SUSPENDED',
    products: [
      {
        title: 'PDND',
        id: 'prod-interop',
        roles: [
          {
            relationshipId: 'rel4',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
          {
            relationshipId: 'rel4_2',
            role: 'operatore-sicurezza',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },

  // use case SUSPENDED on 2 product, in 1 of them not logged user is not ADMIN
  {
    id: 'uid6',
    taxCode: 'TAXCOD06A00A123P',
    name: 'Simone6',
    surname: 'Bianchi6',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'SUSPENDED',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel6',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
      {
        title: 'Piattaforma Notifiche',
        id: 'prod-pn',
        roles: [
          {
            relationshipId: 'rel6',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },

  // use case ACTIVE on 1 product/role in which logged user is not ADMIN
  {
    id: 'uid7',
    taxCode: 'TAXCOD07A00A123P',
    name: 'Simone7',
    surname: 'Bianchi7',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'ADMIN',
    status: 'ACTIVE',
    products: [
      {
        title: 'Piattaforma Notifiche',
        id: 'prod-pn',
        roles: [
          {
            relationshipId: 'rel7',
            role: 'referente-tecnico',
            selcRole: 'ADMIN',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },

  // use case ACTIVE on 1 product having 2 roles
  {
    id: 'uid8',
    taxCode: 'TAXCOD08A00A123P',
    name: 'Simone8',
    surname: 'Bianchi8',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'PDND',
        id: 'prod-interop',
        roles: [
          {
            relationshipId: 'rel8',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
          {
            relationshipId: 'rel8_2',
            role: 'operatore-sicurezza',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  // use case ACTIVE on 2 product, both logged user is ADMIN: 1 product with 1 role, the other with 2 roles
  {
    id: 'uid9',
    taxCode: 'TAXCOD09A00A123P',
    name: 'Simone9',
    surname: 'Bianchi9',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel6',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
      {
        title: 'PDND',
        id: 'prod-interop',
        roles: [
          {
            relationshipId: 'rel9',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
          {
            relationshipId: 'rel9_2',
            role: 'operatore-sicurezza',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid10',
    taxCode: 'TAXCOD10A00A123P',
    name: 'Simone10',
    surname: 'Bianchi10',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'PDND',
        id: 'prod-interop',
        roles: [
          {
            relationshipId: 'rel10',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
          {
            relationshipId: 'rel10_2',
            role: 'operatore-sicurezza',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid11',
    taxCode: 'TAXCOD11A00A123P',
    name: 'Simone11',
    surname: 'Bianchi11',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'PDND',
        id: 'prod-interop',
        roles: [
          {
            relationshipId: 'rel11',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid12',
    taxCode: 'TAXCOD12A00A123P',
    name: 'Simone12',
    surname: 'Bianchi12',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'SUSPENDED',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel12',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid13',
    taxCode: 'TAXCOD13A00A123P',
    name: 'Simone13',
    surname: 'Bianchi13',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'SUSPENDED',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel13',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid14',
    taxCode: 'TAXCOD14A00A123P',
    name: 'Simone14',
    surname: 'Bianchi14',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'SUSPENDED',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel14',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid15',
    taxCode: 'TAXCOD15A00A123P',
    name: 'Simone15',
    surname: 'Bianchi15',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'SUSPENDED',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel15',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid16',
    taxCode: 'TAXCOD16A00A123P',
    name: 'Simone16',
    surname: 'Bianchi16',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel16',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid17',
    taxCode: 'TAXCOD17A00A123P',
    name: 'Simone17',
    surname: 'Bianchi17',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'SUSPENDED',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel17',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid18',
    taxCode: 'TAXCOD18A00A123P',
    name: 'Simone18',
    surname: 'Bianchi18',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel18',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid19',
    taxCode: 'TAXCOD19A00A123P',
    name: 'Simone19',
    surname: 'Bianchi19',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel19',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid20',
    taxCode: 'TAXCOD20A00A123P',
    name: 'Simone20',
    surname: 'Bianchi20',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel20',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid21',
    taxCode: 'TAXCOD21A00A123P',
    name: 'Simone21',
    surname: 'Bianchi21',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel21',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid22',
    taxCode: 'TAXCOD22A00A123P',
    name: 'Simone22',
    surname: 'Bianchi22',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel22',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  // Use cases introduced for selfcare PNPG
  {
    id: 'uid60',
    taxCode: 'TAXCOD04A00A121P',
    name: 'Marco',
    surname: 'Marchetti',
    email: 'marco.m@comune.milano.it',
    userRole: 'ADMIN',
    status: 'ACTIVE',
    products: [
      {
        title: 'SEND',
        id: 'prod-pn-pg',
        roles: [
          {
            relationshipId: 'rel4',
            role: 'Gestore Notifiche',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid61',
    taxCode: 'TAXCOD04A00A421P',
    name: 'Fabio',
    surname: 'Lopez',
    email: 'fabio.l@comune.milano.it',
    userRole: 'ADMIN',
    status: 'ACTIVE',
    products: [
      {
        title: 'SEND',
        id: 'prod-pn-pg',
        roles: [
          {
            relationshipId: 'rel4',
            role: 'Amministratore',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid62',
    taxCode: 'TAXCOD14A00A521P',
    name: 'Marco',
    surname: 'Marchisio',
    email: 'marco.m@comune.milano.it',
    userRole: 'ADMIN',
    status: 'ACTIVE',
    products: [
      {
        title: 'SEND',
        id: 'prod-pn-pg',
        roles: [
          {
            relationshipId: 'rel4',
            role: 'Amministratore',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
];

export const fetchPartyProductUsers = (
  pageRequest: PageRequest,
  _party: Party,
  product: Product,
  _currentUser: User,
  selcRole?: UserRole,
  productRoles?: Array<ProductRole>
): Promise<PageResource<PartyProductUser>> => {
  const filteredContent = mockedUsers
    .filter((u) => {
      if (selcRole && !u.products.find((p) => p.roles.find((r) => selcRole === r.selcRole))) {
        return false;
      }
      if (
        productRoles &&
        productRoles.length > 0 &&
        !u.products.find((p) =>
          p.roles.find((r) => productRoles.map((r) => r.productRole).indexOf(r.role) > -1)
        )
      ) {
        return false;
      }
      if (product && !u.products.find((p) => p.id === product.id)) {
        return false;
      }
      return u;
    })
    .map((u) => {
      const clone: PartyProductUser = {
        ...cloneDeep(u),
        product: u.products.find((p) => p.id === product.id) as PartyUserProduct,
      };
      // eslint-disable-next-line functional/immutable-data
      delete (clone as any).products;
      return clone;
    });

  if (pageRequest.sort) {
    applySort(filteredContent, pageRequest.sort);
  }
  return new Promise((resolve) =>
    setTimeout(() => resolve(extractPageRequest(filteredContent, pageRequest)), 100)
  );
};

export const updatePartyUserStatus = (
  _party: Party,
  user: PartyProductUser,
  _product: PartyUserProduct,
  role: PartyUserProductRole,
  status: UserStatus
): Promise<any> => {
  const mockedUser = mockedUsers.find((u) => u.id === user.id) as PartyUserExt;
  if (status === 'ACTIVE' || status === 'SUSPENDED') {
    // eslint-disable-next-line functional/immutable-data
    role.status = status;
    if (user.status !== status) {
      if (status === 'ACTIVE') {
        // eslint-disable-next-line functional/immutable-data
        user.status = 'ACTIVE';
      } else if (!mockedUser.products.find((p) => p.roles.find((r) => r.status === 'ACTIVE'))) {
        // eslint-disable-next-line functional/immutable-data
        user.status = 'SUSPENDED';
      }
    }
    // eslint-disable-next-line functional/immutable-data
    mockedUsers.splice(
      mockedUsers.findIndex((u) => u.id === user.id),
      1,
      { ...mockedUser, ...user }
    );

    return new Promise<void>((resolve) => resolve());
  } else {
    throw new Error(`Not allowed next status: ${status}`);
  }
};
