const getStarsColor = (style?: Types.AvailableColor) => {
  switch (style) {
    case 'primary':
      return 'text-primary';
    case 'secondary':
      return 'text-secondary';
    case 'accent':
      return 'text-accent';
    case 'base-200':
      return 'text-base-200';
    case 'base-300':
      return 'text-base-300';
    default:
      return 'text-yellow-300';
  }
};

export const getRatingFill = (rating: number, index: number, starsColor?: Types.AvailableColor) =>
  index <= rating ? getStarsColor(starsColor) : 'text-gray-300';
