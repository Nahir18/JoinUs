import React, {useEffect, useState, useMemo} from 'react';
import CardIconAndTitle from "../../../../components/CardIconAndTitle";
import AppList from "../../../../components/AppList";
import {settings} from "./tableConfig";
import memoizeOne from "memoize-one";
import ListService from "../../service";
import {useFetching} from "../../../../utils/hooks/useFetching";

const Goals = ({location: { pathname }, history: { push, goBack }}) => {
  const [goalsDetail, setGoalsDetail] = useState([])
  const [adaptationStatus, setAdaptationStatus] = useState([])

  const pathnames = pathname.split("/").filter(x => x)
  const newEmploy = pathnames[1] === "new_employ"
  const idEmploy = newEmploy ? "/" : `${pathnames[1]}/`

  const [getEmploy, isLoading, isError] = useFetching(async () => {
    const data = await ListService.getEmploy(idEmploy)
    setGoalsDetail(data.program_details.map(({goals_detail}) => goals_detail).flat())
    setAdaptationStatus(data.adaptation_status)
  })

  useEffect(() => {
    getEmploy()
  }, [])

  const getPoint = memoizeOne((data = []) => {
    let sum = 0
    if (data && data.length > 0) {
      for(let i = 0; i < data.length; i++) {
        sum = sum + parseInt(data[i].point)
      }
    }
    return sum
  })


  const newData = useMemo(() => (
    goalsDetail.map((item) => ({
        STATUS_GOAL: {
          adaptation_status: adaptationStatus.find(({id_goal}) => item.id === id_goal),
          goals_detail: item
        },
        ...item
    }))
  ), [adaptationStatus, goalsDetail])


  return (
    <div className="flex-container hidden">
      <div className="flex p-t-16 p-r-16 p-l-16">
        <CardIconAndTitle
          title="Заработано баллов:"
          value={getPoint(adaptationStatus)}
          icon="points"
          className="m-r-16"
        />
        <CardIconAndTitle
          title="Выполнено целей:"
          value={[adaptationStatus.filter(({id_goal}) => id_goal !== null).length, goalsDetail.length]}
          icon="goals"
        />
      </div>
      <AppList
        loading={isLoading}
        settings={settings}
        data={newData}
      />
    </div>
  );
}

export default Goals;
