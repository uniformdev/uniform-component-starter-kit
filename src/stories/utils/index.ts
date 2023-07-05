import { RootComponentInstance, ComponentInstance } from '@uniformdev/canvas';

interface UniformMockParam {
  type: string;
  value: Record<string, unknown>;
}

export const createUniformParameter = (params: Record<string, unknown | UniformMockParam>) =>
  Object.keys(params).reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        type: (params[key] as UniformMockParam)?.type || 'text',
        value: (params[key] as UniformMockParam)?.value || params[key],
      },
    }),
    {}
  );

export const createFakeCompositionData = (
  type: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any>,
  slots: Record<string, ComponentInstance[]>
): RootComponentInstance => ({
  _name: type,
  type: type,
  _id: 'ebf7db31-5e01-4874-afb4-d8d668457ba8',
  parameters: createUniformParameter(params),
  slots,
});
