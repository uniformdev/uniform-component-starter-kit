import { FC } from 'react';
import Image from '../../components/Image';
import classNames from 'classnames';
import { UniformText } from '@uniformdev/canvas-react';
import { getLineClampClass } from '../../utilities/styling';
import { getMediaUrl } from '../../utilities';
import { TestimonialProps, TestimonialVariant } from '.';

export const Testimonial: FC<TestimonialProps> = ({ picture, logo, lineCountRestriction, component }) => {
  const isCardWrapperVariant = component?.variant === TestimonialVariant.CardWrapped;
  return (
    <div className={classNames('flex flex-col', { 'card shadow-xl p-4': isCardWrapperVariant })}>
      {Boolean(logo) && <Image src={getMediaUrl(logo)} width={180} height={90} alt="testimonial-logo" />}
      <div>
        <UniformText
          className={classNames('text-secondary-content mt-4', getLineClampClass(lineCountRestriction))}
          as="p"
          parameterId="description"
          placeholder="Description goes here"
          render={content => (content ? `"${content}"` : content)}
        />
      </div>

      <div className="shrink-0 flex mt-8">
        {Boolean(picture) && (
          <Image className="rounded-full" src={getMediaUrl(picture)} width={48} height={48} alt="reviewer-icon" />
        )}
        <div className="flex flex-col ml-4 ">
          <UniformText
            className="text-secondary-content font-bold"
            as="p"
            parameterId="personName"
            placeholder="Person Name goes here"
          />
          <UniformText as="p" parameterId="personPosition" placeholder="Person Position goes here" />
        </div>
      </div>
    </div>
  );
};
