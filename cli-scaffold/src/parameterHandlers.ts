import { ParameterHandler } from './types';

const uniformTextParameterHandler: ParameterHandler = {
  supports: ['text'],
  type: 'string',
  hide: true,
  render: parameter => `<UniformText parameterId="${parameter.id}" placeholder="${parameter.name} goes here" />`,
};

const numberParameterHandler: ParameterHandler = {
  supports: ['number'],
  type: 'number',
  render: parameter => `{${parameter.id}}`,
};

const textParameterHandler: ParameterHandler = {
  supports: ['select', 'date'],
  type: 'string',
  render: parameter => `{${parameter.id}}`,
};

const linkParameterHandler: ParameterHandler = {
  supports: ['link'],
  type: 'LinkParamValue',
  render: parameter => `<a href={${parameter.id}?.path ?? '#'}>Link Text</a>`,
};

const assetParameterValue: ParameterHandler = {
  supports: ['asset'],
  type: `Asset[]`,
  render: parameter =>
    // ToDo: have to fix it(never)
    `{(flattenValues(${parameter.id} as never) || [])
          .filter(({ url }) => Boolean(url))
          .map(({title, url }, index) => (
            <img key={index} src={url} width="100px" height="100px" alt={title} />
          ))}`,
};

const checkboxParameterHandler: ParameterHandler = {
  supports: ['checkbox'],
  type: 'boolean',
  render: parameter => `{${parameter.id}?.toString()}`,
};

const richTextParameterHandler: ParameterHandler = {
  supports: ['richText'],
  type: 'RichTextNode',
  hide: true,
  render: parameter => `<UniformRichText className="max-w-full prose" parameterId="${parameter.id}" />`,
};

const imageParameterHandler: ParameterHandler = {
  supports: ['image'],
  type: 'string',
  render: parameter =>
    `{!!${parameter.id} && <img src={${parameter.id}} width="100px" height="100px" alt="example" />}`,
};

const jsonParameterHandler: ParameterHandler = {
  supports: ['json'],
  type: 'Record<string, unknown>',
  render: parameter => `{JSON.stringify(${parameter.id})}`,
};

export const supportedParameterHandlers: ParameterHandler[] = [
  uniformTextParameterHandler,
  numberParameterHandler,
  textParameterHandler,
  linkParameterHandler,
  assetParameterValue,
  checkboxParameterHandler,
  richTextParameterHandler,
  imageParameterHandler,
  jsonParameterHandler,
];
