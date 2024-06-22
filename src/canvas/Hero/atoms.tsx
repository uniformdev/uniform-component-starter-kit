import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-react';
import { useTranslations } from 'next-intl';
import Button from '../../components/Button';
import { formatProjectMapLink } from '../../utilities';
import { HeroProps } from './';

export const PrimaryButton: FC<Pick<HeroProps, 'primaryButtonLink' | 'primaryButtonStyle' | 'animationType'>> = ({
  primaryButtonLink,
  primaryButtonStyle,
  animationType,
}) => {
  const t = useTranslations();
  return (
    <Button
      className="m-1"
      animationType={animationType}
      href={formatProjectMapLink(primaryButtonLink)}
      copy={<UniformText placeholder={t('Button copy goes here')} parameterId="primaryButtonCopy" />}
      style={primaryButtonStyle}
    />
  );
};

export const SecondaryButton: FC<Pick<HeroProps, 'secondaryButtonLink' | 'secondaryButtonStyle' | 'animationType'>> = ({
  secondaryButtonLink,
  secondaryButtonStyle,
  animationType,
}) => {
  const t = useTranslations();
  return (
    <Button
      className="m-1"
      href={formatProjectMapLink(secondaryButtonLink)}
      animationType={animationType}
      copy={<UniformText placeholder={t('Button copy goes here')} parameterId="secondaryButtonCopy" />}
      style={secondaryButtonStyle}
    />
  );
};
