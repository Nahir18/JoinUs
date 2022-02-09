import ChekBox from "@Components/Fields/CheckBox"

export const selectDocumentModalConfig = (selectedDocuments, checkNewDocument) => {
    return [
        {
            id: 1,
            key: "",
            name: "№",
            size: "10%"
        },
        {
            id: 2,
            key: "document_name",
            name: "Наименование документа",
            size: "45%"
        },
        {
            id: 3,
            key: "document_name",
            name: "Наименование программы",
            size: "35%"
        },
        {
            id: 4,
            key: "",
            name: "",
            allData: true,
            component: ({data: { id }}) => (
                    <ChekBox
                        id="selectedDocuments"
                        value={selectedDocuments}
                        checkBoxValue={id}
                        onInput={checkNewDocument}
                    />
                ),
            size: "10%"
        },
    ]
}