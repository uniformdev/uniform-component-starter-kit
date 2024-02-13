import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import type { Asset } from '@uniformdev/assets';
import { MultiColumnReview } from './MultiColumnReview';
import { DefaultReview } from './Review';

export enum ReviewVariant {
  MultiColumn = 'multiColumn',
}

type Style = {
  container?: string;
  date?: string;
  description?: string;
  picture?: string;
};

export type ReviewProps = ComponentProps<{
  personName: string;
  picture?: string | Asset;
  date: string;
  stars: number;
  title: string;
  description: string;
  textColorVariant: Types.AvailableTextColorVariant;
  starsColor: Types.AvailableColor;
  showReviewLabel: boolean;
  lineCountRestriction: Types.AvailableMaxLineCount;
  styles?: Style;
}>;

const Review: FC<ReviewProps> = ({ component, ...reviewData }) =>
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
