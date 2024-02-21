import { ComponentDefinition, ComponentDefinitionParameter } from '@uniformdev/canvas';

export type FileHandler = {
  path: (props: { pathToCanvasFolder: string; definition?: ComponentDefinition }) => string;
  write: (props: { destinationPath: string; definition: ComponentDefinition }) => Promise<void>;
};

export type ParameterHandler = {
  supports: string[];
  type: string;
  render: (parameter: ComponentDefinitionParameter) => string;
  hide?: boolean;
};
