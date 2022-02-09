import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {Oval, Container} from "./style"
import PropTypes from "prop-types"

// progress: 1
// 0/4 - 0
// 1/4 - 0,25
// 2/4 - 0,5
// 3/4 - 0,75
// 4/4 - 1
const getStages = (data = []) => {
  let sum = 0
  data.forEach(({stages}) => {
    sum = sum + stages.length
  })
  return sum
}
const Progress = ({data}) => {
  const [result, setResult] = useState(0)
  const { adaptation_status, program_details: [detail], programList, program } = data

  const getProgress = useCallback(() => {
    if (adaptation_status && adaptation_status.length > 0) {
      setResult(adaptation_status.length / getStages(detail.levels_detail))
    }
  }, [adaptation_status, detail])

  const getProgramName = useMemo(() => {
    if (programList && programList.length > 0) {
     return programList.find(({id}) => id === program[0]).program_name
    }
  }, [programList, program])

  useEffect(() => {
    getProgress()
  })
  return (
    <div>
      <div
        className="fs-12 color-light-blue-2 p-b-6 font-normal"
      >
        {getProgramName}
      </div>
      <div className="flex">
        <Container>
          <Oval active={result > 0}/>
          <Oval active={result >= 0.25}/>
          <Oval active={result >= 0.5}/>
          <Oval active={result >= 1}/>
        </Container>
        <div className="fs-14 color-darken-blue fw-700 p-l-6">
          {adaptation_status.length}/{getStages(detail.levels_detail)}
        </div>
      </div>
    </div>
  );
};

Progress.propTypes = {
  data: PropTypes.object,
}

Progress.defaultProps = {
  data: {
    post: "no name"
  }
}

export default Progress;
