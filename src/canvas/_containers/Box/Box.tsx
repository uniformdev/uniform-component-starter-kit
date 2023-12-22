import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { BoxProps } from '.';
import BaseContainer from '../../../components/Container';
import { PaddingSize } from '../../../utilities/styling';

export const Box: FC<BoxProps> = () => (
  <BaseContainer paddingBottom={PaddingSize.None} paddingTop={PaddingSize.None}>
    <UniformSlot name="content" />
  </BaseContainer>
);
