import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from "prop-types"
import {iconStatusEnd, iconStatusWait, iconStatusWorking} from "./constantsIcons"

const getStages = (data = []) => {
  let sum = 0
  data.forEach(({stages}) => {
    sum = sum + stages.length
  })
  return sum
}

const Status = ({data}) => {
  const [icon, setIcon] = useState("")
  const [title, setTitle] = useState("")

  const getData = useCallback(() => {
    if (Object.keys(data).length > 0) {
      const { adaptation_status, program_details: [detail]} = data
      const status = getStages(detail.levels_detail) === adaptation_status.length
        ? "end"
        : adaptation_status.length === 0
          ? "wait"
          : "work"
      switch (status) {
        case "end":
          setIcon(iconStatusEnd)
          setTitle("Завершена")
          break;
        case "wait":
          setIcon(iconStatusWait)
          setTitle("Ожидание")
          break;
        case "work":
          setIcon(iconStatusWorking)
          setTitle("В процессе")
          break;
        default:
          setIcon("")
          setTitle("Error")
          break;
      }
    }
  }, [icon, setIcon, title, setTitle, data])

  useEffect(() => {
    getData()
  })
  return (
    <div className="flex items-center">
      <div dangerouslySetInnerHTML={{__html: icon}} className="p-r-8" />
      {title}
    </div>
  );
};

Status.propTypes = {
  data: PropTypes.object,
}

Status.defaultProps = {
  data: {}
}

export default Status;
