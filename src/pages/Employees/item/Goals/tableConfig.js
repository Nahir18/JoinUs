import StatusGoals from "./StatusGoals";

export const settings = [
  {
    id: 11,
    key: "number",
    name: "№",
    size: "50px"
  },
  {
    id: 1,
    key: "goal_name",
    name: "Наименование",
    size: "1fr"
  },
  {
    id: 2,
    key: "STATUS_GOAL",
    name: "Статус",
    size: "2fr",
    component: StatusGoals,
  },
]
