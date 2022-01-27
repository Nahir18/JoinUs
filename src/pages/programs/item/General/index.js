import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModalSidebar from "../../../../components/ModalSidebar";
import RadioButton from "../../../../components/RadioButton";
import { WithValidationHocRenderPropAdapter } from "../../../../Validator";
import { fieldMap, rules} from "./formConfig";
import Form from "@Components/Forms/index"
import { FormContainer } from "./style"
import memoizeOne from "memoize-one";
import axios from "axios";
import AvatarComponent from "../../../../components/AvtarComponent";
import {ADAPTATION_CUSTOMER, ADAPTATION_PROGRAM, ADAPTATION_EMPLOYEE, DEFAULT_URL} from "../../../../components/APIList";

const users = [
    {
        id: 1,
        name: "Максимов И.И"
    },
    {
        id: 2,
        name: "Иванов И.И"
    },
    {
        id: 3,
        name: "Сидоров И.И"
    },
    {
        id: 4,
        name: "Максимов И.В"
    },
    {
        id: 5,
        name: "Иванов И.В"
    },
    {
        id: 6,
        name: "Сидоров И.В"
    },
]

const withSetDisabledFieldsConfigAndSplitByColumns = memoizeOne((config, readOnlyFields = []) => readOnlyFields
    .reduce((acc, c) => {
        const index = acc.findIndex(({ id }) => id === c)
        if (index >= 0) {
            acc[index] = { ...acc[index], disabled: true }
        }
        return acc
    }, [...config])
    .reduce((acc, f) => {
        const { formColumn = 0 } = f
        acc[formColumn].push(f)
        return acc
    }, [[], []]))

