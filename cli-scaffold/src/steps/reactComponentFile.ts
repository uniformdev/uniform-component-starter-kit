import fs from 'fs';
import path from 'path';
import { confirm } from '@clack/prompts';
import { formatWithPrettier, getComponentNameBasedOnId, getRenderableParameters } from '../utils';
import { outro, spinner } from '../promts';
import { FileHandler } from '../types';

const progressSpinner = spinner();

export const reactComponentFile: FileHandler = {
  path: ({ definition, pathToCanvasFolder }) => {
    const componentName = getComponentNameBasedOnId(definition?.id);
    return path.resolve(pathToCanvasFolder, componentName, `${componentName}.tsx`);
  },
  write: async ({ destinationPath, definition }) => {
    if (fs.existsSync(destinationPath)) {
      const shouldOverwrite = await confirm({
        message: `File ${destinationPath} already exists, would you like to overwrite it?`,
      });
      if (!shouldOverwrite) {
        outro(`${destinationPath} skipped`);
        return;
      }
    }

    progressSpinner?.start(`Generating ${destinationPath} file`);

    const componentName = getComponentNameBasedOnId(definition.id);
    const renderableParameters = getRenderableParameters(definition.parameters || []);

    const isNeedUniformText = renderableParameters.find(({ handler }) => handler?.supports.includes('text'));
    const isNeedUniformRichText = renderableParameters.find(({ handler }) => handler?.supports.includes('richText'));
    const isNeedFlattenValues = renderableParameters.find(({ handler }) => handler?.supports.includes('asset'));

    const inputSection = `
    ${
      isNeedUniformText && isNeedUniformRichText
        ? "import { UniformText, UniformRichText } from '@uniformdev/canvas-react';"
        : ''
    }${isNeedUniformText && !isNeedUniformRichText ? "import { UniformText } from '@uniformdev/canvas-react';" : ''}${
      isNeedUniformRichText && !isNeedUniformText ? "import { UniformRichText } from '@uniformdev/canvas-react';" : ''
    }${isNeedFlattenValues ? "import { flattenValues } from '@uniformdev/canvas'" : ''}
    import { ${componentName}Props } from './';
    `;

    const componentSection = `
    export const ${componentName} = ({
      component,
      ${renderableParameters
        .filter(item => !item.handler?.hide)
        .map(parameter => `${parameter.id},`)
        .join('\n')}
    }: ${componentName}Props) => (
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl">${componentName} component</h1>
        <p>
          <strong>Type/Public id:</strong> {component.type}
        </p>
        {!!component?.variant && (
          <p>
            <strong>Selected Variant:</strong> {component?.variant}
          </p>
        )}
        <strong>Parameters:</strong>
        <ul className="space-y-1 list-disc list-inside pl-2">
          ${renderableParameters
            .map(
              parameter =>
                `<li><strong>${parameter.id}: </strong>${parameter?.handler?.render(parameter) || 'unknown'}</li>`
            )
            .join('\n')}
        </ul>
      </div>
    );
    `;

    const componentFolder = path.join(destinationPath, '..');
    if (!fs.existsSync(componentFolder)) await fs.promises.mkdir(componentFolder, { recursive: true });

    await fs.promises.writeFile(destinationPath, await formatWithPrettier(`${inputSection}\n${componentSection}`));
    progressSpinner?.stop(`${destinationPath} file was successfully generated`);
  },
};
