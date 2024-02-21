import { getTextColor } from '../../utilities/styling';

export const getHeroTextStyle = (textColorVariant: string) => {
  if (textColorVariant === 'Light' || textColorVariant === 'Dark') {
    return textColorVariant === 'Light' ? 'text-primary-content' : 'text-secondary-content';
  } else {
    return getTextColor(textColorVariant as Types.ThemeColorsValues);
  }
};
