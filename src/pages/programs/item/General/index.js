import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModalSidebar from "../../../../components/ModalSidebar";
import { WithValidationHocRenderPropAdapter } from "../../../../Validator";
import { fieldMap, rules} from "./formConfig";
import Form from "@Components/Forms/index"
import {CREATE_DATE_FORMAT} from "@constants"
import memoizeOne from "memoize-one";
import axios from "axios";
import {ADAPTATION_CUSTOMER, ADAPTATION_PROGRAM, ADAPTATION_EMPLOYEE, DEFAULT_URL} from "../../../../components/APIList";
import EditDateForSave from "../../../../utils/Date/EditDateForSave";
import Avatar from "../../../../components/Avatar";
import {NEW_PROGRAM} from "../../Constants";
import ScrollBar from "@Components/ScrollBar"
import {FormContainer, TabContainer} from "@Components/StylesComponent/StylesForm"
import { customerModalConfig } from "./customerModalConfig";
import { employeesModalConfig } from "./employeesModalConfig";
import AppList from "../../../../components/AppList";

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

    isNewProgram = () => {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        return pathnames[1] === NEW_PROGRAM
    }

    programID = () => {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        return !this.isNewProgram() ? `/${pathnames[2]}` : ""
    }

    componentDidMount() {
        axios.get(`${DEFAULT_URL}/${ADAPTATION_EMPLOYEE}`)
            .then(
                (response) => {
                    const { data } = response
                    this.setState({
                        isLoaded: true,
                        employees: data
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
        if (!this.isNewProgram()) {
            axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${this.programID()}`)
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
    selectCreator = (value) => {
        const { employees, modalState } = this.state
        const employee = employees.find((a) => a.id === value)
        this.setState({
            modalState: modalState === value ? null : employee.id
        })
    }

    saveNewProgram () {
        const { history: { push } } = this.props
        const { data, data: { program_name, description, duration_day, tier, status, create_date, employee, contact, customer, illustration } } = this.state
        const newData = {
            create_date: EditDateForSave(create_date, CREATE_DATE_FORMAT),
            program_name,
            duration_day,
            description,
            tier: tier || 1,
            status,
            employee,
            contact,
            customer
        }
        axios[this.isNewProgram() ? "post" : "put"](`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${this.programID()}/`, this.isNewProgram() ?
            {
                ...data,
                status: 1,
                create_date: EditDateForSave(data.create_date, CREATE_DATE_FORMAT)
            } : illustration ? {...newData, illustration} : newData
        )
            .then(
                (response) => {
                    const { data, data: { program_name, id } } = response
                    this.setState({
                        isLoaded: true,
                        data: data
                    })
                    this.isNewProgram() ?
                        push("/programs") :
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
    selectedCreator = (value) => {
        const { employees, modalState } = this.state
        const newValue = employees.find((a) => a.id === value)
        return modalState ? modalState === newValue.id : false
    }
    toggleModal = () => {
        const { clientModal, data } = this.state
        this.setState({
            clientModal: !clientModal,
            modalState: !!data.customer && data.customer
        })
    }
    toggleCreatorModal = () => {
        const { creatorModal, data: { employee } } = this.state
        this.setState({
            creatorModal: !creatorModal,
            modalState: creatorModal ? [] : employee
        })
    }
    addAvatar = (value) => {
        const { data } = this.state
        this.setState({data: {...data, illustration: value[0].file}})
    }
    render() {
        const { history: { goBack } } = this.props
        const { clientModal, creatorModal, modalState, data, customers, employees, isLoaded, data: { customer = [], employee, illustration } } = this.state
        const { toggleModal, toggleCreatorModal } = this
        const customerValue = isLoaded ? customers.find((a) => a.id === customer[0]) : {}
        const employeeValue = isLoaded ? employee && employees.find((a) => a.id === employee) : {}
        const [firstForm, SecondForm] = withSetDisabledFieldsConfigAndSplitByColumns(fieldMap(toggleModal, customerValue, toggleCreatorModal, employeeValue))
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
                    <AppList
                        settings={customerModalConfig(this.selectClient, this.selectedRadioButton)}
                        data={customers}
                    />
                </ModalSidebar>
                <ModalSidebar
                    title="Выбор создателя"
                    closeModal={toggleCreatorModal}
                    isOpen={creatorModal}
                    handleSave={() => this.setState({
                        data: { ...data, employee: modalState },
                        creatorModal: !creatorModal
                    })}
                >
                    <AppList
                        settings={employeesModalConfig( this.selectCreator, this.selectedCreator)}
                        data={employees}
                    />
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
                            <>
                                <Avatar
                                    className="mt-6 ml-6 mb-6"
                                    value={illustration ? [{
                                        file: illustration
                                    }] : []}
                                    onInput={this.addAvatar}
                                />
                                <ScrollBar>
                                    <TabContainer>
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
                                        <div className="flex justify-end p-b-24">
                                            <button
                                              name="cancel"
                                              type="submit"
                                              onClick={() => goBack()}
                                              className="grey btn width-m m-r-16"
                                            >
                                                Отмена
                                            </button>
                                            <button
                                              name="save"
                                              type="submit"
                                              className="blue btn width-m"
                                              onClick={() => this.saveNewProgram()}
                                            >
                                                Сохранить
                                            </button>
                                        </div>
                                    </TabContainer>
                                </ScrollBar>

                            </>
                          )}}
                </WithValidationHocRenderPropAdapter>
            </div>
        );
    }
}

General.propTypes = {};

export default General;
