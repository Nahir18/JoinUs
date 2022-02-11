import React from "react";
import Actions from "./Actions";
import {ActiveIcon} from "../../../Constants";
import StatusIndicator from "../../../../components/StatusIndicator";

export const settings = (editStage, deleteButton, actionButtonTierUp, actionButtonTierDown) => {
    return [
        {
            id: 1,
            key: ["level_name", "stage_name"],
            name: "Уровень/этап",
            size: "30%"
        },
        {
            id: 2,
            key: "duration_day",
            name: "Дней этапа",
            nestedlevel: 1,
            size: "15%"
        },
        {
            id: 3,
            key: "point",
            name: "Баллов",
            nestedlevel: 1,
            size: "15%"
        },
        {
            id: 4,
            key: "status",
            name: "Статус",
            component: StatusIndicator,
            nestedlevel: 1,
            size: "15%"
        },
        {
            id: 5,
            name: "Действия",
            // nestedlevel: 1,
            allData: true,
            size: "25%",
            component: (props) => (
                <Actions
                    deleteButton={deleteButton}
                    tierUp={actionButtonTierUp}
                    tierDown={actionButtonTierDown}
                    {...props}
                    editButton={editStage}
                />)
        },
    ]
}
