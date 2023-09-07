import { StatusEnum, SubProductResource } from '../api/generated/b4f-dashboard/SubProductResource';

export type Product = {
  activationDateTime?: Date;
  description: string;
  id: string;
  logo: string;
  title: string;
  urlBO: string;
  backOfficeEnvironmentConfigurations?: Array<{
    environment?: string;
    url?: string;
  }>;
  urlPublic?: string;
  tag?: string;
  // product status.The intrinsic state of the product. Product status is unrelated to product onboarding status.
  status: StatusEnum;
  imageUrl: string;
  subProducts?: Array<SubProductResource>;
  logoBgColor?: string;
  delegable: boolean;
};

export type ProductsMap = { [id: string]: Product };

export const buildProductsMap = (products: Array<Product>): ProductsMap =>
  products.reduce((acc, p) => {
    // eslint-disable-next-line functional/immutable-data
    acc[p.id] = p;
    return acc;
  }, {} as ProductsMap);
