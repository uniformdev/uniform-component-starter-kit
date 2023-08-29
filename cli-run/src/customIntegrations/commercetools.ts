const commercetoolsIntegration = {
  type: 'commercetools-mesh-integration',
  displayName: 'Commercetools',
  logoIconUrl: 'https://canary-commercetools-mesh-integration.netlify.app/commercetools-logo.png',
  badgeIconUrl: 'https://canary-commercetools-mesh-integration.netlify.app/commercetools-badge.svg',
  category: 'unknown',
  baseLocationUrl: 'https://canary-commercetools-mesh-integration.netlify.app',
  locations: {
    install: {
      description: [
        'Integrating Uniform with commercetools allows business users to have complete control over the presentation layer compositions assembled from the existing product content from commercetools without losing the freedom and flexibility of the Headless architecture.',
        'Uniform allows business users to personalize and A/B test product content coming from commercetools without a developer effort.',
      ],
    },
    settings: {
      url: '/settings',
    },
    canvas: {
      parameterTypes: [
        {
          type: 'commercetoolsProduct',
          displayName: 'Commercetools Product',
          configureUrl: '/product-selector/config',
          editorUrl: '/product-selector/editor',
          renderableInPropertyPanel: false,
        },
        {
          type: 'commercetoolsProductList',
          displayName: 'Commercetools Product List',
          configureUrl: '/product-selector/config',
          editorUrl: '/product-selector/editor',
          renderableInPropertyPanel: false,
        },
        {
          type: 'commercetoolsProductQuery',
          displayName: 'Commercetools Product Query',
          configureUrl: '/product-query/config',
          editorUrl: '/product-query/editor',
          renderableInPropertyPanel: false,
        },
        {
          type: 'commercetoolsCategorySelector',
          displayName: 'Commercetools Category',
          configureUrl: '/category-selector/config',
          editorUrl: '/category-selector/editor',
          editorLocations: {
            'category-editor-dialog': {
              url: '/category-editor-dialog',
            },
          },
          renderableInPropertyPanel: false,
        },
      ],
    },
  },
};

export default commercetoolsIntegration;
