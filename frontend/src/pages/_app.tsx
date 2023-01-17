import Head from 'next/head';
import type {AppProps} from 'next/app'
import Layouts from "@/components/Layouts";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import theme from '../theme';
import createEmotionCache from "@/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache
}

export default function App(props: MyAppProps) {
    const {Component, pageProps, emotionCache = clientSideEmotionCache} = props
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <ThemeProvider theme={theme}>
                <Layouts>
                    <CssBaseline/>
                    <Component {...pageProps} />
                </Layouts>
            </ThemeProvider>
        </CacheProvider>
    )
}
