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

export const getImageUrl = (image?: string | Types.CloudinaryImage) => {
  const imageUrl = typeof image === 'string' ? image : image?.[0]?.url;

  if (!imageUrl || imageUrl === 'unresolved') return '';

  if (imageUrl.startsWith('//')) return imageUrl.replace('//', 'https://');

  return imageUrl;
};
