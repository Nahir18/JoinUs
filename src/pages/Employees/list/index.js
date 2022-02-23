import React, {Component, useCallback, useEffect, useMemo, useState} from 'react';
import FilterForEmployees from "./FilterForEmployees";
import axios from 'axios';
import AppList from "../../../components/AppList";
import {settings} from "./TableConfig"
import {NavLink} from "react-router-dom";
import {ADAPTATION_PROGRAM, CANDIDATE_LIST, DEFAULT_URL, FILTER} from "../../../components/APIList";
import debounce from "@Utils/debounce"
import Pagination from "@Components/Pagination"

const Employees = ({}) => {
  const [data, setData] = useState([])
  const [countList, setCountList] = useState("")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(11)
  const [programList, setProgramList] = useState([])

  const filterList = (debounce(useCallback((value, id) => {
    switch (id) {
      case ("status"):
        if(value && value.length > 0) {
          axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/${FILTER}/`, {
            params: {statuses: value.reduce((acc, {ID}) => {
                acc.push(ID)
                return acc
              }, []).join()}
          })
          .then((response) => {
              setData(response.data.results)
            },
            (error) => {
              console.log(error)
            }
          )
        } else {
          getCandidateList()
        }
        break;
      case "name":
        axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/`, {
          params: {search: value}
        })
        .then((response) => {
            setData(response.data.results)
          },
          (error) => {
            console.log(error)
          }
        )
        break;
      default:
        axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/`, {
          params: {[id]: value}
        })
        .then((response) => {
            setData(response.data.results)
          },
          (error) => {
            console.log(error)
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

  const getCandidateList = () => {
    axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/`)
    .then((response) => {
        setData(response.data.results)
        setCountList(response.data.count)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  useEffect(() => {
    getCandidateList()
    axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}`)
    .then((response) => {
        setProgramList(response.data)
      },
      (error) => {
        console.log(error)
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
        console.log(error)
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
