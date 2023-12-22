import {
  additionalModulesForComponentStarterKit,
  getAlgoliaEnvs,
  getGoogleAnalyticsEnvs,
  getSegmentEnvs,
  getSupabaseEnvs,
} from './informationCollector';
import { AvailableProjects, CommonVariants } from './constants';
import { composeGetEnvFns, fetchThemePackThemes } from './utils';

export const demosVariantsGetEnvsMap: {
  [availableProjects in CLI.AvailableProjects]: Partial<
    Record<
      CLI.CommonVariants,
      (project: CLI.AvailableProjects, variant: CLI.CommonVariants) => Promise<Record<string, string>> | undefined
    >
  >;
} = {
  [AvailableProjects.CommerceStarter]: {
    [CommonVariants.Default]: () => undefined,
  },
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: () => undefined,
  },
  [AvailableProjects.ComponentStarterKitRsc]: {
    [CommonVariants.Default]: () => undefined,
  },
  [AvailableProjects.CommerceAlgoliaDemo]: {
    [CommonVariants.Default]: composeGetEnvFns(getAlgoliaEnvs, getSegmentEnvs, getSupabaseEnvs),
  },
  [AvailableProjects.SalesDemo]: {
    [CommonVariants.Default]: composeGetEnvFns(getAlgoliaEnvs, getSegmentEnvs, getGoogleAnalyticsEnvs, getSupabaseEnvs),
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
  Contentstack: {
    name: `Contentstack`,
  },
  KontentAi: {
    name: `Kontent.ai`,
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
      applicationId: process.env.CLI_NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
      searchKey: process.env.CLI_NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
      allowedIndices: [process.env.CLI_ALGOLIA_INDEX_NAME],
    },
  },
  Coveo: {
    name: 'Coveo',
    data: {
      organizationId: process.env.CLI_NEXT_PUBLIC_COVEO_ORGANIZATION_ID as string,
      apiKey: process.env.CLI_NEXT_PUBLIC_COVEO_API_KEY as string,
    },
  },
  OpenAI: {
    name: 'OpenAI',
    data: {
      organization: process.env.CLI_OPEN_AI_ORGANIZATION,
      token: process.env.CLI_OPEN_AI_TOKEN,
    },
  },
  Writer: {
    name: 'Writer',
    data: {
      organization: process.env.CLI_WRITER_ORGANIZATION,
      team: process.env.CLI_WRITER_TEAM,
      token: process.env.CLI_WRITER_API_KEY,
    },
  },
  OctoAI: {
    name: 'OctoAI Stable Diffusion',
    data: {
      endpoint: process.env.CLI_OCTO_AI_ENDPOINT,
      token: process.env.CLI_OCTO_AI_API_KEY,
    },
  },
  GoogleAnalytics: {
    name: 'Google Analytics V4',
    type: 'google-analytics-v4',
    data: {
      dataStreamName: `properties/${process.env.CLI_GOOGLE_ANALYTICS_PROPERTY_ID}/dataStreams/${process.env.CLI_GOOGLE_ANALYTICS_DATA_STREAMS_ID}`,
      measurementId: process.env.CLI_NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
      propertyId: `properties/${process.env.CLI_GOOGLE_ANALYTICS_PROPERTY_ID}`,
    },
  },
};

const BASE_URL = 'http://localhost:3000/api/preview?secret=';

export const demosPreviewUrlMap: {
  [availableProjects in CLI.AvailableProjects]: Partial<Record<CLI.CommonVariants, string>>;
} = {
  [AvailableProjects.CommerceStarter]: {
    [CommonVariants.Default]: `${BASE_URL}javadrip`,
  },
  [AvailableProjects.CommerceAlgoliaDemo]: {
    [CommonVariants.Default]: `${BASE_URL}javadrip`,
  },
  [AvailableProjects.SalesDemo]: {
    [CommonVariants.Default]: `${BASE_URL}javadrip`,
  },
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: `${BASE_URL}hello-world`,
  },
  [AvailableProjects.ComponentStarterKitRsc]: {
    [CommonVariants.Default]: `${BASE_URL}hello-world`,
  },
};

