import {Html, Head, Main, NextScript} from 'next/document'
import Hero from "@/components/hero-page/Hero";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <script
                    async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWpYi0SxFbY9ko7pVvW9aEkvAycSNt9io&libraries=places"
                ></script>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
