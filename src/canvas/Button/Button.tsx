import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-react';
import BaseButton from '../../components/Button';
import { formatProjectMapLink } from '../../utilities';
import { ButtonProps } from '.';

export const Button: FC<ButtonProps> = ({ link, style, animationType }) => (
  <BaseButton
    href={formatProjectMapLink(link)}
    animationType={animationType}
    copy={<UniformText placeholder="Button copy goes here" parameterId="copy" />}
    style={style}
  />
);
