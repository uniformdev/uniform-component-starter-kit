const javaDripTheme = {
  type: 'csk-parameter',
  value: {
    colors: [
      {
        name: 'primary',
        label: 'Primary',
        value: '#55493b',
      },
      {
        name: 'primary-content',
        label: 'Primary Content',
        value: '#FFFFFF',
      },
      {
        name: 'secondary',
        label: 'Secondary',
        value: '#ffffff',
      },
      {
        name: 'secondary-content',
        label: 'Secondary Content',
        value: '#000000',
      },
      {
        name: 'accent',
        label: 'Accent',
        value: '#F8E399',
      },
      {
        name: 'accent-content',
        label: 'Accent Content',
        value: '#000000',
      },
      {
        name: 'info-content',
        label: 'Info Content',
        value: '#E4E4E4',
      },
      {
        name: 'base-300',
        label: 'Base 300',
        value: '#372f26',
      },
    ],
    themeName: 'javadrip',
    themeLabel: 'Java Drip',
  },
};

const uniformTheme = {
  type: 'csk-parameter',
  value: {
    colors: [
      {
        name: 'primary',
        label: 'Primary',
        value: '#0052ED',
      },
      {
        name: 'primary-content',
        label: 'Primary Content',
        value: '#FFFFFF',
      },
      {
        name: 'secondary',
        label: 'Secondary',
        value: '#ffffff',
      },
      {
        name: 'secondary-content',
        label: 'Secondary Content',
        value: '#000000',
      },
      {
        name: 'accent',
        label: 'Accent',
        value: '#DF0000',
      },
      {
        name: 'accent-content',
        label: 'Accent Content',
        value: '#FFFFFF',
      },
      {
        name: 'info-content',
        label: 'Info Content',
        value: '#99C6FF',
      },
      {
        name: 'base-300',
        label: 'Base 300',
        value: '#001242',
      },
    ],
    themeName: 'uniform',
    themeLabel: 'Uniform',
  },
};

const themes = {
  javadrip: javaDripTheme,
  uniform: uniformTheme,
};

export const getTheme = (themeName: 'javadrip' | 'uniform') => ({
  _name: 'global',
  type: 'global',
  _id: 'ebf7db31-5e01-4874-afb4-d8d668457ba8',
  parameters: {
    theme: themes[themeName],
  },
});
