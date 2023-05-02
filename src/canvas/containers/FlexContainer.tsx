import { FC } from 'react';
import classNames from 'classnames';
import { UniformSlot, ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

type JustifyContent =
  | 'normal'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch';

type AlignItems = 'normal' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

export type Props = ComponentProps<{
  direction: FlexDirection;
  flexWrap: FlexWrap;
  justifyContent: JustifyContent;
  alignItems: AlignItems;
}>;

const getFlexDirectionClass = (direction: Props['direction']) => {
  switch (direction) {
    case 'row':
      return 'flex-row';
    case 'row-reverse':
      return 'flex-row-reverse';
    case 'column':
      return 'flex-col';
    case 'column-reverse':
      return 'flex-col-reverse';
    default:
      return 'flex-row';
  }
};

const getFlexWrapClass = (flexWrap: Props['flexWrap']) => {
  switch (flexWrap) {
    case 'nowrap':
      return 'flex-nowrap';
    case 'wrap':
      return 'flex-wrap';
    case 'wrap-reverse':
      return 'flex-wrap-reverse';
    default:
      return 'flex-nowrap';
  }
};

const getJustifyContentClass = (justifyContent: Props['justifyContent']) => {
  switch (justifyContent) {
    case 'normal':
      return 'justify-normal';
    case 'flex-start':
      return 'justify-start';
    case 'flex-end':
      return 'justify-end';
    case 'center':
      return 'justify-center';
    case 'space-between':
      return 'justify-between';
    case 'space-around':
      return 'justify-around';
    case 'space-evenly':
      return 'justify-evenly';
    case 'stretch':
      return 'justify-stretch';
    default:
      return 'justify-normal';
  }
};

const getAlignItemsClass = (alignItems: Props['alignItems']) => {
  switch (alignItems) {
    case 'normal':
      return 'items-normal';
    case 'flex-start':
      return 'items-start';
    case 'flex-end':
      return 'items-end';
    case 'center':
      return 'items-center';
    case 'baseline':
      return 'items-baseline';
    case 'stretch':
      return 'items-stretch';
    default:
      return 'items-normal';
  }
};

const FlexContainer: FC<Props> = ({ direction, flexWrap, justifyContent, alignItems }) => (
  <div
    className={classNames(
      'w-full flex',
      getFlexDirectionClass(direction),
      getFlexWrapClass(flexWrap),
      getJustifyContentClass(justifyContent),
      getAlignItemsClass(alignItems)
    )}
  >
    <UniformSlot name="container-inner" />
  </div>
);

registerUniformComponent({
  type: 'flexContainer',
  component: FlexContainer,
});

export default FlexContainer;
