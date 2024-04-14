import childProcess from 'child_process';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { AppModes } from '../constants';
import { JavaDripBlackTheme } from '../customThemes';

export const execPromise = (command: string) => {
  return new Promise(function (resolve, reject) {
    childProcess.exec(command, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(stdout.trim());
    });
  });
};

export const remove = (path: string) => fs.promises.rm(path, { recursive: true, force: true });

export const fetchThemePackThemes = async (selectedThemeName: string, data: Record<string, string>) => {
  const { apiHost = '' } = data || {};

  const baseUrl = apiHost.includes('canary')
    ? 'https://canary-theme-pack-mesh-integration.netlify.app'
    : 'https://theme-pack.mesh.uniform.app';

  const StaticThemes = await fetch(`${baseUrl}/staticThemes.json`).then(res => res.json());

  const uniformTheme = (StaticThemes as CLI.ThemePackTheme[]).find(theme => theme.themeName === 'uniform');
  const javadripTheme = (StaticThemes as CLI.ThemePackTheme[]).find(theme => theme.themeName === 'javadrip');

  return {
    selectedThemeName,
    themes: {
      uniform: uniformTheme,
      javadrip: javadripTheme,
      custom: JavaDripBlackTheme,
    },
  };
};

export const composeGetEnvFns =
  (
    ...getEnvFunctions: Array<
      (project: CLI.AvailableProjects, variant: CLI.CommonVariants) => Promise<Record<string, string>>
    >
  ) =>
  async (project: CLI.AvailableProjects, variant: CLI.CommonVariants) => {
    // We are not able to use Promise all because don't want to run functions in parallel
    let envs = {};
    for (const fn of getEnvFunctions) {
      const result = await fn(project, variant);
      envs = { ...envs, ...result };
    }
    return envs;
  };

export const addExamplesCanvasCache = async (projectPath: string) => {
  const listOfCanvasCache = await fs.promises.readdir(path.resolve(projectPath, 'content', 'examples'));
  await Promise.all(
    listOfCanvasCache.map(async cache => {
      await fs.promises.cp(
        path.resolve(projectPath, 'content', 'examples', cache),
        path.resolve(projectPath, 'content', cache),
        { recursive: true }
      );
    })
  );
  await remove(path.resolve(projectPath, 'content', 'examples'));
  const pathToCanvasFile = path.resolve(projectPath, 'src', 'canvas', 'index.ts');
  const canvas = await fs.promises.readFile(pathToCanvasFile, 'utf-8');

  await fs.promises.writeFile(pathToCanvasFile, `import '../modules/coveo';import '../modules/algolia';\n${canvas}`);
};

export const scanPageDirectory = async (projectPath: string, mode: AppModes) =>
  (await findModeOptions(path.resolve(projectPath, 'src'), mode)) ||
  (await findModeOptions(path.resolve(projectPath, 'src', 'pages'), mode)) ||
  (await findModeOptions(path.resolve(projectPath, 'src', 'pages', 'api'), mode));

const findModeOptions = async (projectPath: string, mode: string): Promise<boolean> =>
  fs.promises
    .readdir(projectPath, { withFileTypes: true })
    .then(r => r.some(node => (node.isFile() ? node.name.endsWith(mode) : false)))
    .catch(() => false);

export const switchModeInDirectory = async (projectPath: string, mode: AppModes, removalList?: string[]) => {
  await switchModeTo(path.resolve(projectPath, 'src'), mode, removalList);
  await switchModeTo(path.resolve(projectPath, 'src', 'pages'), mode, removalList);
  await switchModeTo(path.resolve(projectPath, 'src', 'pages', 'api'), mode, removalList);
};

const switchModeTo = async (projectPath: string, mode: string, removalList?: string[]) => {
  const listOfFilesNames = (await fs.promises.readdir(projectPath, { withFileTypes: true }))
    .filter(node => node.isFile())
    .map(item => item.name);
  for (const fileName of listOfFilesNames) {
    if (fileName.endsWith(mode)) {
      const destinationFileName = fileName.slice(0, -(mode.length + 1));
      await remove(path.resolve(projectPath, destinationFileName));
      await fs.promises.cp(path.resolve(projectPath, fileName), path.resolve(projectPath, destinationFileName));
      await remove(path.resolve(projectPath, fileName));
    } else if (fileName.endsWith(AppModes.SSR) || fileName.endsWith(AppModes.SSG) || removalList?.includes(fileName)) {
      await remove(path.resolve(projectPath, fileName));
    }
  }
};

export const updatePromptsBasedOnIntegration = async ({ type }: UNIFORM_API.DefineResponse) => {
  const pathToPromptsFolder = path.resolve('../', 'content', 'prompts');
  if (!pathToPromptsFolder) return;

  const listOfFilesNames = (await fs.promises.readdir(pathToPromptsFolder, { withFileTypes: true }))
    .filter(node => node.isFile())
    .map(item => item.name);
  for (const fileName of listOfFilesNames) {
    const pathToPromptFile = path.join(pathToPromptsFolder, fileName);
    const prompt = await fs.promises.readFile(pathToPromptFile, 'utf-8');
    await fs.promises.writeFile(
      path.resolve(pathToPromptFile),
      prompt.replace(/^(integrationType: .*$\n)/gm, `integrationType: ${type}\n`)
    );
  }
};
