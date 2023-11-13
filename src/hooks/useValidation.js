import {useEffect, useState} from "react";
import striptags from "striptags";

export const useValidation = (value, validations) => {
    const [isEmpty, setIsEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const [inputValid, setInputValid] = useState(false)

    useEffect(() => {
        let noTagsValue = striptags(value)
        let trimmedValue = noTagsValue.replace(/(&nbsp;|\s)+/g, ' ').trim()

        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    trimmedValue.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break
                case 'isEmpty':
                    const reg = /\S/
                    reg.test(trimmedValue) ? setIsEmpty(false) : setIsEmpty(true)
                    break
                case 'maxLength':
                    trimmedValue.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
                    break
                case 'isEmail':
                    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || minLengthError || maxLengthError || emailError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }

    }, [isEmpty, minLengthError, maxLengthError, emailError])

    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        emailError,
        inputValid
    }
}