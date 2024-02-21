import { TextLetterSpacing, TextSizes, TextTags } from './index';

export const getDefaultTextStyle = (style?: TextTags) => {
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

export const getTextSize = (size?: TextSizes) => {
  switch (size) {
    case 'XS':
      return '!text-xs';
    case 'SM':
      return '!text-sm';
    case 'Base':
      return '!text-base';
    case 'LG':
      return '!text-lg';
    case 'XL':
      return '!text-xl';
    case '2XL':
      return '!text-2xl';
    case '3XL':
      return '!text-3xl';
    case '4XL':
      return '!text-4xl';
    case '5XL':
      return '!text-5xl';
    case '6XL':
      return '!text-6xl';
    case '7XL':
      return '!text-7xl';
    case '8XL':
      return '!text-8xl';
    case '9XL':
      return '!text-9xl';
    default:
      return '';
  }
};

export const getTextLetterSpacing = (letterSpacing?: TextLetterSpacing) => {
  switch (letterSpacing) {
    case 'tighter':
      return 'tracking-tighter';
    case 'tight':
      return 'tracking-tight';
    case 'normal':
      return 'tracking-normal';
    case 'wide':
      return 'tracking-wide';
    case 'wider':
      return 'tracking-wider';
    case 'widest':
      return 'tracking-widest';
    default:
      return '';
  }
};
