import {
  addDataSource,
  defineIntegration,
  getDataSource,
  getInstalledIntegration,
  getIntegrationDefinitionByDisplayName,
  installIntegration,
} from './api';

interface ConfigureIntegration {
  displayName: string;
  defaultType?: string;
  teamId: string;
  projectId: string;
  integrationParams?: Record<string, string | string[]>;
  fetchIntegrationParamsFn?: (data?: object) => Promise<Record<string, string | object>>;
  customManifest?: Record<string, unknown>;
  apiHost: string;
  headers: Record<string, string>;
  onIntegrationSet?: (integrationInfo: UNIFORM_API.DefineResponse) => Promise<void>;
}

interface ConfigureDataSource {
  teamId: string;
  projectId: string;
  integrationType?: string;
  integrationDisplayName: string;
  headers: Record<string, string>;
  connectorType: string;
  baseUrl: string;
  dataSourceDisplayName: string;
  dataSourceId: string;
  dataProperties: Record<string, unknown>;
  apiHost: string;
}

export const configureIntegration = async ({
  displayName,
  defaultType,
  teamId,
  projectId,
  integrationParams,
  fetchIntegrationParamsFn,
  customManifest,
  apiHost,
  headers,
  onIntegrationSet,
}: ConfigureIntegration) => {
  if (customManifest) {
    await defineIntegration({
      data: customManifest,
      teamId,
      apiHost,
      headers,
    });
  }

  const { type = defaultType } =
    (await getIntegrationDefinitionByDisplayName({
      displayName,
      teamId,
      apiHost,
      headers,
    })) || {};

  if (!type) {
    throw new Error(`Integration definition is not available: ${displayName}`);
  }

  const installedIntegration = await getInstalledIntegration({
    projectId,
    type,
    apiHost,
    headers,
  });

  if (installedIntegration) {
    return;
  }

  const dynamicIntegrationParams = await fetchIntegrationParamsFn?.({ apiHost });

  const newInstalledIntegration = await installIntegration({
    projectId,
    type,
    data: dynamicIntegrationParams || integrationParams,
    apiHost,
    headers,
  });

  if (!newInstalledIntegration) {
    return;
  }
  if (onIntegrationSet) {
    await onIntegrationSet(newInstalledIntegration);
  }
};

export const configureDataSource = async ({
  teamId,
  projectId,
  integrationType,
  integrationDisplayName,
  headers,
  connectorType,
  baseUrl,
  dataSourceDisplayName,
  dataSourceId,
  dataProperties,
  apiHost,
}: ConfigureDataSource) => {
  const dataSource = await getDataSource({
    projectId,
    dataSourceId,
    headers,
    apiHost,
  });
  if (dataSource) {
    return;
  }

  await addDataSource({
    teamId,
    projectId,
    integrationType,
    integrationDisplayName,
    headers,
    connectorType,
    baseUrl,
    dataSourceDisplayName,
    dataSourceId,
    dataProperties,
    apiHost,
  });
};
