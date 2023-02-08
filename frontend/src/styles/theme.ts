import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';


const theme = createTheme({
//    setting for theme
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        fontFamily: "Roboto"
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 768,
            lg: 1025,
            xl: 1536,
        },
    },
});

export default theme;