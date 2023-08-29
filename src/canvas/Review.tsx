import { FC } from 'react';
import { ComponentProps, registerUniformComponent, UniformText } from '@uniformdev/canvas-react';
import Image from 'next/image';
import classNames from 'classnames';
import Rating from '../components/Rating';
import { getLineClampClass } from '../utilities/styling';

export enum ReviewVariant {
  MultiColumn = 'multiColumn',
}

type Props = ComponentProps<{
  personName: string;
  picture: string;
  date: string;
  stars: number;
  title: string;
  description: string;
  showReviewLabel: boolean;
  lineCountRestriction: Types.AvailableMaxLineCount;
  starsColor: Types.AvailableColor;
}>;

const DefaultReview: FC<Omit<Props, 'component'>> = ({
  picture,
  stars,
  showReviewLabel,
  lineCountRestriction,
  starsColor,
}) => (
  <div className="flex [&>#reviewContent]:last:border-0">
    <div className="h-12 w-12 shrink-0">
      {Boolean(picture) && <Image className="rounded-full" src={picture} width={48} height={48} alt="reviewer-icon" />}
    </div>
    <div id="reviewContent" className="ml-6 border-b-[1px]">
      <div>
        <UniformText
          className="text-secondary-content font-medium"
          as="p"
          parameterId="personName"
          placeholder="Reviewer name goes here"
        />
        <UniformText className="text-sm" as="p" parameterId="date" placeholder="Date goes here" />
      </div>
      <div className="py-4">
        <Rating rating={stars} showReviewLabel={showReviewLabel} starsColor={starsColor} />
      </div>
      <div className="pb-6">
        <UniformText
          className="text-secondary-content font-medium"
          as="p"
          parameterId="reviewTitle"
          placeholder="Review title goes here"
        />
        <UniformText
          className={classNames('text-secondary-content mt-4', getLineClampClass(lineCountRestriction))}
          as="p"
          parameterId="description"
          placeholder="Review description goes here"
        />
      </div>
    </div>
  </div>
);

const MultiColumnReview: FC<Omit<Props, 'component'>> = ({
  picture,
  stars,
  showReviewLabel,
  lineCountRestriction,
  starsColor,
}) => (
  <div className="grid grid-cols-12 border-t-[1px] last:border-b-[1px] py-6">
    <div className="col-span-4">
      {Boolean(picture) && <Image className="rounded-full" src={picture} width={48} height={48} alt="reviewer-icon" />}
      <UniformText
        className="text-secondary-content font-medium mt-2"
        as="p"
        parameterId="personName"
        placeholder="Reviewer name goes here"
      />
      <UniformText className="text-sm mt-1" as="p" parameterId="date" placeholder="Date goes here" />
    </div>
    <div className="col-span-4">
      <Rating rating={stars} showReviewLabel={showReviewLabel} starsColor={starsColor} />
    </div>
    <div className="col-span-4">
      <UniformText
        className="text-secondary-content font-medium"
        as="p"
        parameterId="reviewTitle"
        placeholder="Review title goes here"
      />
      <UniformText
        className={classNames('text-secondary-content mt-4', getLineClampClass(lineCountRestriction))}
        as="p"
        parameterId="description"
        placeholder="Review description goes here"
      />
    </div>
  </div>
);

const Review: FC<Props> = ({ component, ...reviewData }) =>
  component?.variant === ReviewVariant.MultiColumn ? (
    <MultiColumnReview {...reviewData} />
  ) : (
    <DefaultReview {...reviewData} />
  );

[undefined, ReviewVariant.MultiColumn].forEach(variantId =>
  registerUniformComponent({
    type: 'review',
    component: Review,
    variantId,
  })
);

export default Review;
