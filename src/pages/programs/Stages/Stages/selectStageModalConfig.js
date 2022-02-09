import ChekBox from "@Components/Fields/CheckBox"

export const selectStageModalConfig = (selectedStage, checkStage) => {
    return [
        {
            id: 1,
            key: "",
            name: "№",
            size: "10%"
        },
        {
            id: 2,
            key: "stage_name",
            name: "Наименование этапа",
            size: "25%"
        },
        {
            id: 3,
            key: "level_name",
            name: "Наименование уровня",
            size: "25%"
        },
        {
            id: 4,
            key: "stage_name",
            name: "Наименование программы",
            size: "25%"
        },
        {
            id: 5,
            key: "3",
            name: "",
            allData: true,
            component: ({data: {id}}) => {
                return (
                    <ChekBox
                        id="selectedStage"
                        className="p-r-14"
                        value={selectedStage}
                        checkBoxValue={id}
                        onInput={checkStage}
                    />
                )
            },
            size: "15%"
        },
    ]
}