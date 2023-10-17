export type Option = {
  label: string;
  value: string | undefined;
};

export type DropdownProps = {
  title: string;
  defaultOption?: Option;
  options: Option[];
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  disable?: boolean;
  buttonClassName?: string;
  optionsContainerClassName?: string;
};

export { default } from './Dropdown';
