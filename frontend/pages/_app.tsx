import Head from 'next/head';
import type {AppProps} from 'next/app'
import Layouts from "../src/components/layouts/Layouts";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import theme from '../src/styles/theme';
import createEmotionCache from "../src/styles/createEmotionCache";
import {SessionProvider} from "next-auth/react"
import type {Session} from "next-auth"
import {UserProvider} from "@/lib/context/userInputContext";
import {ActivityProvider} from "@/lib/context/activityInputContext";
import {NotificationProvider} from "@/lib/context/socketContext";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps<{ session: Session }> {
    emotionCache?: EmotionCache
}

export default function App({Component, pageProps, emotionCache = clientSideEmotionCache}: MyAppProps) {
    return (
        <>
            <CacheProvider value={emotionCache}>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                </Head>
                <ThemeProvider theme={theme}>
                    <SessionProvider session={pageProps.session}>
                        <UserProvider>
                            <ActivityProvider>
                                <NotificationProvider>
                                    <Layouts>
                                        <CssBaseline/>
                                        <Component {...pageProps} />
                                    </Layouts>
                                </NotificationProvider>
                            </ActivityProvider>
                        </UserProvider>
                    </SessionProvider>
                </ThemeProvider>
            </CacheProvider>
        </>
    )
}
