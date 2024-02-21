import classNames from 'classnames';
import { UniformPlaygroundDecorator } from '@uniformdev/canvas-react';
import { CHILDREN_CONTAINER_STYLES, COMMON_PADDING } from '../../hocs/withoutContainer';
import { HeaderPlaceholder } from '../../canvas/_navigation/Header';
import { FooterPlaceholder } from '../../canvas/_navigation/Footer';

// This decorator is used as a container to add a header and footer to the background and the necessary margins/paddings on the visual editing workspace of the patterns
// Activate visual editing doc: https://docs.uniform.app/docs/guides/composition/visual-editing/activate-visual-editing
export const BackgroundDecorator: UniformPlaygroundDecorator = ({ data, children }) => {
  const isFooterComponents = ['footer'].includes(data.type);
  const isHeaderComponents = ['header'].includes(data.type);

  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col relative">
      {!isHeaderComponents && (
        <div className={classNames('blur-sm mb-6', COMMON_PADDING)}>
          <HeaderPlaceholder />
        </div>
      )}
      <div className={classNames('flex flex-col flex-1 [&>*]:my-auto', COMMON_PADDING, CHILDREN_CONTAINER_STYLES)}>
        {children}
      </div>
      {!isFooterComponents && (
        <div className={classNames('blur-sm mt-6', COMMON_PADDING)}>
          <FooterPlaceholder />
        </div>
      )}
    </div>
  );
};

// This decorator is used to define specific margins/paddings for some components
// Deprecated. Please use imageGallery component instead of productGallery. The productGallery will be removed.
export const WithoutContainerDecorator: UniformPlaygroundDecorator = ({ data, children }) =>
  ['hero', 'banner', 'container', 'header', 'footer', 'productInfo', 'imageGallery', 'productGallery'].includes(
    data.type
  ) ? (
    <div className={classNames('!max-w-none !px-0', { '!my-0': ['header'].includes(data.type) })}>{children}</div>
  ) : (
    <>{children}</>
  );
