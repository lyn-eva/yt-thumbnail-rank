import type { AppProps } from 'next/app';
import App, { AppContext } from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import CoreHeader from '../components/CoreHeader';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import ProgressBar from '@badrap/bar-of-progress';
import AuthProvider from '../store/auth';
import RightDrawer from '../components/RightDrawer';

const breakpoints = {
  sm: '420px',
  md: '900px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

const progress = new ProgressBar({
  size: 4,
  color: '#805AD5',
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({ breakpoints });
  return (
    <AuthProvider>
      <Head>
        <title>yt-thumbnail-rank</title>
      </Head>
      <ChakraProvider theme={theme}>
        <CoreHeader />
        <RightDrawer />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};
