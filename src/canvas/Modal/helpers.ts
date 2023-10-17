export const getModalMaxWidth = (maxWidth: Types.AvailableModalMaxWidth) => {
  switch (maxWidth) {
    case 'small':
      return 'max-w-sm';
    case 'medium':
      return 'max-w-md';
    case 'large':
      return 'max-w-lg';
    case 'xLarge':
      return 'max-w-xl';
    default:
      return 'max-w-max';
  }
};
