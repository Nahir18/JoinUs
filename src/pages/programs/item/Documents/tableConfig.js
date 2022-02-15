import ActionsButtons from "../../../../components/ActionsButtons";
import React from "react";
import DocumentName from "../../../../components/ComponentsForListTable/DocumentName";

export const settings = (editModal, closeModal, handleEdit, deleteItem, actionButtonTierUp, actionButtonTierDown) => [
    {
        id: 1,
        key: "number",
        name: "№",
        size: "5%"
    },
    {
        id: 2,
        key: "document_name",
        name: "Наименование",
        component: DocumentName,
        size: "30%"
    },
    {
        id: 3,
        key: "actions",
        allData: true,
        name: "Действия",
        component: ({data}) => (
            <ActionsButtons
                data={data}
                arrowUp={actionButtonTierUp}
                arrowDown={actionButtonTierDown}
                deleteItem={deleteItem}
                handleEdit={handleEdit}
                dataKey="tier"
            />
        ),
        size: "30%"
    }
]
