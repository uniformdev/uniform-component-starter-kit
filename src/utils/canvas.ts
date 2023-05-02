import { CanvasClient, CANVAS_PUBLISHED_STATE, CANVAS_DRAFT_STATE } from '@uniformdev/canvas';
import { ProjectMapClient } from '@uniformdev/project-map';

export const globalCompositionId = '179bfdf3-be89-4d63-949c-53a58f3eff19';

export const getCanvasClient = () => {
  const apiKey = process.env.UNIFORM_API_KEY;
  const apiHost = process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app';
  const edgeApiHost = process.env.UNIFORM_CLI_BASE_EDGE_URL || 'https://uniform.global';
  const projectId = process.env.UNIFORM_PROJECT_ID;

  if (!apiKey) {
    throw new Error('apiKey is not specified. CanvasClient cannot be instantiated: ' + apiKey);
  }

  if (!apiHost) throw new Error('apiHost is not specified. CanvasClient cannot be instantiated');
  if (!edgeApiHost) throw new Error('edgeApiHost is not specified. CanvasClient cannot be instantiated');

  if (!projectId) throw new Error('projectId is not specified. CanvasClient cannot be instantiated.');

  const client = new CanvasClient({
    apiKey,
    apiHost,
    projectId,
    edgeApiHost,
    bypassCache: true, // FixMe. Will be removed https://linear.app/uniform/issue/UNI-2339/composition-update-webhooks-are-arriving-before-the-data-is-available
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

export const getCompositionById = async (id: string, context: { preview: boolean }) => {
  if (!id) throw new Error('composition id is not provided');

  const { preview = false } = context || {};
  try {
    const { composition } = await getCanvasClient().getCompositionById({
      compositionId: id,
      state: getState(preview),
    });

    return composition;
  } catch (err) {
    console.error({ err });
    return undefined;
  }
};

export const getState = (preview: boolean | undefined) =>
  process.env.NODE_ENV === 'development' || preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE;
