import Input from "@Components/Fields/Input"
import ArrowInput from "../../../../components/ArrowsInput";
import DatePicker from "@Components/Fields/DatePicker"
import axios from "axios";
import {ADAPTATION_EMPLOYEE, DEFAULT_URL, DIRECTORY} from "../../../../components/APIList";
import RefSelect from "@Components/Fields/RefSelect/index"

export const fieldMap = [
  {
    label: "Наименование цели",
    id: "goal_name",
    component: Input,
    placeholder: "Введите наименование цели",
  },
  {
    label: "Описание цели",
    id: "description",
    component: Input,
    placeholder: "Введите описание цели",
  },
  {
    label: "Номер п.п.",
    id: "tier",
    component: ArrowInput,
    placeholder: "Введите номер",
  },
  {
    label: "Дата создания",
    id: "create_date",
    component: DatePicker,
    placeholder: "Выберите дату создания",
  },
  {
    label: "Должность",
    id: "id_employee",
    component: RefSelect,
    placeholder: "Выберите должность",
    formColumn: 0,
    valueKey: "id",
    labelKey: "name",
    preload: true,
    async refLoader() {
      const {data } = await axios.get(`${DEFAULT_URL}/${ADAPTATION_EMPLOYEE}`)
      return data.map(({first_name, last_name, id}) => {
        return { name: `${first_name} ${last_name}`, id }
      })
    },
  },
]
