import { Store } from 'redux';
import { i18n } from 'i18next';

const PUBLIC_URL_INNER: string | undefined = import.meta.env.VITE_PUBLIC_URL || '/dashboard';
export const ENV = {
  STORE: {} as Store,
  i18n: {} as i18n,
  ENV: import.meta.env.get('VITE_ENV').required().asString(),
  PUBLIC_URL: PUBLIC_URL_INNER,

  ROUTES: {
    OVERVIEW: `${PUBLIC_URL_INNER}/:partyId`,
    USERS: `${PUBLIC_URL_INNER}/:partyId/users`,
    USERS_DETAIL: `${PUBLIC_URL_INNER}/:partyId/users/:userId`,
    PRODUCT_USERS: `${PUBLIC_URL_INNER}/:partyId/:productId/users`,
    GROUPS: `${PUBLIC_URL_INNER}/:partyId/groups`,
    GROUP_DETAIL: `${PUBLIC_URL_INNER}/:partyId/groups/:groupId`,
  },

  URL_FE: {
    LOGIN: import.meta.env.get('VITE_URL_FE_LOGIN').required().asString(),
    LOGOUT: import.meta.env.get('VITE_URL_FE_LOGOUT').required().asString(),
    ONBOARDING: import.meta.env.get('VITE_URL_FE_ONBOARDING').required().asString(),
    LANDING: import.meta.env.get('VITE_URL_FE_LANDING').required().asString(),
    ASSISTANCE: import.meta.env.get('VITE_URL_FE_ASSISTANCE').required().asString(),
  },

  URL_DOCUMENTATION: 'https://docs.pagopa.it/area-riservata/',

  URL_API: {
    API_DASHBOARD: import.meta.env.get('VITE_URL_API_DASHBOARD').required().asString(),
  },

  API_TIMEOUT_MS: {
    DASHBOARD: import.meta.env.get('VITE_API_DASHBOARD_TIMEOUT_MS').required().asInt(),
  },

  PARTY_GROUPS_PAGE_SIZE: import.meta.env.get('VITE_PARTY_GROUPS_PAGE_SIZE').required().asInt(),
  PARTY_PRODUCT_GROUPS_PAGE_SIZE: import.meta.env
    .get('VITE_PARTY_PRODUCT_GROUPS_PAGE_SIZE')
    .required()
    .asInt(),
};
