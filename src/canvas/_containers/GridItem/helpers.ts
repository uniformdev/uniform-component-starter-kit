export const getGridColumnsSpanClass = (colSpan?: Types.AvailableColumnCount) => {
  switch (colSpan) {
    case '1':
      return 'md:col-span-1';
    case '2':
      return 'md:col-span-2';
    case '3':
      return 'md:col-span-3';
    case '4':
      return 'md:col-span-4';
    case '5':
      return 'md:col-span-5';
    case '6':
      return 'md:col-span-6';
    case '7':
      return 'md:col-span-7';
    case '8':
      return 'md:col-span-8';
    case '9':
      return 'md:col-span-9';
    case '10':
      return 'md:col-span-10';
    case '11':
      return 'md:col-span-11';
    case '12':
      return 'md:col-span-12';
    default:
      return '';
  }
};

export const getGridColumnsStartClass = (colSpan?: Types.AvailableColumnCount) => {
  switch (colSpan) {
    case '1':
      return 'md:col-start-1';
    case '2':
      return 'md:col-start-2';
    case '3':
      return 'md:col-start-3';
    case '4':
      return 'md:col-start-4';
    case '5':
      return 'md:col-start-5';
    case '6':
      return 'md:col-start-6';
    case '7':
      return 'md:col-start-7';
    case '8':
      return 'md:col-start-8';
    case '9':
      return 'md:col-start-9';
    case '10':
      return 'md:col-start-10';
    case '11':
      return 'md:col-start-11';
    case '12':
      return 'md:col-start-12';
    default:
      return '';
  }
};

export const getGridRowsSpanClass = (rowSpan?: Types.AvailableRowCount) => {
  switch (rowSpan) {
    case '1':
      return 'md:row-span-1';
    case '2':
      return 'md:row-span-2';
    case '3':
      return 'md:row-span-3';
    case '4':
      return 'md:row-span-4';
    case '5':
      return 'md:row-span-5';
    case '6':
      return 'md:row-span-6';
    default:
      return '';
  }
};

export const getGridRowsStartClass = (rowStart?: Types.AvailableRowCount) => {
  switch (rowStart) {
    case '1':
      return 'md:row-start-1';
    case '2':
      return 'md:row-start-2';
    case '3':
      return 'md:row-start-3';
    case '4':
      return 'md:row-start-4';
    case '5':
      return 'md:row-start-5';
    case '6':
      return 'md:row-start-6';
    default:
      return '';
  }
};
