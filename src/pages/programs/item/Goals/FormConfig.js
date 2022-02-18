import React from "react";
import ActionsButtons from "../../../../components/ActionsButtons";

export const settings = (editModal, closeModal, handleEdit, actionButtonTierUp, actionButtonTierDown, actionsDeleteItem) => [
    {
        id: 1,
        key: "number",
        name: "№",
        size: "5%"
    },
    {
        id: 2,
        key: "goal_name",
        name: "Наименование",
        size: "30%"
    },
    {
        id: 3,
        key: "description",
        allData: true,
        name: "Действия",
        component: ({rowindex, data}) => (
            <ActionsButtons
                data={data}
                dataKey="tier"
                arrowUp={actionButtonTierUp}
                arrowDown={actionButtonTierDown}
                deleteItem={actionsDeleteItem}
                editModal={editModal}
                closeModal={closeModal}
                handleEdit={handleEdit}
                rowindex={rowindex}
            />
        ),
        size: "30%"
    }
]
