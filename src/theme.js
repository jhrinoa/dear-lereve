import { createTheme } from '@mui/material/styles';

const SKY_BLUE = '#93dbe7';
const DARK_GREY = '#5e6b6f';
const WHITE = '#FFFFFF';

const theme = createTheme({
  palette: {
    text: {
      primary: DARK_GREY,
      secondary: DARK_GREY,
    },
    primary: {
      main: SKY_BLUE,
    },
    secondary: {
      main: DARK_GREY,
    },
  },
});

export default theme;
