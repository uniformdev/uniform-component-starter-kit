import { FC } from 'react';
import classNames from 'classnames';
import { useComponentStarterKitContext } from '../../context/ComponentStarterKitContext';
import { getColorStyle, getSeparator } from './helpers';
import { BreadcrumbsProps } from '.';

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  colorStyle,
  displayPlaceholderNodes,
  displayRootNode,
  separator,
  styles,
}) => {
  const { breadcrumbs = [] } = useComponentStarterKitContext();

  const breadcrumbsToShow = breadcrumbs
    .filter((breadcrumb: Types.ProjectMapLink) => (!displayRootNode ? !breadcrumb.isRoot : true))
    .filter((breadcrumb: Types.ProjectMapLink) =>
      !displayPlaceholderNodes ? breadcrumb?.type !== 'placeholder' : true
    );

  return (
    <div
      key={`breadcrumbs-${breadcrumbsToShow.length}`}
      className={classNames('text-sm', getColorStyle(colorStyle), styles?.container)}
    >
      <ul className="flex items-center">
        {breadcrumbsToShow?.map((breadcrumb: Types.ProjectMapLink, index) => (
          <li className="flex items-center" key={breadcrumb?.path}>
            {!!index && <div className="mx-2">{getSeparator(separator)}</div>}
            {breadcrumb?.type === 'placeholder' ? (
              <span>{breadcrumb.name}</span>
            ) : (
              <a href={breadcrumb?.path}>{breadcrumb.dynamicInputTitle || breadcrumb.name || ''}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
