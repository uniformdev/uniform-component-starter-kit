export const getTabStyle = (style: string) => {
  switch (style) {
    case 'boxed':
      return 'tabs-boxed bg-transparent';
    default:
      return '';
  }
};
