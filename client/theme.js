import { createMuiTheme } from '@material-ui/core/styles'
import { red, brown } from '@material-ui/core/colors'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: "#3bc8e7",
      light: '#f05545',
      dark: '#7f0000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fbfffc',
      main: '#c8e6c9',
      dark: '#97b498',
      contrastText: '#37474f',
    },
    openTitle: red['500'],
    protectedTitle: brown['300'],
    type: 'light',
    background: {
      default: "#333333"
    },
  },
  shape: {
    borderRadius: '8px'
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    },
    MuiButtonGroup: {
      disableRipple: true,
      disableFocusRipple: true
    },
    MuiButton: {
      disableRipple: true,
      disableFocusRipple: true
    }
  }
})

export default theme