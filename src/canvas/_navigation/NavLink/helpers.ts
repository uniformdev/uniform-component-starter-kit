import { NextRouter } from 'next/router';

export const checkIsCurrentRoute = (router: NextRouter, link: Types.ProjectMapLink) => {
  if (!link) return false;
  const { asPath } = router;
  const localeFromLink = link?.dynamicInputValues?.locale;
  const [pathWithoutQuery] = asPath.split('?');
  const linkPath = link.path === '/' ? link.path : link.path.replace(/\/$/, '');
  return pathWithoutQuery === (localeFromLink ? linkPath.replace(`/${localeFromLink}`, '') : linkPath);
};
