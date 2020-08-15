import React from 'react';

import { ServerStyleSheets } from '@material-ui/core/styles';
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
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};

export default MyDocument;
