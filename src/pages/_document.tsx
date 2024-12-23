import { ReactElement } from 'react';
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import { enableNextSsr } from '@uniformdev/context-next';
import { ManifestV2 } from '@uniformdev/context';

import createUniformContext from '@/context/createUniformContext';
import { getManifestClient } from '../utilities/canvas/canvasClients';

type CustomDocumentProps = DocumentInitialProps & { manifest: ManifestV2 };

async function getManifest() {
  return getManifestClient().get();
}

class AppDocument extends Document<CustomDocumentProps> {
  // Docs: https://docs.uniform.app/docs/guides/personalization/activate-personalization#server-side
  static async getInitialProps(ctx: DocumentContext): Promise<CustomDocumentProps> {
    const manifest = await getManifest();
    const serverTracker = createUniformContext(manifest, ctx);
    enableNextSsr(ctx, serverTracker);
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, manifest };
  }

  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <script
            id="manifest"
            type="application/json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(this.props.manifest) }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
