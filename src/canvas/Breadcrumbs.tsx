import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { useComponentStarterKitContext } from '../context/ComponentStarterKitContext';
import classNames from 'classnames';

type BreadcrumbSeparator = 'slash' | 'chevron' | 'none';

type Props = ComponentProps<{
  colorStyle: Types.AvailableColor;
  displayRootNode: boolean;
  displayPlaceholderNodes: boolean;
  separator: BreadcrumbSeparator;
}>;

const getColorStyle = (style: Types.AvailableColor) => {
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

const getSeparator = (separator: 'slash' | 'chevron' | 'none') => {
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

const Breadcrumbs: FC<Props> = ({ colorStyle, displayPlaceholderNodes, displayRootNode, separator }) => {
  const { breadcrumbs = [] } = useComponentStarterKitContext();

  const breadcrumbsToShow = breadcrumbs
    .filter((breadcrumb: Types.ProjectMapLink) => (!displayRootNode ? !breadcrumb.isRoot : true))
    .filter((breadcrumb: Types.ProjectMapLink) =>
      !displayPlaceholderNodes ? breadcrumb?.type !== 'placeholder' : true
    );

  return (
    <div key={`breadcrumbs-${breadcrumbsToShow.length}`} className={classNames('text-sm', getColorStyle(colorStyle))}>
      <ul className="flex items-center">
        {breadcrumbsToShow?.map((breadcrumb: Types.ProjectMapLink, index) => (
          <li className="flex items-center" key={breadcrumb?.path}>
            {!!index && <div className="mx-2">{getSeparator(separator)}</div>}
            {breadcrumb?.type === 'placeholder' ? (
              <span>{breadcrumb.name}</span>
            ) : (
              <a href={breadcrumb?.path}>{breadcrumb.dynamicInputTitle || breadcrumb.name}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

registerUniformComponent({
  type: 'breadcrumbs',
  component: Breadcrumbs,
});

export default Breadcrumbs;
