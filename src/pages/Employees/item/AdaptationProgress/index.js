import React, {Component, useEffect, useMemo, useState} from 'react';
import CardIconAndTitle from "../../../../components/CardIconAndTitle";
import AppList from "../../../../components/AppList";
import {settings} from "./tableConfig";
import axios from "axios";
import {CANDIDATE_LIST, DEFAULT_URL} from "../../../../components/APIList";
import memoizeOne from "memoize-one"

const AdaptationProgress = ({location: { pathname }, history: { push, goBack }}) => {
  const [data, setData] = useState([])
  const [adaptation_status, setAdaptation_status] = useState([])
  const [program_details, SetProgram_details] = useState([])
  const [comment, setComment] = useState([])

  const pathnames = pathname.split("/").filter(x => x)
  const newEmploy = pathnames[1] === "new_employ"
  const idEmploy = newEmploy ? "/" : `${pathnames[1]}/`

  useEffect(() => {
    axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/${idEmploy}`)
    .then(
      (response) => {
        setData(response.data.program_details.map(({levels_detail}) => levels_detail).flat())
        SetProgram_details(response.data.program_details)
        setAdaptation_status(response.data.adaptation_status)
        setComment(response.data.comment)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

 const getPoint = memoizeOne((data = []) => {
    let sum = 0
    data.forEach(({stages}) => {
      for(let i = 0; i < stages.length; i++){
        sum = sum + parseInt(stages[i].point)
      }
    })
    return sum
  })

  const getNewData = memoizeOne((data = [], adaptation_status, program_details, comment) => {
    return data.reduce((acc, item = {}) => {
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
  })
  const newData = getNewData(data, adaptation_status, program_details, comment)
  return (
    <div className="flex-container hidden">
      <div className="flex p-t-16 p-r-16 p-l-16">
        <CardIconAndTitle
          title="Заработано баллов:"
          value={getPoint(data)}
          icon="points"
          className="m-r-16"
        />
        <CardIconAndTitle
          title="Пройдено уровней:"
          value={[2, 3]}
          icon="levels"
        />
      </div>
      <AppList
        settings={settings}
        data={newData}
        nestedData={true}
        nestedKey="stages"
      />
    </div>
  );
}

export default AdaptationProgress;
