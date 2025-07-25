import { GeographicTaxonomyResource } from '../api/generated/b4f-dashboard/GeographicTaxonomyResource';
import { ProductOnBoardingStatusEnum } from '../api/generated/b4f-dashboard/OnboardedProductResource';

export type UserRole = 'ADMIN' | 'LIMITED';
export type PartyRole = 'DELEGATE' | 'MANAGER' | 'OPERATOR' | 'SUB_DELEGATE';
export type UserStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED';

type OnboardedProduct = {
  authorized?: boolean;
  billing?: {
    publicServices?: boolean;
    recipientCode?: string;
    vatNumber?: string;
  };
  productId?: string;
  productOnBoardingStatus?: ProductOnBoardingStatusEnum;
  userProductActions?: Array<string>;
  userRole?: string;
  institutionType?: string;
  origin?: string;
  originId?: string;
};

export type Party = {
  partyId: string;
  products: Array<OnboardedProduct>;
  externalId?: string;
  originId?: string;
  origin?: string;
  description: string;
  digitalAddress?: string;
  category?: string;
  urlLogo?: string;
  fiscalCode?: string;
  registeredOffice: string;
  zipCode: string;
  typology: string;
  institutionType?: string;
  recipientCode?: string;
  geographicTaxonomies: Array<GeographicTaxonomyResource>;
  vatNumberGroup?: boolean;
  supportEmail?: string;
  vatNumber?: string;
  subunitCode?: string;
  subunitType?: string;
  aooParentCode?: string;
  parentDescription?: string;
  userRole?: UserRole;
  status?: UserStatus;
};
