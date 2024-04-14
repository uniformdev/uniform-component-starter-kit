import fs from 'fs';
import path from 'path';
import color from 'picocolors';
import open from 'open';
import { select, text, intro, confirm } from './promts';
import { addExamplesCanvasCache, composeGetEnvFns, remove } from './utils';
import { demosRequiredIntegrationsMap, demosVariantsGetEnvsMap } from './mappers';
import { fixEslint, installPackages } from './commands/run';
import { CommonVariants } from './constants';

const args = process.argv.slice(2);
const isDevMode = args.includes('--dev');

const validate = (value: string) => {
  if (!value || value?.trim().length === 0) return 'This field is required';
};

export const showDemoHeader = (project: string, variant: string): void => {
  intro(color.bgCyan(`demos-run-cli ${project || ''} ${variant || ''}`));
};

export const askUniformAccessToken = async (apiHost: string) => {
  const shouldContinue = await confirm({
    message: 'Open a browser window to generate a Uniform access token?',
  });

  if (shouldContinue) {
    const url = new URL('cli-login', apiHost);
    await open(url.toString());
  }

  return text({
    message: 'Paste your access token here and press enter (or just enter to quit):',
    validate(value) {
      if (value.length === 0) return;
    },
  });
};

export const getUniformTeam = async (availableVariants: { value: string; label: string }[]): Promise<string> => {
  return (
    await select({
      message: `Please select your team:`,
      options: availableVariants,
    })
  ).toString() as CLI.CommonVariants;
};

export const getUniformProject = async (availableVariants: { value: string; label: string }[]): Promise<string> => {
  let selectedProject: string | undefined = undefined;

  while (!selectedProject) {
    const projectChoice = await select({
      message: 'Please select your project:',
      options: availableVariants,
    });

    if (projectChoice !== 'new') {
      const isOverwriteConfirmed = await confirm({
        message: 'Your project will be overwritten. Are you sure?',
      });

      if (isOverwriteConfirmed) {
        selectedProject = projectChoice.toString();
      }
    } else {
      selectedProject = projectChoice.toString();
    }
  }

  return selectedProject;
};

export const getUniformProjectName = async (): Promise<string> => {
  return (
    await text({
      message: `Please enter project name:`,
    })
  ).toString();
};

export const getUniformProjectTypeId = async (projectTypes: UNIFORM_API.ProjectType[]): Promise<string> => {
  const options = projectTypes
    .filter(type => type.limit > type.used)
    .map(type => ({
      value: type.id,
      label: `${type.name}${type.is_prod !== true ? ' [NON PROD]' : ''} (${type.limit - type.used} remaining)`,
    }));
  return (await select({ message: 'Select your Uniform project type:', options })).toString();
};

export const getUniformTeamName = async (): Promise<string> => {
  return (
    await text({
      message: `Please enter team name:`,
    })
  ).toString();
};

export const getProjectLocation = async (
  exportRoot: string,
  message = 'Where do your project located?'
): Promise<string> => {
  return (await text({ message, validate, initialValue: exportRoot })).toString();
};

export const getUniformEnvs = async (
  project: string
): Promise<{
  uniformApiKey: string;
  uniformProjectId: string;
  uniformCliBaseUrl: string;
  uniformEdgeApiHost: string;
}> => {
  const uniformApiKey = (
    await text({
      message: `Your ${project} uniform api key:`,
      validate,
    })
  ).toString();

  const uniformProjectId = (
    await text({
      message: `Your ${project} uniform project id:`,
      validate,
    })
  ).toString();

  const uniformCliBaseUrl = (
    await select({
      message: 'Select Uniform host:',
      options: [
        { value: 'https://uniform.app', label: 'https://uniform.app' },
        { value: 'https://canary.uniform.app', label: 'https://canary.uniform.app' },
      ],
      initialValue: 'https://uniform.app',
    })
  ).toString();

  const uniformEdgeApiHost = uniformCliBaseUrl.includes('canary')
    ? 'https://canary.uniform.global'
    : 'https://uniform.global';

  return { uniformApiKey, uniformProjectId, uniformCliBaseUrl, uniformEdgeApiHost };
};

