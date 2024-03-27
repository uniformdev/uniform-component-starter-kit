import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import { getAvailableTeams } from './gql';
import { createApiKeys, createUniformProject, createUniformTeam } from './api';
import { configureDataSource, configureIntegration } from './utils';
import {
  getUniformProject,
  getUniformProjectName,
  getUniformProjectTypeId,
  getUniformTeam,
  getUniformTeamName,
} from '../../informationCollector';
import { demosRequiredIntegrationsMap, demosRequiredDataSourceMap, demosPreviewUrlMap } from '../../mappers';

const getAvailableProjectTypes = async (params: UNIFORM_API.GetProjectTypesParams) => {
  const { uniformAccessToken, uniformApiHost, teamId } = params;
  const headers = {
    accept: 'application/json',
    authorization: `Bearer ${uniformAccessToken}`,
  };
  const url = new URL('/api/v1/limits', uniformApiHost);
  url.searchParams.append('teamId', teamId);
  const response = await fetch(url, {
    method: 'POST',
    headers,
  });
  const json = (await response.json()) as any;
  const projectTypes = json?.limits?.projects;
  return { projectTypes } as UNIFORM_API.ProjectTypesResponse;
};

export const setupUniformProject = async (
  params: UNIFORM_API.SetupUniformProject,
  progressSpinner: { start: (message: string) => void; stop: (message: string) => void }
) => {
  const { uniformApiHost, uniformAccessToken, project, variant } = params;
  const headers = {
    accept: 'application/json',
    authorization: `Bearer ${uniformAccessToken}`,
  };

  const decoded = jwt.decode(uniformAccessToken, { complete: false });

  const teams = await getAvailableTeams({ apiHost: uniformApiHost, headers, subject: decoded?.sub?.toString() });

  const availableTeams = teams.map(({ team }) => ({ value: team.id, label: team.name }));

  let teamId = await getUniformTeam([...availableTeams, { value: 'new', label: '➕ Create new' }]);

  if (teamId === 'new') {
    const teamName = await getUniformTeamName();

    const createTeamResponse = await createUniformTeam({ apiHost: uniformApiHost, name: teamName, headers });

    teamId = createTeamResponse.id;
  }

  const team = teams.find(({ team }) => team.id === teamId)?.team;

  const availableProjects = (team?.sites || []).map(site => ({ value: site.id, label: site.name }));

  let projectId = await getUniformProject([...availableProjects, { value: 'new', label: '➕ Create new' }]);

  if (projectId === 'new') {
    const { projectTypes } = await getAvailableProjectTypes({ uniformApiHost, uniformAccessToken, teamId });
    if (projectTypes.length === 0) {
      console.log('Your Uniform team is not licensed for any additional projects.');
      return {};
    }
    const projectTypeId = await getUniformProjectTypeId(projectTypes);

    const projectName = await getUniformProjectName();

    progressSpinner.start('Start creating uniform project');

    const previewUrl = demosPreviewUrlMap[project]?.[variant];

    const createdProject = await createUniformProject({
      teamId: teamId,
      apiHost: uniformApiHost,
      projectName: projectName,
      headers,
      previewUrl,
      projectTypeId,
    });

    projectId = createdProject.id;
    progressSpinner.stop(`Finished creating uniform project. Id: ${projectId}. Preview url set to ${previewUrl}`);
  }

  progressSpinner.start('Start creating uniform api keys');

  const createdKeys = await createApiKeys({ teamId, projectId, apiHost: uniformApiHost, headers });

  const { writeApiKey } = createdKeys;

  progressSpinner.stop('Api keys created');

  const integrationsToInstall = demosRequiredIntegrationsMap[project]?.[variant] || [];

  for (const integration of integrationsToInstall) {
    progressSpinner.start(
      `Start installing ${integration.name} integration.${
        integration.customManifest ? ' Custom manifest will be used.' : ''
      }`
    );
    await configureIntegration({
      displayName: integration.name,
      defaultType: integration.type,
      teamId,
      projectId,
      integrationParams: integration.data,
      fetchIntegrationParamsFn: integration.fetchDataFn,
      customManifest: integration.customManifest,
      apiHost: uniformApiHost,
      headers,
      onIntegrationSet: integration.onIntegrationSet,
    });
    progressSpinner.stop(`Finished installing ${integration.name} integration`);
  }

  const dataSourceToInstall = demosRequiredDataSourceMap[project]?.[variant] || [];

  for (const dataSource of dataSourceToInstall) {
    progressSpinner.start(`Start installing ${dataSource.dataSourceDisplayName}`);
    await configureDataSource({
      teamId,
      projectId,
      integrationType: dataSource?.integrationType,
      integrationDisplayName: dataSource.integrationDisplayName,
      connectorType: dataSource.connectorType,
      baseUrl: dataSource.baseUrl,
      dataSourceDisplayName: dataSource.dataSourceDisplayName,
      dataSourceId: dataSource.dataSourceId,
      dataProperties: dataSource.dataProperties,
      apiHost: uniformApiHost,
      headers,
    });
    progressSpinner.stop(`Finished installing ${dataSource.dataSourceDisplayName}`);
  }

  return {
    uniformTeamId: teamId,
    uniformProjectId: projectId,
    uniformApiKey: writeApiKey,
    uniformHeaders: headers,
  };
};
