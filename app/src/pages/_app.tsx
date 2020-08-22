import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';

import withApollo from 'lib/apollo/withApollo';
import { appWithTranslation } from 'lib/i18n';
import theme from 'lib/material-ui/theme';
import SnackbarProvider from 'lib/notistack';

const MyApp = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Loopr</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link rel="manifest" href="/static/manifest.json" />
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <SnackbarProvider
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClose={() => {}}
        >
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default appWithTranslation(MyApp);
