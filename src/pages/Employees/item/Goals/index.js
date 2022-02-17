import React, {Component, useEffect, useState} from 'react';
import CardIconAndTitle from "../../../../components/CardIconAndTitle";
import AppList from "../../../../components/AppList";
import {settings} from "./tableConfig";
import axios from "axios";
import {CANDIDATE_LIST, DEFAULT_URL} from "../../../../components/APIList";
import memoizeOne from "memoize-one";

const Goals = ({location: { pathname }, history: { push, goBack }}) => {
  const [data, setData] = useState([])
  const [adaptation_status, setAdaptation_status] = useState([])
  const [program_details, SetProgram_details] = useState([])
  const [documents_detail, setDocuments_detail] = useState([])
  const [levels_detail, setLevels_detail] = useState([])

  const pathnames = pathname.split("/").filter(x => x)
  const newEmploy = pathnames[1] === "new_employ"
  const idEmploy = newEmploy ? "/" : `${pathnames[1]}/`

  useEffect(() => {
    axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/${idEmploy}`)
    .then(
      ({data}) => {
        setData(data.program_details.map(({goals_detail}) => goals_detail).flat())
        setDocuments_detail(data.program_details.map(({documents_detail}) => documents_detail).flat())
        setLevels_detail(data.program_details.map(({levels_detail}) => levels_detail).flat())
        SetProgram_details(data.program_details)
        setAdaptation_status(data.adaptation_status)
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

  const getStages = (data = []) => {
    let sum = 0
    data.forEach(({stages}) => {
      sum = sum + stages.length
    })
    return sum
  }

  const getGoal = memoizeOne((adaptation = [], program = []) => {
    let sum = 0
    const [ detail ] = program
    const sumStages = getStages(detail?.levels_detail)
    const status = adaptation.length > 0
      ? sumStages === adaptation.length
        ? 1 : 0
      : 0
    if (adaptation.length > 0) {
      // console.log(sumStages, adaptation.length)
      // for(let i = 0; i < sumStages; i++) {
      //   console.log(sumStages === adaptation.length ? 1 : 0)
      //
      // }
      console.log(getStages(detail?.levels_detail), adaptation.length)
      sum = sum + getStages(detail?.levels_detail) === adaptation.length ? 1 : 0
    }
    console.log(sum)
    // console.log(adaptation.length, sumStages, status)
    return sum
  })
  const newData = data.map((item) => ({
      STATUS: {
        adaptation_status,
        program_details
      },
      ...item
    })
  )
  // console.log(adaptation_status, program_details)
  // this.getGoal(adaptation_status, program_details)
  // this.getGoal([{aaa: 1}, {aaa: 2}, {aaa: 3}, {aaa: 2}, {aaa: 3}], program_details)
// todo как понять сколько всего целей?
  // как считать статус у цели?
  // сейчас подсчет ведется по программе
  return (
    <div className="flex-container hidden">
      <div className="flex p-t-16 p-r-16 p-l-16">
        <CardIconAndTitle
          title="Заработано баллов:"
          value={getPoint(levels_detail)}
          icon="points"
          className="m-r-16"
        />
        <CardIconAndTitle
          title="Выполнено целей:"
          value={[data.length, 3]}
          icon="goals"
        />
      </div>
      <AppList
        settings={settings}
        data={newData}
      />
    </div>
  );
}

export default Goals;
