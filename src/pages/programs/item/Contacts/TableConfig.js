import CardForUser from "../../../../components/ComponentsForListTable/CardForUser";
import CardContact from "../../../../components/ComponentsForListTable/CardContact";

export const settings = [
  {
    id: 1,
    key: "number",
    name: "№",
    size: "50px"
  },
  {
    id: 2,
    key: "value",
    name: "Контакт",
    component: CardForUser,
    size: "40%"
  },
  {
    id: 3,
    key: "role",
    name: "Роль",
    size: "25%"
  },
  {
    id: 4,
    key: "contacts",
    name: "Контакты",
    component: CardContact,
    size: "30%"
  }
]

export const data = [
  {
    value: {
      name: "Петрова Дарья",
      role: "Директор по техническому развитию"
    },
    role: "Наставник",
    contacts: {
      id: 1,
      mail: "petrova.darya@gmail.com",
      phone: [
        "+7 999 787 7868"
      ]
    }
  },
  {
    value: {
      name: "Егоров Михаил",
      role: "Заместитель генерального директора по стратегическому развитию"
    },
    role: "HR",
    contacts: {
      id: 2,
      mail: "petrova.darya@gmail.com",
      phone: [
        "+7 999 787 7868"
      ]
    }
  },
  {
    value: {
      name: "Петрова Дарья",
      role: "Директор по техническому развитию"
    },
    role: "Гуру",
    contacts: {
      id: 3,
      mail: "petrova.darya@gmail.com",
      phone: [
        "+7 999 787 7868",
        "+7 999 787 7868"
      ]
    }
  },
]


