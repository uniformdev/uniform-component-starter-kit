import Head from 'next/head';
import { UniformAppProps } from '@uniformdev/context-next';
import { UniformContext } from '@uniformdev/context-react';
import type { RootComponentInstance } from '@uniformdev/canvas';

import createUniformContext from '@/context/createUniformContext';
import ComponentStarterKitContextProvider from '@/context/ComponentStarterKitContext';
import '@/canvas';

import '@/styles/globals.css';

const clientContext = createUniformContext();

const App = ({
  Component,
  pageProps,
  serverUniformContext,
}: UniformAppProps<{ data: RootComponentInstance; context: any }>) => {
  const { data: composition } = pageProps || {};
  const {
    pageTitle,
    pageMetaDescription,
    pageKeywords,
    favicon,
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

  let ogImageElement: any = openGraphImage?.value ? (
    <meta property="og:image" content={openGraphImage?.value as string} />
  ) : undefined;
  if (overlayTitleToOgImage?.value && openGraphImage?.value) {
    ogImageElement = (
      <meta
        property="og:image"
        content={`https://${process.env.VERCEL_URL ?? ''}/api/og?title=${
          ogTitle ?? title?.replaceAll?.(' ', '%20')
        }&image=${openGraphImage.value}`}
      />
    );
  }

  let twitterImageElement = twitterImage?.value ? (
    <meta property="twitter:image" content={twitterImage?.value as string} />
  ) : null;

  if (overlayTitleToTwitterImage?.value && twitterImage?.value) {
    twitterImageElement = (
      <meta
        property="twitter:image"
        content={`https://${process.env.VERCEL_URL ?? ''}/api/og?title=${
          twTitle ?? title?.replaceAll?.(' ', '%20')
        }&image=${twitterImage.value}`}
      />
    );
  }

  return (
    <>
      <Head>
        {/* page metadata */}
        <title>{(pageTitle?.value as string) ?? 'Uniform Component Starter Kit'}</title>
        <meta property="og:description" content={pageMetaDescription?.value as string} />
        <meta name="keywords" content={pageKeywords?.value as string} />

        {/* Open Graph */}
        <meta property="og:title" content={(openGraphTitle?.value as string) ?? pageTitle?.value} />
        <meta
          property="og:description"
          content={(openGraphDescription?.value as string) ?? pageMetaDescription?.value}
        />
        {ogImageElement}

        {/* Twitter */}
        <meta name="twitter:title" content={(twitterTitle?.value as string) ?? pageTitle?.value} />
        <meta name="twitter:card" content={(twitterCard?.value as string) ?? 'summary'} />
        <meta
          name="twitter:description"
          content={(twitterDescription?.value as string) ?? pageMetaDescription?.value}
        />
        {twitterImageElement}

        {/* Other stuff */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="version" content={process.env.NEXT_PUBLIC_APP_VERSION} />
        {favicon?.value && <link rel="shortcut icon" href={favicon?.value as string} />}
      </Head>
      <UniformContext context={serverUniformContext ?? clientContext}>
        <ComponentStarterKitContextProvider {...(pageProps?.context || {})}>
          <Component {...pageProps} />
        </ComponentStarterKitContextProvider>
      </UniformContext>
    </>
  );
};

export default App;
