import React from 'react';

import { ServerStyleSheets } from '@material-ui/core/styles';
import { NextComponentType } from 'next';
import { NextRouter } from 'next/dist/next-server/lib/router/router';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import Document, {
  DocumentContext,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en" translate="no">
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext): Promise<any> => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: NextComponentType<AppContextType<NextRouter>>) => (
        props: any,
      ) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};

export default MyDocument;