export const getUniformAccessTokenEnvs = async (): Promise<{
  uniformCliBaseUrl: string;
  uniformEdgeApiHost: string;
  uniformAccessToken: string;
} | null> => {
  let uniformCliBaseUrl = (
    await select({
      message: 'Select Uniform host:',
      options: [
        { value: 'https://uniform.app', label: 'https://uniform.app' },
        { value: 'https://canary.uniform.app', label: 'https://canary.uniform.app' },
        { value: '', label: 'Other host' },
      ],
      initialValue: process.env.CLI_UNIFORM_CLI_BASE_URL || 'https://uniform.app',
    })
  ).toString();

  if (uniformCliBaseUrl === '') {
    uniformCliBaseUrl = (
      await text({
        message: `Your Uniform host:`,
        validate,
      })
    ).toString();
  }

  let uniformEdgeApiHost = '';
  if (uniformCliBaseUrl === 'https://canary.uniform.app') {
    uniformEdgeApiHost = 'https://canary.uniform.global';
  }
  if (uniformCliBaseUrl === 'https://uniform.app') {
    uniformEdgeApiHost = 'https://uniform.global';
  }
  uniformEdgeApiHost = (
    await text({
      message: `Your Uniform edge API host:`,
      initialValue: uniformEdgeApiHost,
      validate,
    })
  ).toString();

  const uniformAccessToken = await askUniformAccessToken(uniformCliBaseUrl);
  if (!uniformAccessToken) return null;

  return {
    uniformCliBaseUrl,
    uniformEdgeApiHost,
    uniformAccessToken: uniformAccessToken?.toString(),
  };
};

export const getAlgoliaEnvs = async (
  project: string
): Promise<{
  NEXT_PUBLIC_ALGOLIA_APPLICATION_ID: string;
  NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: string;
}> => {
  if (!isDevMode) {
    return {
      NEXT_PUBLIC_ALGOLIA_APPLICATION_ID: process.env.CLI_NEXT_PUBLIC_ALGOLIA_APPLICATION_ID || '',
      NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: process.env.CLI_NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || '',
    };
  }

  const NEXT_PUBLIC_ALGOLIA_APPLICATION_ID = (
    await text({
      message: `Your ${project} algolia application id:`,
      validate,
      initialValue: process.env.CLI_NEXT_PUBLIC_ALGOLIA_APPLICATION_ID || '',
    })
  ).toString();

  const NEXT_PUBLIC_ALGOLIA_SEARCH_KEY = (
    await text({
      message: `Your ${project} algolia search key:`,
      validate,
      initialValue: process.env.CLI_NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || '',
    })
  ).toString();

  return { NEXT_PUBLIC_ALGOLIA_APPLICATION_ID, NEXT_PUBLIC_ALGOLIA_SEARCH_KEY };
};

export const getCoveoEnvs = async (
  project: string
): Promise<{
  NEXT_PUBLIC_COVEO_ORGANIZATION_ID: string;
  NEXT_PUBLIC_COVEO_API_KEY: string;
}> => {
  if (!isDevMode) {
    return {
      NEXT_PUBLIC_COVEO_ORGANIZATION_ID: process.env.CLI_NEXT_PUBLIC_COVEO_ORGANIZATION_ID || '',
      NEXT_PUBLIC_COVEO_API_KEY: process.env.CLI_NEXT_PUBLIC_COVEO_API_KEY || '',
    };
  }

  const NEXT_PUBLIC_COVEO_ORGANIZATION_ID = (
    await text({
      message: `Your ${project} coveo organization id:`,
      validate,
      initialValue: process.env.CLI_NEXT_PUBLIC_COVEO_ORGANIZATION_ID || '',
    })
  ).toString();

  const NEXT_PUBLIC_COVEO_API_KEY = (
    await text({
      message: `Your ${project} coveo api key:`,
      validate,
      initialValue: process.env.CLI_NEXT_PUBLIC_COVEO_API_KEY || '',
    })
  ).toString();

  return { NEXT_PUBLIC_COVEO_ORGANIZATION_ID, NEXT_PUBLIC_COVEO_API_KEY };
};

