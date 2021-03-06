import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
  const [loading, setLoading] = useState(false)

  const filterList = (debounce(useCallback((value, id) => {
    if (id === "statuses") {
      if(value && value.length > 0) {
        (async () => {
          const {data} = await axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/${FILTER}/`, {
            params: {
              [id]: value.reduce((acc, {ID}) => {
                acc.push(ID)
                return acc
              }, []).join()
            }
          })
          setData(data.results)
        })()
      } else {
        getCandidateList()
      }
    } else {
        (async () => {
          const {data} = await axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/`, {
            params:  {[id]: value}
          })
          setData(data.results)
        })()
    }},[]), 250))

  useEffect(() => {
    getCandidateList()
  }, [])

  const getCandidateList = async () => {
    try {
      setLoading(true)
      const {data} = await axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/`)
      setData(data.results)
      setCountList(data.count)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(async () => {
    try {
      const {data} = await axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}/`)
      setProgramList(data)
    } catch (e) {
      console.log(e)
    }
  }, [])

  const updateData = useCallback((value) => {
    (async () => {
      const {data} = await axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/`, {
        params: {page_size: value}
      })
      setData(data.results)
    })()
    setPage(value)
  }, [page, data])

  const getPaginationState = useMemo(() => {
    return {
      currentPage: page,
      totalPages:  Math.ceil(countList / limit),
      cupReached: data?.length !== limit
    }
  },[page, countList, limit, data])

  const getNewData = useMemo(() => {
    return data?.map((item) => {
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
        <h1>????????????????????</h1>
        <NavLink
          className="blue btn width-m flex items-center"
          to="/employees/new_employ/general"
        >
          + ?????????????? ????????????????????
        </NavLink>
      </div>
      <FilterForEmployees
        handleInput={filterList}
      />
      <div className="flex-container relative">
        <AppList
          loading={loading}
          settings={settings}
          data={getNewData}
          nestedKey="data"
        />
      </div>
      {getNewData && getNewData.length > 0 && (
        <Pagination
          paginationState={getPaginationState}
          emitPage={updateData}
        />
      )}
    </div>
  )
}

export default Employees;
