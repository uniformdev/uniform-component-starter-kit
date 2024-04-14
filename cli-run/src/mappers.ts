import {
  additionalModulesForComponentStarterKit,
  getAlgoliaEnvs,
  getGoogleAnalyticsEnvs,
  getSegmentEnvs,
  getSupabaseEnvs,
  getInsightsEnvs,
} from './informationCollector';
import { AvailableProjects, CommonVariants } from './constants';
import { composeGetEnvFns, fetchThemePackThemes, updatePromptsBasedOnIntegration } from './utils';

export const demosVariantsGetEnvsMap: {
  [availableProjects in CLI.AvailableProjects]: Partial<
    Record<
      CLI.CommonVariants,
      (project: CLI.AvailableProjects, variant: CLI.CommonVariants) => Promise<Record<string, string>> | undefined
    >
  >;
} = {
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: () => undefined,
  },
  [AvailableProjects.ComponentStarterKitRsc]: {
    [CommonVariants.Default]: () => undefined,
  },
  [AvailableProjects.SalesDemo]: {
    [CommonVariants.Default]: composeGetEnvFns(
      getAlgoliaEnvs,
      getSegmentEnvs,
      getGoogleAnalyticsEnvs,
      getSupabaseEnvs,
      getInsightsEnvs
    ),
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
  Algolia: {
    name: 'Algolia',
    data: {
      applicationId: process.env.CLI_NEXT_PUBLIC_ALGOLIA_APPLICATION_ID as string,
      searchKey: process.env.CLI_NEXT_PUBLIC_ALGOLIA_SEARCH_KEY as string,
      allowedIndices: [process.env.CLI_ALGOLIA_INDEX_NAME as string],
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
    onIntegrationSet: updatePromptsBasedOnIntegration,
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
      localeMapping: {
        'en-CA': 'en-US',
        'en-GB': 'en-US',
        'en-NL': 'en-US',
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
      localeMapping: {
        'en-US': 'en-us',
        'en-CA': 'en-us',
        'en-GB': 'en-us',
        'en-NL': 'en-us',
        'fr-CA': 'fr-fr',
        'nl-NL': 'nl-nl',
      },
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
      localeMapping: {
        'en-CA': 'en-US',
        'en-GB': 'en-US',
        'en-NL': 'en-US',
      },
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
  UniformContent: {
    integrationType: 'canvas',
    integrationDisplayName: '',
    dataSourceDisplayName: 'Uniform Content',
    dataSourceId: 'uniformContent',
    connectorType: 'uniformContent',
    baseUrl: 'https://content.uniform.app',
    dataProperties: {
      localeMapping: {
        'en-CA': 'en-US',
        'en-GB': 'en-US',
        'en-NL': 'en-US',
      },
    },
  },
  BrandData: {
    integrationType: 'canvas',
    integrationDisplayName: '',
    dataSourceDisplayName: 'Brand Data',
    dataSourceId: 'brandData',
    connectorType: 'staticData',
    baseUrl: 'https://uniform.app',
    dataProperties: {
      localeMapping: {
        'en-CA': 'en-US',
        'en-GB': 'en-US',
        'en-NL': 'en-US',
      },
    },
  },
  JavaDripWordpressBlog: {
    integrationType: 'canvas',
    integrationDisplayName: '',
    dataSourceDisplayName: 'JavaDrip Wordpress Blog',
    dataSourceId: 'javadripWordpressBlog',
    connectorType: 'genericrestapi',
    baseUrl: 'https://public-api.wordpress.com/rest/v1.1/sites/227813160',
    dataProperties: {
      localeMapping: {
        'en-CA': 'en-US',
        'en-GB': 'en-US',
        'en-NL': 'en-US',
      },
    },
  },
};

export const demosRequiredDataSourceMap: {
  [availableProjects in CLI.AvailableProjects]: Partial<
    Record<CLI.CommonVariants, CLI.DataSourceConfiguration[] | undefined>
  >;
} = {
  [AvailableProjects.SalesDemo]: {
    [CommonVariants.Default]: [
      DataSource.Contentful,
      DataSource.UniformContent,
      DataSource.Contentstack,
      DataSource.BrandData,
      DataSource.KontentAi,
      DataSource.JavaDripWordpressBlog,
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
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: additionalModulesForComponentStarterKit({
      integrationList: [Integrations.Coveo, Integrations.Algolia],
      packagesList: [
        '@coveo/headless@2.31.0',
        '@algolia/recommend@4.18.0 --save-dev',
        'algoliasearch@4.18.0',
        'react-instantsearch@7.5.5',
        'react-instantsearch-core@7.5.5',
      ],
    }),
  },
  [AvailableProjects.ComponentStarterKitRsc]: {
    [CommonVariants.Default]: additionalModulesForComponentStarterKit({
      integrationList: [Integrations.Coveo, Integrations.Algolia],
      packagesList: [
        '@coveo/headless@2.31.0',
        '@algolia/recommend@4.18.0 --save-dev',
        'algoliasearch@4.18.0',
        'react-instantsearch@7.5.5',
        'react-instantsearch-core@7.5.5',
      ],
    }),
  },
  [AvailableProjects.SalesDemo]: {
    [CommonVariants.Default]: () => undefined,
  },
};
