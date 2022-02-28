import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import axios from "axios";
import Input from "@Components/Fields/Input"
import {DEFAULT_URL, ADAPTATION_PROGRAM, ADAPTATION_GOALS, ADAPTATION_EMPLOYEE} from "../../../../components/APIList";
import Modal from "../../../../components/ModalWindow";
import { settings } from "./FormConfig";
import ArrowInput from "../../../../components/ArrowsInput";
import {NEW_PROGRAM} from "../../Constants";
import ScrollBar from "@Components/ScrollBar"
import DatePicker from "@Components/Fields/DatePicker"
import { addGoalsModalConfig } from "./addGoalsModalConfig";
import EditDateForSave from "../../../../utils/Date/EditDateForSave";
import RefSelect from "@Components/Fields/RefSelect/index"
import { WithValidationHocRenderPropAdapter } from "../../../../Validator";
import { NewGoalModalConfig, rules } from "./newGoalModalConfig";
import Form from "@Components/Forms/index"

class Goals extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            programData: {},
            editModal: false,
            isLoaded: false,
            goals: [],
            goalSelection: false,
            addGoalsModal: false,
            selectedGoals: [],
            modalData: {},
            items: [],
            loading: false
        }
    }

    programId = () => {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        return pathnames[1] !== "new_program" ? `/${pathnames[2]}` : ""
    }

    isNewProgram = () => {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        return pathnames[1] === NEW_PROGRAM
    }

    loadPageData = async () => {
        this.setState({loading: true})
       await axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${this.programId()}`)
            .then(
                (response) => {
                    const { data: { goals_detail }, data } = response
                    this.setState({
                        programData: data,
                        isLoaded: true,
                        items: goals_detail
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
    }
    loadGoalsList = () => {
        axios.get(`${DEFAULT_URL}/${ADAPTATION_GOALS}`)
            .then(
                (response) => {
                    const { data } = response
                    this.setState({
                        isLoaded: true,
                        goals: data
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
        this.loadGoalsList()
    }

    handleEdit = (data) => {
        this.setState({
            editModal: true,
            goalSelection: false,
            modalData: data
        })
    }
    handleInputChange = (value, id) => {
        const { modalData } = this.state
        this.setState({
            modalData: {...modalData, [id]: value}
        })
    }
    handleNumericInputChange = (value, id) => {
        const { modalData } = this.state
        this.setState({
            modalData: {...modalData, [id]: isNaN(value) ? modalData[id] : value}
        })
    }
     addNewGoal = () => {
        const { goalSelection } = this.state
         this.setState({
             goalSelection: !goalSelection,
             modalData: []
         })
     }
     saveNewGoal = async () => {
        const { modalData, modalData: { create_date } } = this.state
        await axios.post(`${DEFAULT_URL}/${ADAPTATION_GOALS}/`, {...modalData, create_date: EditDateForSave(create_date), status: 0 })
         this.setState({goalSelection: false})
         this.loadGoalsList()
     }
     saveEditGoal = async ({goal_name}) => {
        const { modalData } = this.state
        await axios.put(`${DEFAULT_URL}/${ADAPTATION_GOALS}/${modalData.id}/`, {...modalData, goal_name})
            .then(
                (response) => {
                    this.setState({
                        isLoaded: true,
                        data: response.data
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
             modalData: {},
             editModal: false
         })
    }
    saveNewGoals = async () => {
        const { programData: { documents, goals, program_name, create_date, id, status, tier, employee, duration_day, description }, selectedGoals } = this.state
        const newData = {
            documents,
            program_name,
            create_date,
            id,
            status,
            tier: tier || 1,
            employee,
            duration_day,
            description,
            goals:selectedGoals
        }
        await axios.put(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${this.programId()}/`, newData)
            .then(
                (response) => {
                    const {data: {goals_detail}, data} = response
                    this.setState({
                        isLoaded: true,
                        programData: data,
                        items: goals_detail
                    })
                    this.setState({
                        addGoalsModal: false
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
        this.setState({
            selectedGoals: []
        })
    }
    toggleModal = () => {
        const { editModal } = this.state
        this.setState({
            editModal: !editModal
        })
    }
    openGoalSelection = () => {
        const { items } = this.state
        this.setState({
            addGoalsModal: true,
            selectedGoals: items.map(({id}) => id)
        })
    }
    checkDocument = (value, id) => {
        this.setState({
            [id]: value
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
    actionButtonTierUp = async ({ id, tier, goal_name }) => {
        await axios.put(`${DEFAULT_URL}/${ADAPTATION_GOALS}/${id}/`, { id, tier: tier <= 0 ? 1 : tier + 1, goal_name })
        this.loadPageData()
    }
    actionButtonTierDown = async ({ id, tier, goal_name }) => {
        if (tier > 1) {
            await axios.put(`${DEFAULT_URL}/${ADAPTATION_GOALS}/${id}/`, { id, tier: tier - 1, goal_name })
            this.loadPageData()
        }
    }
    pageHeaderTitle = (program_name) => {
        return this.isNewProgram() ? "Новая программа" : program_name
    }
    inputDataOfProgram = (value) => {
        this.setState(({ modalData }) => ({ modalData: { ...modalData, ...value } }))
    }
    actionsDeleteItem = async (deleteItemID) => {
        const { programData: { documents, program_name, goals, create_date, id, status, tier, employee, duration_day, description } } = this.state
        const newData = {
            documents,
            program_name,
            create_date,
            id,
            status,
            tier,
            employee,
            duration_day,
            description,
            goals: goals.filter(item => item !== deleteItemID)
        }
        await axios.put(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${this.programId()}/`, newData)
            .then(
                (response) => {
                    const {data: {goals_detail}, data} = response
                    this.setState({
                        isLoaded: true,
                        programData: data,
                        items: goals_detail
                    })
                    this.setState({
                        addGoalsModal: false
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
        const {
            items,
            editModal,
            modalData,
            goalSelection,
            modalData: { goal_name, tier, create_date, description },
            selectedGoals,
            addGoalsModal,
            goals,
            loading
        } = this.state

        const {
            handleEdit,
            handleInputChange,
            addNewGoal,
            saveEditGoal,
            toggleModal,
            checkDocument,
            saveNewGoals,
            tierUp,
            tierDown,
            actionButtonTierUp,
            actionButtonTierDown,
            actionsDeleteItem,
            saveNewGoal,
            openGoalSelection
        } = this



        return (
            <>
                <Modal
                    isOpen={editModal}
                    title="Редактирование цели"
                    closeModal={() => this.setState({editModal: false, modalData: []})}
                    handleSave={() => saveEditGoal(modalData)}
                >
                    <div>
                        <div className="pt-8">
                    <span
                        className="font-normal color-light-blue-2"
                    >
                        Наименование цели
                    </span>
                            <Input
                                value={goal_name}
                                key="goal_name"
                                id="goal_name"
                                onInput={() => handleInputChange(document.getElementById('goal_name').value, "goal_name")}
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
                                    onInput={() => this.handleNumericInputChange(Number(document.getElementById('tier').value), "tier")}
                                    arrowUp={tierUp}
                                    arrowDown={tierDown}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
                <WithValidationHocRenderPropAdapter
                    onInput={this.inputDataOfProgram}
                    onSubmit={saveNewGoal}
                    value={modalData}
                    rules={rules}
                >
                    {(formProps) => {
                        const { formValid, onSubmit, onInput } = formProps
                        return (
                            <Modal
                                isOpen={goalSelection}
                                title="Добавить цель"
                                closeModal={addNewGoal}
                                handleSave={onSubmit}
                            >
                                <ScrollBar>
                                    <Form
                                        {...formProps}
                                        fields={NewGoalModalConfig(tierUp, tierDown)}
                                        value={modalData}
                                        onInput={onInput}
                                    />
                                </ScrollBar>
                            </Modal>
                        )
                    }}
                </WithValidationHocRenderPropAdapter>
                <Modal
                    isOpen={addGoalsModal}
                    title="Выбор цели"
                    closeModal={() => this.setState({
                        addGoalsModal: false
                    })}
                    handleSave={saveNewGoals}
                >
                    <AppList
                        settings={addGoalsModalConfig(selectedGoals, checkDocument)}
                        data={goals}
                    />
                </Modal>
                <div className="pt-6 pb-6 pl-4 flex">
                    <button
                        className="blue btn width-m pt-1.5"
                        onClick={addNewGoal}
                    >
                        + Добавить цель
                    </button>
                    <button
                        className="blue btn width-m pt-1.5 ml-4"
                        onClick={openGoalSelection}
                    >
                        Выбрать цель
                    </button>
                </div>
                <AppList
                    settings={settings(editModal, toggleModal, handleEdit, actionButtonTierUp, actionButtonTierDown, actionsDeleteItem)}
                    data={items}
                    loading={loading}
                />
            </>
        );
    }
}

export default Goals;
