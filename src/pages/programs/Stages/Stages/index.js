import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import axios from "axios";
import Input from "@Components/Fields/Input"
import ChekBox from "@Components/Fields/CheckBox"
import {DEFAULT_URL, ADAPTATION_STAGE, ADAPTATION_LEVELS} from "../../../../components/APIList";
import Modal from "../../../../components/ModalWindow";
import {ModalTableBody, ModalTableHeader} from "./style";
import {settings} from "./tableConfig";
import ArrowInput from "../../../../components/ArrowsInput";
import { levelsBreadcrumbs } from "../../configs";
import ProgramsHeader from "../../ProgramsHeader"
import {LEVELS_LINKS, NEW_PROGRAM} from "../../Constants";
import ScrollBar from "@Components/ScrollBar"

class levelStages extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            editModal: false,
            isLoaded: false,
            addStageModal: false,
            levelData: {},
            selectedStage: [],
            modalData: {},
            stages: [],
            items: []
        }
    }

    loadStages = () => {
        axios.get(`${DEFAULT_URL}/${ADAPTATION_STAGE}`)
            .then((response) => {
                const { data } = response
                this.setState({
                    stages: data
                })
            })
    }

    loadPageData = () => {
        const {
            location: { pathname }
        } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const idLevel = pathnames[1] !== "new_program" ? `/${pathnames[3]}/` : ""
        axios.get(`${DEFAULT_URL}/${ADAPTATION_LEVELS}${idLevel}`)
            .then(
                (response) => {
                    const { data, data: { stages } } = response
                    this.setState({
                        isLoaded: true,
                        levelData: data,
                        items: stages
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
        this.loadStages()
    }
    tierUp = () => {
        const {  modalData, modalData: { tier } } = this.state
        this.setState({
            modalData: { ...modalData, tier: tier + 1}
        })
    }
    tierDown = () => {
        const {  modalData, modalData: { tier } } = this.state
        this.setState({
            modalData: {...modalData, tier: tier > 1 ? tier - 1 : tier}
        })
    }
    toggleModal = () => {
        const { editModal } = this.state
        this.setState({
            editModal: !editModal
        })
    }
    handleEdit = (data) => {
        this.setState({
            editModal: true,
            StageSelection: false,
            modalData: data
        })
    }
    handleInputChange = (value, id) => {
        const { modalData } = this.state
        this.setState({
            modalData: { ...modalData, [id]: value}
        })
    }
    saveEditStage = async ({id, stage_name, tier, point, status, create_date, id_employee, duration_day}) => {
        await axios.put(`${DEFAULT_URL}/${ADAPTATION_STAGE}/${id}/`,{
            id, stage_name, tier, point, status, create_date, id_employee, duration_day
        }
        )
            .then((response) => {
                this.setState({
                    isLoaded: true
                })
            })
        this.setState({
            editModal: false
        })
        this.loadPageData()
    }

    openDocumentSelection = () => {
        const { StageSelection } = this.state
        this.setState({
            StageSelection: !StageSelection
        })
    }

    checkStage = (value, id) => {
        this.setState({
            [id]: value
        })
    }
    closeAddStageModal = () => {
        this.setState({
            addStageModal: false,
            selectedStage: []
        })
    }
    saveAddStages = async () => {
        const {
            location: { pathname }
        } = this.props
        const { selectedStage, stages } = this.state
        const pathnames = pathname.split("/").filter(x => x)
        const idLevel = pathnames[3]
        const { loadPageData } = this
        for (let i = 0; i < selectedStage.length; i++) {
            const { stage_name, create_date, duration_day } = stages.find(({id}) => id === selectedStage[i])
           await axios.put(`${DEFAULT_URL}/${ADAPTATION_STAGE}/${selectedStage[i]}/`, {
                stage_name,
                create_date,
                duration_day,
                level: Number(idLevel)
            })
        }
        this.setState({
            addStageModal: false,
            selectedStage: []
        })
        loadPageData()

    }
     actionTierUp = async ({ id, stage_name, create_date, duration_day, tier }) => {
         await axios.put(`${DEFAULT_URL}/${ADAPTATION_STAGE}/${id}/`, {
            stage_name,
            create_date,
            duration_day,
            tier: tier ? tier + 1 : 1,
        })
        this.loadPageData()
    }
    actionTierDown = async ({ id, stage_name, create_date, duration_day, tier }) => {
        if (tier > 0) {
            await axios.put(`${DEFAULT_URL}/${ADAPTATION_STAGE}/${id}/`, {
                stage_name,
                create_date,
                duration_day,
                tier: tier > 0 ? tier - 1 : 0,
            })
            this.loadPageData()
        }
    }
    handleDeleteItem = async ({id, stage_name, create_date, duration_day, tier}) => {
        await axios.put(`${DEFAULT_URL}/${ADAPTATION_STAGE}/${id}/`,{
            id,
            stage_name,
            create_date,
            duration_day,
            tier,
            level: null
        })
        this.loadPageData()
    }
    pageHeaderTitle = (level_name) => {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const newProgram = pathnames[1] === NEW_PROGRAM
        return newProgram ? "Новая программа" : level_name ? `Уровень "${level_name}"` : ""
    }
    render() {
        const {
            items,
            editModal,
            modalData,
            StageSelection,
            modalData: { stage_name, tier },
            selectedStage,
            addStageModal,
            stages,
            levelData: { level_name }
        } = this.state

        const {
            closeAddStageModal,
            saveAddStages,
            tierUp,
            tierDown,
            handleEdit,
            handleInputChange,
            saveEditStage,
            openDocumentSelection,
            checkStage,
            pageHeaderTitle,
            actionTierUp,
            actionTierDown,
            handleDeleteItem
        } = this

        return (
            <ProgramsHeader
                className="h-full"
                {...this.props}
                pageData={pageHeaderTitle(level_name)}
                bredCrumbsConfig={levelsBreadcrumbs}
                url="programs"
                links={LEVELS_LINKS}
            >
                <Modal
                    isOpen={editModal}
                    title="редактирование этапа"
                    closeModal={() => this.setState({editModal: false})}
                    handleSave={() => saveEditStage(modalData)}
                >
                    <div>
                        <div className="pt-8">
                    <span
                        className="font-normal color-light-blue-2"
                    >
                        Наименование этапа
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
                        Номер п.п.
                    </span>
                            <div
                                className="relative"
                            >
                                <ArrowInput
                                    id="tier"
                                    key="tier"
                                    value={tier}
                                    top="20px"
                                    arrowUp={tierUp}
                                    arrowDown={tierDown}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={StageSelection}
                    title="Выбор этапа"
                    closeModal={openDocumentSelection}
                    handleSave={() => saveEditStage(selectedStage)}
                >
                    <ModalTableHeader>
                        <div>№</div>
                        <div>
                            Наименование этапа
                        </div>
                        <div>
                            Наименование уровня
                        </div>
                        <div>
                            Наименование программы
                        </div>
                    </ModalTableHeader>
                    {/*{*/}
                    {/*    items && items.map(({description, stage_name}, index) => {*/}
                    {/*        return (*/}
                    {/*            <ModalTableBody>*/}
                    {/*                <div className="flex items-center">*/}
                    {/*                    {index + 1}*/}
                    {/*                </div>*/}
                    {/*                <div className="flex items-center">*/}
                    {/*                    {stage_name}*/}
                    {/*                </div>*/}
                    {/*                <div className="flex items-center justify-between">*/}
                    {/*                    <div>*/}
                    {/*                        {description}*/}
                    {/*                    </div>*/}
                    {/*                    <ChekBox*/}
                    {/*                        id="selectedStage"*/}
                    {/*                        value={selectedStage}*/}
                    {/*                        checkBoxValue={stage_name}*/}
                    {/*                        onInput={checkStage}*/}
                    {/*                    />*/}
                    {/*                </div>*/}
                    {/*            </ModalTableBody>*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*}*/}
                </Modal>
                <Modal
                    isOpen={addStageModal}
                    title="Выбор этапа"
                    closeModal={() => {closeAddStageModal()}}
                    handleSave={() => saveAddStages(selectedStage)}
                >
                    <ModalTableHeader>
                        <div>№</div>
                        <div>
                            Наименование этапа
                        </div>
                        <div>
                            Наименование уровня
                        </div>
                        <div>
                            Наименование программы
                        </div>
                    </ModalTableHeader>
                    <ScrollBar>
                        {
                            stages.map(({description, stage_name, id}, index) => {
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
                                                className="p-r-14"
                                                value={selectedStage}
                                                checkBoxValue={id}
                                                onInput={checkStage}
                                            />
                                        </div>
                                    </ModalTableBody>
                                )
                            })
                        }
                    </ScrollBar>
                </Modal>
                <div className="pt-8 pb-6 pl-4 flex">
                    <button
                        className="blue btn width-m pt-1.5"
                        onClick={() => ({})}
                    >
                        + Добавить этап
                    </button>
                    <button
                        className="blue btn width-m pt-1.5 ml-4"
                        onClick={() => this.setState({addStageModal: true})}
                    >
                        Выбрать этап
                    </button>
                </div>
                <AppList
                    settings={settings(handleEdit, actionTierUp, actionTierDown, handleDeleteItem)}
                    data={items}
                />
            </ProgramsHeader>
        );
    }
}

export default levelStages;
