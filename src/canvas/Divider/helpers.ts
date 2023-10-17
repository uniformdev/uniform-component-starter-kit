export const getDividerColorStyle = (style: Types.AvailableColor) => {
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
