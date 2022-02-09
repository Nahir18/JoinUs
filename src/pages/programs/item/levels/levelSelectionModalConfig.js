import ChekBox from "@Components/Fields/CheckBox"

export const levelSelectionModalConfig = (selectedLevels, checkLevels) => {
    return [
        {
            id: 1,
            key: "",
            name: "№",
            size: "10%"
        },
        {
            id: 2,
            key: "level_name",
            name: "Наименование уровня",
            size: "80%"
        },
        {
            id: 3,
            key: "id",
            name: "",
            allData: true,
            component: ({ data: { id } }) => (
                <ChekBox
                    id="selectedLevels"
                    value={selectedLevels}
                    checkBoxValue={id}
                    onInput={checkLevels}
                />
            ),
            size: "10%"
        }
    ]
}
