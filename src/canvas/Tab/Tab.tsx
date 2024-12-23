import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import EmptyPlaceholder from '../../components/EmptyPlaceholder';

export const Tab: FC = () => <UniformSlot name="content" emptyPlaceholder={<EmptyPlaceholder />} />;
