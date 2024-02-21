import fs from 'fs';
import path from 'path';
import { formatWithPrettier, getComponentNameBasedOnId } from '../utils';
import { spinner } from '../promts';
import { FileHandler } from '../types';

const progressSpinner = spinner();

export const registerComponentFile: FileHandler = {
  path: ({ pathToCanvasFolder }) => path.resolve(pathToCanvasFolder, 'index.ts'),
  write: async ({ destinationPath, definition }) => {
    const componentName = getComponentNameBasedOnId(definition.id);

    progressSpinner?.start(`Generating ${destinationPath} file`);
    const canvasIndex = await fs.promises.readFile(destinationPath, 'utf-8');

    const importFileSection = `import './${componentName}';`;

    const componentFolder = path.join(destinationPath, '..');
    if (!fs.existsSync(componentFolder)) await fs.promises.mkdir(componentFolder, { recursive: true });

    await fs.promises.writeFile(destinationPath, await formatWithPrettier(`${canvasIndex}${importFileSection}`));
    progressSpinner?.stop(
      `Import of ${componentName} component was successfully added to the  ${destinationPath} file`
    );
  },
};
