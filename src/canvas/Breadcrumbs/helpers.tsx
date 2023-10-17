import { BreadcrumbSeparator } from '.';

export const getColorStyle = (style: Types.AvailableColor) => {
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
      return 'text-base-200';
  }
};

export const getSeparator = (separator: BreadcrumbSeparator) => {
  switch (separator) {
    case 'none':
      return '';
    case 'slash':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M7 21L14.9 3H17L9.1 21H7Z" />
        </svg>
      );
    case 'chevron':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4  stroke-current"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4  stroke-current"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      );
  }
};
