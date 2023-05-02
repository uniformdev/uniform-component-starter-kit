declare namespace Types {
  type ProjectMapLink = {
    path: string;
  };

  type CloudinaryImage = {
    url: string;
  }[];

  type ButtonStyles = 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';

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
