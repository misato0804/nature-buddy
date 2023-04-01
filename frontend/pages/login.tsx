import {useEffect, useState} from "react";
import create from "../public/assets/images/createEventTop.jpg";
import FormTemplate from "@/components/elements/organisms/FormTemplate";
import LoginTopChild from "@/components/login-page/LoginTop.child";
import LoginInputChild from "@/components/login-page/LoginInput.child";

const Login = () => {

    const [childComponent, setChildComponent] = useState<number>(1)

    const LoginChild = (childComponent: number) => {
        switch (childComponent) {
            case 1:
                return <LoginTopChild setChildComponent={setChildComponent}/>
            case 2:
                return <LoginInputChild setChildComponent={setChildComponent}/>
            default:
                return <LoginTopChild setChildComponent={setChildComponent}/>
        }
    }

    return (
        <FormTemplate image={create} childComponent={LoginChild(childComponent)}/>
    );
};

export default Login;
