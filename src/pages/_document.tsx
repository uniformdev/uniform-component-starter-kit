import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import { enableNextSsr } from '@uniformdev/context-next';
import createUniformContext from '@/context/createUniformContext';

type CustomDocumentProps = DocumentInitialProps;

class AppDocument extends Document<CustomDocumentProps> {
  // required to enable SSR personalization
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const serverTracker = createUniformContext(ctx);
    enableNextSsr(ctx, serverTracker);
    return await Document.getInitialProps(ctx);
  }

  render(): React.ReactElement {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
