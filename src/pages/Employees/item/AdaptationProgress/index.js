import React, {useEffect, useMemo, useState} from 'react';
import CardIconAndTitle from "../../../../components/CardIconAndTitle";
import AppList from "../../../../components/AppList";
import {settings} from "./tableConfig";
import axios from "axios";
import {CANDIDATE_LIST, DEFAULT_URL} from "../../../../components/APIList";
import {calculationOfPoints} from "../../../../utils/calculationOfPoints";
import {calculationOfStages} from "../../../../utils/calculationOfStages";

const AdaptationProgress = ({location: { pathname }, history: { push, goBack }}) => {
  const [data, setData] = useState([])
  const [adaptation_status, setAdaptation_status] = useState([])
  const [program_details, SetProgram_details] = useState([])
  const [comment, setComment] = useState([])
  const [loading, setLoading] = useState(false)

  const pathnames = pathname.split("/").filter(x => x)
  const newEmploy = pathnames[1] === "new_employ"
  const idEmploy = newEmploy ? "/" : `${pathnames[1]}/`

  useEffect(() => {
    (async () => {
      setLoading(true)
      const {data} = await axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/${idEmploy}`)
      setData(data.program_details.map(({levels_detail}) => levels_detail).flat())
      SetProgram_details(data.program_details)
      setAdaptation_status(data.adaptation_status)
      setComment(data.comment)
      setLoading(false)
    })()
  }, [])

  // todo расчет количества пройденных уровней
  // надо тестить

  const numberCompletedLevels = useMemo(() => {
    if (adaptation_status && adaptation_status.length > 0) {
      // let sum = 0
      //   program_details.forEach(({stages}) => {
      //     for(let i = 0; i < stages.length; i++){
      //       sum = sum + parseInt(stages[i].point)
      //     }
      //   })
      //   return sum

      const [detail] = program_details

      let sum = 0
      sum = sum + (calculationOfStages(detail?.levels_detail) === adaptation_status.length ? 1 : 0 )
      return sum

      // calculationOfStages(detail?.levels_detail) === adaptation_status.length
    } else {
      return 0
    }
  }, [adaptation_status, program_details])

  const getNumberLevels = useMemo(() => {
    const [detail] = program_details
    return detail?.levels_detail.length
  }, [program_details])

  const newData = useMemo(() => (
    data.reduce((acc, item = {}) => {
      const { stages } = item
      acc.push(
        {
          ...item,
          stages: stages.map((i) => ({
            ...i,
            STATUS: {
              adaptation_status,
              program_details
            },
            stagesComment: comment.find(({id_stage}) => id_stage === i.id)
          }))
        }
      )
      return acc
    }, [])
  ), [data, adaptation_status, program_details, comment])

  return (
    <div className="flex-container hidden">
      <div className="flex p-t-16 p-r-16 p-l-16">
        <CardIconAndTitle
          title="Заработано баллов:"
          value={calculationOfPoints(data)}
          icon="points"
          className="m-r-16"
        />
        <CardIconAndTitle
          title="Пройдено уровней:"
          value={[numberCompletedLevels, getNumberLevels]}
          icon="levels"
        />
      </div>
      <AppList
        loading={loading}
        settings={settings}
        data={newData}
        nestedData={true}
        nestedKey="stages"
      />
    </div>
  );
}

export default AdaptationProgress;
