import { FC } from 'react';
import classNames from 'classnames';
import { EmptyImagePlaceholderProps } from '.';
import BaseImage from '../Image/Image';

const EmptyImagePlaceholder: FC<EmptyImagePlaceholderProps> = ({
  text = 'Please add an asset to display an image',
  className,
}) => (
  <div className="flex flex-col gap-2">
    <div className={classNames('mx-auto', className)}>
      <BaseImage
        src="https://res.cloudinary.com/uniform-demos/image/upload/v1/csk-icons/empty_image.png"
        width="369"
        height="369"
        alt="empty_image"
      />
    </div>
    <div className="mx-auto">
      <span className="font-bold text-2xl italic">{text}</span>
    </div>
  </div>
);

export default EmptyImagePlaceholder;
