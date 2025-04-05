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
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "clamp(2.5rem, 8vw, 4rem)",
    },
    h2: {
      fontSize: "clamp(2rem, 6vw, 3.5rem)",
    },
    h4: {
      fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
    },
    h6: {
      fontSize: "clamp(1rem, 2vw, 1.25rem)",
    },
    body1: {
      fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
    },
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
  },
});

export default theme;