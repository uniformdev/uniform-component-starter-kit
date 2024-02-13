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

const getDynamicAnimationClass = (style?: Types.ButtonStyles) => {
  const animationBaseClass = `border-none transition-all duration-[0.3s] relative before:content-[''] before:absolute before:w-full before:h-full before:z-[1] before:opacity-0 before:transition-all before:duration-[0.3s] before:border-t before:border-b before:scale-x-[0.1] before:scale-y-100 before:left-0 before:bottom-0 hover:before:opacity-100 hover:before:scale-100 after:content-[''] after:absolute after:w-full after:h-full after:z-[1] after:transition-all after:duration-[0.3s] after:left-0 after:bottom-0 hover:after:opacity-0 hover:after:scale-x-[0.1] hover:after:scale-y-100`;
  switch (style) {
    case 'primary':
      return `btn-primary ${animationBaseClass} before:border-y-primary hover:text-primary hover:bg-primary-content`;
    case 'secondary':
      return `btn-secondary ${animationBaseClass} before:border-y-secondary hover:text-secondary hover:bg-transparent`;
    case 'accent':
      return `btn-accent ${animationBaseClass} before:border-y-accent hover:text-accent hover:bg-transparent`;
    case 'ghost':
      return `btn-ghost ${animationBaseClass} before:border-y-ghost hover:text-ghost hover:bg-transparent`;
    case 'link':
      return `btn-link ${animationBaseClass} before:border-y-primary`;
    default:
      return `btn-primary ${animationBaseClass} before:border-y-primary hover:text-primary hover:bg-primary-content`;
  }
};

const getStaticAnimationClass = (style?: Types.ButtonStyles) => {
  switch (style) {
    case 'primary':
      return 'btn-primary hover:text-primary hover:bg-transparent';
    case 'secondary':
      return 'btn-secondary hover:text-secondary hover:bg-transparent';
    case 'accent':
      return 'btn-accent hover:text-accent hover:bg-transparent hover:border-accent';
    case 'ghost':
      return 'btn-ghost hover:text-ghost hover:bg-transparent hover:border-ghost';
    case 'link':
      return 'btn-link hover:border-transparent';
    default:
      return 'btn-primary hover:text-primary hover:transparent';
  }
};

export const getButtonAnimationClass = (style: Types.ButtonStyles, animationType: Types.AnimationType) => {
  return animationType === 'flyIn' ? getDynamicAnimationClass(style) : getStaticAnimationClass(style);
};

export const getTextClass = (style?: Types.HeadingStyles) => {
  switch (style) {
    case 'h1':
      return 'text-4xl md:text-5xl';
    case 'h2':
      return 'text-3xl md:text-4xl';
    case 'h3':
      return 'text-2xl md:text-3xl';
    case 'h4':
      return 'text-xl md:text-2xl';
    case 'h5':
      return 'text-lg md:text-xl';
    case 'h6':
      return 'text-base md:text-lg';
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

export const getGapClass = (padding?: PaddingSize) => {
  switch (padding) {
    case PaddingSize.Large:
      return 'gap-16 md:gap-28';
    case PaddingSize.Medium:
      return 'gap-10 lg:gap-20';
    case PaddingSize.Small:
      return 'gap-6 lg:gap-8';
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

export const getTextColor = (colorName?: Types.ThemeColorsValues) => {
  switch (colorName) {
    case 'primary':
      return 'text-primary';
    case 'primary-content':
      return 'text-primary-content';
    case 'secondary':
      return 'text-secondary';
    case 'secondary-content':
      return 'text-secondary-content';
    case 'accent':
      return 'text-accent';
    case 'accent-content':
      return 'text-accent-content';
    case 'info-content':
      return 'text-info-content';
    case 'base-200':
      return 'text-base-200';
    case 'base-300':
      return 'text-base-300';
    default:
      return 'text-[#000]';
  }
};

export const getBackgroundColor = (colorName?: Types.ThemeColorsValues) => {
  switch (colorName) {
    case 'primary':
      return 'bg-primary';
    case 'primary-content':
      return 'bg-primary-content';
    case 'secondary':
      return 'bg-secondary';
    case 'secondary-content':
      return 'bg-secondary-content';
    case 'accent':
      return 'bg-accent';
    case 'accent-content':
      return 'bg-accent-content';
    case 'info-content':
      return 'bg-info-content';
    case 'base-200':
      return 'bg-base-200';
    case 'base-300':
      return 'bg-base-300';
    default:
      return 'bg-[#fff]';
  }
};

export const getHoverTextColor = (colorName?: Types.ThemeColorsValues) => {
  switch (colorName) {
    case 'primary':
      return 'hover:text-primary';
    case 'primary-content':
      return 'hover:text-primary-content';
    case 'secondary':
      return 'hover:text-secondary';
    case 'secondary-content':
      return 'hover:text-secondary-content';
    case 'accent':
      return 'hover:text-accent';
    case 'accent-content':
      return 'hover:text-accent-content';
    case 'info-content':
      return 'hover:text-info-content';
    case 'base-200':
      return 'hover:text-base-200';
    case 'base-300':
      return 'hover:text-base-300';
    default:
      return 'hover:text-[#000]';
  }
};
