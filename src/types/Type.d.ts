declare namespace Types {
  type ProjectMapLink = {
    path: string;
    type?: string;
    isRoot?: boolean;
    name?: string;
    dynamicInputTitle?: string;
    dynamicInputValues?: Record<string, string>;
  };

  type CloudinaryImage = {
    url: string;
  }[];

  type ButtonStyles = 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';

  type BadgeStyles = 'primary' | 'secondary' | 'accent' | 'outline';

  type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

  type AvailableColor = 'primary' | 'secondary' | 'accent' | 'base-200' | 'base-300';

  type AvailableBannerPosition = 'top' | 'center' | 'bottom';

  type AvailableObjectFit = 'contain' | 'cover' | 'fill' | 'none';

  type AvailableMaxLineCount = '1' | '2' | '3' | '4' | '5' | '6' | 'none';

  type AvailableBorderRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

  type AvailableModalMaxWidth = 'none' | 'small' | 'medium' | 'large' | 'xLarge';

  type AvailableGapVariants = 'none' | 'small' | 'medium' | 'large';

  type AvailableColumnCount = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

  type AvailableRowCount = '1' | '2' | '3' | '4' | '5' | '6';

  type AvailableOpacity = '0%' | '10%' | '20%' | '30%' | '40%' | '50%' | '60%' | '70%' | '80%' | '90%' | '100%';

  type HeadingStyles = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  type VerticalAlignment = 'top' | 'center' | 'bottom';

  type ItemsOrder = 'first' | 'last';

  type HorizontalAlignment = 'left' | 'center' | 'right';

  type SupportedThemes = 'uniform' | 'javadrip' | 'custom';

  type ThemeColors = {
    value: string;
    name: string;
  };

  type GetCompositionRouteResponse<T> = {
    compositionApiResponse: {
      composition: T;
    };
  };

  type SupportedFonts =
    | 'inter'
    | 'roboto_mono'
    | 'rubik'
    | 'dm_mono'
    | 'farro'
    | 'damion'
    | 'advent_pro'
    | 'asap'
    | 'antonio'
    | 'maven_pro';
}
