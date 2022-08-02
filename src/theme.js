import { createTheme } from '@mui/material/styles';

const PRIMARY_COLOR = '#4d9ad2';
const DARK_GREY = '#5e6b6f';
// const WHITE = '#FFFFFF';
// const PINK = '#eac8d4';

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: DARK_GREY,
    },
  },
});

export default theme;
