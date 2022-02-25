import React, {useCallback} from "react"
import Input from "@Components/Fields/Input"
import isNumeric from "antd/lib/_util/isNumeric";

const NumericInput = props => {
    const { onInput, id } = props
    const handleInput = useCallback((nextVal) => {
        if (isNumeric(nextVal)) {
            onInput(nextVal, id)
        }
    }, [onInput, id])
    return (
        <Input
            {...props}
            onInput={() => handleInput()}
            type="text"
        />
    )
}
export default NumericInput