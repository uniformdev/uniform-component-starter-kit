import { FC } from 'react';
import classNames from 'classnames';
import { UniformRichText } from '@uniformdev/canvas-react';
import Container from '../../components/Container';
import { PaddingSize } from '../../utilities/styling';
import { RichTextProps, RichTextVariants } from '.';

export const RichText: FC<RichTextProps> = ({ component, styles }) => (
  <Container paddingTop={PaddingSize.None} paddingBottom={PaddingSize.None}>
    <div
      className={classNames(
        'prose max-w-full',
        {
          'text-primary-content': component?.variant === RichTextVariants.Light,
          'text-secondary-content': component?.variant !== RichTextVariants.Light,
        },
        styles?.content
      )}
    >
      <UniformRichText
        className={classNames({
          '[&_*]:text-primary-content !marker:text-primary-content': component?.variant === RichTextVariants.Light,
          '[&_*]:text-secondary-content marker:text-secondary-content': component?.variant !== RichTextVariants.Light,
        })}
        parameterId="content"
      />
    </div>
  </Container>
);
