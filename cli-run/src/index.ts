#! /usr/bin/env node
import 'dotenv/config';
import clear from 'clear';
import color from 'picocolors';
import path from 'path';
import { confirm, spinner, cancel, note, select } from './promts';
import { demosVariantsGetEnvsMap, demosVariantsModulesRequire } from './mappers';
import {
  buildDemo,
  fillEnvFiles,
  fixEslint,
  getExistDemoPath,
  installDependencies,
  isMetaDataExist,
  isNodeModulesExist,
  isProjectExist,
  parseMetadata,
  runDemo,
  runPush,
} from './commands/run';
import { getProjectLocation, getUniformEnvs, showDemoHeader, getUniformAccessTokenEnvs } from './informationCollector';
import { setupUniformProject } from './commands/setupUniform';
import { AppModes, CommonVariants } from './constants';
import { scanPageDirectory, switchModeInDirectory } from './utils';

const progressSpinner = spinner();

const IS_MANUAL_CREATING = false;

const processEnvFile = async (
  uniformCredentials: CLI.UniformCredentials,
  project: CLI.AvailableProjects,
  projectPath: string,
  variant: CLI.CommonVariants = CommonVariants.Default
) => {
  progressSpinner.start('Checking your env file');

  progressSpinner.stop('Your env file is not correct');

  const projectVariantsGetEnvsMap = demosVariantsGetEnvsMap[project];

  const getAdditionalEnvDataFn = projectVariantsGetEnvsMap?.[variant];

  const additionalEnvData = await getAdditionalEnvDataFn?.(project, variant);

  progressSpinner.start('Creating env file');

  const { uniformApiKey, uniformProjectId, uniformCliBaseUrl, uniformEdgeApiHost } = uniformCredentials;

  await fillEnvFiles(
    projectPath,
    uniformApiKey,
    uniformProjectId,
    uniformCliBaseUrl,
    uniformEdgeApiHost,
    additionalEnvData
  );

  progressSpinner.stop('Env file created');
};

const runResetCanvasJourney = async (project: CLI.AvailableProjects, alreadyDefinedProjectPath?: string) => {
  let projectPath = alreadyDefinedProjectPath;

  if (!projectPath) {
    projectPath = await getProjectLocation(path.resolve('.'));
    projectPath = getExistDemoPath(projectPath, project);
  }

  if (!isProjectExist(projectPath)) {
    cancel(`${project} does not exist in ${projectPath}, please run script again and export your demo first`);
    return process.exit(0);
  }

  progressSpinner.start('Pushing canvas configuration');

  await runPush(projectPath);

  progressSpinner.stop('Canvas configuration pushed');
};

const runRunDemoJourney = async (
  project: CLI.AvailableProjects,
  variant: CLI.CommonVariants = CommonVariants.Default
) => {
  const projectPath = path.resolve('../');

  if (!isProjectExist(projectPath)) {
    cancel(`${project} does not exist in ${projectPath}, please run script again and export your demo first`);
    return process.exit(0);
  }

  progressSpinner.start('Checking your dependencies');

  if (isNodeModulesExist(projectPath)) {
    progressSpinner.stop('Dependencies found');
  } else {
    progressSpinner.stop('Dependencies not found');
    progressSpinner.start('Installing dependencies');

    await installDependencies(projectPath);

    progressSpinner.stop('Dependencies installed');
  }

  if (IS_MANUAL_CREATING) {
    const { uniformApiKey, uniformCliBaseUrl, uniformEdgeApiHost, uniformProjectId } = await getUniformEnvs(project);

    await processEnvFile(
      { uniformApiKey, uniformCliBaseUrl, uniformEdgeApiHost, uniformProjectId },
      project,
      projectPath,
      variant
    );
  } else {
    const uniformCredentials = await getUniformAccessTokenEnvs();
    if (!uniformCredentials) return;

    const { uniformProjectId, uniformApiKey } = await setupUniformProject(
      {
        uniformApiHost: uniformCredentials.uniformCliBaseUrl,
        uniformAccessToken: uniformCredentials.uniformAccessToken,
        project,
        variant,
      },
      progressSpinner
    );

    if (!uniformProjectId || !uniformApiKey) {
      return;
    }
    await processEnvFile({ ...uniformCredentials, uniformProjectId, uniformApiKey }, project, projectPath, variant);
  }

  const shouldRunPush = await confirm({ message: 'Do you want to push canvas configuration?' });
  if (shouldRunPush) await runResetCanvasJourney(project, projectPath);

  progressSpinner.start('Running your demo');
  await buildDemo(projectPath);
  progressSpinner.stop('Demo running check localhost:3000');
  runDemo(projectPath);
};

const preSetDemo = async (project: CLI.AvailableProjects, variant: CLI.CommonVariants = CommonVariants.Default) => {
  const projectPath = path.resolve('../');
  const renderingModeOptions = [];
  const isSSRModeAvailable = await scanPageDirectory(projectPath, AppModes.SSR);
  const isSSGModeAvailable = await scanPageDirectory(projectPath, AppModes.SSG);

  if (isSSRModeAvailable) {
    renderingModeOptions.push({ value: 'ssr', label: 'Server-side Rendering \t(SSR)' });
  }
  if (isSSGModeAvailable) {
    renderingModeOptions.push({ value: 'ssg', label: 'Static Site Generation \t(SSG)' });
  }

  const appMode = renderingModeOptions.length
    ? (
        await select({
          message: 'Which rendering mode do you prefer?',
          options: renderingModeOptions,
          initialValue: AppModes.SSR,
        })
      ).toString()
    : undefined;

  if (appMode) {
    await switchModeInDirectory(projectPath, appMode as AppModes, ['revalidate.ts', 'profile.tsx', 'middleware.ts']);
  }

  const projectVariantsModulesRequire = demosVariantsModulesRequire[project];
  const installModules = projectVariantsModulesRequire?.[variant];
  await installModules?.({
    progressSpinner,
    project,
    variant,
    projectPath,
  });

  if (!Boolean(installModules)) {
    progressSpinner.start(`Cleaning up`);
    await fixEslint(projectPath);
    progressSpinner.stop(`Finished cleaning up`);
  }
};

(async () => {
  clear();

  if (!isMetaDataExist()) {
    note(color.red('Looks like you metadata.json file is not configured. Please check it and try again.'));
    return process.exit(0);
  }
  try {
    const { project, variant } = await parseMetadata();

    showDemoHeader(project, variant);

    await preSetDemo(project, variant);

    await runRunDemoJourney(project, variant);
  } catch (e) {
    console.error(e);
    return process.exit(0);
  }
})();
