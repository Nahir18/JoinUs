import {ArrowUP, EditIcon, Trash} from "../../../Constants";
import React from "react";
import StatusIndicator from "../../../../components/StatusIndicator";

const Actions = ({handleEdit, data, data: {tier}, tierUp, tierDown, handleDelete}) => {
    const iconColor = tier <= 1 ? "0.3" : ""
    return (
        <div>
            <div className="icon-container transition-icon cursor items-center j-c-center flex">
                <div
                    className="edit-icon"
                    onClick={() => handleEdit(data)}
                    dangerouslySetInnerHTML={{__html: EditIcon}}
                />
                <div className="flex a-i-center j-c-center ml-7">
                    <div
                        onClick={() => tierUp(data)}
                        className="arrow-icon"
                        dangerouslySetInnerHTML={{__html: ArrowUP}}
                    />
                    <div
                        onClick={() => tierDown(data)}
                        className="arrow-icon arrow-down"
                        style={{"opacity": iconColor}}
                        dangerouslySetInnerHTML={{__html: ArrowUP}}
                    />
                </div>
                <div
                    onClick={() => handleDelete(data)}
                    className="trash-icon ml-7"
                    dangerouslySetInnerHTML={{__html: Trash}}
                />
            </div>
        </div>
    )
}

export const settings = (handleEdit, tierUp, tierDown, handleDeleteItem) => [
    {
        id: 1,
        key: "number",
        name: "№",
        size: "5%"
    },
    {
        id: 2,
        key: "stage_name",
        name: "Этап",
        size: "30%"
    },
    {
        id: 3,
        key: "duration_day",
        name: "Дней этапа",
        size: "10%"
    },
    {
        id: 3,
        key: "point",
        name: "Баллов",
        size: "10%"
    },
    {
        id: 4,
        key: "status",
        name: "Статус",
        size: "20%",
        component: StatusIndicator
    },
    {
        id: 5,
        key: "description",
        allData: true,
        name: "Действия",
        component: ({rowIndex, data}) => (
            <Actions
                data={data}
                tierUp={tierUp}
                tierDown={tierDown}
                handleDelete={handleDeleteItem}
                handleEdit={handleEdit}
                rowIndex={rowIndex}
            />
        ),
        size: "30%"
    }
]
