import type { AppProps } from 'next/app';
import Head from 'next/head';
import { UniformContext } from '@uniformdev/context-react';
import createUniformContext from '@/context/createUniformContext';
import '@/canvas';
import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const { composition } = pageProps || {};
  const { favicon } = composition?.parameters || {};

  return (
    <>
      <Head>
        <title>Uniform Component Starter Kit</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" property="og:description" content="Uniform Component Starter Kit" />
        <meta name="version" content={process.env.NEXT_PUBLIC_APP_VERSION} />
        {favicon?.value && <link rel="shortcut icon" href={favicon?.value as string} />}
      </Head>
      <UniformContext context={createUniformContext()}>
        <Component {...pageProps} />
      </UniformContext>
    </>
  );
};

export default App;
