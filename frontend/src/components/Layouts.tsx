import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Children = {
    children: React.ReactNode
}

const Layouts = ({children} : Children) => {
    return (
        <>
            <Header/>
            <main>{ children }</main>
            <Footer/>
        </>
    );
};

export default Layouts;