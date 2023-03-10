import React, {useState} from "react";
import {useActivityContext} from "@/lib/context/activityInputContext";

type Error = {
    error: boolean,
    message: string
}

const useValidator = () => {

    const {...context} = useActivityContext()

    const stringValidator = (text: string, message: string, min?: number, max?: number) : Error =>  {
        if (min && text.length < min) {
            return { error: true, message }
        }
        if (max && text.length > max) {
            return {error: true, message}
        }
        return { error: false, message: "" }
    }

    const allValidator = () => {
        if(context.title.length < 1 || context.description.length < 20 || context.meetingPoint === undefined || context.spots === 0 || context.duration.length < 3 ) {
            return false
        }
        return true;
    }

    return {stringValidator, allValidator}
}

export default useValidator;