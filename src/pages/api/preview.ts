import { createPreviewHandler } from '@uniformdev/canvas-next';

// Preview Mode, more info https://nextjs.org/docs/advanced-features/preview-mode
export default createPreviewHandler({
  secret: () => process.env.UNIFORM_PREVIEW_SECRET || 'uniform',
  resolveFullPath: ({ path, slug }) => {
    const pathToRedirectTo = path || slug || '';
    return pathToRedirectTo.startsWith('/') ? pathToRedirectTo : `/${pathToRedirectTo}`;
  },
});
