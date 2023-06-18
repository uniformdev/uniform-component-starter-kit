declare namespace Types {
  type ProjectMapLink = {
    path: string;
    type?: string;
    isRoot?: boolean;
    name?: string;
  };

  type CloudinaryImage = {
    url: string;
  }[];

  type ButtonStyles = 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';

  type AvailableColor = 'primary' | 'secondary' | 'accent' | 'base-200' | 'base-300';

  type AvailableOpacity = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;

  type HeadingStyles = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  type VerticalAlignment = 'top' | 'center' | 'bottom';

  type ItemsOrder = 'first' | 'last';

  type HorizontalAlignment = 'left' | 'center' | 'right';

  type SupportedThemes = 'uniform' | 'javadrip' | 'custom';

  type ThemeColors = {
    value: string;
    name: string;
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
