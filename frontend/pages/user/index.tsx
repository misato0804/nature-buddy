import React, {useEffect} from 'react';
import {Session} from "next-auth";
import {getSession, useSession} from "next-auth/react";

const UserTop = () => {

    useEffect(() => {
        const getSession = async () => {
            const session = await getSession()
            console.log(session)
            console.log("HELLO")
        }


    }, [])



    return (
        <div>
        </div>
    );
};

export default UserTop;