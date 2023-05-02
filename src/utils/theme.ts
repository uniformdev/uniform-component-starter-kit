import Color from 'color';

type Input = {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  'primary-focus': string;
  'secondary-focus': string;
  'accent-focus': string;
  'neutral-focus': string;
  'base-100': string;
  'base-200': string;
  'base-300': string;
  'base-content': string;
  info: string;
  'info-content': string;
  success: string;
  'success-content': string;
  warning: string;
  'warning-content': string;
  error: string;
  'error-content': string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type Output = {
  '--p': string;
  '--pf': string;
  '--pc': string;
  '--s': string;
  '--sf': string;
  '--sc': string;
  '--a': string;
  '--af': string;
  '--ac': string;
  '--n': string;
  '--nf': string;
  '--nc': string;
  '--b1': string;
  '--b2': string;
  '--b3': string;
  '--bc': string;
  '--in': string;
  '--inc': string;
  '--su': string;
  '--suc': string;
  '--wa': string;
  '--wac': string;
  '--er': string;
  '--erc': string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const colorNames: Input = {
  primary: '--p',
  'primary-focus': '--pf',
  'primary-content': '--pc',

  secondary: '--s',
  'secondary-focus': '--sf',
  'secondary-content': '--sc',

  accent: '--a',
  'accent-focus': '--af',
  'accent-content': '--ac',

  neutral: '--n',
  'neutral-focus': '--nf',
  'neutral-content': '--nc',

  'base-100': '--b1',
  'base-200': '--b2',
  'base-300': '--b3',
  'base-content': '--bc',

  info: '--in',
  'info-content': '--inc',

  success: '--su',
  'success-content': '--suc',

  warning: '--wa',
  'warning-content': '--wac',

  error: '--er',
  'error-content': '--erc',
};

const generateForegroundColorFrom = (input: string, percentage = 0.8): string => {
  const color = Color(input);
  const lightColor = Color('white');
  const darkColor = Color('black');
  const saturation = 10;

  const mixColor = color.isDark() ? lightColor : darkColor;
  const hslArray = mixColor.mix(color, percentage).saturate(saturation).hsl().array();

  const [h, s, l] = hslArray.map(value => value.toPrecision(5).replace(/\.?0+$/, ''));

  return `${h} ${s}% ${l}%`;
};

const convertToHsl = (input: Input) => {
  const resultObj: Partial<Output> = {};
  if (typeof input === 'object' && input !== null) {
    Object.entries(input).forEach(([rule, value]) => {
      if (colorNames.hasOwnProperty(rule)) {
        const hslArray = Color(value).hsl().array();
        resultObj[colorNames[rule]] =
          hslArray[0].toPrecision(5).replace(/\.?0+$/, '') +
          ' ' +
          hslArray[1].toPrecision(5).replace(/\.?0+$/, '') +
          '%' +
          ' ' +
          hslArray[2].toPrecision(5).replace(/\.?0+$/, '') +
          '%';
      } else {
        resultObj[rule] = value;
      }

      // auto generate focus colors
      if (!input.hasOwnProperty('primary-focus')) {
        const darkerHslArray = Color(input['primary']).darken(0.2).hsl().array();
        resultObj['--pf'] =
          darkerHslArray[0].toPrecision(5).replace(/\.?0+$/, '') +
          ' ' +
          darkerHslArray[1].toPrecision(5).replace(/\.?0+$/, '') +
          '%' +
          ' ' +
          darkerHslArray[2].toPrecision(5).replace(/\.?0+$/, '') +
          '%';
      }

      if (!input.hasOwnProperty('secondary-focus')) {
        const darkerHslArray = Color(input['secondary']).darken(0.2).hsl().array();
        resultObj['--sf'] =
          darkerHslArray[0].toPrecision(5).replace(/\.?0+$/, '') +
          ' ' +
          darkerHslArray[1].toPrecision(5).replace(/\.?0+$/, '') +
          '%' +
          ' ' +
          darkerHslArray[2].toPrecision(5).replace(/\.?0+$/, '') +
          '%';
      }

      if (!input.hasOwnProperty('accent-focus')) {
        const darkerHslArray = Color(input['accent']).darken(0.2).hsl().array();
        resultObj['--af'] =
          darkerHslArray[0].toPrecision(5).replace(/\.?0+$/, '') +
          ' ' +
          darkerHslArray[1].toPrecision(5).replace(/\.?0+$/, '') +
          '%' +
          ' ' +
          darkerHslArray[2].toPrecision(5).replace(/\.?0+$/, '') +
          '%';
      }

      if (!input.hasOwnProperty('neutral-focus')) {
        const darkerHslArray = Color(input['neutral']).darken(0.2).hsl().array();
        resultObj['--nf'] =
          darkerHslArray[0].toPrecision(5).replace(/\.?0+$/, '') +
          ' ' +
          darkerHslArray[1].toPrecision(5).replace(/\.?0+$/, '') +
          '%' +
          ' ' +
          darkerHslArray[2].toPrecision(5).replace(/\.?0+$/, '') +
          '%';
      }

      // auto generate base colors
      if (!input.hasOwnProperty('base-100')) {
        resultObj['--b1'] = 0 + ' ' + 0 + '%' + ' ' + 100 + '%';
      }

      if (!input.hasOwnProperty('base-200')) {
        const darkerHslArray = Color(input['base-100']).darken(0.1).hsl().array();
        resultObj['--b2'] =
          darkerHslArray[0].toPrecision(5).replace(/\.?0+$/, '') +
          ' ' +
          darkerHslArray[1].toPrecision(5).replace(/\.?0+$/, '') +
          '%' +
          ' ' +
          darkerHslArray[2].toPrecision(5).replace(/\.?0+$/, '') +
          '%';
      }

      if (!input.hasOwnProperty('base-300')) {
        if (input.hasOwnProperty('base-200')) {
          const darkerHslArray = Color(input['base-200']).darken(0.1).hsl().array();
          resultObj['--b3'] =
            darkerHslArray[0].toPrecision(5).replace(/\.?0+$/, '') +
            ' ' +
            darkerHslArray[1].toPrecision(5).replace(/\.?0+$/, '') +
            '%' +
            ' ' +
            darkerHslArray[2].toPrecision(5).replace(/\.?0+$/, '') +
            '%';
        } else {
          const darkerHslArray = Color(input['base-100']).darken(0.1).darken(0.1).hsl().array();
          resultObj['--b3'] =
            darkerHslArray[0].toPrecision(5).replace(/\.?0+$/, '') +
            ' ' +
            darkerHslArray[1].toPrecision(5).replace(/\.?0+$/, '') +
            '%' +
            ' ' +
            darkerHslArray[2].toPrecision(5).replace(/\.?0+$/, '') +
            '%';
        }
      }

      // auto generate state colors
      if (!input.hasOwnProperty('info')) {
        resultObj['--in'] = 198 + ' ' + 93 + '%' + ' ' + 60 + '%';
      }
      if (!input.hasOwnProperty('success')) {
        resultObj['--su'] = 158 + ' ' + 64 + '%' + ' ' + 52 + '%';
      }
      if (!input.hasOwnProperty('warning')) {
        resultObj['--wa'] = 43 + ' ' + 96 + '%' + ' ' + 56 + '%';
      }
      if (!input.hasOwnProperty('error')) {
        resultObj['--er'] = 0 + ' ' + 91 + '%' + ' ' + 71 + '%';
      }

      // auto generate content colors
      if (!input.hasOwnProperty('base-content')) {
        resultObj['--bc'] = generateForegroundColorFrom(input['base-100']);
      }
      if (!input.hasOwnProperty('primary-content')) {
        resultObj['--pc'] = generateForegroundColorFrom(input['primary']);
      }

      if (!input.hasOwnProperty('secondary-content')) {
        resultObj['--sc'] = generateForegroundColorFrom(input['secondary']);
      }

      if (!input.hasOwnProperty('accent-content')) {
        resultObj['--ac'] = generateForegroundColorFrom(input['accent']);
      }

      if (!input.hasOwnProperty('neutral-content')) {
        resultObj['--nc'] = generateForegroundColorFrom(input['neutral']);
      }

      if (!input.hasOwnProperty('info-content')) {
        if (input.hasOwnProperty('info')) {
          resultObj['--inc'] = generateForegroundColorFrom(input['info']);
        } else {
          resultObj['--inc'] = 198 + ' ' + 100 + '%' + ' ' + 12 + '%';
        }
      }

      if (!input.hasOwnProperty('success-content')) {
        if (input.hasOwnProperty('success')) {
          resultObj['--suc'] = generateForegroundColorFrom(input['success']);
        } else {
          resultObj['--suc'] = 158 + ' ' + 100 + '%' + ' ' + 10 + '%';
        }
      }

      if (!input.hasOwnProperty('warning-content')) {
        if (input.hasOwnProperty('warning')) {
          resultObj['--wac'] = generateForegroundColorFrom(input['warning']);
        } else {
          resultObj['--wac'] = 43 + ' ' + 100 + '%' + ' ' + 11 + '%';
        }
      }

      if (!input.hasOwnProperty('error-content')) {
        if (input.hasOwnProperty('error')) {
          resultObj['--erc'] = generateForegroundColorFrom(input['error']);
        } else {
          resultObj['--erc'] = 0 + ' ' + 100 + '%' + ' ' + 14 + '%';
        }
      }

      // auto generate css variables
      if (!input.hasOwnProperty('--rounded-box')) {
        resultObj['--rounded-box'] = '1rem';
      }
      if (!input.hasOwnProperty('--rounded-btn')) {
        resultObj['--rounded-btn'] = '0.5rem';
      }
      if (!input.hasOwnProperty('--rounded-badge')) {
        resultObj['--rounded-badge'] = '1.9rem';
      }
      if (!input.hasOwnProperty('--animation-btn')) {
        resultObj['--animation-btn'] = '0.25s';
      }
      if (!input.hasOwnProperty('--animation-input')) {
        resultObj['--animation-input'] = '.2s';
      }
      if (!input.hasOwnProperty('--btn-text-case')) {
        resultObj['--btn-text-case'] = 'uppercase';
      }
      if (!input.hasOwnProperty('--btn-focus-scale')) {
        resultObj['--btn-focus-scale'] = '0.95';
      }
      if (!input.hasOwnProperty('--border-btn')) {
        resultObj['--border-btn'] = '1px';
      }
      if (!input.hasOwnProperty('--tab-border')) {
        resultObj['--tab-border'] = '1px';
      }
      if (!input.hasOwnProperty('--tab-radius')) {
        resultObj['--tab-radius'] = '0.5rem';
      }
    });
    return resultObj;
  }
  return input;
};

const defaultThemeNames = ['uniform', 'javadrip'];

export const generateCustomTheme = (themeName?: string, compositionColors?: Types.ThemeColors[]) => {
  if (!compositionColors || !themeName) return '';
  const colors = compositionColors.reduce<Input>((acc, color) => ({ ...acc, [color.name]: color.value }), {} as Input);

  const hls = convertToHsl(colors);

  const generatedTheme = !defaultThemeNames.includes(themeName)
    ? `<style>
   [data-theme=${themeName}] {
    ${Object.entries(hls).reduce((acc, [key, value]) => {
      acc += `${key}: ${value};\n\r`;
      return acc;
    }, '')}
   }
  </style>`
    : '';

  return generatedTheme;
};
