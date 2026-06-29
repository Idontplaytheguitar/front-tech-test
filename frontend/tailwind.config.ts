import {BOX_SHADOWS, COLORS} from './tailwind-config/colors.constants'
import {MAX_SPACER, MAX_Z_INDEX, SPACER_VALUE} from './tailwind-config/constants'
import {SCREENS} from './tailwind-config/screens.constants'
import {
  ASPECT_RATIO,
  BORDER_RADIUS,
  GRID_COLUMNS,
  GRID_MAX_WIDTH,
  RESPONSIVE_GRID_GUTTER_UTILITY,
  RESPONSIVE_WIDTH_UTILITIES,
  SPACING,
  WIDTHS,
} from './tailwind-config/sizes.constants'
import {
  ANIMATIONS,
  KEYFRAMES,
  TIMING_FUNCTIONS,
  TRANSITION_DURATIONS,
} from './tailwind-config/transitions.constants'
import {
  FONT_FAMILIES,
  FONT_WEIGHTS,
  LEGACY_FONT_SIZES,
  LETTER_SPACING,
  MAX_FONT_SIZE,
  PRIMITIVE_LETTER_SPACINGS,
  PRIMITIVE_LINE_HEIGHTS,
  PRIMITIVE_TEXT_SIZES,
  RESPONSIVE_FONT_SIZE_UTILITIES,
  RESPONSIVE_FONT_WEIGHT_UTILITIES,
  RESPONSIVE_LETTER_SPACING_UTILITIES,
  RESPONSIVE_LINE_HEIGHT_UTILITIES,
} from './tailwind-config/typography.constants'
import {
  generateResponsiveSpacingUtilities,
  generateThemeColorUtilities,
  generateThemeDisplayUtilities,
  generateValues,
} from './tailwind-config/utilities'

const theme = {
  screens: SCREENS,
  colors: ({colors}: {colors: Record<string, string>}) => ({
    ...colors,
    ...COLORS,
  }),
  columns: {
    auto: 'auto',
    ...generateValues(GRID_COLUMNS, 1, ''),
  },
  spacing: {
    px: '1px',
    half: '5px',
    ...generateValues(MAX_SPACER, SPACER_VALUE),
    ...SPACING,
  },
  borderColor: ({theme}: {theme: (path: string) => Record<string, unknown>}) => ({
    ...(theme('colors') as Record<string, unknown>),
    DEFAULT: 'currentColor',
  }),
  borderRadius: BORDER_RADIUS,
  fontFamily: FONT_FAMILIES,
  fontSize: {
    ...LEGACY_FONT_SIZES,
    ...PRIMITIVE_TEXT_SIZES,
    ...generateValues(MAX_FONT_SIZE),
  },
  lineHeight: {
    ...PRIMITIVE_LINE_HEIGHTS,
    ...generateValues(MAX_FONT_SIZE),
  },
  fontWeight: FONT_WEIGHTS,
  letterSpacing: {
    ...LETTER_SPACING,
    ...PRIMITIVE_LETTER_SPACINGS,
  },
  maxWidth: {
    grid: `${GRID_MAX_WIDTH}px`,
    ...generateValues(100, SPACER_VALUE),
    ...WIDTHS,
  },
  height: {
    auto: 'auto',
    full: '100%',
    ...generateValues(MAX_SPACER, SPACER_VALUE),
    ...SPACING,
  },
  transitionTimingFunction: TIMING_FUNCTIONS,
  transitionDuration: TRANSITION_DURATIONS,
  zIndex: {
    auto: 'auto',
    ...generateValues(MAX_Z_INDEX, 10, ''),
  },
  aspectRatio: ASPECT_RATIO,
  keyframes: {
    ...KEYFRAMES,
    marquee: {
      from: {transform: 'translateX(0)'},
      to: {transform: 'translateX(-50%)'},
    },
  },
  animation: {
    ...ANIMATIONS,
    marquee: 'marquee 40s linear infinite',
  },
  extend: {
    // Extending widths rather than overriding them to preserve legacy behavior and default values.
    width: {
      ...SPACING,
      ...WIDTHS,
    },
    boxShadow: BOX_SHADOWS,
  },
};

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme,
  plugins: [
    function ({addComponents}: {addComponents: (components: Record<string, Record<string, unknown>>) => void}) {
      addComponents({
        // Responsive classes

        // Sizing utiliy classes
        ...RESPONSIVE_WIDTH_UTILITIES,
        // Responsive spacing utilities mapped to various prefixes like p-, m-, etc.
        ...generateResponsiveSpacingUtilities(),
        ...RESPONSIVE_GRID_GUTTER_UTILITY,

        // Typography utility classes
        ...RESPONSIVE_FONT_WEIGHT_UTILITIES,
        ...RESPONSIVE_FONT_SIZE_UTILITIES,
        ...RESPONSIVE_LINE_HEIGHT_UTILITIES,
        ...RESPONSIVE_LETTER_SPACING_UTILITIES,

        // Theme-based utility classes
        ...generateThemeColorUtilities(),
        ...generateThemeDisplayUtilities(),
      });
    },
  ],
};
