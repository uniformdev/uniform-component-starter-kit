export const getLocaleEmoji = (inputString: string) => {
  const regex = /[\u{1F000}-\u{1FFFF}]|\p{Emoji}/gu;
  return inputString.match(regex)?.join('') || '';
};

export const getRegionFromLocale = (locale: string) => locale.split('-')[1];
