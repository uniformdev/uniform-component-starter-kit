import {
  additionalModulesForComponentStarterKit,
  getAlgoliaEnvs,
  getCommercetoolsEnvs,
  getContentfulEnvs,
  getCoveoEnvs,
  getGoogleAnalyticsEnvs,
  getSegmentEnvs,
} from './informationCollector';
import { AvailableProjects, CommonVariants } from './constants';
import commercetoolsIntegration from './customIntegrations/commercetools';
import openAIIntegration from './customIntegrations/openAI';
import { composeGetEnvFns, fetchThemePackThemes } from './utils';

export const demosVariantsGetEnvsMap: {
  [availableProjects in CLI.AvailableProjects]: Partial<
    Record<
      CLI.CommonVariants,
      (project: CLI.AvailableProjects, variant: CLI.CommonVariants) => Promise<Record<string, string>> | undefined
    >
  >;
} = {
  [AvailableProjects.Localization]: {
    [CommonVariants.Default]: getContentfulEnvs,
  },
  [AvailableProjects.CommerceStarter]: {
    [CommonVariants.Default]: () => undefined,
  },
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: () => undefined,
  },
  [AvailableProjects.CommerceAlgoliaDemo]: {
    [CommonVariants.Default]: composeGetEnvFns(getAlgoliaEnvs, getSegmentEnvs, getGoogleAnalyticsEnvs),
  },
  [AvailableProjects.CommerceCoveoDemo]: {
    [CommonVariants.Default]: composeGetEnvFns(getCoveoEnvs, getSegmentEnvs, getGoogleAnalyticsEnvs),
  },
  [AvailableProjects.CommerceCommercetoolsDemo]: {
    [CommonVariants.Default]: getCommercetoolsEnvs,
  },
};

export const Integrations = {
  Cloudinary: {
    name: 'Cloudinary',
    data: {
      cloudName: process.env.CLI_CLOUDINARY_CLOUD_NAME!,
      apiKey: process.env.CLI_CLOUDINARY_API_KEY!,
      apiSecret: process.env.CLI_CLOUDINARY_API_SECRET!,
    },
  },
  Contentful: {
    name: 'Contentful',
  },
  ContentfulClassic: {
    name: 'Contentful Classic',
    link: 'https://docs.uniform.app/docs/integrations/content/contentful/contentful-classic/uniform-in-contentful/uniformconf-nextjs-tutorial',
  },
  Contentstack: {
    name: `Contentstack`,
  },
  ThemePackUniform: {
    name: `Theme Pack`,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchDataFn: (data: any) => fetchThemePackThemes('uniform', data),
  },
  ThemePackJavadrip: {
    name: `Theme Pack`,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchDataFn: (data: any) => fetchThemePackThemes('javadrip', data),
  },
  ThemePackJavadripBlack: {
    name: `Theme Pack`,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchDataFn: (data: any) => fetchThemePackThemes('custom', data),
  },
  UniformFakeCommerce: {
    name: 'Uniform Fake Commerce',
    data: {
      apiUrl: process.env.CLI_UNIFORM_FAKE_COMMERCE_API_URL || '',
    },
  },
  Algolia: {
    name: 'Algolia',
    data: {
      applicationId: process.env.CLI_ALGOLIA_APPLICATION_ID,
      searchKey: process.env.CLI_ALGOLIA_SEARCH_KEY,
      indexName: process.env.CLI_ALGOLIA_INDEX_NAME,
    },
  },
  Commercetools: {
    name: 'Commercetools',
    customManifest: commercetoolsIntegration,
    data: {
      projectKey: process.env.CLI_COMMERCETOOLS_PROJECT_KEY,
      clientId: process.env.CLI_COMMERCETOOLS_CLIENT_ID,
      clientSecret: process.env.CLI_COMMERCETOOLS_CLIENT_SECRET,
      apiUrl: process.env.CLI_COMMERCETOOLS_API_URL,
      authUrl: process.env.CLI_COMMERCETOOLS_AUTH_URL,
    },
  },
  Coveo: {
    name: 'Coveo',
    data: {
      organizationId: process.env.CLI_COVEO_ORGANIZATION_ID as string,
      apiKey: process.env.CLI_COVEO_API_KEY as string,
    },
  },
  OpenAI: {
    name: 'OpenAI',
    customManifest: openAIIntegration,
  },
};

export const notMeshIntegrations = [Integrations.ContentfulClassic.name];

