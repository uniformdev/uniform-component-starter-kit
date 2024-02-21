export const getDividerColorStyle = (style?: Types.AvailableColor) => {
  switch (style) {
    case 'primary':
      return 'border-primary';
    case 'secondary':
      return 'border-secondary';
    case 'accent':
      return 'border-accent';
    case 'base-200':
      return 'border-base-200';
    case 'base-300':
      return 'border-base-300';
    default:
      return 'border-base-200';
  }
};

export const getDividerWidth = (style?: Types.AvailableWidth) => {
  switch (style) {
    case '10%':
      return 'w-[10%]';
    case '20%':
      return 'w-[20%]';
    case '30%':
      return 'w-[30%]';
    case '40%':
      return 'w-[40%]';
    case '50%':
      return 'w-[50%]';
    case '60%':
      return 'w-[60%]';
    case '70%':
      return 'w-[70%]';
    case '80%':
      return 'w-[80%]';
    case '90%':
      return 'w-[90%]';
    default:
      return 'w-full';
  }
};

export const getAlignmentClassName = (alignment?: Types.HorizontalAlignment) => {
  switch (alignment) {
    case 'left':
      return 'justify-start';
    case 'center':
      return 'justify-center';
    case 'right':
      return 'justify-end';
    default:
      return 'justify-center';
  }
};
