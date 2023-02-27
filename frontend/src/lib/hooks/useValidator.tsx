import React, {useState} from "react";

type Error = {
    error: boolean,
    message: string
}

const useValidator = () => {

    const stringValidator = (text: string, message: string, min?: number, max?: number) : Error =>  {
        if (min && text.length < min) {
            return { error: true, message }
        }
        if (max && text.length > max) {
            return {error: true, message}
        }
        return { error: false, message: "" }
    }


    return {stringValidator}
}

export default useValidator;