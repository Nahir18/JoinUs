import Status from "../../../../components/ComponentStatus";
import DisplayDate from "../../../../components/Fields/DisplayDate";

export const settings = [
  {
    id: 1,
    key: ["level_name", "stage_name"],
    name: "Уровень/Этап",
    size: "2fr"
  },
  {
    id: 2,
    key: "duration_day",
    name: "Дней этапа",
    nestedlevel: 1,
    size: "150px"
  },
  {
    id: 3,
    key: "point",
    name: "Баллов",
    nestedlevel: 1,
    size: "150px"
  },
  {
    id: 4,
    key: "create_date",
    name: "Дата прохождения",
    nestedlevel: 1,
    size: "1fr",
    component: DisplayDate
  },
  {
    id: 5,
    key: "STATUS",
    name: "Статус",
    nestedlevel: 1,
    size: "1fr",
    component: Status,
  },
  {
    id: 5,
    key: "stagesComment",
    name: "Комментарий",
    component: ({data = {}}) => {
      return (
        <div>
          {data.comment}
        </div>
      )
    },
    nestedlevel: 1,
    size: "1fr"
  },
]
