import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import {DEFAULT_URL, ADAPTATION_PROGRAM, ADAPTATION_CONTACTS} from "../../../../components/APIList";
import axios from "axios";
import {settings} from "./TableConfig";
import Modal from "../../../../components/ModalWindow";
import { modalTableConfig } from "./modalTableConfig";

class Contacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            programData: {},
            contacts: [],
            contactsModal: false,
            selectedContacts: [],
            items: []
        }
    }
    loadPageData = () => {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const idProgram = pathnames[1] !== "new_program" ? `/${pathnames[2]}` : ""
        axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${idProgram}`)
            .then(
                (response) => {
                    const { data, data: { contacts_detail }} = response
                    this.setState({
                        isLoaded: true,
                        items: contacts_detail,
                        programData: data
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }
    componentDidMount() {
       this.loadPageData()
        axios.get(`${DEFAULT_URL}/${ADAPTATION_CONTACTS}`)
            .then((response) => {
                const { data } = response
                this.setState({
                    contacts: data
                })
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }
    toggleAddContactModal = () => {
        const { contactsModal, items } = this.state
        this.setState({
            contactsModal: !contactsModal,
            selectedContacts: items.map(({id}) => id)
        })
    }
    checkContact = (value, id) => {
        this.setState({
            [id]: value
        })
    }
    addContacts = () => {
        const { location: { pathname } } = this.props
        const { programData: { contact, program_name, create_date, id, status, tier, employee, duration_day, description }, selectedContacts } = this.state
        const pathnames = pathname.split("/").filter(x => x)
        const idProgram = pathnames[1] !== "new_program" ? `/${pathnames[2]}/` : ""
        const newData = {
            program_name,
            create_date,
            id,
            status,
            tier,
            employee,
            duration_day,
            description,
            contact: contact.concat(selectedContacts.filter(item => !contact.some(a => a === item)))
        }
        axios.put(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${idProgram}`, newData)
            .then(
                (response) => {
                    const { data, data: { contacts_detail }} = response
                    this.setState({
                        isLoaded: true,
                        items: contacts_detail,
                        programData: data
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                },

            )
        this.setState({
            contactsModal: false,
            selectedContacts: []
        })
    }
    render() {
        const { items = [], contactsModal, selectedContacts, contacts } = this.state
        const { toggleAddContactModal, checkContact, addContacts } = this
        const newData = items.map(({ last_name, first_name, post, role, email, mobile_phone, illustration_link }) =>
            ({
                value: {
                    name: `${last_name} ${first_name}`,
                    role: `${post}`,
                    img: illustration_link
                },
                role: `${role}`,
                contacts: {
                    mail: email,
                    phone: [mobile_phone]
                }
            })
        )
        return (
            <>
                <Modal
                  title="Добавить контакт"
                    isOpen={contactsModal}
                    closeModal={toggleAddContactModal}
                    handleSave={addContacts}

                >
                    <AppList
                        settings={modalTableConfig(selectedContacts, checkContact)}
                        data={contacts}
                    />
                </Modal>
                <div
                    className="pt-6 pl-4"
                >
                    <button
                        className="blue btn width-m"
                        onClick={toggleAddContactModal}
                    >
                        + Добавить контакт
                    </button>
                </div>
                <AppList
                    settings={settings}
                    data={newData}
                />
            </>
        );
    }
}

export default Contacts;
