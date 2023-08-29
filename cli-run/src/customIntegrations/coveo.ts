const coveoIntegration = {
  type: 'coveo-canvas',
  displayName: 'Coveo',
  logoIconUrl: 'https://canary-coveo-mesh-integration.netlify.app/coveo-logo.svg',
  badgeIconUrl: 'https://canary-coveo-mesh-integration.netlify.app/coveo-badge.svg',
  category: 'content',
  baseLocationUrl: 'https://canary-coveo-mesh-integration.netlify.app',
  locations: {
    install: {
      description: [
        'Integrating Uniform with Coveo allows business users to have complete control over the presentation layer compositions assembled from the existing entries from Coveo without losing the freedom and flexibility of the Headless architecture.',
        'Uniform allows business users to personalize and A/B test content coming from Coveo without a developer effort.',
      ],
      informationUrl: 'https://docs.uniform.app/docs/integrations/content/coveo',
    },
    settings: {
      url: '/settings',
    },
    canvas: {
      parameterTypes: [
        {
          type: 'headless-components',
          displayName: 'Coveo Headless Components',
          configureUrl: '/headless-components/config',
          editorUrl: '/headless-components/editor',
          renderableInPropertyPanel: true,
        },
      ],
    },
    dataConnectors: [
      {
        type: 'coveo-data-connection',
        displayName: 'Coveo',
        dataSourceEditorUrl: '/data-connection-editor',
        dataArchetypes: {
          singleItem: {
            displayName: 'Single Item',
            typeEditorUrl: '/type-editor',
            dataEditorUrl: '/item-archetype/data-editor',
          },
          multipleItems: {
            displayName: 'Multiple Items',
            typeEditorUrl: '/type-editor',
            dataEditorUrl: '/item-archetype/data-editor',
          },
          query: {
            displayName: 'Query',
            typeEditorUrl: '/type-editor',
            dataEditorUrl: '/query-archetype/data-editor',
          },
          itemsByField: {
            displayName: 'Items by Field',
            typeEditorUrl: '/items-by-field-archetype/type-editor',
            dataEditorUrl: '/items-by-field-archetype/data-editor',
          },
        },
      },
    ],
  },
};

export default coveoIntegration;
