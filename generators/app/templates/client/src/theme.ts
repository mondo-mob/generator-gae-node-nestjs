import { grey } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';

/**
 * Some theme customisations we use commonly, also serving as example. Feel free to disregard
 * any theme overrrides you don't need. Some updates:
 *
 *  - Heading sizes are closer together and utilising the primary colour for contrast
 *  - Softer warning, error colours
 *  - Less harsh/drastic box shadow on papers by default
 *  - More border radius on papers
 *  - Button text is not UPPERCASE
 *
 */

export const PRIMARY_COLOUR = '#0A3D67';

const typographyTheme = (fontColour: string): TypographyOptions => ({
  h1: {
    fontSize: '2.625rem',
    lineHeight: 1.16,
    fontWeight: 'bold',
    color: fontColour,
  },
  h2: {
    fontSize: '2rem',
    lineHeight: 1.16,
    fontWeight: 'bold',
    color: fontColour,
  },
  h3: {
    fontSize: '1.375rem',
    lineHeight: 1.18,
    fontWeight: 'normal',
    color: fontColour,
  },
  h4: {
    fontSize: '1rem',
    lineHeight: 1.19,
    fontWeight: 'bold',
    color: fontColour,
  },
  h5: {
    fontSize: '1rem',
    lineHeight: 1.19,
    fontWeight: 'normal',
    color: fontColour,
  },
  subtitle1: {
    color: fontColour,
  },
  subtitle2: {
    color: fontColour,
  },
});

export default createMuiTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOUR,
      contrastText: '#fff',
    },
    secondary: {
      main: '#97c93d',
    },
    background: {
      default: '#f9f9f9',
    },
    text: {
      primary: grey[700],
      secondary: 'rgba(0, 0, 0, 0.4)',
    },
    error: {
      light: '#FBE3E3',
      main: '#F15F62',
    },
    warning: {
      main: '#F2C94C',
      dark: '#F2994A',
    },
    success: {
      light: '#6FCF97',
      main: '#27AE60',
    },
    info: {
      main: '#2D9CDB',
    },
  },
  typography: typographyTheme(PRIMARY_COLOUR),
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.05)',
      },
      rounded: {
        borderRadius: 10,
      },
    },
    MuiButton: {
      root: {
        borderRadius: 5,
        textTransform: 'none',
      },
    },
  },
});
