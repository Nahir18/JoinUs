import RadioButton from "../../../../components/RadioButton";

export const employeesModalConfig = (selectCreator, selectedCreator) => {
    return [
        {
            id: 1,
            key: "",
            name: "№",
            size: "10%"
        },
        {
            id: 2,
            key: "creatorName",
            name: "Наименование",
            allData: true,
            component: ({data: { first_name, last_name }}) => {
              return (
                  <div>
                      {`${first_name} ${last_name}`}
                  </div>
              )
            },
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
                        inputValue={() => selectCreator(id)}
                        selected={() => selectedCreator(id)}
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