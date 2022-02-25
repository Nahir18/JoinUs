import React from "react";
import Input from "@Components/Fields/Input"
import DatePicker from "@Components/Fields/DatePicker"
import ModalSelectInput from "../../../../components/ModalSelectInput";
import ArrowInput from "../../../../components/ArrowsInput";
import Select from "../../../../components/Fields/Select";

export const fieldMap = (toggleCreatorModal, creator, arrowUp, arrowDown, employees, handleInputChange) => [
    {
        label: "Наименование",
        id: "level_name",
        component: Input,
        placeholder: "Введите наименование уровня",
        formColumn: 0,
    },
    {
        label: "Номер п.п",
        id: "tier",
        component: ArrowInput,
        arrowUp: arrowUp,
        arrowDown: arrowDown,
        placeholder: "Номер п.п",
        formColumn: 0,
    },
    {
        label: "Статус",
        id: "status",
        component: Select,
        valueKey: "status",
        labelKey: "title",
        options: [
            {
                title: "Активен",
                status: 1
            },
            {
                title: "Неактивен",
                status: 0
            },
        ],
        placeholder: "Выберите статус",
        formColumn: 1,
    },
    {
        label: "Дата создания",
        id: "create_date",
        component: DatePicker,
        placeholder: "Выберите дату создания",
        formColumn: 1,
    },
    {
        label: "Создал",
        id: "id_employee",
        component: ({onInput}) => {
            const employee = employees && employees.find(({id}) => id === creator)
            const creatorName = employee && creator ? `${employee.first_name} ${employee.last_name}` : ""
            return (
                <ModalSelectInput
                id="6"
                value={creatorName}
                onInput={onInput}
                placeholder="Выберите создателя"
                toggleModal={toggleCreatorModal}
            />
            )},
        formColumn: 0,
    },
]

export const rules = {
    level_name: "required",
    tier: "required",
    status: "required",
    create_date: "required",
    id_employee: "required",
}
