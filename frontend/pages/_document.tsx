import {Html, Head, Main, NextScript} from 'next/document'
import Hero from "@/components/hero-page/Hero";
import SignupLocationChild from "@/components/signup-page/SignupLocation.child";

export default function Document() {

    return (
        <Html lang="en">
            <Head>
                 eslint-disable-next-line @next/next/no-sync-scripts
                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWpYi0SxFbY9ko7pVvW9aEkvAycSNt9io&libraries=places"
                async defer></script>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