export const getSegmentEnvs = async (
  project: string
): Promise<{
  NEXT_PUBLIC_ANALYTICS_WRITE_KEY: string;
  SEGMENT_SPACE_ID: string;
  SEGMENT_API_KEY: string;
}> => {
  if (!isDevMode) {
    return {
      NEXT_PUBLIC_ANALYTICS_WRITE_KEY: process.env.CLI_NEXT_PUBLIC_ANALYTICS_WRITE_KEY || '',
      SEGMENT_SPACE_ID: process.env.CLI_SEGMENT_SPACE_ID || '',
      SEGMENT_API_KEY: process.env.CLI_SEGMENT_API_KEY || '',
    };
  }

  const NEXT_PUBLIC_ANALYTICS_WRITE_KEY = (
    await text({
      message: `Your ${project} segment next public analytics write key:`,
      validate,
      initialValue: process.env.CLI_NEXT_PUBLIC_ANALYTICS_WRITE_KEY,
    })
  ).toString();

  const SEGMENT_SPACE_ID = (
    await text({
      message: `Your ${project} segment space id:`,
      validate,
      initialValue: process.env.CLI_SEGMENT_SPACE_ID,
    })
  ).toString();

  const SEGMENT_API_KEY = (
    await text({
      message: `Your ${project} segment api key:`,
      validate,
      initialValue: process.env.CLI_SEGMENT_API_KEY,
    })
  ).toString();

  return { NEXT_PUBLIC_ANALYTICS_WRITE_KEY, SEGMENT_SPACE_ID, SEGMENT_API_KEY };
};

export const getGoogleAnalyticsEnvs = async (
  project: string
): Promise<{
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: string;
}> => {
  if (!isDevMode) {
    return {
      NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.CLI_NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
    };
  }

  const NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = (
    await text({
      message: `Your ${project} google analytics write key:`,
      validate,
      initialValue: process.env.CLI_NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    })
  ).toString();

  return { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID };
};

export const getSupabaseEnvs = async (
  project: string
): Promise<{
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_KEY: string;
  SUPABASE_USER_EMAIL: string;
  SUPABASE_USER_PASSWORD: string;
}> => {
  if (!isDevMode) {
    return {
      NEXT_PUBLIC_SUPABASE_URL: process.env.CLI_NEXT_PUBLIC_SUPABASE_URL || '',
      NEXT_PUBLIC_SUPABASE_KEY: process.env.CLI_NEXT_PUBLIC_SUPABASE_KEY || '',
      SUPABASE_USER_EMAIL: process.env.CLI_SUPABASE_USER_EMAIL || '',
      SUPABASE_USER_PASSWORD: process.env.CLI_SUPABASE_USER_PASSWORD || '',
    };
  }

  const NEXT_PUBLIC_SUPABASE_URL = (
    await text({
      message: `Your ${project} supabase url:`,
      validate,
      initialValue: process.env.CLI_NEXT_PUBLIC_SUPABASE_URL,
    })
  ).toString();

  const NEXT_PUBLIC_SUPABASE_KEY = (
    await text({
      message: `Your ${project} supabase key:`,
      validate,
      initialValue: process.env.CLI_NEXT_PUBLIC_SUPABASE_KEY,
    })
  ).toString();

  const SUPABASE_USER_EMAIL = (
    await text({
      message: `Your ${project} supabase user email:`,
      validate,
      initialValue: process.env.CLI_SUPABASE_USER_EMAIL,
    })
  ).toString();

  const SUPABASE_USER_PASSWORD = (
    await text({
      message: `Your ${project} supabase user password`,
      validate,
      initialValue: process.env.CLI_SUPABASE_USER_PASSWORD,
    })
  ).toString();

  return { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_KEY, SUPABASE_USER_EMAIL, SUPABASE_USER_PASSWORD };
};

