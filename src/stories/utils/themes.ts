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
        label: 'Base 200',
        name: 'base-200',
        value: '#6b8ff0',
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

const javaDripTheme = {
  type: 'csk-parameter',
  value: {
    colors: [
      {
        label: 'Primary',
        name: 'primary',
        value: '#55493b',
      },
      {
        label: 'Primary Content',
        name: 'primary-content',
        value: '#FFFFFF',
      },
      {
        label: 'Secondary',
        name: 'secondary',
        value: '#ffffff',
      },
      {
        label: 'Secondary Content',
        name: 'secondary-content',
        value: '#000000',
      },
      {
        label: 'Accent',
        name: 'accent',
        value: '#F8E399',
      },
      {
        label: 'Accent Content',
        name: 'accent-content',
        value: '#000000',
      },
      {
        label: 'Info Content',
        name: 'info-content',
        value: '#E4E4E4',
      },
      {
        label: 'Base 200',
        name: 'base-200',
        value: '#b69066',
      },
      {
        label: 'Base 300',
        name: 'base-300',
        value: '#372f26',
      },
    ],
    themeName: 'javadrip',
    themeLabel: 'Java Drip',
  },
};

const themes = {
  uniform: uniformTheme,
  javadrip: javaDripTheme,
};

export const getTheme = (themeName: 'javadrip' | 'uniform') => ({
  _name: 'dummy_theme_composition',
  type: 'dummy_theme_composition',
  _id: 'ebf7db31-5e01-4874-afb4-d8d668457ba8',
  slots: {
    pageHeader: [
      {
        _name: 'dummy_slot',
        type: 'dummy_slot',
        parameters: {
          theme: themes[themeName],
        },
      },
    ],
  },
});
