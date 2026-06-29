import { RESPONSIVE_SPACING_MAP } from './sizes.constants';
import { THEME_COLOR_TOKENS, THEME_DISPLAY_TOKENS } from './theme.constants';

/**
 * Filler function to generate classes in standard increments,
 * like w-1, w-2, w-3, etc.
 *
 * @param max - The maximum value to generate.
 * @param factor - The factor to multiply the value by.
 * @param unit - The unit to use for the value.
 * @returns An object with the values as keys and the values as values.
 */

export const generateValues = (max: number, factor = 1, unit = 'px') =>
  new Array(max)
    .fill(0)
    .map((_, i) => i)
    .reduce((acc: Record<number, string>, val) => {
      acc[val] = `${val * factor}${unit}`;
      return acc;
    }, {} as Record<number, string>);

/**
 * Generates responsive spacing utilities for margin and padding.
 * See https://www.figma.com/design/7lJPsq1DMhXcvhvG4d0OGm/Web-Design-System?node-id=82-10433&t=coM8h9ENFj1FsZBt-0
 * Since the `spacing-` tokens can be used for margin and padding in any direction,
 * this function maps the spacings to every prefix of margin, padding, and gap classes.
 */
export const generateResponsiveSpacingUtilities = () => {
  const BREAKPOINT = 'md'; // Uses theme breakpoint (800px)

  const spacingMap = RESPONSIVE_SPACING_MAP;

  const utilities: Record<string, Record<string, unknown>> = {};

  Object.entries(spacingMap).forEach(([spacingName, values]) => {
    // Padding utilities
    utilities[`.p-${spacingName}`] = {
      padding: `theme('spacing.${values.mobile}')`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        padding: `theme('spacing.${values.desktop}')`,
      },
    };

    utilities[`.px-${spacingName}`] = {
      paddingLeft: `theme('spacing.${values.mobile}')`,
      paddingRight: `theme('spacing.${values.mobile}')`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        paddingLeft: `theme('spacing.${values.desktop}')`,
        paddingRight: `theme('spacing.${values.desktop}')`,
      },
    };

    utilities[`.py-${spacingName}`] = {
      paddingTop: `theme('spacing.${values.mobile}')`,
      paddingBottom: `theme('spacing.${values.mobile}')`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        paddingTop: `theme('spacing.${values.desktop}')`,
        paddingBottom: `theme('spacing.${values.desktop}')`,
      },
    };

    utilities[`.pt-${spacingName}`] = {
      paddingTop: `theme('spacing.${values.mobile}')`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        paddingTop: `theme('spacing.${values.desktop}')`,
      },
    };

    utilities[`.pr-${spacingName}`] = {
      paddingRight: `theme('spacing.${values.mobile}')`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        paddingRight: `theme('spacing.${values.desktop}')`,
      },
    };

    utilities[`.pb-${spacingName}`] = {
      paddingBottom: `theme('spacing.${values.mobile}')`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        paddingBottom: `theme('spacing.${values.desktop}')`,
      },
    };

    utilities[`.pl-${spacingName}`] = {
      paddingLeft: `theme('spacing.${values.mobile}')`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        paddingLeft: `theme('spacing.${values.desktop}')`,
      },
    };

    // Margin utilities
    utilities[`.m-${spacingName}`] = {
      margin: `theme('spacing.${values.mobile}')`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        margin: `theme('spacing.${values.desktop}')`,
      },
    };

    utilities[`.mx-${spacingName}`] = {
      marginLeft: `theme('spacing.${values.mobile}')`,
      marginRight: `theme('spacing.${values.mobile}')`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        marginLeft: `theme('spacing.${values.desktop}')`,
        marginRight: `theme('spacing.${values.desktop}')`,
      },
    };

    utilities[`.my-${spacingName}`] = {
      marginTop: `theme('spacing.${values.mobile}')`,
      marginBottom: `theme('spacing.${values.mobile}')`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        marginTop: `theme('spacing.${values.desktop}')`,
        marginBottom: `theme('spacing.${values.desktop}')`,
      },
    };

    utilities[`.mt-${spacingName}`] = {
      marginTop: `theme('spacing.${values.mobile}')`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        marginTop: `theme('spacing.${values.desktop}')`,
      },
    };

    utilities[`.mr-${spacingName}`] = {
      marginRight: `theme('spacing.${values.mobile}')`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        marginRight: `theme('spacing.${values.desktop}')`,
      },
    };

    utilities[`.mb-${spacingName}`] = {
      marginBottom: `theme('spacing.${values.mobile}')`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        marginBottom: `theme('spacing.${values.desktop}')`,
      },
    };

    utilities[`.ml-${spacingName}`] = {
      marginLeft: `theme('spacing.${values.mobile}')`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        marginLeft: `theme('spacing.${values.desktop}')`,
      },
    };
    // Gap utilities - not including column gap which should always be gap-x-grid-gutter
    utilities[`.gap-${spacingName}`] = {
      gap: `theme('spacing.${values.mobile}')`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        gap: `theme('spacing.${values.desktop}')`,
      },
    };

    utilities[`.gap-y-${spacingName}`] = {
      rowGap: `theme('spacing.${values.mobile}')`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        rowGap: `theme('spacing.${values.desktop}')`,
      },
    };

    // Space utilities
    utilities[`.space-x-${spacingName} > :not(:last-child)`] = {
      '--tw-space-x-reverse': '0',
      'marginInlineStart': `calc(theme('spacing.${values.mobile}') * var(--tw-space-x-reverse))`,
      'marginInlineEnd': `calc(theme('spacing.${values.mobile}') * calc(1 - var(--tw-space-x-reverse)))`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        marginInlineStart: `calc(theme('spacing.${values.desktop}') * var(--tw-space-x-reverse))`,
        marginInlineEnd: `calc(theme('spacing.${values.desktop}') * calc(1 - var(--tw-space-x-reverse)))`,
      },
    };

    utilities[`.space-y-${spacingName} > :not(:last-child)`] = {
      '--tw-space-y-reverse': '0',
      'marginBlockStart': `calc(theme('spacing.${values.mobile}') * var(--tw-space-y-reverse))`,
      'marginBlockEnd': `calc(theme('spacing.${values.mobile}') * calc(1 - var(--tw-space-y-reverse)))`,
      [`@media (min-width: theme('screens.${BREAKPOINT}'))`]: {
        marginBlockStart: `calc(theme('spacing.${values.desktop}') * var(--tw-space-y-reverse))`,
        marginBlockEnd: `calc(theme('spacing.${values.desktop}') * calc(1 - var(--tw-space-y-reverse)))`,
      },
    };
  });

  return utilities;
};

