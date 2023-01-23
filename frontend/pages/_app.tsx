import Head from 'next/head';
import type {AppProps} from 'next/app'
import Layouts from "@/../../components/Layouts";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import theme from '../styles/theme';
import createEmotionCache from "../styles/createEmotionCache";
import {SessionProvider} from "next-auth/react"
import type { Session } from "next-auth"

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps<{session: Session}> {
    emotionCache?: EmotionCache
}

export default function App({Component, pageProps: {session, ...pageProps}, emotionCache = clientSideEmotionCache}: MyAppProps) {
    return (
        <>
            <SessionProvider session={session}>
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
