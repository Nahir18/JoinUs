import ChekBox from "@Components/Fields/CheckBox"
import React from "react";

export const addGoalsModalConfig = (selectedGoals, checkDocument) => {
    return [
        {
            id: 1,
            key: "",
            name: "№",
            size: "10%"
        },
        {
            id: 2,
            key: "goal_name",
            name: "Наименование цели",
            size: "45%"
        },
        {
            id: 3,
            key: "description",
            name: "Описание цели",
            size: "35%"
        },
        {
            id: 4,
            key: "",
            name: "",
            allData: true,
            component: ({data: { id }}) => {
                return (
                    <ChekBox
                        id="selectedGoals"
                        value={selectedGoals}
                        checkBoxValue={id}
                        onInput={checkDocument}
                    />
                )
            },
            size: "10%"
        }
    ]
}