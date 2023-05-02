import { FC } from 'react';
import Image from 'next/image';
import { registerUniformComponent, ComponentProps, UniformText } from '@uniformdev/canvas-react';
import { getImageUrl } from '@/utils';

type Props = {
  title: string;
  description: string;
  icon?: string | Types.CloudinaryImage;
};

const Feature: FC<ComponentProps<Props>> = ({ icon }) => {
  const imageUrl = getImageUrl(icon);
  return (
    <div className="flex items-start mt-8 space-x-3">
      <div className="flex items-center justify-center flex-shrink-0 mt-1 rounded-md w-11 h-11 ">
        {Boolean(imageUrl) && (
          <Image width={100} height={100} alt="icon" className="w-10 h-10 text-indigo-50" src={imageUrl} />
        )}
      </div>
      <div>
        <UniformText parameterId="title" as="p" className="text-xl font-bold" />
        <UniformText parameterId="description" as="p" />
      </div>
    </div>
  );
};

registerUniformComponent({
  type: 'feature',
  component: Feature,
});

export default Feature;
