import type { ReactChild } from "react";
import Header from "./Header";
import Footer from "./Footer";


type Children = {
    children: React.ReactNode
}

const Layouts = ({children} : Children) => {
    return (
        <>
            <Header/>
                <main>{ children}</main>
            <Footer/>
        </>
    );
};

export default Layouts;