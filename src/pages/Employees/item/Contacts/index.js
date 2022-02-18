import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import AppList from "../../../../components/AppList";
import {settings} from "./tableConfig";
import axios from "axios";
import {ADAPTATION_CONTACTS, CANDIDATE_LIST, DEFAULT_URL} from "../../../../components/APIList";
import {modalTableConfig} from "./modalConfig";
import Modal from "../../../../components/ModalWindow";

let modalData = [{"id":1,"last_name":"string","first_name":"string","middle_name":"string","post":"string","role":"string","tier":0,"status":0,"illustration_link":"string","create_date":"2022-02-09T13:22:15.365000Z","id_employee":0,"mobile_phone":"string","email":"string"},{"id":2,"last_name":"string","first_name":"string","middle_name":"string","post":"string","role":"string","tier":0,"status":0,"illustration_link":"string","create_date":"2022-02-09T13:22:15.365000Z","id_employee":0,"mobile_phone":"string","email":"string"},{"id":3,"last_name":"last name","first_name":"first name","middle_name":"middle name","post":"string","role":"string","tier":0,"status":0,"illustration_link":"string","create_date":"2022-02-09T13:22:15.365000Z","id_employee":0,"mobile_phone":"string","email":"string"},{"id":4,"last_name":"last name","first_name":"first name","middle_name":"middle name","post":"qwerty","role":"developer","tier":0,"status":0,"illustration_link":"string","create_date":"2022-02-09T13:22:15.365000Z","id_employee":0,"mobile_phone":"string","email":"string"}]
const data =[
  {
    "id": 2,
    "last_name": "string",
    "first_name": "string",
    "middle_name": "string",
    "mobile_phone": "string",
    "email": "string",
    "post": "string",
    "role": "string",
    "tier": 0,
    "status": 0,
    "illustration_link": "string",
    "create_date": "2022-02-09T13:22:15.365000Z",
    "id_employee": 0
  },
  {
    "id": 3,
    "last_name": "last name",
    "first_name": "first name",
    "middle_name": "middle name",
    "mobile_phone": "string",
    "email": "string",
    "post": "string",
    "role": "string",
    "tier": 0,
    "status": 0,
    "illustration_link": "string",
    "create_date": "2022-02-09T13:22:15.365000Z",
    "id_employee": 0
  },
  {
    "id": 4,
    "last_name": "last name",
    "first_name": "first name",
    "middle_name": "middle name",
    "mobile_phone": "string",
    "email": "string",
    "post": "qwerty",
    "role": "developer",
    "tier": 0,
    "status": 0,
    "illustration_link": "string",
    "create_date": "2022-02-09T13:22:15.365000Z",
    "id_employee": 0
  }
]
const Contacts = ({location: { pathname }, history: { push, goBack }}) => {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedContacts, setSelectedContacts] = useState([])
  const [dataModal, setDataModal] = useState([])

  const pathnames = pathname.split("/").filter(x => x)
  const newEmploy = pathnames[1] === "new_employ"
  const idEmploy = newEmploy ? "/" : `${pathnames[1]}/`

  useEffect(() => {
    axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/${idEmploy}`)
    .then(
      ({data}) => {
        setData(data.program_details.map(({contacts_detail}) => contacts_detail).flat())
      },
      (error) => {
        console.log(error)
      }
    )

    axios.get(`${DEFAULT_URL}/${ADAPTATION_CONTACTS}`)
    .then(({data}) => {
        setDataModal(data)
      },
      (error) => {
        console.log(error)
      })
  }, [])




  const openModal = useCallback(() => {
    setOpen(true)
    // dataModal.map((item) => {
    //   console.log(data.find(({id}) => item.id === id))
    // })
    setSelectedContacts(data.map(({id}) => id))

  }, [])

  const closeModal = useCallback(() => {
    setOpen(false)
  }, [])

  const addContacts = useCallback(() => {

  }, [])

 const checkContact = (value, id) => {
   console.log(value, id)
  }

  const newData = useMemo(() => (
    data.map(({ last_name, first_name, post, role, email, mobile_phone, illustration_link }) =>
      ({
        value: {
          name: `${last_name} ${first_name}`,
          post,
          img: illustration_link
        },
        role,
        contacts: {
          email,
          phone: [mobile_phone]
        }
      })
    )
  ), [data])

  const bbb = useMemo(() => {
    selectedContacts.reduce((acc, item) => {
      dataModal.forEach(({id}) => {
        if (item.id === id) {
          acc.push({...item, checked: 1})
        } else {
          acc.push({...item, checked: 0})
        }
      })
      return acc
    }, [])
  }, [])
  console.log(bbb)

  return (
    <div className="flex-container p-t-24">
      <button
        className="blue btn width-m m-l-16 m-b-16"
        onClick={openModal}
      >
        + Добавить контакт
      </button>
      <AppList
        settings={modalTableConfig(bbb, checkContact)}
        data={dataModal}
      />

      <Modal
        title="Добавить контакт"
        isOpen={open}
        closeModal={closeModal}
        handleSave={addContacts}

      >
        <AppList
          settings={modalTableConfig(selectedContacts, checkContact)}
          data={dataModal}
        />
      </Modal>
      <AppList
        settings={settings}
        data={newData}
      />
    </div>
  );
}

Contacts.propTypes = {};

export default Contacts;
