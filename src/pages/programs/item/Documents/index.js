import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import "../levels/style.css"
import Modal from "../../../../components/ModalWindow";
import Input from "@Components/Fields/Input"
import axios from "axios";
import {
    ADAPTATION_PROGRAM,
    ADAPTATION_DOCUMENT,
    DEFAULT_URL,
    ADAPTATION_EMPLOYEE
} from "../../../../components/APIList";
import DatePicker from "@Components/Fields/DatePicker"
import ArrowInput from "../../../../components/ArrowsInput";
import { settings } from "./tableConfig";
import { programsBreadcrumbs } from "../../configs";
import PageHeader from "../../../../components/PageHeader";
import {NAV_BUTTON_LINKS, NEW_PROGRAM} from "../../Constants";
import ScrollBar from "@Components/ScrollBar"
import { selectDocumentModalConfig } from "./selectDocumentModalConfig";
import DocumentPhoto from "../../../../components/DocumentPhoto"
import EditDateForSave from "../../../../utils/Date/EditDateForSave";
import RefSelect from "@Components/Fields/RefSelect/index"

class Documents extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            documentModal: false,
            editModal: false,
            modalData: {},
            addNewDocument: false,
            documentSelection: false,
            employee: [],
            selectedDocuments: [],
            programData: {},
            documents: [],
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
                    const { data: { documents_detail }, data } = response
                    this.setState({
                        programData: data,
                        isLoaded: true,
                        items: documents_detail
                    })
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }
    loadDocumentList = () => {
        axios.get(`${DEFAULT_URL}/${ADAPTATION_DOCUMENT}`)
            .then(
                (response) => {
                    const { data } = response
                    this.setState({
                        isLoaded: true,
                        documents: data
                    })
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    componentDidMount() {
        this.loadPageData()
        this.loadDocumentList()
        axios.get(`${DEFAULT_URL}/${ADAPTATION_EMPLOYEE}`)
            .then(
                (response) => {
                    const { data } = response
                    this.setState({
                        isLoaded: true,
                        employee: data.map(({first_name, last_name, id}) => {
                            return { name: `${first_name} ${last_name}`, id }
                        })
                    })
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }
    checkDocument = (value, id) => {
        this.setState({
            [id]: value
        })
    }
    checkNewDocument = (value, id) => {
        this.setState({
            [id]: value
        })
    }
    saveEditDocument = async (closeModal, data) => {
        const { id } = data
        await axios.put(`${DEFAULT_URL}/${ADAPTATION_DOCUMENT}/${id}/`, data)
            .then(
                (response) => {
                    const { data: { documents_detail } } = response
                    this.setState({
                        isLoaded: true,
                        data: documents_detail
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
        this.loadPageData()
        this.setState({
            editModal: false,
            modalData: []
        })
    }
    saveSelectedDocuments = async () => {
       const { modalData, modalData: { create_date } } = this.state
        await axios.post(`${DEFAULT_URL}/${ADAPTATION_DOCUMENT}/`, {...modalData, create_date: EditDateForSave(create_date)})
        this.setState({
            documentSelection: false
        })
        this.loadPageData()
        this.loadDocumentList()
    }
    saveNewDocuments = async (closeModal) => {
        const {
            location: { pathname }
        } = this.props
        const { programData: { documents, program_name, create_date, id, status, tier, employee, duration_day, description }, selectedDocuments } = this.state
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
            documents: documents.concat(selectedDocuments.filter(item => !documents.some(a => a === item)))
        }
        if (selectedDocuments.length) {
            await axios.put(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${idProgram}`, newData)
                .then(
                    (response) => {
                        const {data: {documents_detail}, data} = response
                        this.setState({
                            isLoaded: true,
                            programData: data,
                            items: documents_detail
                        })
                        closeModal()
                    },
                    (error) => {
                        console.log(error)
                        this.setState({
                            isLoaded: true,
                            error
                        })
                    }
                )
            this.setState({
                selectedDocuments: []
            })
        }
    }
    addDocument = () => {
        const { addNewDocument, items } = this.state
        this.setState({
            selectedDocuments: items.map(({id}) => id),
            addNewDocument: !addNewDocument
        })
    }
    openDocumentSelection = () => {
        const { documentSelection } = this.state
        this.setState({
            documentSelection: !documentSelection
        })
    }
    handleInputChange = (value, id) => {
        const { modalData } = this.state
        this.setState({
            modalData: { ...modalData, [id]: value}
        })
    }
    handleNumericInputChange = (value, id) => {
        const { modalData } = this.state
        this.setState({
            modalData: { ...modalData, [id]: isNaN(value) ? modalData[id] : value}
        })
    }
    tierUp = () => {
        const {  modalData, modalData: { tier } } = this.state
        this.setState({
            modalData: { ...modalData, tier: tier ? tier + 1 : 1}
        })
    }
    tierDown = () => {
        const {  modalData, modalData: { tier } } = this.state
        this.setState({
            modalData: { ...modalData, tier: tier > 1 ? tier - 1 : tier}
        })
    }
    closeModal = () => this.setState({editModal: false, modalData: []})
    deleteItem = async (deleteItemId) => {
        const {
            location: { pathname }
        } = this.props
        const { programData: { documents, program_name, create_date, id, status, tier, employee, duration_day, description  } } = this.state
        const newData = {
            program_name,
            create_date,
            id,
            status,
            tier,
            employee,
            duration_day,
            description,
            documents: documents.filter(item => item !== deleteItemId)}
        const pathnames = pathname.split("/").filter(x => x)
        const idProgram = pathnames[1] !== "new_program" ? `/${pathnames[2]}/` : ""
        await axios.put(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${idProgram}`, newData)
            .then(
                (response) => {
                    const { data: { documents_detail }, data } = response
                    this.setState({
                        isLoaded: true,
                        programData: data,
                        items: documents_detail
                    })
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }
    actionButtonTierUp = async (data) => {
        const { id, tier } = data
        const newData = { ...data, tier: tier + 1 }
        await axios.put(`${DEFAULT_URL}/${ADAPTATION_DOCUMENT}/${id}/`, newData)
        this.loadPageData()
    }
    actionButtonTierDown = async (data) => {
        const { id, tier } = data
        if (tier > 1) {
            const newData = { ...data, tier: tier - 1 }
            await axios.put(`${DEFAULT_URL}/${ADAPTATION_DOCUMENT}/${id}/`, newData)
            this.loadPageData()
        }
    }
    addDocumentFile = (value) => {
        const { modalData } = this.state
        value.length ?
        this.setState({
            modalData: {...modalData, document_link: value[0].file}
        }) : this.setState({modalData: {...modalData, document_link: 0}})
    }
    pageHeaderTitle = (program_name) => {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const newProgram = pathnames[1] === NEW_PROGRAM
        return newProgram ? "Новая программа" : program_name
    }
    render() {
        const {
            editModal,
            items,
            documents,
            modalData: {document_name, document_link, tier, create_date},
            modalData,
            documentSelection,
            selectedDocuments,
            addNewDocument,
            programData: { program_name }
        } = this.state
        const handleEdit = (data) => this.setState({
            editModal: true,
            modalData: data
        })
        const {
            actionButtonTierUp,
            actionButtonTierDown,
            pageHeaderTitle,
            addDocumentFile
        } = this
        return (
                <PageHeader
                    className="h-full"
                    {...this.props}
                    pageData={pageHeaderTitle(program_name)}
                    bredCrumbsConfig={programsBreadcrumbs}
                    url="programs"
                    links={NAV_BUTTON_LINKS}
                >
                    <Modal
                        isOpen={editModal}
                        title="редактирование документа"
                        closeModal={this.closeModal}
                        handleSave={() => this.saveEditDocument(this.closeModal, modalData)}
                    >
                        <ScrollBar>
                            <div>
                                <div className="pt-8">
                                    <span
                                        className="font-normal color-light-blue-2"
                                    >
                                        Наименование документа
                                    </span>
                                    <Input
                                        value={document_name}
                                        key="document_name"
                                        id="document_name"
                                        onInput={() => this.handleInputChange(document.getElementById('document_name').value, "document_name")}
                                        className="mt-2 font-normal"
                                    />
                                </div>
                                <div className="pt-4">
                                    <span
                                        className="font-normal color-light-blue-2"
                                    >
                                        Номер п.п.
                                    </span>
                                    <div className="relative">
                                        <ArrowInput
                                            value={tier}
                                            key="tier"
                                            id="tier"
                                            onInput={() => this.handleNumericInputChange(Number(document.getElementById('tier').value), "tier")}
                                            arrowUp={this.tierUp}
                                            arrowDown={this.tierDown}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="pt-8"
                                >
                                    <DocumentPhoto
                                        value={[{
                                            file: document_link,
                                        }]}
                                        onInput={addDocumentFile}
                                    />
                                </div>
                            </div>
                        </ScrollBar>
                    </Modal>
                    <Modal
                        isOpen={documentSelection}
                        title="Добавить документ"
                        closeModal={this.openDocumentSelection}
                        handleSave={() => this.saveSelectedDocuments()}
                    >
                        <ScrollBar>
                            <span
                                className="font-normal color-light-blue-2"
                            >
                                Наименование документа
                            </span>
                            <Input
                                value={document_name}
                                key="document_name"
                                id="document_name"
                                onInput={() => this.handleInputChange(document.getElementById('document_name').value, "document_name")}
                                className="mt-2 font-normal"
                            />
                            <div className="pt-4">
                                    <span
                                        className="font-normal color-light-blue-2"
                                    >
                                        Номер п.п.
                                    </span>
                                <div className="relative">
                                    <ArrowInput
                                        className="mt-2 font-normal"
                                        value={tier}
                                        top="21px"
                                        key="tier"
                                        id="tier"
                                        onInput={() => this.handleNumericInputChange(Number(document.getElementById('tier').value), "tier")}
                                        arrowUp={this.tierUp}
                                        arrowDown={this.tierDown}
                                    />
                                </div>
                            </div>
                            <div className="pt-4">
                                <span
                                    className="font-normal color-light-blue-2"
                                >
                                    Дата создания
                                </span>
                                <DatePicker
                                    className="mt-2 font-normal"
                                    value={create_date}
                                    onInput={(value) => (this.setState({modalData: {...modalData, create_date: value}}))}
                                />
                            </div>
                            <div
                                className="pt-4"
                            >
                                 <span
                                     className="font-normal color-light-blue-2"
                                 >
                                    Создатель
                                </span>
                                <RefSelect
                                    className="mt-2"
                                    labelKey="name"
                                    valueKey="id"
                                    value={modalData.id_employee}
                                    onInput={(value) => (this.setState({modalData: {...modalData, id_employee: value}}))}
                                    options={this.state.employee}
                                    refLoader={async () => {
                                        const {
                                            data
                                        } = await axios.get(`${DEFAULT_URL}/${ADAPTATION_EMPLOYEE}`)
                                        return data.map(({first_name, last_name, id}) => {
                                            return { name: `${first_name} ${last_name}`, id }
                                        })
                                    }}
                                />
                            </div>
                            <div
                                className="pt-8"
                            >
                                <DocumentPhoto
                                    value={[{
                                        file: document_link,
                                    }]}
                                    onInput={addDocumentFile}
                                />
                            </div>
                        </ScrollBar>
                    </Modal>
                    <Modal
                        isOpen={addNewDocument}
                        title="Выбор документа"
                        closeModal={() => {this.setState({
                            addNewDocument: !addNewDocument
                        })}}
                        handleSave={() => this.saveNewDocuments(() => {this.setState({
                            addNewDocument: !addNewDocument
                        })})}
                        style={{"minWidth": "560px"}}
                    >
                        <AppList
                            settings={selectDocumentModalConfig(selectedDocuments, this.checkNewDocument)}
                            data={documents}
                        />
                    </Modal>
                    <div className="pt-6 pb-6 pl-4 flex">
                        <button
                            className="blue btn width-m pt-1.5"
                            onClick={this.openDocumentSelection}
                        >
                            + Добавить документ
                        </button>
                        <button
                            className="blue btn width-m pt-1.5 ml-4"
                            onClick={this.addDocument}
                        >
                            Выбрать документ
                        </button>
                    </div>
                    <AppList
                        settings={settings(editModal, this.closeModal, handleEdit, this.deleteItem, actionButtonTierUp, actionButtonTierDown)}
                        data={items}
                    />
                </PageHeader>
        );
    }
}

export default Documents;
