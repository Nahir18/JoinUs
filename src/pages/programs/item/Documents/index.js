import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import "../levels/style.css"
import {ArrowUP, DocumentIcon, EditIcon, Trash} from "../../../Constants";
import Modal from "../../../../components/ModalWindow";
import Input from "@Components/Fields/Input"
import ChekBox from "@Components/Fields/CheckBox"
import axios from "axios";
import {ADAPTATION_DOCUMENT, ADAPTATION_PROGRAM, DEFAULT_URL} from "../../../../components/APIList";
import { ModalTableHeader, ModalTableBody } from "./style";
import DocumentName from "../../../../components/ComponentsForListTable/DocumentName";


const DocumentActions = ({handleEdit, data}) => {
    return (
        <div>
            <div className="icon-container transition-icon cursor items-center j-c-center flex">
                <div
                    className="edit-icon"
                    onClick={() => handleEdit(data)}
                    dangerouslySetInnerHTML={{__html: EditIcon}}
                />
                <div className="flex a-i-center j-c-center ml-7">
                    <div
                        className="arrow-icon"
                        dangerouslySetInnerHTML={{__html: ArrowUP}}
                    />
                    <div
                        className="arrow-icon arrow-down"
                        dangerouslySetInnerHTML={{__html: ArrowUP}}
                    />
                </div>
                <div
                    className="trash-icon ml-7"
                    dangerouslySetInnerHTML={{__html: Trash}}
                />
            </div>
        </div>
    )
}

const settings = (editModal, closeModal, handleEdit) => [
    {
        id: 1,
        key: "number",
        name: "№",
        size: "5%"
    },
    {
        id: 2,
        key: "document_name",
        name: "Наименование",
        component: DocumentName,
        size: "30%"
    },
    {
        id: 3,
        key: "actions",
        allData: true,
        name: "Действия",
        component: ({rowIndex, data}) => (
            <DocumentActions
                data={data}
                editModal={editModal}
                closeModal={closeModal}
                handleEdit={handleEdit}
                rowIndex={rowIndex}
            />
        ),
        size: "30%"
    }
]

class Documents extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            documentModal: false,
            editModal: false,
            modalData: {},
            documentSelection: false,
            selectedDocuments: [],
            items: []
        }
    }

    componentDidMount() {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const idProgram = pathnames[1] !== "new_program" ? `/${pathnames[2]}` : ""
        axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${idProgram}`)
            .then(
                (response) => {
                    this.setState({
                        isLoaded: true,
                        items: response.data.documents_detail
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
    render() {
        const { editModal, items, modalData: {document_name}, modalData, documentSelection, selectedDocuments } = this.state
        const handleEdit = (data) => this.setState({
            editModal: true,
            modalData: data
        })
        const openDocumentSelection = () => this.setState({
            documentSelection: !documentSelection
        })
        const handleInputChange = (value, id) => {
            this.setState({
                modalData: {[id]: value}
            })
        }
        const saveEditDocument = (data) => {
            console.log(data)
        }
        const closeModal = () => this.setState({editModal: false})
        const checkDocument = (value, id) => {
            this.setState({
                [id]: value
            })
        }
        return (
            <div>
                <Modal
                    isOpen={editModal}
                    title="редактирование документа"
                    closeModal={closeModal}
                    handleSave={() => saveEditDocument(modalData)}
                >
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
                                onInput={() => handleInputChange(document.getElementById('document_name').value, "document_name")}
                                className="mt-2 font-normal"
                            />
                        </div>
                        <div className="pt-4">
                    <span
                        className="font-normal color-light-blue-2"
                    >
                        Номер п.п.
                    </span>
                            <Input
                                className="mt-2"
                            />
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={documentSelection}
                    title="Выбор документа"
                    closeModal={openDocumentSelection}
                    handleSave={() => saveEditDocument(selectedDocuments)}
                >
                    <ModalTableHeader>
                        <div>№</div>
                        <div>
                            Наименование документа
                        </div>
                        <div>
                            Наименование программы
                        </div>
                    </ModalTableHeader>
                       {
                           items.map(({document_name, id_document}, index) => {
                               return (
                                   <ModalTableBody>
                                       <div className="flex items-center">
                                           {index + 1}
                                       </div>
                                       <div className="flex items-center">
                                           <div
                                               className="pr-2"
                                               dangerouslySetInnerHTML={{__html: DocumentIcon}}
                                           />
                                           {document_name}
                                       </div>
                                       <div className="flex items-center justify-between">
                                           <div>
                                               {document_name}
                                           </div>
                                           <ChekBox
                                               id="selectedDocuments"
                                               value={selectedDocuments}
                                               checkBoxValue={id_document}
                                               onInput={checkDocument}
                                           />
                                       </div>
                                   </ModalTableBody>
                               )
                           })
                       }
                </Modal>
                <div className="pt-8 pb-6 pl-4">
                    <button
                        className="blue btn width-m pt-1.5"
                    >
                        + Добавить документ
                    </button>
                    <button
                        className="blue btn width-m pt-1.5 ml-4"
                        onClick={openDocumentSelection}
                    >
                        Выбрать документ
                    </button>
                </div>
                <AppList
                    settings={settings(editModal, closeModal, handleEdit)}
                    data={items}
                />
            </div>
        );
    }
}

export default Documents;
