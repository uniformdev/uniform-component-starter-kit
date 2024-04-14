import { CountdownVariant } from '.';

export const getLabelWrapperStyle = (variant?: string) => {
  switch (variant) {
    case CountdownVariant.LabelsUnder:
      return 'flex-col';
    case CountdownVariant.LabelsInBoxes:
      return 'flex-col bg-info-content rounded-md p-4';
    default:
      return 'flex-row items-baseline';
  }
};

export const getLabelStyle = (size?: Types.CountdownSize) => {
  switch (size) {
    case 'tiny':
      return 'text-lg';
    case 'small':
      return 'text-3xl';
    case 'large':
      return 'text-9xl';
    default:
      return 'text-5xl';
  }
};

export const getBoxStyle = (size: Types.CountdownSize | undefined, variant?: string) => {
  if (variant === CountdownVariant.LabelsInBoxes) {
    switch (size) {
      case 'tiny':
        return 'min-h-[74px]';
      case 'small':
        return 'min-h-[86px]';
      case 'large':
        return 'min-h-[184px]';
      default:
        return 'min-h-[104px]';
    }
  } else if (variant === CountdownVariant.LabelsUnder) {
    switch (size) {
      case 'tiny':
        return 'min-h-[42px]';
      case 'small':
        return 'min-h-[54px]';
      case 'large':
        return 'min-h-[152px]';
      default:
        return 'min-h-[72px]';
    }
  } else {
    switch (size) {
      case 'tiny':
        return 'min-h-[24px]';
      case 'small':
        return 'min-h-[31px]';
      case 'large':
        return 'min-h-[128px]';
      default:
        return 'min-h-[48px]';
    }
  }
};
