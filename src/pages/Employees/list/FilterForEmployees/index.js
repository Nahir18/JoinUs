import React, { useCallback, useState } from "react"
import Input from "@Components/Fields/Input"
import Select from "../../../../components/Fields/Select";
import {FilterContainer, StyleDate} from "./style"
import ChoiceOfStatusOption from "../../../../components/Fields/Select/ChoiceOfStatusOption";
import {iconStatusEnd, iconStatusWait, iconStatusWorking} from "../../../../components/ComponentStatus/constantsIcons";

const arrayStatus = [
  {
    ID: "3",
    SYS_NAME: "Завершена",
    icon: iconStatusEnd
  },
  {
    ID: "1",
    SYS_NAME: "Ожидание",
    icon: iconStatusWait
  },
  {
    ID: "2",
    SYS_NAME: "В процессе",
    icon: iconStatusWorking
  }
]

const FilterForEmployees = ({handleInput}) => {
  const [dataForInput, setDataForInput] = useState("")
  const [valueSelect, setValueSelect] = useState([])
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const onInput = useCallback((value, id) => {
    setDataForInput(value)
    handleInput(value, id)
  }, [dataForInput])

  const handleSelect = useCallback((value, id) => {
    setValueSelect(value)
    handleInput(value, id)
  }, [valueSelect])

  const onInputDateFrom = useCallback((value, id) => {
      setDateFrom(value)
      handleInput(value, id)
    }, [dateFrom])

  const onInputDateTo = useCallback((value, id) => {
    setDateTo(value)
    handleInput(value, id)
  }, [dateTo])

  return (
    <FilterContainer className="m-b-16">
      <div className="">
        <div className="fs-12 color-light-blue-2 p-b-5">ФИО/Должность</div>
        <Input
          id="search"
          placeholder="Введите ФИО или должность"
          value={dataForInput}
          onInput={onInput}
        />
      </div>
      <div className="">
        <div className="fs-12 color-light-blue-2 p-b-5">Статус</div>
        <Select
          ComponentOption={ChoiceOfStatusOption}
          id="statuses"
          placeholder="Выберите статус"
          onInput={handleSelect}
          value={valueSelect}
          options={arrayStatus}
          multiple
          returnOption
        />
      </div>
      <div className="flex ml-auto">
        <div className="fs-12 color-light-blue-2 p-r-16 p-b-14 flex items-end">
          Дата выхода
        </div>
        <div className="p-r-8 flex-auto">
          <div className="fs-12 color-light-blue-2 p-b-5">От</div>
          <StyleDate
            onInput={onInputDateFrom}
            id="release_date"
            placeholder="От"
            value={dateFrom}
          />
        </div>
        <div className="flex-auto">
          <div className="fs-12 color-light-blue-2 p-b-5">До</div>
          <StyleDate
            onInput={onInputDateTo}
            id="create_date"
            placeholder="До"
            value={dateTo}
          />
        </div>
      </div>
    </FilterContainer>
  );
};

export default FilterForEmployees;
