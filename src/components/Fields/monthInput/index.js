import React, {useCallback} from "react"
import {StyleIcon} from "./style"
import NumericInput from "../NumericInput";

const MonthInput = (props) => (
        <div className="flex justify-space-between h-full">
            <NumericInput
                {...props}
            />
            <StyleIcon>мес.</StyleIcon>
        </div>
    )
export default MonthInput
