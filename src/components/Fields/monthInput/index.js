import React from "react"
import {StyleIcon} from "./style"
import Input from "@Components/Fields/Input"

const MonthInput = (props) => (
    <div className="flex justify-space-between h-full">
        <Input {...props} />
        <StyleIcon>МЕС.</StyleIcon>
    </div>
)

export default MonthInput
