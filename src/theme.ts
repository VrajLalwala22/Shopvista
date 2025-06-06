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
  spacing: 8,
  components: {
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.down('sm')]: {
            paddingLeft: 16,
            paddingRight: 16,
          },
          [theme.breakpoints.between('sm', 'md')]: {
            paddingLeft: 24,
            paddingRight: 24,
          },
          [theme.breakpoints.up('md')]: {
            paddingLeft: 32,
            paddingRight: 32,
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme; 