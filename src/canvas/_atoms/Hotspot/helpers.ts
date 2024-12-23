export const getPosition = (position?: Types.Position) => {
  switch (position) {
    case 'top':
      return '-translate-x-1/2 -translate-y-[calc(100%+2rem)]';
    case 'top-right':
      return '-translate-y-[calc(100%+2rem)] -translate-x-3';
    case 'right-top':
      return '-translate-y-[calc(100%-0.75rem)] translate-x-8';
    case 'right':
      return '-translate-y-1/2 translate-x-8';
    case 'right-bottom':
      return '-translate-y-3 translate-x-8';
    case 'bottom-right':
      return '-translate-x-3 translate-y-8';
    case 'bottom':
      return '-translate-x-1/2 translate-y-8';
    case 'bottom-left':
      return '-translate-x-[calc(100%-0.75rem)] translate-y-8';
    case 'left-bottom':
      return '-translate-x-[calc(100%+2rem)] -translate-y-3 ';
    case 'left':
      return '-translate-x-[calc(100%+2rem)] -translate-y-1/2';
    case 'left-top':
      return '-translate-x-[calc(100%+2rem)] -translate-y-[calc(100%-0.75rem)]';
    case 'top-left':
      return '-translate-x-[calc(100%-0.75rem)] -translate-y-[calc(100%+2rem)]';
    case 'center':
    default:
      return '-translate-x-1/2 -translate-y-1/2';
  }
};
