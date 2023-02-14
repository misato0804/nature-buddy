import {useState} from "react";
import mountain from "../public/assets/images/climbing.jpg";
import FormTemplate from "@/components/elements/organisms/FormTemplate";
import SignupTopChild from "@/components/signup-page/SignupTop.child";
import SignupInputChild from "@/components/signup-page/SignupInput.child";
import SignupLocationChild from "@/components/signup-page/SignupLocation.child";
import SignupInterestChild from "@/components/signup-page/SignupInterest.child";

const Signup = () => {
    const [childComponent, setChildComponent] = useState<number>(1)

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