import { useCallback } from 'react';
import Image from '../../components/Image';
import { UniformPlaygroundDecorator } from '@uniformdev/canvas-react';

// This decorator is used as a display of the FeatureCallout component around the Feature component
// Activate visual editing doc: https://docs.uniform.app/docs/guides/composition/visual-editing/activate-visual-editing
export const FeatureDecorator: UniformPlaygroundDecorator = ({ data, children }) => {
  const ItemPlaceholder = useCallback(
    (count = 1) =>
      new Array(count).fill(0).map((_item, index) => (
        <div key={`item-${index}`} className="flex items-start mt-8 space-x-3 blur-xs">
          <div className="flex items-center justify-center flex-shrink-0 mt-1 rounded-md w-11 h-11 ">
            <Image
              width={100}
              height={100}
              alt="icon"
              className="w-10 h-10 text-indigo-50"
              src="https://res.cloudinary.com/uniform-demos/image/upload/v1692276689/csk-icons/icon-understand_eytz6h_cgirir.svg"
            />
          </div>
          <div>
            <p className="text-xl font-bold">Title</p>
            <p>Description</p>
          </div>
        </div>
      )),
    []
  );

  if (data.type !== 'feature') return <>{children}</>;
  return (
    <div className="hero flex flex-wrap lg:gap-10 lg:flex-nowrap text-secondary-content">
      <div className="flex items-center justify-start w-full lg:w-1/2 blur-xs">
        <div>
          <Image
            src="https://res.cloudinary.com/uniform-demos/image/upload/v1692276539/csk-marketing/Hero-Rectangle_nof1km_qy2ow6.png"
            width="521"
            height="482"
            alt="Feature"
          />
        </div>
      </div>
      <div className="hero-content flex flex-wrap items-center w-full lg:w-1/2 p-0">
        <div>
          <div className="flex flex-col w-full blur-xs">
            <div className="text-sm font-bold tracking-wider uppercase text-primary my-3">Eyebrow text</div>
            <h1 className="font-bold text-5xl">Default variant</h1>
            <p className="py-6">Some compelling description</p>
          </div>
          <div className="w-full">
            {children}
            {ItemPlaceholder(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
