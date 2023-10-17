import { HeaderVariants } from '.';

export const getHeaderColor = (variant?: string) => {
  switch (variant) {
    case HeaderVariants.Light:
      return 'bg-base-200';
    default:
      return 'bg-base-300';
  }
};

export const getLinksAlignment = (alignment?: Types.HorizontalAlignment) => {
  switch (alignment) {
    case 'left':
      return 'justify-start';
    case 'center':
      return 'justify-center';
    case 'right':
      return 'justify-end';
    default:
      return 'justify-end';
  }
};
