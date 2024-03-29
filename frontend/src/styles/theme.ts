import {createTheme, duration} from '@mui/material/styles';
import {Prompt} from '@next/font/google'

const theme = createTheme();

export const prompt = Prompt({
    weight: ['300', '400', '500', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap',
    fallback: ['Helvetica','Arial',"sans-serif"]
})

theme.typography.fontFamily = prompt.style.fontFamily

theme.breakpoints.values = {
    xs: 0,
    sm: 600,
    md: 768,
    lg: 1025,
    xl: 1536,
}

theme.typography.h1 = {
    fontFamily: prompt.style.fontFamily,
    fontSize: '1.8rem',
    fontWeight: 900,
    [theme.breakpoints.up("sm")]: {
        fontSize: "2.4rem",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "4rem"
    },
}

theme.typography.h2 = {
    fontFamily: prompt.style.fontFamily,
    fontSize: '1.5rem',
    [theme.breakpoints.up("sm")]: {
        fontSize: "2rem"
    }
}

theme.typography.h3 = {
    fontFamily: prompt.style.fontFamily,
    fontSize: '1.2rem',
    [theme.breakpoints.up("sm")]: {
        fontSize: "1.8rem"
    }
}

theme.typography.h4 = {
    fontFamily: prompt.style.fontFamily,
    fontSize: '1rem',
    fontWeight: 500,
    [theme.breakpoints.up("sm")]: {
        fontSize: "1.2rem",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "1.4rem"
    },
}

theme.typography.h5 = {
    fontFamily: prompt.style.fontFamily,
    fontSize: '.8rem',
    fontWeight: 500,
    [theme.breakpoints.up("sm")]: {
        fontSize: "1rem",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "1.2rem"
    },
}

theme.typography.h6 = {
    fontFamily: prompt.style.fontFamily,
    fontSize: '.6rem',
    fontWeight: 700,
    [theme.breakpoints.up("sm")]: {
        fontSize: ".8rem",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "1.0rem"
    },
}


export default theme;