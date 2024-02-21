import {
  select as baseSelect,
  text as baseText,
  confirm as baseConfirm,
  intro,
  note,
  outro,
  spinner,
  cancel,
  isCancel,
  TextOptions,
  SelectOptions,
  ConfirmOptions,
} from '@clack/prompts';

interface Option<Value extends Readonly<string>> {
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

export const select = async (props: SelectOptions<Option<string>[], string>) => {
  const selectedValue = await baseSelect({ maxItems: 15, ...props });

  checkIsCancel(selectedValue);

  return selectedValue;
};

export const text = async (props: TextOptions) => {
  const textValue = await baseText(props);

  checkIsCancel(textValue);

  return textValue;
};

export const confirm = async (props: ConfirmOptions) => {
  const textValue = await baseConfirm(props);

  checkIsCancel(textValue);

  return textValue;
};

export { intro, outro, spinner, cancel, note };
