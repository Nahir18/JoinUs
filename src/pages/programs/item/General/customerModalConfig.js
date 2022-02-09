import RadioButton from "../../../../components/RadioButton";

export const customerModalConfig = (selectClient, selectedRadioButton) => {
    return [
        {
            id: 1,
            key: "",
            name: "№",
            size: "10%"
        },
        {
            id: 2,
            key: "customer_name",
            name: "Наименование",
            size: "75%"
        },
        {
            id: 3,
            key: "",
            name: "",
            allData: true,
            component: ({data: {id, customer_name}}) => {
                return (
                    <RadioButton
                        inputValue={selectClient}
                        selected={(value) => selectedRadioButton(value)}
                        noTitle
                        title={customer_name}
                        id={id}
                    />
                )
            },
            size: "15%"
        }
    ]
}