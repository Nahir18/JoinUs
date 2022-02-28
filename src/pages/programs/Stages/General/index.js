import React, {Component} from 'react';
import memoizeOne from "memoize-one";
import Form from "@Components/Forms/index"
import PropTypes from "prop-types"
import ModalSidebar from "../../../../components/ModalSidebar";
import {WithValidationHocRenderPropAdapter} from "../../../../Validator";
import {fieldMap, rules} from "./formConfig";
import {FormContainer} from "../../item/General/style"
import axios from "axios";
import { ADAPTATION_EMPLOYEE, ADAPTATION_LEVELS, ADAPTATION_PROGRAM, DEFAULT_URL } from "../../../../components/APIList";
import Avatar from "../../../../components/Avatar";
import {PAGE_LINK_LEVELS} from "../../Constants";
import AppList from "../../../../components/AppList";
import { employeesModalConfig } from "../../item/General/employeesModalConfig";
import { NEW_LEVEL } from "../../Constants";

const withSetDisabledFieldsConfigAndSplitByColumns = memoizeOne((config, readOnlyFields = []) => readOnlyFields
  .reduce((acc, c) => {
    const index = acc.findIndex(({id}) => id === c)
    if (index >= 0) {
      acc[index] = {...acc[index], disabled: true}
    }
    return acc
  }, [...config])
  .reduce((acc, f) => {
    const {formColumn = 0} = f
    acc[formColumn].push(f)
    return acc
  }, [[], []]))

class LevelsGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientModal: false,
      creatorModal: false,
      programs: [],
      employees: [],
      pageTitle: "",
      data: {},
      modalState: {}
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  pathNames = () => {
      const {location: {pathname}} = this.props
      return pathname.split("/").filter(x => x)
  }

  idLevel = () => {
      return this.pathNames()[5]
  }

  loadPageData = () => {
      const { pathNames } = this
      axios.get(`${DEFAULT_URL}/${ADAPTATION_LEVELS}/${pathNames()[5]}`)
          .then(
              ({data, data: { level_name }}) => {
                  this.setState({
                      isLoaded: true,
                      data: data,
                      pageTitle: level_name
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
    axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}`)
      .then(
        (response) => {
          this.setState({
            isLoaded: true,
            programs: response.data
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
      if (this.pathNames()[4] !== NEW_LEVEL) {
          this.loadPageData()
      }
    }

    handleInputChange(value, id) {
      const { data } = this.state
        if (!isNaN(value)){
            this.setState({
                data: {...data, [id]: value}
            });
        }
    }
    handleSubmit(event) {
      event.preventDefault();
    }

    selectClient = (value) => {
        const {customers} = this.state
        const customer = customers.find((a) => a.customer_name === value)
        this.setState({
          modalState: [customer.id]
        })
    }

    saveNewLevel = () => {
    const { props: {history: { push }}, state: {data: { level_name, tier, status, create_date, id_employee, duration_day, illustration }}, pathNames, idLevel } = this

        const newLevel = pathNames()[4] === NEW_LEVEL
        const newData = {
            level_name,
            tier,
            status,
            create_date,
            id_employee,
            duration_day
        }
        axios[newLevel ? "post" : "put"](`${DEFAULT_URL}/${ADAPTATION_LEVELS}/${newLevel ? '' : `${idLevel()}/`}`, illustration ? {...newData, illustration} : newData)
          .then(
            ({data}) => {
              this.setState({
                isLoaded: true,
                data: data
              })
                newLevel && push(`/${pathNames()[0]}/${pathNames()[1]}/${pathNames()[2]}/${PAGE_LINK_LEVELS}`)
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
      this.setState(({data}) => ({data: {...data, ...value}}))
    }

    tierUp = () => {
      const {data: {tier}, data} = this.state
      this.setState({
        data: {...data, tier: tier ? Number(tier) + 1 : 1}
      })
    }
    tierDown = () => {
      const {data: {tier}, data} = this.state
      this.setState({
        data: {...data, tier: tier > 1 ? tier - 1 : tier}
      })
    }

    selectCreator = (value) => {
        const { employees, modalState } = this.state
        const employee = employees.find((a) => a.id === value)
        this.setState({
            modalState: modalState === value ? null : employee.id
        })
    }
    selectedCreator = (value) => {
        const { employees, modalState } = this.state
        const newValue = employees.find((a) => a.id === value)
        return modalState ? modalState === newValue.id : false
    }
    addAvatar = (value) => {
        const { data } = this.state
        this.setState({data: {...data, illustration: value[0].file}})
    }
  render() {
    const {history: {goBack}} = this.props
    const {creatorModal, modalState, employees, data, data: {id_employee, illustration}} = this.state
    const {tierUp, tierDown} = this
    const toggleCreatorModal = () => {
      this.setState({creatorModal: !creatorModal})
    }
    const [firstForm, SecondForm] = withSetDisabledFieldsConfigAndSplitByColumns(fieldMap(toggleCreatorModal, id_employee, tierUp, tierDown, employees, this.handleInputChange))
    return (
      <>
        <ModalSidebar
          title="Выбор создателя"
          closeModal={toggleCreatorModal}
          isOpen={creatorModal}
          handleSave={() => this.setState({
            data: {...data, id_employee: modalState},
            creatorModal: !creatorModal
          })}
        >
            <AppList
                settings={employeesModalConfig(this.selectCreator, this.selectedCreator)}
                data={employees}
            />
        </ModalSidebar>
        <WithValidationHocRenderPropAdapter
          onInput={this.inputDataOfProgram}
          onSubmit={this.saveNewLevel}
          value={data}
          rules={rules}
        >
          {(formProps) => {
            const {formValid, onSubmit, onInput} = formProps
            return (
              <div className="h-full flex flex-col justify-between">
                <div
                  className="mx-8"
                >
                    <Avatar
                        className="mt-6 ml-6 mb-6"
                        value={illustration ? [{
                            file: illustration
                        }] : []}
                        onInput={this.addAvatar}
                    />
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
                <div className="flex justify-end p-b-24 pr-8 pt-8">
                  <div
                    onClick={() => goBack()}
                    name="cancel"
                    type="submit"
                    className="grey btn width-m m-r-16"
                  >
                    Отмена
                  </div>
                  <button
                    onClick={onSubmit}
                    name="save"
                    type="submit"
                    className="blue btn width-m"
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            )
          }}
        </WithValidationHocRenderPropAdapter>
      </>
    );
  }
}

LevelsGeneral.propTypes = {
  history: PropTypes.object,
};

export default LevelsGeneral;
