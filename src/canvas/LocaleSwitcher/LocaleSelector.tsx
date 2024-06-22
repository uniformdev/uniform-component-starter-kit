import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useComponentStarterKitContext } from '../../context/ComponentStarterKitContext';
import Dropdown from '../../components/Dropdown';
import { getLocaleEmoji, getRegionFromLocale } from './helpers';

// ToDo: the best place should be discussed
const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States',
  NL: 'Netherlands',
  CA: 'Canada',
  GB: 'United Kingdom',
};

type LocaleSelectorProps = {
  currentLocale: string;
  locales: string[];
  onSelectLocale: (selectedLocale?: string | null) => Promise<void>;
};

type RegionsWithLocales = { region: string; localeEmoji: string; locales: string[] };

export const LocaleSelector: FC<LocaleSelectorProps> = ({ currentLocale, locales, onSelectLocale }) => {
  const t = useTranslations();
  const [currentRegion, setCurrentRegion] = useState<string | undefined>(getRegionFromLocale(currentLocale));

  const { localizationSettings } = useComponentStarterKitContext();
  const { localeNames } = localizationSettings || {};

  const regions = locales.reduce<RegionsWithLocales[]>((acc, locale) => {
    const region = getRegionFromLocale(locale);
    const existingItem = acc.find(item => item?.region === region);

    if (existingItem) {
      existingItem.locales.push(locale);
    } else {
      const localeEmoji = getLocaleEmoji(localeNames?.[locale] || '');
      acc.push({ region, localeEmoji, locales: [locale] });
    }
    return acc;
  }, []);

  const regionsOptions = regions.map(item => ({
    label: `${item.localeEmoji} ${t(COUNTRY_NAMES?.[item.region] || item.region)}`,
    value: item.region,
  }));

  const regionsLanguage =
    regions
      .find(item => item.region === currentRegion)
      ?.locales.map(item => ({ label: localeNames?.[item]?.split(' ')[0] || item, value: item })) || [];

  return (
    <div className="m-4 mb-6">
      <p className="font-normal text-secondary mt-2 mb-2">{t('Country')}</p>
      <Dropdown
        title={t('Country')}
        buttonClassName="border border-secondary"
        optionsContainerClassName="!bg-info-content text-primary gap-y-8"
        options={regionsOptions}
        value={currentRegion}
        onChange={setCurrentRegion}
      />
      <p className="font-normal text-secondary mt-8 mb-2">{t('Language')}</p>
      <Dropdown
        title={t('Select language')}
        buttonClassName="border border-secondary"
        optionsContainerClassName="!bg-info-content text-primary"
        options={regionsLanguage}
        value={currentLocale}
        onChange={onSelectLocale}
      />
    </div>
  );
};
