export const getColorClassName = (textColorVariant?: Types.AvailableTextColorVariant) => {
  return textColorVariant === 'Light' ? 'text-primary-content' : 'text-secondary-content';
};