const BASE_URL = 'http://localhost:3000/api/preview?secret=';

export const demosPreviewUrlMap: {
  [availableProjects in CLI.AvailableProjects]: Partial<Record<CLI.CommonVariants, string>>;
} = {
  [AvailableProjects.Localization]: {
    [CommonVariants.Default]: `${BASE_URL}javadrip`,
  },
  [AvailableProjects.CommerceStarter]: {
    [CommonVariants.Default]: `${BASE_URL}javadrip`,
  },
  [AvailableProjects.CommerceAlgoliaDemo]: {
    [CommonVariants.Default]: `${BASE_URL}javadrip`,
  },
  [AvailableProjects.CommerceCoveoDemo]: {
    [CommonVariants.Default]: `${BASE_URL}javadrip`,
  },
  [AvailableProjects.CommerceCommercetoolsDemo]: {
    [CommonVariants.Default]: `${BASE_URL}javadrip`,
  },
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: `${BASE_URL}hello-world`,
  },
};

export const demosRequiredIntegrationsMap: {
  [availableProjects in CLI.AvailableProjects]: Partial<Record<CLI.CommonVariants, CLI.Integration[] | undefined>>;
} = {
  [AvailableProjects.Localization]: {
    [CommonVariants.Default]: [Integrations.ThemePackJavadrip, Integrations.ContentfulClassic, Integrations.Cloudinary],
  },
  [AvailableProjects.CommerceStarter]: {
    [CommonVariants.Default]: [Integrations.ThemePackJavadrip, Integrations.UniformFakeCommerce],
  },
  [AvailableProjects.CommerceAlgoliaDemo]: {
    [CommonVariants.Default]: [
      Integrations.ThemePackJavadripBlack,
      Integrations.Algolia,
      Integrations.Cloudinary,
      Integrations.Contentful,
      Integrations.Contentstack,
      Integrations.OpenAI,
    ],
  },
  [AvailableProjects.CommerceCoveoDemo]: {
    [CommonVariants.Default]: [
      Integrations.ThemePackJavadripBlack,
      Integrations.Coveo,
      Integrations.Cloudinary,
      Integrations.Contentful,
      Integrations.OpenAI,
    ],
  },
  [AvailableProjects.CommerceCommercetoolsDemo]: {
    [CommonVariants.Default]: [
      Integrations.ThemePackJavadripBlack,
      Integrations.Commercetools,
      Integrations.Contentful,
      Integrations.Contentstack,
      Integrations.Cloudinary,
    ],
  },
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: [Integrations.ThemePackUniform],
  },
};

const getContentStackBaseUrl = (contentStackRegion: string) => {
  if (contentStackRegion === 'AZURE') {
    return 'https://azure-na-api.contentstack.com/v3';
  } else if (contentStackRegion === 'EU') {
    return 'https://eu-api.contentstack.com/v3';
  } else {
    return 'https://cdn.contentstack.io/v3';
  }
};

