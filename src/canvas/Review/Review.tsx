import { FC } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { UniformText } from '@uniformdev/canvas-react';
import Rating from '../../components/Rating';
import { getLineClampClass } from '../../utilities/styling';
import { ReviewProps } from './';

export const DefaultReview: FC<Omit<ReviewProps, 'component'>> = ({
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
    <div className="flex [&>#reviewContent]:last:border-0">
      <div className={classNames('h-12 w-12 shrink-0', styles?.picture)}>
        {Boolean(picture) && (
          <Image className="rounded-full" src={picture} width={48} height={48} alt="reviewer-icon" />
        )}
      </div>
      <div id="reviewContent" className={classNames('ml-6 border-b-[1px]', { '!ml-0': !picture }, styles?.container)}>
        <div>
          <UniformText
            className={classNames('font-medium', baseTextStyle)}
            as="p"
            parameterId="personName"
            placeholder="Reviewer name goes here"
          />
          <UniformText
            className={classNames('text-sm', styles?.date)}
            as="p"
            parameterId="date"
            placeholder="Date goes here"
          />
        </div>
        <div className="py-4">
          <Rating rating={stars} showReviewLabel={showReviewLabel} starsColor={starsColor} />
        </div>
        <div className="pb-6">
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
    </div>
  );
};
