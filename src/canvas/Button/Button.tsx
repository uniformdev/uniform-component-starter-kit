import { FC } from 'react';
import { useUniformCurrentComposition, UniformText } from '@uniformdev/canvas-react';
import BaseButton from '../../components/Button';
import { formatProjectMapLink } from '../../utilities';
import { ButtonProps } from '.';

export const Button: FC<ButtonProps> = ({ link, style, animationType }) => {
  const { isContextualEditing } = useUniformCurrentComposition();
  return (
    <BaseButton
      href={formatProjectMapLink(link)}
      animationType={animationType}
      copy={
        <UniformText
          placeholder="buttonCopy goes here"
          parameterId="copy"
          onClick={isContextualEditing ? e => e.preventDefault() : undefined}
        />
      }
      style={style}
    />
  );
};
