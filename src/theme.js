import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: '"Poppins", "Montserrat", "Roboto", sans-serif',
    h1: {
      fontSize: "clamp(2.2rem, 5vw, 4rem)",
      fontWeight: 800,
      fontFamily: '"Poppins", sans-serif',
    },
    h2: {
      fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
      fontWeight: 800,
      fontFamily: '"Poppins", sans-serif',
    },
    h4: {
      fontSize: "clamp(1.4rem, 3vw, 2.5rem)",
      fontWeight: 700,
      fontFamily: '"Poppins", sans-serif',
    },
    h6: {
      fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
      fontWeight: 600,
      fontFamily: '"Poppins", sans-serif',
    },
    body1: {
      fontSize: "1rem",
      fontFamily: '"Montserrat", sans-serif',
    },
    body2: {
      fontSize: "0.875rem",
      fontFamily: '"Montserrat", sans-serif',
    }
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "clamp(1rem, 3vw, 3rem)",
          paddingRight: "clamp(1rem, 3vw, 3rem)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Poppins", sans-serif',
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;