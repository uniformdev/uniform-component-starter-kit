export const getButtonClass = (style?: Types.ButtonStyles) => {
  switch (style) {
    case 'primary':
      return 'btn-primary';
    case 'secondary':
      return 'btn-secondary';
    case 'accent':
      return 'btn-accent';
    case 'ghost':
      return 'btn-ghost';
    case 'link':
      return 'btn-link';
    default:
      return 'btn-primary';
  }
};

export const getTextClass = (style?: Types.HeadingStyles) => {
  switch (style) {
    case 'h1':
      return 'text-5xl';
    case 'h2':
      return 'text-4xl';
    case 'h3':
      return 'text-3xl';
    case 'h4':
      return 'text-2xl';
    case 'h5':
      return 'text-xl';
    case 'h6':
      return 'text-lg';
    default:
      return 'text-base';
  }
};

export const getObjectFitClass = (objectFit?: Types.AvailableObjectFit) => {
  switch (objectFit) {
    case 'contain':
      return 'object-contain';
    case 'cover':
      return 'object-cover';
    case 'fill':
      return 'object-fill';
    case 'none':
      return 'object-none';
    default:
      return '';
  }
};

export const getImageOverlayColorStyle = (style?: Types.AvailableColor) => {
  switch (style) {
    case 'primary':
      return 'bg-primary';
    case 'secondary':
      return 'bg-secondary';
    case 'accent':
      return 'bg-accent';
    case 'base-200':
      return 'bg-base-200';
    case 'base-300':
      return 'bg-base-300';
    default:
      return '';
  }
};

export const getImageOverlayOpacityStyle = (style?: Types.AvailableOpacity) => {
  switch (style) {
    case '0%':
      return 'bg-opacity-0';
    case '10%':
      return 'bg-opacity-10';
    case '20%':
      return 'bg-opacity-20';
    case '30%':
      return 'bg-opacity-30';
    case '40%':
      return 'bg-opacity-40';
    case '50%':
      return 'bg-opacity-50';
    case '60%':
      return 'bg-opacity-60';
    case '70%':
      return 'bg-opacity-70';
    case '80%':
      return 'bg-opacity-80';
    case '90%':
      return 'bg-opacity-90';
    case '100%':
      return 'bg-opacity-100';
    default:
      return 'bg-opacity-0';
  }
};

export const convertColumnWidthsToTailwindColumns = (columnWidths: string) => {
  // Converting to taiwind grid columns https://tailwindcss.com/docs/grid-column
  switch (columnWidths) {
    case '1':
      return '12'; // 100% of 12
    case '1/2':
      return '6'; // 50% of 12
    case '1/3':
      return '4'; // 33% of 12
    case '2/3':
      return '8'; // 66% of 12
    case '1/4':
      return '3'; // 25% of 12
    case '3/4':
      return '9'; // 75% of 12
    default:
      return '6';
  }
};

export enum BackgroundTypes {
  Light = 'Light',
  Dark = 'Dark',
  Medium = 'Medium',
  Transparent = 'Transparent',
}

export enum PaddingSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  None = 'None',
}

export const getBackgroundClass = (background?: BackgroundTypes) => {
  switch (background) {
    case BackgroundTypes.Transparent:
      return 'bg-transparent';
    case BackgroundTypes.Light:
      return 'bg-base-100 text-black';
    case BackgroundTypes.Medium:
      return 'bg-gray-50 text-black';
    case BackgroundTypes.Dark:
      return 'bg-base-300 !text-primary-content';
    default:
      return '';
  }
};

export const getPaddingTopClass = (padding?: PaddingSize) => {
  switch (padding) {
    case PaddingSize.Large:
      return 'pt-16 md:pt-28';
    case PaddingSize.Medium:
      return 'pt-10 lg:pt-20';
    case PaddingSize.Small:
      return 'pt-6 lg:pt-8';
    case PaddingSize.None:
      return '';
    default:
      return '';
  }
};

export const getPaddingBottomClass = (padding?: PaddingSize) => {
  switch (padding) {
    case PaddingSize.Large:
      return 'pb-16 md:pb-28';
    case PaddingSize.Medium:
      return 'pb-10 lg:pb-20';
    case PaddingSize.Small:
      return 'pb-6 lg:pb-8';
    case PaddingSize.None:
      return '';
    default:
      return '';
  }
};

export const getMarginTopClass = (padding?: PaddingSize) => {
  switch (padding) {
    case PaddingSize.Large:
      return 'mt-16 md:mt-28';
    case PaddingSize.Medium:
      return 'mt-10 lg:mt-20';
    case PaddingSize.Small:
      return 'mt-6 lg:mt-8';
    case PaddingSize.None:
      return '';
    default:
      return '';
  }
};

export const getMarginBottomClass = (padding?: PaddingSize) => {
  switch (padding) {
    case PaddingSize.Large:
      return 'mb-16 md:mb-28';
    case PaddingSize.Medium:
      return 'mb-10 lg:mb-20';
    case PaddingSize.Small:
      return 'mb-6 lg:mb-8';
    case PaddingSize.None:
      return '';
    default:
      return '';
  }
};

export const getLineClampClass = (maxLineCount?: Types.AvailableMaxLineCount) => {
  switch (maxLineCount) {
    case '1':
      return 'line-clamp-1';
    case '2':
      return 'line-clamp-2';
    case '3':
      return 'line-clamp-3';
    case '4':
      return 'line-clamp-4';
    case '5':
      return 'line-clamp-5';
    case '6':
      return 'line-clamp-6';
    case 'none':
      return 'line-clamp-none';
    default:
      return '';
  }
};
