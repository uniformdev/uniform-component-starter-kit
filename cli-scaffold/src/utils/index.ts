import fs from 'fs';
import path from 'path';
import prettier, { Options } from 'prettier';
import { CanvasClient, ComponentDefinitionParameter } from '@uniformdev/canvas';
import { supportedParameterHandlers } from '../parameterHandlers';
import { ParameterHandler } from '../types';
import { text } from '../promts';

export const getCanvasClient = async () => {
  const apiHost = process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app';
  const edgeApiHost = process.env.UNIFORM_CLI_BASE_EDGE_URL || 'https://uniform.global';
  let projectId = process.env.UNIFORM_PROJECT_ID;
  let apiKey = process.env.UNIFORM_API_KEY;

  if (!projectId) {
    projectId = (
      await text({ message: `We didn't find Uniform Project ID. Could you please provide it here:`, required: true })
    ).toString();
  }

  if (!apiKey) {
    apiKey = (
      await text({ message: `We didn't find Uniform API Key. Could you please provide it here:`, required: true })
    ).toString();
  }

  return new CanvasClient({
    apiHost,
    apiKey,
    projectId,
    edgeApiHost,
    disableSWR: true,
  });
};

export const getPathToCanvasFolder = async () => {
  const pathToCanvasFolderInPackages = path.resolve('', 'packages', 'csk-ui', 'canvas');
  const pathToCanvasFolder = path.resolve('', 'src', 'canvas');

  if (fs.existsSync(pathToCanvasFolderInPackages)) return pathToCanvasFolderInPackages;
  if (fs.existsSync(pathToCanvasFolder)) return pathToCanvasFolder;
  return (
    await text({
      message: `We didn't find canvas folder. Could you please provide path to the canvas folder:`,
      required: true,
    })
  ).toString();
};

export const getComponentNameBasedOnId = (componentId?: string) =>
  componentId ? componentId.charAt(0).toUpperCase() + componentId.slice(1) : 'UnknownComponent';

export const getRenderableParameters = (
  parameters: ComponentDefinitionParameter[]
): (ComponentDefinitionParameter & { handler?: ParameterHandler })[] => {
  const handled = parameters.map(parameter => {
    const handler = supportedParameterHandlers.find(handler => {
      return handler.supports.includes(parameter.type);
    });

    return {
      ...parameter,
      handler,
    };
  });

  return handled.filter(parameter => !!parameter.handler);
};

export const formatWithPrettier = (source: string, option?: Options) =>
  prettier.format(source, {
    parser: 'typescript',
    printWidth: 120,
    singleQuote: true,
    semi: true,
    trailingComma: 'es5',
    tabWidth: 2,
    arrowParens: 'avoid',
    endOfLine: 'auto',
    ...option,
  });
