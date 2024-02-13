import { CANVAS_PUBLISHED_STATE, CANVAS_DRAFT_STATE, RouteClient } from '@uniformdev/canvas';
import { ProjectMapClient } from '@uniformdev/project-map';

export const getRouteClient = () => {
  const apiKey = process.env.UNIFORM_API_KEY;
  const edgeApiHost = process.env.UNIFORM_CLI_BASE_EDGE_URL || 'https://uniform.global';
  const projectId = process.env.UNIFORM_PROJECT_ID;

  if (!apiKey) {
    throw new Error('apiKey is not specified. RouteClient cannot be instantiated: ' + apiKey);
  }

  if (!edgeApiHost) throw new Error('edgeApiHost is not specified. RouteClient cannot be instantiated');

  if (!projectId) throw new Error('projectId is not specified. RouteClient cannot be instantiated.');

  const client = new RouteClient({
    apiKey,
    projectId,
    edgeApiHost,
    disableSWR: true,
  });

  return client;
};

export const getProjectMapClient = () => {
  const apiKey = process.env.UNIFORM_API_KEY;
  const apiHost = process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app';
  const projectId = process.env.UNIFORM_PROJECT_ID;

  if (!apiHost) throw new Error('apiHost is not specified. Project Map client cannot be instantiated');

  if (!projectId) throw new Error('projectId is not specified. Project Map client cannot be instantiated');

  return new ProjectMapClient({
    apiKey,
    apiHost,
    projectId,
  });
};

export const getState = (preview: boolean | undefined) =>
  process.env.NODE_ENV === 'development' || preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE;

export const getBreadcrumbs = async ({
  compositionId,
  preview,
  dynamicTitle,
  urlSegments,
}: {
  compositionId: string;
  preview: boolean;
  dynamicTitle?: string;
  urlSegments?: string[];
}) => {
  const projectMapClient = getProjectMapClient();

  const { nodes: projectMapNodes } = await projectMapClient.getNodes({
    compositionId: compositionId,
    includeAncestors: true,
    state: getState(preview),
  });

  const isLocalizedApp = projectMapNodes?.[0]?.type === 'placeholder';
  const paths = isLocalizedApp ? projectMapNodes?.slice(1) : projectMapNodes;

  return paths?.map((node, index) => {
    const isDynamicPath = node.path?.includes(':');
    const shouldShowDynamicTitle = node.pathSegment?.includes(':') && !node.pathSegment?.includes(':locale');

    const generatedPathSegment = isDynamicPath ? urlSegments?.slice(0, index + 1).join('/') || '/' : node.path;

    return {
      name: node.name,
      path: generatedPathSegment?.startsWith('/') ? generatedPathSegment : `/${generatedPathSegment}`,
      type: node.type,
      isRoot: node.path === '/' || node.path === '/:locale',
      dynamicInputTitle: (shouldShowDynamicTitle && dynamicTitle) || null,
    };
  });
};
