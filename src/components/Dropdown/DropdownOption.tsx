import { FC, useCallback } from 'react';
import classNames from 'classnames';
import { Option } from './';

export type DropdownOptionProps = {
  option: Option;
  isDefault?: boolean;
  onSelect: (value: string | undefined) => void;
};

export const DropdownOption: FC<DropdownOptionProps> = ({ option, isDefault, onSelect }) => {
  const handleSelect = useCallback((): void => onSelect(option.value), [onSelect, option]);

  return (
    <button
      className={classNames('block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4 hover:opacity-50', {
        'opacity-50 hover:opacity-100': isDefault,
      })}
      onClick={handleSelect}
      tabIndex={-1}
    >
      {option.label}
    </button>
  );
};