const DataSource: {
  [key: string]: CLI.DataSourceConfiguration;
} = {
  Contentful: {
    integrationDisplayName: 'Contentful',
    dataSourceId: 'contentfulDataSource',
    dataSourceDisplayName: 'Contentful Data Source',
    connectorType: 'contentful-data-connection',
    baseUrl: `https://cdn.contentful.com/spaces/${process.env.CLI_CONTENTFUL_SPACE_ID}/environments/${process.env.CLI_CONTENTFUL_ENVIRONMENT}`,
    dataProperties: {
      headers: [{ key: 'Content-Type', value: 'application/json' }],
      parameters: [
        {
          key: 'access_token',
          value: process.env.CLI_CONTENTFUL_CDA_ACCESS_TOKEN,
        },
      ],
      custom: {
        spaceId: process.env.CLI_CONTENTFUL_SPACE_ID,
        environmentId: process.env.CLI_CONTENTFUL_ENVIRONMENT,
      },
    },
  },
  Contentstack: {
    integrationDisplayName: 'Contentstack',
    dataSourceDisplayName: 'Contentstack Data Source',
    dataSourceId: 'contentstackDataSource',
    connectorType: 'contentstack-data-connection',
    baseUrl: getContentStackBaseUrl(process.env.CLI_CONTENT_STACK_REGION || ''),
    dataProperties: {
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'api_key', value: process.env.CLI_CONTENT_STACK_API_KEY },
        { key: 'access_token', value: process.env.CLI_CONTENT_STACK_DELIVERY_TOKEN },
      ],
    },
  },
  Algolia: {
    integrationDisplayName: 'Algolia',
    dataSourceDisplayName: 'Algolia Data Source',
    dataSourceId: 'algoliaDataSource',
    connectorType: 'algolia-data-connection',
    baseUrl: `https://${process.env.CLI_ALGOLIA_APPLICATION_ID}-dsn.algolia.net/1/indexes`,
    dataProperties: {
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'X-Algolia-Application-Id', value: process.env.CLI_ALGOLIA_APPLICATION_ID },
        { key: 'X-Algolia-API-Key', value: process.env.CLI_ALGOLIA_SEARCH_KEY },
      ],
    },
  },
  Coveo: {
    integrationDisplayName: 'Coveo',
    dataSourceDisplayName: 'Coveo Data Source',
    dataSourceId: 'coveoDataSource',
    connectorType: 'coveo-data-connection',
    baseUrl: `https://${process.env.CLI_COVEO_ORGANIZATION_ID}.org.coveo.com/rest/search/v2`,
    dataProperties: {
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Authorization', value: `Bearer ${process.env.CLI_COVEO_API_KEY}` },
      ],
    },
  },
  UniformFakeCommerce: {
    integrationDisplayName: 'Uniform Fake Commerce',
    dataSourceDisplayName: 'Fake Commerce Data Source',
    dataSourceId: 'fakeCommerceDataSource',
    connectorType: 'fake-commerce-data-connection',
    baseUrl: process.env.CLI_UNIFORM_FAKE_COMMERCE_NGM_API_URL || '',
    dataProperties: {},
  },
};

export const demosRequiredDataSourceMap: {
  [availableProjects in CLI.AvailableProjects]: Partial<
    Record<CLI.CommonVariants, CLI.DataSourceConfiguration[] | undefined>
  >;
} = {
  [AvailableProjects.Localization]: {
    [CommonVariants.Default]: [],
  },
  [AvailableProjects.CommerceStarter]: {
    [CommonVariants.Default]: [DataSource.UniformFakeCommerce],
  },
  [AvailableProjects.CommerceAlgoliaDemo]: {
    [CommonVariants.Default]: [DataSource.Contentful, DataSource.Contentstack, DataSource.Algolia],
  },
  [AvailableProjects.CommerceCoveoDemo]: {
    [CommonVariants.Default]: [DataSource.Contentful, DataSource.Coveo],
  },
  [AvailableProjects.CommerceCommercetoolsDemo]: {
    [CommonVariants.Default]: [DataSource.Contentful, DataSource.Contentstack],
  },
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: [],
  },
};

export const demosVariantsRequiredLocales: {
  [availableProjects in CLI.AvailableProjects]: Partial<Record<CLI.CommonVariants, string[]>>;
} = {
  [AvailableProjects.Localization]: {
    [CommonVariants.Default]: ['en-US', 'de-DE', 'es-ES'],
  },
  [AvailableProjects.CommerceStarter]: {
    [CommonVariants.Default]: [],
  },
  [AvailableProjects.CommerceAlgoliaDemo]: {
    [CommonVariants.Default]: [],
  },
  [AvailableProjects.CommerceCoveoDemo]: {
    [CommonVariants.Default]: [],
  },
  [AvailableProjects.CommerceCommercetoolsDemo]: {
    [CommonVariants.Default]: [],
  },
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: [],
  },
};

export const demosVariantsModulesRequire: {
  [availableProjects in CLI.AvailableProjects]: Partial<
    Record<CLI.CommonVariants, (props: CLI.AdditionalModulesExecutorProps) => Promise<void> | undefined>
  >;
} = {
  [AvailableProjects.Localization]: {
    [CommonVariants.Default]: () => undefined,
  },
  [AvailableProjects.CommerceStarter]: {
    [CommonVariants.Default]: () => undefined,
  },
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: additionalModulesForComponentStarterKit({
      integrationList: [Integrations.Coveo],
      packagesList: ['@coveo/headless@2.31.0'],
    }),
  },
  [AvailableProjects.CommerceAlgoliaDemo]: {
    [CommonVariants.Default]: () => undefined,
  },
  [AvailableProjects.CommerceCoveoDemo]: {
    [CommonVariants.Default]: () => undefined,
  },
  [AvailableProjects.CommerceCommercetoolsDemo]: {
    [CommonVariants.Default]: () => undefined,
  },
};
