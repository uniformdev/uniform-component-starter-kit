import { FC } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { UniformText } from '@uniformdev/canvas-react';
import Rating from '../../components/Rating';
import { getLineClampClass } from '../../utilities/styling';
import { ReviewProps } from './.';

export const MultiColumnReview: FC<Omit<ReviewProps, 'component'>> = ({
  picture,
  stars,
  textColorVariant,
  starsColor,
  showReviewLabel,
  lineCountRestriction,
  styles,
}) => {
  const baseTextStyle = textColorVariant === 'Light' ? 'text-primary-content' : 'text-secondary-content';

  return (
    <div className="grid grid-cols-12 border-t-[1px] last:border-b-[1px] py-6">
      <div className="col-span-4">
        {Boolean(picture) && (
          <Image className="rounded-full" src={picture} width={48} height={48} alt="reviewer-icon" />
        )}
        <UniformText
          className={classNames('font-medium mt-2', baseTextStyle)}
          as="p"
          parameterId="personName"
          placeholder="Reviewer name goes here"
        />
        <UniformText
          className={classNames('text-sm mt-1', styles?.date)}
          as="p"
          parameterId="date"
          placeholder="Date goes here"
        />
      </div>
      <div className="col-span-4">
        <Rating rating={stars} showReviewLabel={showReviewLabel} starsColor={starsColor} />
      </div>
      <div className="col-span-4">
        <UniformText
          className={classNames('font-medium', baseTextStyle)}
          as="p"
          parameterId="title"
          placeholder="Review title goes here"
        />
        <UniformText
          className={classNames('mt-4', baseTextStyle, getLineClampClass(lineCountRestriction), styles?.description)}
          as="p"
          parameterId="description"
          placeholder="Review description goes here"
        />
      </div>
    </div>
  );
};
