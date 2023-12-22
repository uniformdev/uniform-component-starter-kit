export const getTableSize = (size: string) => {
  switch (size) {
    case 'tiny':
      return 'table-xs';
    case 'small':
      return 'table-sm';
    case 'large':
      return 'table-lg';
    default:
      return '';
  }
};
