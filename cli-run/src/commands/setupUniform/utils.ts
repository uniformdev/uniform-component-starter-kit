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
  teamId: string;
  projectId: string;
  integrationParams?: Record<string, string>;
  fetchIntegrationParamsFn?: (data?: object) => Promise<Record<string, string | object>>;
  customManifest?: Record<string, unknown>;
  apiHost: string;
  headers: Record<string, string>;
}

interface ConfigureDataSource {
  teamId: string;
  projectId: string;
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
  teamId,
  projectId,
  integrationParams,
  fetchIntegrationParamsFn,
  customManifest,
  apiHost,
  headers,
}: ConfigureIntegration) => {
  if (customManifest) {
    await defineIntegration({
      data: customManifest,
      teamId,
      apiHost,
      headers,
    });
  }

  const integration = await getIntegrationDefinitionByDisplayName({
    displayName,
    teamId,
    apiHost,
    headers,
  });

  if (!integration) {
    throw new Error(`Integration definition is not available: ${displayName}`);
  }

  const installedIntegration = await getInstalledIntegration({
    projectId,
    type: integration.type,
    apiHost,
    headers,
  });

  if (installedIntegration) {
    return;
  }

  const dynamicIntegrationParams = await fetchIntegrationParamsFn?.({ apiHost });

  const newInstalledIntegration = await installIntegration({
    projectId,
    type: integration.type,
    data: dynamicIntegrationParams || integrationParams,
    apiHost,
    headers,
  });

  if (!newInstalledIntegration) {
    return;
  }
};

export const configureDataSource = async ({
  teamId,
  projectId,
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
