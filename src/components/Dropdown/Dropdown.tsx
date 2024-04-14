import { FC, useCallback, useMemo, useState } from 'react';
import Image from '../../components/Image';
import classNames from 'classnames';
import { DropdownOption } from './DropdownOption';
import { DropdownProps } from './';

const Dropdown: FC<DropdownProps> = ({
  title,
  value,
  defaultOption,
  options,
  onChange,
  disable = false,
  buttonClassName,
  optionsContainerClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onMouseLeave = useCallback((): void => setIsOpen(false), []);

  const toggleDropdown = useCallback((): void => setIsOpen(isOpen => !isOpen), []);

  const selectedLabel = useMemo(() => {
    const selectedOption = options.find(({ value: optionValue }) => optionValue === value);
    return selectedOption?.label;
  }, [options, value]);

  const optionToShow = useMemo(
    () => options.filter(({ value: optionValue }) => optionValue !== value),
    [options, value]
  );

  const onSelect = useCallback(
    (selectedValue?: string) => {
      onChange(selectedValue);
      setIsOpen(false);
    },
    [onChange]
  );

  return (
    <div onMouseLeave={onMouseLeave} className="relative inline-block w-full h-12">
      <button
        type="button"
        className={classNames(
          'inline-flex items-center justify-between w-full h-full px-4 uppercase font-extrabold border-2 border-black focus:outline-none focus:border-slate-300',
          { 'text-xs': !!value },
          { 'opacity-50': disable },
          buttonClassName
        )}
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={toggleDropdown}
        disabled={disable}
      >
        {selectedLabel || title}
        <Image
          className={classNames('w-auto ml-1', { 'rotate-180': isOpen })}
          width={18}
          height={11}
          src="https://res.cloudinary.com/uniform-demos/image/upload/v1692358232/csk-icons/icon-dropdown_fpirma_dns0cw.svg"
          alt="icon minus"
          unoptimized
        />
      </button>
      {isOpen && Boolean(optionToShow.length) && (
        <div
          className={classNames(
            'z-50 origin-top-right absolute right-0 w-full  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-base-300',
            optionsContainerClassName
          )}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="flex flex-col gap-1 items-start py-1" role="none">
            {defaultOption && value !== defaultOption.value && (
              <DropdownOption isDefault option={defaultOption} onSelect={onSelect} />
            )}
            {optionToShow.map(option => (
              <DropdownOption key={`option-${option.value}`} option={option} onSelect={onSelect} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
