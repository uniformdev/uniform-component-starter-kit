#! /usr/bin/env node
// import dotenv from 'dotenv';
import 'dotenv/config';
import clear from 'clear';
import color from 'picocolors';
import { intro } from '@clack/prompts';
import { spinner, select } from './promts';

import { indexComponentFile, reactComponentFile, registerComponentFile } from './steps';
import { getCanvasClient, getPathToCanvasFolder } from './utils';

const progressSpinner = spinner();

(async () => {
  clear();
  try {
    intro(color.bgCyan('Uniform RSC Scaffolder'));

    const canvasClient = await getCanvasClient();

    progressSpinner?.start('Loading Component Definitions');

    const { componentDefinitions: definitions } = await canvasClient.getComponentDefinitions();

    progressSpinner?.stop(`Component Definitions were loaded`);

    const selectedIndex = (await select({
      message: 'Select the necessary component to generate files:',
      options: definitions
        .sort((itemA, itemB) => new Date(itemB.created || '').getTime() - new Date(itemA.created || '').getTime())
        .map(({ name }, index) => ({ value: index, label: name })),
    })) as number;
    const selectedComponent = definitions[selectedIndex];
    const pathToCanvasFolder = await getPathToCanvasFolder();

    const pathGenerateProps = { pathToCanvasFolder, definition: selectedComponent };

    const pathToIndexFile = indexComponentFile.path(pathGenerateProps);
    await indexComponentFile.write({ definition: selectedComponent, destinationPath: pathToIndexFile });

    const pathToReactComponentFile = reactComponentFile.path(pathGenerateProps);
    await reactComponentFile.write({ definition: selectedComponent, destinationPath: pathToReactComponentFile });

    const pathToRegisterComponentFile = registerComponentFile.path(pathGenerateProps);
    await registerComponentFile.write({ definition: selectedComponent, destinationPath: pathToRegisterComponentFile });
  } catch (e) {
    console.error(e);
    return process.exit(0);
  }
})();
