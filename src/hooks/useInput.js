import {useState} from "react";
import {useValidation} from "./useValidation.js";

export const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setIsDirty] = useState(false)

    const valid = useValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const insertValue = (text) => {
        setValue(text)
    }

    const onBlur = (e) => {
        setIsDirty(true)
    }

    return {
        value,
        onChange,
        insertValue,
        onBlur,
        isDirty,
        ...valid
    }
}