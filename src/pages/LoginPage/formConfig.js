import Input from "@Components/Fields/Input"

export const loginFields = [
  {
    label: "Email",
    id: "email",
    component: Input,
    placeholder: "Введите Email",
  },
  {
    label: "Пароль",
    id: "password",
    type: "password",
    component: Input,
    placeholder: "Введите пароль",
  }
]

export const rules = {
  email: "required",
  password: "required"
}
