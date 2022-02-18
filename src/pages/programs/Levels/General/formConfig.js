import React from "react";
import Input from "@Components/Fields/Input"
import DatePicker from "@Components/Fields/DatePicker"
import ArrowInput from "../../../../components/ArrowsInput";
import MonthInput from "../../../../components/Fields/monthInput";

export const fieldMap = (arrowUp, arrowDown, handleInputChange) => [
    {
        label: "Наименование",
        id: "stage_name",
        component: Input,
        placeholder: "Введите наименование этапа",
        formColumn: 0,
    },
    {
        label: "Номер п.п",
        id: "tier",
        component: (props) => (
            <ArrowInput
                {...props}
                arrowUp={arrowUp}
                arrowDown={arrowDown}
                onInput={handleInputChange}
            />
        ),
        placeholder: "Номер п.п",
        formColumn: 1,
    },
    {
        label: "Дата создания",
        id: "create_date",
        component: DatePicker,
        placeholder: "Выберите дату создания",
        formColumn: 0,
    },
    {
        label: "Срок программы",
        id: "duration_day",
        component: (props) => (
            <MonthInput
                {...props}
                onInput={handleInputChange}
        />),
        placeholder: "Выберите срок программы",
        formColumn: 1,
    },
]

export const rules = {
    stage_name: "required",
    tier: "required",
}
