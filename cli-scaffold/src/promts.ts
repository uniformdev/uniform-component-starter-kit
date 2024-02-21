import {
  select as baseSelect,
  text as baseText,
  intro,
  note,
  outro,
  spinner,
  cancel,
  isCancel,
  TextOptions,
  SelectOptions,
} from '@clack/prompts';

interface Option<Value extends Readonly<string | number>> {
  value: Value;
  label?: string;
  hint?: string;
}

export const checkIsCancel = (value: unknown) => {
  if (isCancel(value)) {
    cancel('Operation cancelled.');
    return process.exit(0);
  }
};

export const select = async (props: SelectOptions<Option<number>[], number>) => {
  const selectedValue = await baseSelect({ maxItems: 15, ...props });
  checkIsCancel(selectedValue);

  return selectedValue;
};

const validateRequiredField = (value: string) => {
  if (!value || value?.trim().length === 0) return 'This field is required';
};

export const text = async (props: TextOptions & { required: boolean }) => {
  const { required = false, validate, ...baseProps } = props;
  const textValue = await baseText({ ...baseProps, validate: required ? validateRequiredField : validate });

  checkIsCancel(textValue);

  return textValue;
};

export { intro, outro, spinner, cancel, note };
