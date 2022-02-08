import React, {Component, useCallback, useEffect, useMemo, useState} from 'react';
import FilterForEmployees from "./FilterForEmployees";
import axios from 'axios';
import AppList from "../../../components/AppList";
import {settings} from "./TableConfig"
import {NavLink} from "react-router-dom";
import {ADAPTATION_PROGRAM, CANDIDATE_LIST, DEFAULT_URL} from "../../../components/APIList";
import debounce from "@Utils/debounce"
import Pagination from "@Components/Pagination"

const Employees = ({}) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [countList, setCountList] = useState("")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(11)
  const [programList, setProgramList] = useState([])

  // todo сделать фильтрацию по статусам на фронте
  const filterList = (debounce(useCallback((value, id) => {
    if (id === "status") {
      // search
    }
    if (id === "name") {
      axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/`, {
        params: {search: value}
      })
      .then((response) => {
          setData(response.data.results)
        },
        (error) => {
          setError({error})
        }
      )
    } else {
      axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/filter/`, {
        params: {[id]: value}
      })
      .then((response) => {
          setData(response.data)
        },
        (error) => {
          setError({error})
        }
      )
    }
  },[]), 250))

  // useEffect(() => {
  //   (async () => {
  //     const {data} = await axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/`)
  //     setData(data.results)
  //     setCountList(data.count)
  //   })()
  //   (async () => {
  //     const {data} = await axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}/`)
  //     setProgramList(data)
  //   })()
  // }, [])

  useEffect(() => {
    axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/`)
    .then((response) => {
        setData(response.data.results)
        setCountList(response.data.count)
      },
      (error) => {
        setError({error})
      }
    )
    axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}`)
    .then((response) => {
        setProgramList(response.data)
      },
      (error) => {
        setError({error})
      }
    )
  }, [])

  const updateData = useCallback((value) => {
    axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/`, {
      params: {page_size: value}
    })
    .then((response) => {
        setData(response.data.results)
      },
      (error) => {
        setError({error})
      }
    )
    setPage(value)
  }, [page, data])

  const getPaginationState = useMemo(() => {
    return {
      currentPage: page,
      totalPages:  Math.ceil(countList / limit),
      cupReached: data.length !== limit
    }
  },[page, countList, limit, data])

  const getNewData = useMemo(() => {
    return data.map((item) => {
        const { last_name, first_name, post, adaptation_status, program_details, program, illustration } = item
        return {
          EMPLOYEES: {
            name: `${last_name} ${first_name}`,
            role: `${post}`,
            img: illustration
          },
          STATUS: {
            adaptation_status,
            program_details
          },
          PROGRESS: {
            adaptation_status,
            program_details,
            program,
            programList
          },
          ...item
        }
      }
    )
  }, [data, programList])

  return (
    <div className="flex-container">
      <div className="flex justify-between p-b-25">
        <h1>Сотрудники</h1>
        <NavLink
          className="blue btn width-m flex items-center"
          to="/employees/new_employ/general"
        >
          + Создать сотрудника
        </NavLink>
      </div>
      <FilterForEmployees
        handleInput={filterList}
      />
      <AppList
        settings={settings}
        data={getNewData}
        nestedKey="data"
      />
      <Pagination
        paginationState={getPaginationState}
        emitPage={updateData}
      />
    </div>
  )
}

export default Employees;
