import React from 'react';

import dayjsUtils from '@date-io/dayjs';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import dayjs from 'dayjs';
import App, { AppContext } from 'next/app';
import { AppType } from 'next/dist/next-server/lib/utils';
import Head from 'next/head';

import { appWithTranslation } from 'lib/i18n';
import theme from 'lib/material-ui/theme';
import SnackbarProvider from 'lib/notistack';
import ReactourProvider from 'lib/reactour/provider';

const MyApp: AppType = props => {
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
          <ReactourProvider>
            <MuiPickersUtilsProvider utils={dayjsUtils}>
              <Component {...pageProps} />
            </MuiPickersUtilsProvider>
          </ReactourProvider>
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
