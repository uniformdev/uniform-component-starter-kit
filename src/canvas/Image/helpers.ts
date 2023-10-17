export const getBorderColorStyle = (style?: Types.AvailableColor) => {
  switch (style) {
    case 'primary':
      return 'border-primary bg-primary';
    case 'secondary':
      return 'border-secondary bg-secondary';
    case 'accent':
      return 'border-accent bg-accent';
    case 'base-200':
      return 'border-base-200 bg-base-200';
    case 'base-300':
      return 'border-base-300 bg-base-300';
    default:
      return '';
  }
};

export const getBorderRadiusStyle = (style?: Types.AvailableBorderRadius) => {
  switch (style) {
    case 'none':
      return '';
    case 'small':
      return 'rounded-md';
    case 'medium':
      return 'rounded-xl';
    case 'large':
      return 'rounded-3xl';
    case 'full':
      return 'rounded-full';
    default:
      return '';
  }
};
