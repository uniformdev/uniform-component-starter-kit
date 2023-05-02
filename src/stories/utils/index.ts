import { RootComponentInstance, ComponentInstance } from '@uniformdev/canvas';

export const createUniformParameter = (params: Record<string, string>) =>
  Object.keys(params).reduce((acc, key) => {
    return {
      ...acc,
      [key]: {
        type: 'text',
        value: params[key],
      },
    };
  }, {});

export const createFakeCompositionData = (
  type: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any>,
  slots: Record<string, ComponentInstance[]>
): RootComponentInstance => {
  return {
    _name: type,
    type: type,
    _id: 'ebf7db31-5e01-4874-afb4-d8d668457ba8',
    parameters: createUniformParameter(params),
    slots,
  };
};
