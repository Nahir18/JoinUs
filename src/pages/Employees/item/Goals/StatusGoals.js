import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {iconStatusEnd, iconStatusWait} from "../../../../components/ComponentStatus/constantsIcons";

const StatusGoals = ({data} = []) => {
  const [icon, setIcon] = useState(iconStatusWait)
  const [title, setTitle] = useState("Ожидание")

  const getData = useCallback(() => {
    const { adaptation_status: {id_goal} = {}, goals_detail: {id} } = data
    if (id_goal === id) {
      setIcon(iconStatusEnd)
      setTitle("Завершена")
    }
  }, [data])

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

StatusGoals.propTypes = {
  data: PropTypes.object,
}

StatusGoals.defaultProps = {
  data: {}
}

export default StatusGoals;
