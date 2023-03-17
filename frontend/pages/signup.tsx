import {useEffect, useState} from "react";
import mountain from "../public/assets/images/climbing.jpg";
import FormTemplate from "@/components/elements/organisms/FormTemplate";
import SignupTopChild from "@/components/signup-page/SignupTop.child";
import SignupInputChild from "@/components/signup-page/SignupInput.child";
import SignupLocationChild from "@/components/signup-page/SignupLocation.child";
import SignupInterestChild from "@/components/signup-page/SignupInterest.child";
import { useSession} from "next-auth/react";
import { signOut } from "next-auth/react";

const Signup = () => {

    const { data: session, status } = useSession()
    const [childComponent, setChildComponent] = useState<number>(1)

    useEffect(() => {
        if(session) {
            setChildComponent(3)
        }
    }, [status])

    if(status === "loading") {
        return <h1>Loading...</h1>
    }

    const child = (childComponent: number) => {
        switch (childComponent) {
            case 1:
                return <SignupTopChild setChildComponent={setChildComponent}/>
            case 2:
                return <SignupInputChild setChildComponent={setChildComponent}/>
            case 3:
                return <SignupLocationChild setChildComponent={setChildComponent}/>
            case 4:
                return <SignupInterestChild/>
            default:
                return <SignupTopChild setChildComponent={setChildComponent}/>
        }
    }

    return (
        <FormTemplate image={mountain} childComponent={child(childComponent)}/>
    );
};

export default Signup;