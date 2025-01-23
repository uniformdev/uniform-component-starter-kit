import {
  createPreviewGETRouteHandler,
  createPreviewPOSTRouteHandler,
  createPreviewOPTIONSRouteHandler,
} from '@uniformdev/canvas-next-rsc/handler';

export const GET = createPreviewGETRouteHandler({
  playgroundPath: '/playground',
  resolveFullPath: ({ path }) => (path ? path : '/playground'),
});
export const POST = createPreviewPOSTRouteHandler();
export const OPTIONS = createPreviewOPTIONSRouteHandler();
