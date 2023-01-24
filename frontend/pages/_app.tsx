import Head from 'next/head';
import type {AppProps} from 'next/app'
import Layouts from "../src/components/layouts/Layouts";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import theme from '../src/styles/theme';
import createEmotionCache from "../src/styles/createEmotionCache";
import {SessionProvider} from "next-auth/react"
import type { Session } from "next-auth"

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps<{session: Session}> {
    emotionCache?: EmotionCache
}

export default function App({Component, pageProps, emotionCache = clientSideEmotionCache}: MyAppProps) {
    return (
        <>
            <SessionProvider session={pageProps.session}>
                <CacheProvider value={emotionCache}>
                    <ThemeProvider theme={theme}>
                        <Layouts>
                            <CssBaseline/>
                            <Component {...pageProps} />
                        </Layouts>
                    </ThemeProvider>
                </CacheProvider>
            </SessionProvider>
        </>
    )
}
