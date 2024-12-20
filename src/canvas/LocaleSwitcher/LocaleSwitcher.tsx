import { FC, SVGProps, useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import { useComponentStarterKitContext } from '../../context/ComponentStarterKitContext';
import { LanguageListSelector } from './LanguageListSelector';
import { getLocaleEmoji } from './helpers';
import { LocaleSelector } from './LocaleSelector';
import { LocaleSwitcherProps, LocaleSwitcherVariant } from '.';

const Icon: FC<SVGProps<SVGSVGElement>> = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    width="30"
    height="30"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
    />
  </svg>
);

export const LocaleSwitcher: FC<LocaleSwitcherProps> = ({ styles, component }) => {
  const { pathname, push, query, locale = 'en-US', locales = [], asPath } = useRouter();
  const { localizationSettings } = useComponentStarterKitContext();

  const ref = useRef<HTMLDetailsElement>(null);

  const { localeNames } = localizationSettings || {};
  const localeName = localeNames?.[locale] ?? '';

  const localeEmoji = getLocaleEmoji(localeName);

  const setUpLocale = useCallback(
    async (selectedLocale?: string | null) => {
      if (selectedLocale) {
        setCookie('NEXT_LOCALE', selectedLocale);
        await push({ pathname, query }, asPath, { locale: selectedLocale });
      }
    },
    [asPath, pathname, push, query]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        ref.current.open = false;
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <details ref={ref} className="dropdown">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <summary tabIndex={0} className={classNames('cursor-pointer relative block', styles?.link)}>
          <Icon width={24} height={24} className={classNames(styles?.link, '!text-secondary')} />
          {localeEmoji && <span className="absolute -bottom-1 -right-1 text-sm">{localeEmoji}</span>}
        </summary>
        <ul
          tabIndex={0}
          className={classNames(
            'menu menu-sm dropdown-content mt-4 z-[1000] p-2 shadow rounded-none bg-primary min-w-[350px] right-0 uppercase'
          )}
        >
          {component?.variant === LocaleSwitcherVariant.WithRegions ? (
            <LocaleSelector locales={locales} currentLocale={locale} onSelectLocale={setUpLocale} />
          ) : (
            <LanguageListSelector
              locales={locales}
              currentLocale={locale}
              onSelectLocale={setUpLocale}
              style={styles?.link}
            />
          )}
        </ul>
      </details>
    </>
  );
};