/**
 * Generates theme-based utility classes from THEME_TOKENS for use with Tailwind's addComponents.
 * Creates CSS rules like: [data-theme="theme-light"] .text-primary { color: theme('colors.violet-900'); }
 *
 * @returns An object with CSS selectors as keys and style objects as values
 */
export const generateThemeColorUtilities = () => {
  const utilities: Record<string, Record<string, unknown>> = {};

  Object.entries(THEME_COLOR_TOKENS).forEach(([tokenName, tokenConfig]) => {
    const { property, themes } = tokenConfig;
    const cssValue =
      'cssValue' in tokenConfig && typeof tokenConfig.cssValue === 'string' ? tokenConfig.cssValue : undefined;

    // For each theme, generate a CSS rule
    Object.entries(themes).forEach(([themeName, colorName]) => {
      const selector = `[class~="${themeName}"] .${tokenName}`;

      /*
       * If cssValue is provided, use it as a template and replace {color} with the color name.
       * Otherwise, use the simple property: value format
       */
      const value = cssValue ? cssValue.replace('{color}', colorName) : `theme('colors.${colorName}')`;

      utilities[selector] = {
        [property]: value,
      };
    });
  });

  return utilities;
};

export const generateThemeDisplayUtilities = () => {
  const utilities: Record<string, Record<string, unknown>> = {};

  Object.entries(THEME_DISPLAY_TOKENS).forEach(([tokenName, tokenConfig]) => {
    const { property, themes } = tokenConfig;

    Object.entries(themes).forEach(([themeName, value]) => {
      const selector = `[class~="${themeName}"] .${tokenName}`;

      utilities[selector] = {
        [property]: value,
      };
    });
  });

  return utilities;
};
