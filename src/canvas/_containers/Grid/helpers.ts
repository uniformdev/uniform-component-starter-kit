export const getGridColumnsClass = (columnsCount: Types.AvailableColumnCount) => {
  switch (columnsCount) {
    case '1':
      return 'grid-cols-1';
    case '2':
      return 'grid-cols-1 md:grid-cols-2';
    case '3':
      return 'grid-cols-1 md:grid-cols-3';
    case '4':
      return 'grid-cols-1 md:grid-cols-4';
    case '5':
      return 'grid-cols-1 md:grid-cols-5';
    case '6':
      return 'grid-cols-1 md:grid-cols-6';
    case '7':
      return 'grid-cols-1 md:grid-cols-7';
    case '8':
      return 'grid-cols-1 md:grid-cols-8';
    case '9':
      return 'grid-cols-1 md:grid-cols-9';
    case '10':
      return 'grid-cols-1 md:grid-cols-10';
    case '11':
      return 'grid-cols-1 md:grid-cols-11';
    case '12':
      return 'grid-cols-1 md:grid-cols-12';
    default:
      return 'grid-cols-1';
  }
};

export const getGapYClass = (gapY: Types.AvailableGapVariants) => {
  switch (gapY) {
    case 'none':
      return 'gap-y-0';
    case 'small':
      return 'gap-y-2';
    case 'medium':
      return 'gap-y-8';
    case 'large':
      return 'gap-y-16';
    default:
      return '';
  }
};

export const getGapXClass = (gapX: Types.AvailableGapVariants) => {
  switch (gapX) {
    case 'none':
      return 'gap-x-0';
    case 'small':
      return 'gap-x-4';
    case 'medium':
      return 'gap-x-8';
    case 'large':
      return 'gap-x-16';
    default:
      return '';
  }
};
