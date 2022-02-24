import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import axios from "axios";
import Input from "@Components/Fields/Input"
import {DEFAULT_URL, ADAPTATION_STAGE, ADAPTATION_LEVELS, ADAPTATION_PROGRAM} from "../../../../components/APIList";
import Modal from "../../../../components/ModalWindow";
import {ModalTableHeader} from "./style";
import {settings} from "./tableConfig";
import ArrowInput from "../../../../components/ArrowsInput";
import { levelsBreadcrumbs } from "../../configs";
import PageHeader from "../../../../components/PageHeader";
import {LEVELS_LINKS, NEW_PROGRAM, NEW_STAGE, PAGE_LINK_GENERAL, PAGE_LINK_STAGE_PAGE} from "../../Constants";
import { selectStageModalConfig } from "./selectStageModalConfig";
import {NavLink} from "react-router-dom";

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
            levels: [],
            programs: [],
            items: []
        }
    }

    loadStages = async () => {
        await axios.get(`${DEFAULT_URL}/${ADAPTATION_STAGE}`)
            .then(({data}) => {
                this.setState({
                    stages: data
                })
            })
    }
    loadLevels = async () => {
        await axios.get(`${DEFAULT_URL}/${ADAPTATION_LEVELS}`)
            .then(({data}) => {
                this.setState({
                    levels: data
                })
            })
    }
    loadPrograms = async () => {
        await axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}`)
            .then(({data}) => {
                this.setState({
                    programs: data
                })
            })
    }

    idLevel = () => {
        const {
            location: { pathname }
        } = this.props
        const pathNames = pathname.split("/").filter(x => x)
        return pathNames[5]
    }

    loadPageData = () => {
        axios.get(`${DEFAULT_URL}/${ADAPTATION_LEVELS}/${this.idLevel()}/`)
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
        this.loadLevels()
        this.loadPrograms()
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
    deleteStage = ({id, stage_name, create_date, duration_day, tier}) => {
        axios.put(`${DEFAULT_URL}/${ADAPTATION_STAGE}/${id}/`,{
            id,
            stage_name,
            create_date,
            duration_day,
            tier,
            level: null
        })
    }
    handleDeleteItem = async ({id, stage_name, create_date, duration_day, tier}) => {
        await this.deleteStage({id, stage_name, create_date, duration_day, tier})
        this.loadPageData()
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
        const { selectedStage, stages, items } = this.state
        let deleteItems = []
        if (!selectedStage.length || items.some(({id}) => !selectedStage.some(item => item === id))) {
            selectedStage.length ? deleteItems.push(items.filter(item => !selectedStage.includes(item.id))) : deleteItems = items
        }
        for (let i = 0; i < deleteItems[0].length; i++) {
           await this.deleteStage(deleteItems[0][i])
        }
        for (let i = 0; i < selectedStage.length; i++) {
            const { stage_name, create_date, duration_day } = stages.find(({id}) => id === selectedStage[i])
            if (!items.find(({id}) => id === selectedStage[i])) {
                console.log(2, stage_name)
                await axios.put(`${DEFAULT_URL}/${ADAPTATION_STAGE}/${selectedStage[i]}/`, {
                    stage_name,
                    create_date,
                    duration_day,
                    level: Number(this.idLevel())
                })
            }
        }
        this.setState({
            addStageModal: false,
            selectedStage: []
        })
        this.loadPageData()

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
    openStageSelection = () => {
        const { items } = this.state
        this.setState({
            addStageModal: true,
            selectedStage: items.map(({id}) => id)
        })
    }
    appListData = () => {
        const { programs, stages, levels } = this.state
        return stages.map((item) => {
            const { level } = item
            const levelData = levels ? levels.find(({id}) => id === level) : []
            const programData = programs ? programs.find(({levels}) => levels.find(a => a === level)) : []
           return  levelData ? {...item, level_name: levelData.level_name ? levelData.level_name : "", program_name: programData ? programData.program_name : "" } : item
        })
    }
    toNewStagePath = () => {
        const {
            location: { pathname }
        } = this.props
        const pathNames = pathname.split("/").filter(x => x)
        return `/${pathNames[0]}/${pathNames[1]}/${pathNames[2]}/${PAGE_LINK_STAGE_PAGE}/${NEW_STAGE}/${PAGE_LINK_GENERAL}`
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
        } = this.state

        const { location: { pathname } } = this.props

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
            actionTierUp,
            actionTierDown,
            handleDeleteItem,
            openStageSelection
        } = this

        return (
            <>
                <Modal
                    isOpen={editModal}
                    title="Редактирование этапа"
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
                                    onInput={() => handleInputChange(document.getElementById('tier').value, "tier")}
                                    arrowUp={tierUp}
                                    arrowDown={tierDown}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
                {/*// todo в этой модалке не выводятся данные? почему?*/}
                <Modal
                    isOpen={StageSelection}
                    title="Выбор этапа"
                    closeModal={openDocumentSelection}
                    handleSave={() => saveEditStage(selectedStage)}
                    width="932px"
                    maxWidth="932px"
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
                </Modal>

                <Modal
                    isOpen={addStageModal}
                    title="Выбор этапа"
                    closeModal={() => {closeAddStageModal()}}
                    handleSave={() => saveAddStages(selectedStage)}
                    width="932px"
                    maxWidth="932px"
                >
                    <AppList
                        data={this.appListData()}
                        settings={selectStageModalConfig(selectedStage, checkStage)}
                    />
                </Modal>
                <div className="pt-8 pb-6 pl-4 flex">
                    <NavLink
                        className="blue btn width-m pt-1.5"
                        to={this.toNewStagePath()}
                    >
                        + Добавить этап
                    </NavLink>
                    <button
                        className="blue btn width-m pt-1.5 ml-4"
                        onClick={openStageSelection}
                    >
                        Выбрать этап
                    </button>
                </div>
                <AppList
                    settings={settings(handleEdit, actionTierUp, actionTierDown, handleDeleteItem)}
                    data={items}
                />
            </>
        );
    }
}

export default levelStages;
