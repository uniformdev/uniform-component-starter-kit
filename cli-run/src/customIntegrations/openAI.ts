const openAIIntegration = {
  type: 'openai',
  displayName: 'OpenAI',
  logoIconUrl: 'https://uniform-mesh-openai.vercel.app/openai.svg',
  badgeIconUrl: 'https://uniform-mesh-openai.vercel.app/openai.svg',
  category: 'unknown',
  baseLocationUrl: 'https://uniform-mesh-openai.vercel.app',
  locations: {
    settings: {
      url: '/settings',
    },
    canvas: {
      parameterTypes: [
        {
          type: 'ai-generated-text',
          displayName: 'Text (AI generated)',
          configureUrl: '/text/configure',
          editorUrl: '/text/edit',
          editorLocations: {
            choices: {
              url: '../choices',
            },
          },
          renderableInPropertyPanel: true,
        },
        {
          type: 'ai-generated-template',
          displayName: 'Template (AI generated)',
          configureUrl: '/template/configure',
          editorUrl: '/template/edit',
          editorLocations: {
            choices: {
              url: '../choices',
            },
          },
          renderableInPropertyPanel: true,
        },
      ],
    },
  },
};

export default openAIIntegration;