export const getInsightsEnvs = async (
  project: string
): Promise<{
  NEXT_PUBLIC_UNIFORM_INSIGHTS_ENDPOINT: string;
  NEXT_PUBLIC_UNIFORM_INSIGHTS_KEY: string;
}> => {
  if (!isDevMode) {
    return {
      NEXT_PUBLIC_UNIFORM_INSIGHTS_ENDPOINT: process.env.CLI_NEXT_PUBLIC_UNIFORM_INSIGHTS_ENDPOINT || '',
      NEXT_PUBLIC_UNIFORM_INSIGHTS_KEY: process.env.CLI_NEXT_PUBLIC_UNIFORM_INSIGHTS_KEY || '',
    };
  }

  const NEXT_PUBLIC_UNIFORM_INSIGHTS_ENDPOINT = (
    await text({
      message: `Your ${project} insights endpoint:`,
      validate,
      initialValue: process.env.CLI_NEXT_PUBLIC_UNIFORM_INSIGHTS_ENDPOINT,
    })
  ).toString();

  const NEXT_PUBLIC_UNIFORM_INSIGHTS_KEY = (
    await text({
      message: `Your ${project} insights key:`,
      validate,
      initialValue: process.env.CLI_NEXT_PUBLIC_UNIFORM_INSIGHTS_KEY,
    })
  ).toString();

  return { NEXT_PUBLIC_UNIFORM_INSIGHTS_ENDPOINT, NEXT_PUBLIC_UNIFORM_INSIGHTS_KEY };
};

export const additionalModulesForComponentStarterKit =
  ({ integrationList, packagesList }: { integrationList: CLI.Integration[]; packagesList: string[] }) =>
  async ({
    progressSpinner,
    project,
    variant = CommonVariants.Default,
    projectPath,
  }: CLI.AdditionalModulesExecutorProps) => {
    const pathToModules = path.resolve(projectPath, 'src', 'modules');
    const pathToAdditionalCache = path.resolve(projectPath, 'content', 'examples');
    if (!fs.existsSync(pathToModules) || !fs.existsSync(pathToAdditionalCache)) return;

    const isRunAddingModules = await confirm({
      message: `Do you want to add additional Examples (Coveo and Algolia Search)?`,
    });

    if (!isRunAddingModules) {
      await remove(pathToModules);
      await remove(pathToAdditionalCache);
      return;
    }

    if (packagesList.length) {
      progressSpinner.start(`Installing additional packages`);
      await installPackages(projectPath, packagesList);
      progressSpinner.stop(`Finished installing additional packages`);
    }

    progressSpinner.start(`Adding additional canvas cache`);
    await addExamplesCanvasCache(projectPath);
    progressSpinner.stop(`Finished adding additional canvas cache`);

    progressSpinner.start(`Adding additional integration`);
    demosRequiredIntegrationsMap[project][variant]?.push(...integrationList);
    progressSpinner.stop(`Finished adding additional integration`);

    progressSpinner.start(`Adding additional environment variables`);
    demosVariantsGetEnvsMap[project][variant] = composeGetEnvFns(getCoveoEnvs, getAlgoliaEnvs);
    progressSpinner.stop(`Finished adding additional environment variables`);

    progressSpinner.start(`Cleaning up module files`);
    const listOfCoveoFiles = await fs.promises.readdir(path.resolve(projectPath, 'src', 'modules', 'coveo'));

    await Promise.all(
      listOfCoveoFiles.map(async fileName => {
        const pathToCoveoFile = path.resolve(projectPath, 'src', 'modules', 'coveo', fileName);
        const coveoFile = await fs.promises.readFile(pathToCoveoFile, 'utf-8');
        await fs.promises.writeFile(
          pathToCoveoFile,
          coveoFile
            .replaceAll('/* eslint-disable @typescript-eslint/ban-ts-comment */', '')
            .replaceAll(/\/\/ @ts-ignore:.+\n/g, '')
        );
      })
    );

    const listOfAlgoliaFiles = await fs.promises.readdir(path.resolve(projectPath, 'src', 'modules', 'algolia'));

    await Promise.all(
      listOfAlgoliaFiles.map(async fileName => {
        const pathToAlgoliaFile = path.resolve(projectPath, 'src', 'modules', 'algolia', fileName);
        const algoliaFile = await fs.promises.readFile(pathToAlgoliaFile, 'utf-8');
        await fs.promises.writeFile(
          pathToAlgoliaFile,
          algoliaFile
            .replaceAll('/* eslint-disable @typescript-eslint/ban-ts-comment */', '')
            .replaceAll(/\/\/ @ts-ignore:.+\n/g, '')
        );
      })
    );

    await fixEslint(projectPath);
    progressSpinner.stop(`Finished cleaning up module files`);

    return;
  };
