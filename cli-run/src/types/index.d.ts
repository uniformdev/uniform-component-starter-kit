declare namespace CLI {
  type CommonVariants = import('../constants').CommonVariants;

  type AvailableProjects = import('../constants').AvailableProjects;

  type Spinner = {
    start: (msg?: string | undefined) => void;
    stop: (msg?: string | undefined, code?: number | undefined) => void;
    message: (msg?: string | undefined) => void;
  };

  type AdditionalModulesExecutorProps = {
    progressSpinner: CLI.Spinner;
    project: CLI.AvailableProjects;
    variant: CLI.CommonVariants;
    projectPath: string;
  };

  type DataSourceConfiguration = {
    integrationDisplayName: string;
    integrationType?: string;
    dataSourceId: string;
    dataSourceDisplayName: string;
    connectorType: string;
    baseUrl: string;
    dataProperties: Record<string, unknown>;
  };

  type UniformCredentials = {
    uniformApiKey: string;
    uniformProjectId: string;
    uniformCliBaseUrl: string;
    uniformEdgeApiHost: string;
  };

  type ThemePackTheme = {
    themeName: string;
    themeLabel: string;
    colors: [];
  };

  type Integration = {
    name: string;
    type?: string;
    data?: Record<string, string | string[]>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchDataFn?: (data: any) => Promise<Record<string, string | object>>;
    link?: string;
    customManifest?: Record<string, unknown>;
    onIntegrationSet?: (integrationInfo: UNIFORM_API.DefineResponse) => Promise<void>;
  };
}

declare namespace UNIFORM_API {
  type SetupUniformProject = {
    uniformApiHost: string;
    uniformAccessToken: string;
    project: CLI.AvailableProjects;
    variant: CLI.CommonVariants;
  };

  type IntegrationDefinitionParams = {
    displayName: string;
    teamId: string;
    apiHost?: string;
    headers: Record<string, string>;
  };

  type IntegrationDefinitionResponse = {
    results: {
      displayName: string;
      type: string;
    }[];
    errorMessage?: string;
  };

  type DefineResponse = {
    displayName: string;
    type: string;
  };

  type DefineIntegrationParams = {
    data: Record<string, unknown>;
    teamId: string;
    apiHost: string;
    headers: Record<string, string>;
  };

  type GetInstalledIntegrationsParams = {
    projectId: string;
    type: string;
    apiHost?: string;
    headers: Record<string, string>;
  };

  type InstallIntegrationsParams = {
    projectId: string;
    type: string;
    data?: Record<string, string | object>;
    apiHost?: string;
    headers: Record<string, string>;
  };

  type DataSourceResponse = {
    result: Record<string, string>;
    errorMessage?: string;
  };

  type ProjectResponse = {
    id: string;
    errorMessage?: string;
  };

  type AddDataSourceParams = {
    teamId: string;
    projectId: string;
    integrationType?: string;
    integrationDisplayName: string;
    connectorType: string;
    baseUrl: string;
    dataSourceDisplayName: string;
    dataSourceId: string;
    dataProperties: Record<string, unknown>;
    apiHost: string;
    headers: Record<string, string>;
  };

  type CreateUniformProjectParams = {
    apiHost: string;
    headers: Record<string, string>;
    projectName: string;
    previewUrl?: string;
    teamId: string;
    projectTypeId: string;
  };

  type GetDataSourceParams = {
    projectId: string;
    dataSourceId: string;
    apiHost: string;
    headers: Record<string, string>;
  };

  type CreateApiKeysParams = {
    teamId: string;
    projectId: string;
    apiHost: string;
    headers: Record<string, string>;
  };

  type CreateApiKeysResponse = {
    apiKey: string;
  };

  type GetTeamsParams = {
    apiHost: string;
    headers: Record<string, string>;
    subject?: string;
  };

  type TeamsResponse = {
    data: {
      info: {
        teams: {
          team: {
            name: string;
            id: string;
            sites: {
              name: string;
              id: string;
            }[];
          };
        }[];
      };
    };
  };

  type CreateUniformTeamParams = {
    name: string;
    apiHost: string;
    headers: Record<string, string>;
  };

  type CreateUniformTeamResponse = {
    id: string;
  };

  type GetProjectTypesParams = {
    uniformApiHost: string;
    uniformAccessToken: string;
    teamId: string;
  };

  type ProjectType = {
    name: string;
    id: string;
    is_prod: boolean;
    limit: number;
    used: number;
  };

  type ProjectTypesResponse = {
    projectTypes: ProjectType[];
  };
}
