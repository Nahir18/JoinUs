import React, {useEffect, useState} from 'react';
import CardIconAndTitle from "../../../../components/CardIconAndTitle";
import {settings} from "./tableConfig";
import AppList from "../../../../components/AppList";
import {calculationOfPoints} from "../../../../utils/calculationOfPoints";
import ListService from "../../service";
import {useFetching} from "../../../../utils/hooks/useFetching";

const Documents = ({location: { pathname }, history: { push, goBack }}) => {
  const [data, setData] = useState([])
  const [levels_detail, setLevels_detail] = useState([])

  const pathnames = pathname.split("/").filter(x => x)
  const newEmploy = pathnames[1] === "new_employ"
  const idEmploy = newEmploy ? "/" : `${pathnames[1]}/`

  const [getEmploy, isLoading, isError] = useFetching(async () => {
    const data = await ListService.getEmploy(idEmploy)
    setData(data.program_details.map(({documents_detail}) => documents_detail).flat())
    setLevels_detail(data.program_details.map(({levels_detail}) => levels_detail).flat())
  })

  useEffect(() => {
    getEmploy()
  }, [])

  return (
    <div className="flex-container hidden">
      <div className="flex p-t-16 p-r-16 p-l-16">
        <CardIconAndTitle
          title="Заработано баллов:"
          value={calculationOfPoints(levels_detail)}
          icon="points"
          className="m-r-16"
        />
        <CardIconAndTitle
          title="Всего документов:"
          value={data.length}
          icon="documents"
        />
      </div>
      <AppList
        settings={settings}
        data={data}
        loading={isLoading}
      />
    </div>
  );
}

export default Documents;
