import { CustomTheme } from 'types/globalTypes'
import { grey, deepOrange, green, orange } from '@mui/material/colors'

export const getDesignTokens = (mode: string): CustomTheme => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                  // palette values for light mode
                  primary: {
                      light: deepOrange[50],
                      main: orange[500],
                      dark: orange[900],
                      contrastText: '#fff',
                  },
                  divider: green[200],
                  text: {
                      primary: grey[900],
                      secondary: grey[800],
                  },
                  secondary: {
                      light: deepOrange[100],
                      main: deepOrange[500],
                      dark: deepOrange['A700'],
                      contrastText: '#000',
                  },
              }
            : {
                  // palette values for dark mode
                  primary: {
                      light: grey[900],
                      main: grey[500],
                      dark: grey[900],
                      contrastText: '#fff',
                  },
                  secondary: {
                      light: deepOrange[100],
                      main: deepOrange[500],
                      dark: deepOrange['A700'],
                      contrastText: '#000',
                  },
                  divider: grey[700],
                  background: {
                      default: grey[900],
                      paper: grey[900],
                  },
                  text: {
                      primary: deepOrange[500],
                      secondary: grey[500],
                  },
              }),
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1300,
            xl: 3840,
        },
    },
})
