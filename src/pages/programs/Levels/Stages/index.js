import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import axios from "axios";
import Input from "@Components/Fields/Input"
import ChekBox from "@Components/Fields/CheckBox"
import {DEFAULT_URL, ADAPTATION_STAGE} from "../../../../components/APIList";
import Modal from "../../../../components/ModalWindow";
import {ModalTableBody, ModalTableHeader} from "./style";
import {settings} from "./tableConfig";

class levelStages extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            editModal: false,
            isLoaded: false,
            selectedStage: [],
            modalData: {},
            items: [],
            loading: false
        }
    }

    componentDidMount() {
        (async () => {
            this.setState({loading: true})
           await axios.get(`${DEFAULT_URL}/${ADAPTATION_STAGE}`)
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
            this.setState({loading: false})
        })()
    }

    render() {
        const { items, editModal, modalData, documentSelection, modalData: { stage_name }, selectedStage, loading } = this.state

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

        const checkStage = (value, id) => {
            this.setState({
                [id]: value
            })
        }

        return (
            <div>
                <Modal
                    isOpen={editModal}
                    title="???????????????????????????? ??????????"
                    closeModal={() => this.setState({editModal: false})}
                    handleSave={() => saveEditDocument(modalData)}
                >
                    <div>
                        <div className="pt-8">
                    <span
                        className="font-normal color-light-blue-2"
                    >
                        ???????????????????????? ??????????
                    </span>
                            <Input
                                value={stage_name}
                                key="stage_name"
                                id="stage_name"
                                onInput={() => handleInputChange(document.getElementById('stage_name').value, "stage_name")}
                                className="mt-2 font-normal"
                            />
                        </div>
                        <div className="pt-4">
                    <span
                        className="font-normal color-light-blue-2"
                    >
                        ?????????? ??.??.
                    </span>
                            <Input
                                className="mt-2"
                            />
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={documentSelection}
                    title="?????????? ??????????"
                    closeModal={openDocumentSelection}
                    handleSave={() => saveEditDocument(selectedStage)}
                    width="932px"
                    maxWidth="932px"
                >
                    <ModalTableHeader>
                        <div>???</div>
                        <div>
                            ???????????????????????? ??????????
                        </div>
                        <div>
                            ???????????????????????? ????????????
                        </div>
                        <div>
                            ???????????????????????? ??????????????????
                        </div>
                    </ModalTableHeader>
                    {
                        items.map(({description, stage_name}, index) => {
                            return (
                                <ModalTableBody>
                                    <div className="flex items-center">
                                        {index + 1}
                                    </div>
                                    <div className="flex items-center">
                                        {stage_name}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            {description}
                                        </div>
                                        <ChekBox
                                            id="selectedStage"
                                            value={selectedStage}
                                            checkBoxValue={stage_name}
                                            onInput={checkStage}
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
                        + ???????????????? ????????
                    </button>
                    <button
                        className="blue btn width-m pt-1.5 ml-4"
                        onClick={openDocumentSelection}
                    >
                        ?????????????? ????????
                    </button>
                </div>
                <AppList
                    settings={settings(editModal, toggleModal, handleEdit)}
                    data={items}
                    loading={loading}
                />
            </div>
        );
    }
}

export default levelStages;