export const demosRequiredIntegrationsMap: {
  [availableProjects in CLI.AvailableProjects]: Partial<Record<CLI.CommonVariants, CLI.Integration[] | undefined>>;
} = {
  [AvailableProjects.CommerceStarter]: {
    [CommonVariants.Default]: [Integrations.ThemePackJavadrip, Integrations.UniformFakeCommerce],
  },
  [AvailableProjects.CommerceAlgoliaDemo]: {
    [CommonVariants.Default]: [
      Integrations.ThemePackJavadripBlack,
      Integrations.Algolia,
      Integrations.KontentAi,
      Integrations.Cloudinary,
      Integrations.Contentful,
      Integrations.Contentstack,
      Integrations.OpenAI,
      Integrations.Writer,
      Integrations.OctoAI,
    ],
  },
  [AvailableProjects.SalesDemo]: {
    [CommonVariants.Default]: [
      Integrations.ThemePackJavadripBlack,
      Integrations.Algolia,
      Integrations.KontentAi,
      Integrations.Cloudinary,
      Integrations.Contentful,
      Integrations.Contentstack,
      Integrations.OpenAI,
      Integrations.Writer,
      Integrations.OctoAI,
      Integrations.GoogleAnalytics,
    ],
  },
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: [Integrations.ThemePackUniform],
  },
  [AvailableProjects.ComponentStarterKitRsc]: {
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
  KontentAi: {
    integrationDisplayName: 'Kontent.ai',
    dataSourceDisplayName: 'Kontent.ai Data Source',
    dataSourceId: 'kontentAiDataSource',
    connectorType: 'kontent-ai-data-connection',
    baseUrl: 'https://deliver.kontent.ai/bf6fb8b9-53e1-004f-964b-5aaa52ee073c',
    dataProperties: {
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Authorization', value: `Bearer ${process.env.CLI_KONTENT_AI_DELIVERY_API_KEY}` },
        { key: 'apiKey', value: process.env.CLI_KONTENT_AI_DELIVERY_API_KEY },
        { key: 'environmentId', value: process.env.CLI_KONTENT_AI_ENVIRONMENT_ID },
      ],
    },
  },
  Algolia: {
    integrationDisplayName: 'Algolia',
    dataSourceDisplayName: 'Algolia Data Source',
    dataSourceId: 'algoliaDataSource',
    connectorType: 'algolia-data-connection',
    baseUrl: `https://${process.env.CLI_NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}-dsn.algolia.net/1/indexes`,
    dataProperties: {
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'X-Algolia-Application-Id', value: process.env.CLI_NEXT_PUBLIC_ALGOLIA_APPLICATION_ID },
        { key: 'X-Algolia-API-Key', value: process.env.CLI_NEXT_PUBLIC_ALGOLIA_SEARCH_KEY },
      ],
    },
  },
  Coveo: {
    integrationDisplayName: 'Coveo',
    dataSourceDisplayName: 'Coveo Data Source',
    dataSourceId: 'coveoDataSource',
    connectorType: 'coveo-data-connection',
    baseUrl: `https://${process.env.CLI_NEXT_PUBLIC_COVEO_ORGANIZATION_ID}.org.coveo.com/rest/search/v2`,
    dataProperties: {
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Authorization', value: `Bearer ${process.env.CLI_NEXT_PUBLIC_COVEO_API_KEY}` },
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
  UniformContent: {
    integrationType: 'canvas',
    integrationDisplayName: '',
    dataSourceDisplayName: 'Uniform Content',
    dataSourceId: 'uniformContent',
    connectorType: 'uniformContent',
    baseUrl: 'https://content.uniform.app',
    dataProperties: {},
  },
  BrandData: {
    integrationType: 'canvas',
    integrationDisplayName: '',
    dataSourceDisplayName: 'Brand Data',
    dataSourceId: 'brandData',
    connectorType: 'staticData',
    baseUrl: 'https://uniform.app',
    dataProperties: {},
  },
};

export const demosRequiredDataSourceMap: {
  [availableProjects in CLI.AvailableProjects]: Partial<
    Record<CLI.CommonVariants, CLI.DataSourceConfiguration[] | undefined>
  >;
} = {
  [AvailableProjects.CommerceStarter]: {
    [CommonVariants.Default]: [DataSource.UniformFakeCommerce],
  },
  [AvailableProjects.CommerceAlgoliaDemo]: {
    [CommonVariants.Default]: [
      DataSource.Contentful,
      DataSource.UniformContent,
      DataSource.Contentstack,
      DataSource.Algolia,
      DataSource.KontentAi,
    ],
  },
  [AvailableProjects.SalesDemo]: {
    [CommonVariants.Default]: [
      DataSource.Contentful,
      DataSource.UniformContent,
      DataSource.Contentstack,
      DataSource.Algolia,
      DataSource.BrandData,
      DataSource.KontentAi,
    ],
  },
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: [],
  },
  [AvailableProjects.ComponentStarterKitRsc]: {
    [CommonVariants.Default]: [],
  },
};

export const demosVariantsModulesRequire: {
  [availableProjects in CLI.AvailableProjects]: Partial<
    Record<CLI.CommonVariants, (props: CLI.AdditionalModulesExecutorProps) => Promise<void> | undefined>
  >;
} = {
  [AvailableProjects.CommerceStarter]: {
    [CommonVariants.Default]: () => undefined,
  },
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: additionalModulesForComponentStarterKit({
      integrationList: [Integrations.Coveo],
      packagesList: ['@coveo/headless@2.31.0'],
    }),
  },
  [AvailableProjects.ComponentStarterKitRsc]: {
    [CommonVariants.Default]: additionalModulesForComponentStarterKit({
      integrationList: [Integrations.Coveo],
      packagesList: ['@coveo/headless@2.31.0'],
    }),
  },
  [AvailableProjects.CommerceAlgoliaDemo]: {
    [CommonVariants.Default]: () => undefined,
  },
  [AvailableProjects.SalesDemo]: {
    [CommonVariants.Default]: () => undefined,
  },
};
