import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import ScrollBar from "@Components/ScrollBar"
import {
  componentTypeList
} from './constants'
import {ADAPTATION_BLOCK, ADAPTATION_GOALS, ADAPTATION_STAGE, DEFAULT_URL} from "../../../../components/APIList";
import PureUpdateArrayItems from "../../../../utils/Arrays/PureUpdateArrayItems";
import {DIRECTION_UP} from "../../../../constants";
import PureDeleteItems from "../../../../utils/Arrays/PureDeleteItems";
import NewBlock from "./Components/NewBlock";
import { levelsBreadcrumbs } from "../../configs";
import ProgramsHeader from "../../ProgramsHeader"
import {STAGES_LINKS, NEW_PROGRAM} from "../../Constants";
import {useParams} from "react-router-dom";
// http://51.250.15.127:9000/api-active/candidate/api-active/adaptationstage/
const Blocks = () => {
  const {stageID} = useParams()

  const [data, setData] = useState({json: []})

  useEffect(() => {
    (async () => {
      await axios.get(`${DEFAULT_URL}/${ADAPTATION_BLOCK}/${stageID}`)
          .then(({data, data: { json }}) => {
            if (!json) {
              axios.post(`${DEFAULT_URL}/${ADAPTATION_BLOCK}/`, {adaptationStage: Number(stageID), json: []})
                  .then(({data}) => setData(data))
            } else setData(data)
          }, (error) => {
            axios.post(`${DEFAULT_URL}/${ADAPTATION_BLOCK}/`, {adaptationStage: Number(stageID), json: []})
                .then(({data}) => setData(data))
          }
          )
    })()
  }, [stageID])

  const saveBlocks = useCallback(async () => {
    const {data:nextData} = await axios.put(`${DEFAULT_URL}/${ADAPTATION_BLOCK}/${stageID}/`, data)
    setData(nextData)
  }, [data, stageID])

  const handleInput = useCallback((fieldValue, index) => {
    setData(({json, ...prevData}) => ({
      ...prevData,
      json: PureUpdateArrayItems(json, index - 1, fieldValue)
    }))
  }, [])

  const handleMoveItem = useCallback((direction, position) => {
    setData(({json, ...prevData}) => {
      const nextJson = [...json]
      let actualPosition = position - 1
      if (direction === DIRECTION_UP) {
        if (position > 0) {
          const movedItem = nextJson.splice(actualPosition, 1)
          nextJson.splice(actualPosition - 1, 0, movedItem[0])
        }
      } else {
        if (position < nextJson.length - 1) {
          const movedItem = nextJson.splice(actualPosition, 1)
          nextJson.splice(actualPosition + 1, 0, movedItem[0])
        }
      }
      return {...prevData, json: nextJson}
    })
  }, [])

  const handleDelete = useCallback((fieldValue, index) => {
    setData(({json, ...prevData}) => ({...prevData, json: PureDeleteItems(json, index - 1)}))
  }, [])

  const handleCreate = useCallback((type) => {
    setData(({json, ...prevData}) => ({
      ...prevData,
      json: [...json, {type}]
    }))
  }, [])
  const pageHeaderTitle = (stage_name) => {
    const { location: { pathname } } = this.props
    const pathnames = pathname.split("/").filter(x => x)
    const newProgram = pathnames[1] === NEW_PROGRAM
    return newProgram ? "Новая программа" : stage_name ? `Этап "${stage_name}"` : ""
  }
  return (
    // <ProgramsHeader
    //     {...this.props}
    //     // pageData={pageHeaderTitle(stage_name)}
    //     bredCrumbsConfig={levelsBreadcrumbs}
    //     url="programs"
    //     links={STAGES_LINKS}
    // >
    <div className="flex-container">
      <ScrollBar className="p-l-24 p-r-24 p-b-24 p-t-24 bg-white">
        {
          data.json.map((value, index) => {
            const Component = componentTypeList[value.type]
            return (
              <Component
                key={index}
                value={value}
                position={index + 1}
                onInput={handleInput}
                className={index === 0 ? "" : "mt-10"}
                onMove={handleMoveItem}
                onDelete={handleDelete}
                environmentState={data.json}
              />
            )
          })
        }
        <NewBlock
          className={data.json.length > 0 ? "mt-10" : ""}
          position={data.json.length + 1}
          onInput={handleCreate}
        />
      </ScrollBar>
      <div className="flex justify-end mt-auto m-b-24 bg-white p-b-24 p-r-24">
        <button
          name="cancel"
          type="submit"
          onClick={() => this.props.history.goBack()}
          className="grey btn width-m m-r-16"
        >
          Отмена
        </button>
        <button
          name="save"
          type="submit"
          className="blue btn width-m"
          onClick={saveBlocks}
        >
          Сохранить
        </button>
      </div>
    </div>
    // </ProgramsHeader>
  );
};

Blocks.propTypes = {};

export default Blocks;
