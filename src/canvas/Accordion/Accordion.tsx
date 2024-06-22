import { FC } from 'react';
import classNames from 'classnames';
import { UniformSlot, UniformText } from '@uniformdev/canvas-react';
import { useTranslations } from 'next-intl';
import { AccordionProps } from '.';

export const Accordion: FC<AccordionProps> = ({ styles }) => {
  const t = useTranslations();
  return (
    <div className={classNames('text-secondary-content', styles?.container)}>
      <UniformText
        placeholder={t('Title goes here')}
        parameterId="title"
        as="p"
        className={classNames('text-3xl font-extrabold pb-4', styles?.title)}
      />
      <UniformText
        placeholder={t('Description goes here')}
        parameterId="description"
        as="p"
        className={classNames('text-xl pb-6', styles?.description)}
      />
      <UniformSlot name="items" />
    </div>
  );
};
