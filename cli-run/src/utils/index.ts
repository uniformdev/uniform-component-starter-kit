import childProcess from 'child_process';
import fetch from 'node-fetch';

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

export const formatMessageLine = (message: string) => message.replace(/\s+/g, ' ');

export const fetchThemePackThemes = async (selectedThemeName: string, data: any) => {
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
