import NavigationBar, {
  NavigationPath,
} from '@pagopa/selfcare-common-frontend/components/NavigationBar';
import { useMemo } from 'react';
import { Product } from '../model/Product';

type Props = {
  selectedProduct?: Product;
  paths: Array<NavigationPath>;
  showBackComponent?: boolean;
  backLinkTextDecoration?: string;
  backLinkFontWeight?: string;
  backLinkFontSize?: string;
  goBack?: () => void;
};

export default function ProductNavigationBar({
  selectedProduct,
  paths,
  showBackComponent,
  backLinkTextDecoration,
  backLinkFontWeight,
  backLinkFontSize,
  goBack,
}: Props) {
  const innerPaths = useMemo(
    () => (selectedProduct ? [{ description: selectedProduct.title }].concat(paths) : paths),
    [selectedProduct, paths]
  );

  return (
    <NavigationBar
      paths={innerPaths}
      showBackComponent={showBackComponent}
      backLinkTextDecoration={backLinkTextDecoration}
      backLinkFontWeight={backLinkFontWeight}
      backLinkFontSize={backLinkFontSize}
      goBack={goBack}
    />
  );
}
