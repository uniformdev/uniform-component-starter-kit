import Head from 'next/head';
import { UniformAppProps } from '@uniformdev/context-next';
import { UniformContext } from '@uniformdev/context-react';
import type { RootComponentInstance } from '@uniformdev/canvas';
import type { Asset } from '@uniformdev/assets';
import { LazyMotion, domAnimation } from 'framer-motion';
import createUniformContext from '@/context/createUniformContext';
import '@/canvas';
import '../styles/globals.scss';
import { getMediaUrl } from '../utilities';

const clientContext = createUniformContext();

const VERCEL_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';

const App = ({
  Component,
  pageProps,
  serverUniformContext,
}: UniformAppProps<{ data: RootComponentInstance; context: unknown }>) => {
  const { data: composition } = pageProps || {};
  const {
    pageTitle,
    pageMetaDescription,
    pageKeywords,
    openGraphTitle,
    openGraphDescription,
    openGraphImage,
    overlayTitleToOgImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
    overlayTitleToTwitterImage,
    twitterCard,
  } = composition?.parameters || {};
  //This is workaround because spaces removes from query params and not parsing automatically.
  //Space should be encoded as %20 http://www.faqs.org/rfcs/rfc1738.html
  const ogTitle = (openGraphTitle?.value as string)?.replaceAll?.(' ', '%20');
  const twTitle = (twitterTitle?.value as string)?.replaceAll?.(' ', '%20');
  const title: string = pageTitle?.value as string;

  const compositionHeader = composition?.slots?.pageHeader?.[0];

  const favicon = compositionHeader?.parameters?.favicon?.value as Asset | undefined;
  const faviconHref = getMediaUrl(favicon);

  const openGraphImageSrc = getMediaUrl(openGraphImage?.value as Asset | undefined);
  const twitterImageSrc = getMediaUrl(twitterImage?.value as Asset | undefined);

  const renderOgImageElement = () => {
    if (overlayTitleToOgImage?.value && openGraphImageSrc) {
      return (
        <meta
          property="og:image"
          content={`${VERCEL_URL}/api/og?title=${
            ogTitle ?? title?.replaceAll?.(' ', '%20')
          }&image=${openGraphImageSrc}`}
        />
      );
    }
    if (openGraphImage?.value) return <meta property="og:image" content={openGraphImage?.value as string} />;
  };

  const renderTwitterImageElement = () => {
    if (overlayTitleToTwitterImage?.value && twitterImageSrc) {
      return (
        <meta
          property="twitter:image"
          content={`${VERCEL_URL}/api/og?title=${twTitle ?? title?.replaceAll?.(' ', '%20')}&image=${twitterImageSrc}`}
        />
      );
    }
    if (twitterImageSrc) return <meta property="twitter:image" content={twitterImageSrc} />;
  };

  return (
    <>
      <Head>
        {/* page metadata */}
        <title>{(pageTitle?.value as string) ?? 'Uniform Component Starter Kit'}</title>
        <meta name="description" content={pageMetaDescription?.value as string} />
        <meta name="keywords" content={pageKeywords?.value as string} />
        {/* Open Graph */}
        <meta property="og:title" content={(openGraphTitle?.value as string) ?? pageTitle?.value} />
        <meta
          property="og:description"
          content={(openGraphDescription?.value as string) ?? pageMetaDescription?.value}
        />
        {renderOgImageElement()}
        {/* Twitter */}
        <meta name="twitter:title" content={(twitterTitle?.value as string) ?? pageTitle?.value} />
        <meta name="twitter:card" content={(twitterCard?.value as string) ?? 'summary'} />
        <meta
          name="twitter:description"
          content={(twitterDescription?.value as string) ?? pageMetaDescription?.value}
        />
        {renderTwitterImageElement() as any} {/* eslint-disable-line @typescript-eslint/no-explicit-any */}
        {/* Other stuff */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="version" content={process.env.NEXT_PUBLIC_APP_VERSION} />
        {faviconHref && <link rel="shortcut icon" href={faviconHref} />}
      </Head>
      <LazyMotion features={domAnimation}>
        <UniformContext context={serverUniformContext ?? clientContext}>
          <Component {...pageProps} />
        </UniformContext>
      </LazyMotion>
    </>
  );
};

export default App;
