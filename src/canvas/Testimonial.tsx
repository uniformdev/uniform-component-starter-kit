import { FC } from 'react';
import { ComponentProps, registerUniformComponent, UniformText } from '@uniformdev/canvas-react';
import Image from 'next/image';
import classNames from 'classnames';
import { getLineClampClass } from '../utilities/styling';

export enum TestimonialVariant {
  CardWrapped = 'cardWrapped',
}

type Props = ComponentProps<{
  personName: string;
  picture: string;
  logo: string;
  description: string;
  lineCountRestriction: Types.AvailableMaxLineCount;
}>;

const Testimonial: FC<Props> = ({ picture, logo, lineCountRestriction, component }) => {
  const isCardWrapperVariant = component?.variant === TestimonialVariant.CardWrapped;
  return (
    <div className={classNames('flex flex-col', { 'card shadow-xl p-4': isCardWrapperVariant })}>
      <Image src={logo} width={180} height={90} alt="testimonial-logo" />
      <div>
        <UniformText
          className={classNames('text-secondary-content mt-4', getLineClampClass(lineCountRestriction))}
          as="p"
          parameterId="description"
          placeholder="Testimonial description goes here"
          render={content => (content ? `"${content}"` : content)}
        />
      </div>

      <div className="shrink-0 flex mt-8">
        {Boolean(picture) && (
          <Image className="rounded-full" src={picture} width={48} height={48} alt="reviewer-icon" />
        )}
        <div className="flex flex-col ml-4 ">
          <UniformText
            className="text-secondary-content font-bold"
            as="p"
            parameterId="personName"
            placeholder="Person Name  goes here"
          />
          <UniformText as="p" parameterId="personPosition" placeholder="Person Position  goes here" />
        </div>
      </div>
    </div>
  );
};

[undefined, TestimonialVariant.CardWrapped].forEach(variantId =>
  registerUniformComponent({
    type: 'testimonial',
    component: Testimonial,
    variantId,
  })
);

export default Testimonial;
