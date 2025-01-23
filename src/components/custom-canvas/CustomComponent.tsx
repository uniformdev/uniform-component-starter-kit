import { FC } from 'react';
import { ComponentProps, UniformSlot, UniformText } from '@uniformdev/canvas-next-rsc/component';

// Here, you can add parameters to be used on the canvas side.
export type CustomComponentParameters = {
  displayName?: string;
};
// Here, you can add slots names to be used on the canvas side.
enum CustomComponentSlots {
  CustomComponentContent = 'customComponentContent',
}

type CustomComponentProps = ComponentProps<CustomComponentParameters, CustomComponentSlots>;

const CustomComponent: FC<CustomComponentProps> = ({ component, context, slots }) => (
  // Your implementation of the component logic
  <div>
    <UniformText
      placeholder="Text goes here"
      parameterId="displayName"
      as="h1"
      component={component}
      context={context}
    />
    <UniformSlot data={component} context={context} slot={slots.customComponentContent} />
  </div>
);

export default CustomComponent;
