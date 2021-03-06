import Input from "@Components/Fields/Input"
import DatePicker from "@Components/Fields/DatePicker"
import ModalSelectInput from "../../../../components/ModalSelectInput";
import React from "react";
import MonthInput from "../../../../components/Fields/monthInput";

export const fieldMap = (toggleModal, customer, toggleCreatorModal, creator, handleInputChange) => [
    {
        label: "Наименование",
        id: "program_name",
        component: Input,
        placeholder: "Введите наименование программы",
        formColumn: 0,
    },
    {
        label: "Описание",
        id: "description",
        component: Input,
        type: "textarea",
        minHeight: "195px",
        placeholder: "Описание программы",
        formColumn: 0,
    },
    {
        label: "Срок программы",
        id: "duration_day",
        component: MonthInput,
        placeholder: "Выберите срок программы",
        formColumn: 1,
    },
    {
        label: "Заказчик",
        id: "customer",
        component: ({onInput}) => (
                 <ModalSelectInput
                     id="4"
                     value={customer ? customer.customer_name : ""}
                     onInput={onInput}
                     placeholder="Выберите заказчика"
                     toggleModal={toggleModal}
                 />),
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
        id: "creator",
        component: ({onInput}) => {
            const creatorName = creator ? `${creator.first_name} ${creator.last_name}` : ""
            return (
            <ModalSelectInput
                id="6"
                value={creatorName}
                onInput={onInput}
                placeholder="Выберите создателя"
                toggleModal={toggleCreatorModal}
            />
        )},
        formColumn: 1,
    },
]

export const rules = {
    program_name: "required",
    create_date: "required",
    description: "required",
}
