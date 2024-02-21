export const getTabSize = (size: string) => {
  switch (size) {
    case 'tiny':
      return 'tab-xs';
    case 'small':
      return 'tab-sm';
    case 'large':
      return 'tab-lg';
    default:
      return '';
  }
};

export const getTabStyle = (style: string) => {
  switch (style) {
    case 'bordered':
      return 'tab-bordered';
    case 'lifted':
      return 'tab-lifted';
    default:
      return '';
  }
};
