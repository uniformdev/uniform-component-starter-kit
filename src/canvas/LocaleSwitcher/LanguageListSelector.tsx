import { FC, MouseEvent, useCallback } from 'react';
import classNames from 'classnames';
import { useComponentStarterKitContext } from '../../context/ComponentStarterKitContext';

type LanguageListSelectorProps = {
  currentLocale: string;
  locales: string[];
  onSelectLocale: (selectedLocale?: string | null) => Promise<void>;
  style?: string;
};

export const LanguageListSelector: FC<LanguageListSelectorProps> = ({
  currentLocale,
  locales,
  onSelectLocale,
  style,
}) => {
  const { localizationSettings } = useComponentStarterKitContext();

  const { localeNames } = localizationSettings || {};
  const localeName = localeNames?.[currentLocale] ?? '';

  const handleLocaleButtonClick = useCallback(
    (e?: MouseEvent<HTMLButtonElement>) => {
      const selectedLocale = e?.currentTarget?.getAttribute('data-locale');
      return onSelectLocale(selectedLocale);
    },
    [onSelectLocale]
  );

  return (
    <>
      <p className="font-normal text-secondary uppercase text-center mb-2 mt-2 px-4">{localeName}</p>
      <div className="h-[1px] my-2 bg-secondary" />
      {locales
        ?.filter(l => l !== currentLocale)
        .map(l => (
          <button
            key={l}
            data-locale={l}
            tabIndex={0}
            className={classNames('p-4', style)}
            onClick={handleLocaleButtonClick}
          >
            {localeNames?.[l]}
          </button>
        ))}
    </>
  );
};
