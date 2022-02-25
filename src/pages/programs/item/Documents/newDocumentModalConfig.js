import Input from "@Components/Fields/Input"
import ArrowInput from "../../../../components/ArrowsInput";
import DatePicker from "../../../../components/Fields/DatePicker";
import RefSelect from "@Components/Fields/RefSelect/index"
import axios from "axios";
import {ADAPTATION_EMPLOYEE, DEFAULT_URL} from "../../../../components/APIList";

export const NewDocumentModalConfig = (tierUp, tierDown) => [
    {
        label: "Наименование документа",
        id: "document_name",
        component: Input,
        placeholder: "Введите наименование документа",
    },
    {
        label: "Номер п.п.",
        id: "tier",
        component: ArrowInput,
        arrowUp: tierUp,
        arrowDown: tierDown,
        placeholder: "",
    },
    {
        label: "Дата создания",
        id: "create_date",
        component: DatePicker,
        placeholder: "Выберите дату",
    },
    {
        label: "Создатель",
        id: "id_employee",
        component: RefSelect,
        labelKey:"name",
        valueKey:"id",
        refLoader: async () => {
            const {
                data
            } = await axios.get(`${DEFAULT_URL}/${ADAPTATION_EMPLOYEE}`)
            return data.map(({first_name, last_name, id}) => {
                return { name: `${first_name} ${last_name}`, id }
            })
        },
        placeholder: "Выберите создателя",
    },
]

export const rules = {
    document_name: "required",
    create_date: "required",
    tier: "required",
    id_employee: "required",
}
