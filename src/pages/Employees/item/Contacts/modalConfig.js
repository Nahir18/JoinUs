import ChekBox from "@Components/Fields/CheckBox"

export const modalTableConfig = (selectedContacts, checkContact) => {
  return [
    {
      id: 1,
      key: "",
      name: "№",
      size: "10%"
    },
    {
      id: 2,
      key: "last_name",
      name: "Сотрудник",
      allData: true,
      component: ({data: { first_name, last_name}}) => (
        <span>
                        {`${first_name} ${last_name}`}
                    </span>
      ),
      size: "45%",
    },
    {
      id: 3,
      key: "role",
      name: "Роль",
      size: "35%",
    },
    {
      id: 4,
      key: "selectedContacts",
      name: "",
      allData: true,
      component: ({data: { id }}) => (
        <ChekBox
          id="selectedContacts"
          value={selectedContacts}
          checkBoxValue={id}
          onInput={checkContact}
        />
      ),
      size: "10%",
    }
  ]
}
