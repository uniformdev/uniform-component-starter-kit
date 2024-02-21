import fetch from 'node-fetch';
import { makeWriteApiKey } from '../../uniform';

export const createUniformProject = async (params: UNIFORM_API.CreateUniformProjectParams) => {
  const { apiHost, teamId, headers, projectName, previewUrl, projectTypeId } = params;
  const url = new URL('/api/v1/project', apiHost);

  const body = {
    name: projectName,
    projectTypeId,
    teamId,
    previewUrl,
  };

  const response = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });

  const installResponse = await response.json();

  if (response.status !== 200) {
    const errorMessage = (installResponse as UNIFORM_API.ProjectResponse)?.errorMessage;
    throw new Error(`Unable to create project: ${errorMessage}`);
  }

  return {
    id: (installResponse as UNIFORM_API.ProjectResponse)?.id,
  };
};

export const getIntegrationDefinitionByDisplayName = async (params: UNIFORM_API.IntegrationDefinitionParams) => {
  const { displayName, teamId, apiHost = 'https://uniform.app', headers } = params;

  const url = new URL('/api/v1/integration-definitions', apiHost);

  url.searchParams.append('teamId', teamId);
  url.searchParams.append('includePublic', 'false');
  url.searchParams.append('teamSpecificType', 'true');

  const availableIntegrationsResult = await fetch(url, {
    headers,
  }).then(res => res.json());

  const availableIntegrations = (availableIntegrationsResult as UNIFORM_API.IntegrationDefinitionResponse)?.results;

  if (!Array.isArray(availableIntegrations)) return;

  return availableIntegrations.find(integration => integration.displayName === displayName);
};

export const defineIntegration = async (params: UNIFORM_API.DefineIntegrationParams) => {
  const { data, teamId, apiHost = 'https://uniform.app', headers } = params;
  const body = {
    teamId,
    data,
  };
  const url = new URL('/api/v1/integration-definitions', apiHost);

  const response = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  }).then(res => res.json());

  const result = response as UNIFORM_API.DefineResponse;

  if (result?.displayName === data.displayName) {
    return result;
  }
};

export const getInstalledIntegration = async (params: UNIFORM_API.GetInstalledIntegrationsParams) => {
  const { projectId, type, apiHost = 'https://uniform.app', headers } = params;

  const url = new URL('/api/v1/integration-installations', apiHost);
  url.searchParams.append('projectId', projectId);
  url.searchParams.append('type', type);
  url.searchParams.append('exactType', 'true');
  url.searchParams.append('teamSpecificType', 'true');

  const installedIntegrationResult = await fetch(url, {
    headers,
  }).then(res => res.json());

  const installedIntegrations = (installedIntegrationResult as UNIFORM_API.IntegrationDefinitionResponse)?.results;

  if (Array.isArray(installedIntegrations) && installedIntegrations.length === 1) return installedIntegrations[0];
};

export const installIntegration = async (params: UNIFORM_API.InstallIntegrationsParams) => {
  const { data, projectId, type, apiHost = 'https://uniform.app', headers } = params;
  const body = {
    projectId,
    exactType: true,
    type,
    data,
  };

  const url = new URL('/api/v1/integration-installations', apiHost);

  const response = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });

  if (response.status !== 204) {
    const installResponse = await response.json();
    const errorMessage = (installResponse as UNIFORM_API.IntegrationDefinitionResponse)?.errorMessage;
    throw new Error(`Unable to install integration: ${errorMessage}`);
  }
  return getInstalledIntegration({ projectId, type, headers, apiHost });
};

export const getDataSource = async (params: UNIFORM_API.GetDataSourceParams) => {
  const { projectId, dataSourceId, apiHost = 'https://uniform.app', headers } = params;
  const url = new URL('/api/v1/data-source', apiHost);
  url.searchParams.append('projectId', projectId);
  url.searchParams.append('dataSourceId', dataSourceId);

  const response = await fetch(url, {
    headers,
  }).then(res => res.json());

  return (response as UNIFORM_API.DataSourceResponse)?.result;
};

export const addDataSource = async (params: UNIFORM_API.AddDataSourceParams) => {
  const {
    teamId,
    projectId,
    integrationType,
    integrationDisplayName,
    connectorType,
    baseUrl,
    dataSourceDisplayName,
    dataSourceId,
    dataProperties,
    apiHost = 'https://uniform.app',
    headers,
  } = params;
  const integrationDefinition = await getIntegrationDefinitionByDisplayName({
    displayName: integrationDisplayName,
    teamId,
    apiHost,
    headers,
  });

  if (!integrationDefinition && !integrationType) {
    throw new Error(`Unable to find the integration definition: ${integrationDisplayName}.`);
  }

  const body = {
    projectId,
    integrationType: integrationDefinition?.type || integrationType,
    data: {
      id: dataSourceId,
      displayName: dataSourceDisplayName,
      connectorType,
      baseUrl,
      ...dataProperties,
    },
  };

  const url = new URL('/api/v1/data-source', apiHost);
  const response = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });

  if (response.status !== 204) {
    const addResponse = await response.json();
    const errorMessage = (addResponse as UNIFORM_API.DataSourceResponse)?.errorMessage;
    throw new Error(`Unable to add ${integrationDisplayName} data source: ${errorMessage}`);
  }
  return getDataSource({ projectId, dataSourceId, apiHost, headers });
};

export const createApiKeys = async (params: UNIFORM_API.CreateApiKeysParams) => {
  const { teamId, projectId, apiHost = 'https://uniform.app', headers } = params;
  const url = new URL('/api/v1/members', apiHost);

  const writeApiKeyResponse = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(makeWriteApiKey(teamId, projectId)),
  }).then(res => res.json());

  return {
    writeApiKey: (writeApiKeyResponse as UNIFORM_API.CreateApiKeysResponse).apiKey,
  };
};

export const createUniformTeam = async (params: UNIFORM_API.CreateUniformTeamParams) => {
  const { name, apiHost = 'https://uniform.app', headers } = params;

  const url = new URL('/api/v1/team', apiHost);

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name }),
  }).then(res => res.json());

  return {
    id: (response as UNIFORM_API.CreateUniformTeamResponse)?.id,
  };
};