class General extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientModal: false,
            creatorModal: false,
            customers: [],
            employees: [],
            data: {},
            modalState: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount() {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const idProgram = pathnames[1] !== "new_program" ? `/${pathnames[2]}` : ""
        axios.get(`${DEFAULT_URL}/${ADAPTATION_EMPLOYEE}`)
            .then(
                (response) => {
                    this.setState({
                        isLoaded: true,
                        employees: response.data
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
        axios.get(`${DEFAULT_URL}/${ADAPTATION_CUSTOMER}`)
            .then(
                (response) => {
                    this.setState({
                        isLoaded: true,
                        customers: response.data
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
        if (pathnames[1] !== "new_program") {
            axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${idProgram}`)
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
        }
    }

    handleInputChange (value, id) {
        this.setState({
            [id]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    selectClient = (value) => {
        const { customers } = this.state
        const customer = customers.find((a) => a.customer_name === value)
        this.setState({
            modalState: [customer.id]
        })
    }

    saveNewProgram () {
        const { location: { pathname }, history: { push } } = this.props
        const { data } = this.state
        const pathnames = pathname.split("/").filter(x => x)
        const newProgram = pathnames[1] === "new_program"
        const idProgram = newProgram ? "/" : `/${pathnames[2]}/`
        axios[newProgram ? "post" : "put"](`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${idProgram}`, newProgram ? {...data, status: 1} : data)
            .then(
                (response) => {
                    const { data, data: { program_name, id } } = response
                    this.setState({
                        isLoaded: true,
                        data: data
                    })
                    push(`/programs/${program_name}/${id}/general`)
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    inputDataOfProgram = (value) => {
        this.setState(({ data }) => ({ data: { ...data, ...value } }))
    }
    saveDataOfProgram = (v) => {
        console.log(v)
    }

    selectedRadioButton = (value) => {
        const { customers, modalState } = this.state
        const newValue = customers.find((a) => a.customer_name === value)
        return modalState[0] ? modalState[0] === newValue.id : false
    }

    render() {
        const { history: { goBack } } = this.props
        const { clientModal, creatorModal, modalState, data, customers, employees, isLoaded, data: { customer = [], CREATOR } } = this.state
        const customerValue = isLoaded ? customers.find((a) => a.id === customer[0]) : {}
        const toggleModal = () => {
            this.setState({
                clientModal: !clientModal,
                modalState: !!data.customer && data.customer
            })
        }
        const toggleCreatorModal = () => {
            this.setState({creatorModal: !creatorModal})
        }
        const [firstForm, SecondForm] = withSetDisabledFieldsConfigAndSplitByColumns(fieldMap(toggleModal, customerValue, toggleCreatorModal, CREATOR))
        return (
            <div>
                <ModalSidebar
                    title="Выбор заказчика"
                    closeModal={toggleModal}
                    isOpen={clientModal}
                    handleSave={() => this.setState({
                        data: { ...data, customer: modalState },
                        clientModal: !clientModal
                    })}
                >
                    <div
                        className="mx-9"
                    >
                        <div
                            className="grid mt-11 border-list pb-4 color-light-blue-2 fs-14 font-bold"
                            style={{"grid-template-columns": "10% 90%"}}
                        >
                            <div>
                                №
                            </div>
                            <div>
                                Наименование
                            </div>
                        </div>
                     {
                         customers.map(({customer_name, id}, index) => {
                             return (
                                 <div
                                     className="grid py-4 font-semibold fs-14 border-list"
                                     style={{"grid-template-columns": "10% 90%"}}
                                 >
                                     <div
                                         className="flex items-center"
                                     >
                                         {index + 1}
                                     </div>
                                     <RadioButton
                                         inputValue={this.selectClient}
                                         // selected={(value) => modalState === value}
                                         selected={(value) => this.selectedRadioButton(value)}
                                         title={customer_name}
                                         id={id}
                                     />
                                 </div>
                             )
                         })
                     }
                    </div>
                </ModalSidebar>
                <ModalSidebar
                    title="Выбор создателя"
                    closeModal={toggleCreatorModal}
                    isOpen={creatorModal}
                    handleSave={() => this.setState({
                        data: { ...data, CREATOR: modalState },
                        creatorModal: !creatorModal
                    })}
                >
                    <div
                        className="mx-9"
                    >
                        <div
                            className="grid mt-11 border-list pb-4 color-light-blue-2 fs-14 font-bold"
                            style={{"grid-template-columns": "10% 90%"}}
                        >
                            <div>
                                №
                            </div>
                            <div>
                                Наименование
                            </div>
                        </div>
                     {
                         employees.map(({name, id}, index) => {
                             return (
                                 <div
                                     className="grid py-4 font-semibold fs-14 border-list"
                                     style={{"grid-template-columns": "10% 90%"}}
                                 >
                                     <div
                                         className="flex items-center"
                                     >
                                         {index + 1}
                                     </div>
                                     <RadioButton
                                         inputValue={this.selectClient}
                                         selected={(value) => modalState === value}
                                         title={name}
                                         id={id}
                                     />
                                 </div>
                             )
                         })
                     }
                    </div>
                </ModalSidebar>
                <WithValidationHocRenderPropAdapter
                    onInput={this.inputDataOfProgram}
                    onSubmit={this.saveDataOfProgram}
                    value={data}
                    rules={rules}
                >
                    {(formProps) => {
                        const { formValid, onSubmit, onInput } = formProps
                          return (
                            <div className="h-full flex flex-col justify-between">
                                {/*<AvatarComponent />*/}
                                <div
                                    className="mx-8"
                                >
                                        <FormContainer>
                                            <Form
                                                {...formProps}
                                                fields={firstForm}
                                                value={data}
                                                onInput={onInput}
                                            />
                                            <Form
                                                {...formProps}
                                                fields={SecondForm}
                                                value={data}
                                                onInput={onInput}
                                            />
                                        </FormContainer>
                                    </div>
                                    <div
                                    className="flex justify-end pb-20 pr-8"
                                    >
                                        <div
                                            onClick={() => goBack()}
                                            className="white btn width-m mr-4"
                                        >
                                            Отмена
                                        </div>
                                        <button
                                             className="blue btn width-m"
                                             onClick={() => this.saveNewProgram()}
                                        >
                                            Сохранить
                                        </button>
                                </div>
                            </div>
                          )}}
                </WithValidationHocRenderPropAdapter>
            </div>
        );
    }
}

General.propTypes = {};

export default General;