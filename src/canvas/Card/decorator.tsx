import { useCallback } from 'react';
import Image from '../../components/Image';
import { UniformPlaygroundDecorator } from '@uniformdev/canvas-react';
import Button from '../../components/Button';
import { getObjectFitClass } from '../../utilities/styling';

// This decorator is used as a display of the CardBlock component around the Card component
// Activate visual editing doc: https://docs.uniform.app/docs/guides/composition/visual-editing/activate-visual-editing
export const CardDecorator: UniformPlaygroundDecorator = ({ data, children }) => {
  const ItemPlaceholder = useCallback(
    (count = 1) =>
      new Array(count).fill(0).map((_item, index) => (
        <div
          key={`item-${index}`}
          className="card w-96 max-w-full min-h-full mx-0 md:mx-2 border border-gray-200 blur-xs"
        >
          <figure>
            <Image
              alt="image"
              src="https://res.cloudinary.com/uniform-demos/image/upload/v1692276539/csk-marketing/Hero-Rectangle_nof1km_qy2ow6.png"
              width={384}
              height={384}
              className={getObjectFitClass('cover')}
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 rounded-xl" />
          </figure>
          <div className="card-body">
            <div className="badge badge-primary text-primary-content">New</div>
            <h2 className="card-title">Default variant</h2>
            <div dangerouslySetInnerHTML={{ __html: 'description' }} />
            <div className="card-actions justify-end mt-auto">
              <Button style="primary" copy="Button Copy" />
            </div>
          </div>
        </div>
      )),
    []
  );

  return data.type !== 'card' ? (
    <>{children}</>
  ) : (
    <div className="flex items-center justify-between py-2 gap-2 flex-wrap">
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between px-3 pb-6 blur-xs">
        <div className="basis-2/3 xl:basis-auto">
          <h1 className="font-bold text-3xl">Default Card Block</h1>
        </div>
        <Button copy="Button Copy" style="primary" />
      </div>
      {children}
      {ItemPlaceholder(2)}
    </div>
  );
};
