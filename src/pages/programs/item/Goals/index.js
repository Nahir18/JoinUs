import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import { DocumentIcon } from "../../../Constants";
import axios from "axios";
import Input from "@Components/Fields/Input"
import ChekBox from "@Components/Fields/CheckBox"
import { DEFAULT_URL, ADAPTATION_GOALS } from "../../../../components/APIList";
import Modal from "../../../../components/ModalWindow";
import {ModalTableBody, ModalTableHeader} from "../Documents/style";
import { settings } from "./FormConfig";

class Goals extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            editModal: false,
            isLoaded: false,
            selectedGoals: [],
            modalData: {},
            items: []
        }
    }

    componentDidMount() {
        axios.get(`${DEFAULT_URL}/${ADAPTATION_GOALS}`)
            .then(
                (response) => {
                    this.setState({
                        isLoaded: true,
                        items: response.data
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
        const { items, editModal, modalData, documentSelection, modalData: { description }, selectedGoals } = this.state

        const handleEdit = (data) => {
            this.setState({
                editModal: true,
                documentSelection: false,
                modalData: data
            })
        }

        const handleInputChange = (value, id) => {
            this.setState({
                modalData: {[id]: value}
            })
        }

        const openDocumentSelection = () => this.setState({
            documentSelection: !documentSelection
        })

        const saveEditDocument = (data) => {
            console.log(data)
        }

        const toggleModal = () => this.setState({
            editModal: !editModal
        })

        const checkDocument = (value, id) => {
            this.setState({
                [id]: value
            })
        }

        return (
            <div>
                <Modal
                    isOpen={editModal}
                    title="редактирование цели"
                    closeModal={() => this.setState({editModal: false})}
                    handleSave={() => saveEditDocument(modalData)}
                >
                    <div>
                        <div className="pt-8">
                    <span
                        className="font-normal color-light-blue-2"
                    >
                        Наименование цели
                    </span>
                            <Input
                                value={description}
                                key="description"
                                id="description"
                                onInput={() => handleInputChange(document.getElementById('description').value, "description")}
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
                    title="Выбор цели"
                    closeModal={openDocumentSelection}
                    handleSave={() => saveEditDocument(selectedGoals)}
                >
                    <ModalTableHeader>
                        <div>№</div>
                        <div>
                            Наименование цели
                        </div>
                        <div>
                            Наименование программы
                        </div>
                    </ModalTableHeader>
                    {
                        items.map(({description, id_goal}, index) => {
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
                                        {description}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            {description}
                                        </div>
                                        <ChekBox
                                            id="selectedGoals"
                                            value={selectedGoals}
                                            checkBoxValue={id_goal}
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
                    settings={settings(editModal, toggleModal, handleEdit)}
                    data={items}
                />
            </div>
        );
    }
}

export default Goals;
