import React, {Component} from 'react';
import memoizeOne from "memoize-one";
import Form from "@Components/Forms/index"
import PropTypes from "prop-types"
import ModalSidebar from "../../../../components/ModalSidebar";
import RadioButton from "../../../../components/RadioButton";
import {WithValidationHocRenderPropAdapter} from "../../../../Validator";
import {fieldMap, rules} from "./formConfig";
import {FormContainer} from "../../item/General/style"
import axios from "axios";
import { ADAPTATION_EMPLOYEE, ADAPTATION_LEVELS, ADAPTATION_PROGRAM, DEFAULT_URL } from "../../../../components/APIList";
import Avatar from "../../../../components/Avatar";
import { levelsBreadcrumbs } from "../../configs";
import PageHeader from "../../../../components/PageHeader";
import {LEVELS_LINKS} from "../../Constants";
import AppList from "../../../../components/AppList";
import { employeesModalConfig } from "../../item/General/employeesModalConfig";

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

  loadPageData = () => {
      const {location: {pathname}} = this.props
      const pathnames = pathname.split("/").filter(x => x)
      const idLevel = pathnames[1] !== "new_program" ? `/${pathnames[3]}` : ""
      if (pathnames[1] !== "new_program" && pathnames[3] !== "level") {
          axios.get(`${DEFAULT_URL}/${ADAPTATION_LEVELS}${idLevel}`)
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
    this.loadPageData()
  }

  handleInputChange(value, id) {
    this.setState({
      [id]: value
    });
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

  saveNewLevel() {
    const {location: {pathname}, history: { push }} = this.props
    const {data} = this.state
    const { level_name, tier, status, create_date, id_employee, duration_day } = data
    const pathnames = pathname.split("/").filter(x => x)
    const newLevel = pathnames[3] === "level"
    const idLevel = newLevel ? "/" : `/${pathnames[3]}/`
    const newData = {
        level_name,
        tier,
        status,
        create_date,
        id_employee,
        duration_day
    }
    axios[newLevel ? "post" : "put"](`${DEFAULT_URL}/${ADAPTATION_LEVELS}${idLevel}`, newData)
      .then(
        (response) => {
          const {data, data: {id}} = response
          this.setState({
            isLoaded: true,
            data: data
          })
            newLevel && push(`/${pathnames[0]}/${pathnames[1]}/${pathnames[2]}/${id}/${pathnames[3]}/${pathnames[4]}`)
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
  saveDataOfStage = (v) => {
    console.log(v, 8989)
  }

  tierUp = () => {
    const {data: {tier}, data} = this.state
    this.setState({
      data: {...data, tier: tier ? tier + 1 : 1}
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
    pageHeaderTitle = (level_name) => {
        const { location: { pathname } } = this.props
        const { pageTitle } = this.state
        const pathnames = pathname.split("/").filter(x => x)
        const newLevel = pathnames[3] === "level"
        return newLevel ? "Новый уровень" : level_name ? `Уровень "${pageTitle}"` : ""
    }
    addAvatar = (value) => {
        const { data } = this.state
        this.setState({data: {...data, illustration: value[0].file}})
    }
  render() {
    const {history: {goBack}} = this.props
    const {creatorModal, modalState, employees, data, data: {id_employee, level_name, illustration}} = this.state
    const {tierUp, tierDown, pageHeaderTitle} = this
    const toggleCreatorModal = () => {
      this.setState({creatorModal: !creatorModal})
    }
    const [firstForm, SecondForm] = withSetDisabledFieldsConfigAndSplitByColumns(fieldMap(toggleCreatorModal, id_employee, tierUp, tierDown, employees))
    return (
      <PageHeader
          className="flex-container hidden"
          {...this.props}
          pageData={pageHeaderTitle(level_name)}
          bredCrumbsConfig={levelsBreadcrumbs}
          url="programs"
          links={LEVELS_LINKS}
      >
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
          onSubmit={this.saveDataOfStage}
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
                <div
                  className="flex justify-end pb-20 pr-8 pt-8"
                >
                  <div
                    onClick={() => goBack()}
                    name="cancel"
                    type="submit"
                    className="grey btn width-m m-r-16"
                  >
                    Отмена
                  </div>
                  <button
                    onClick={() => this.saveNewLevel()}
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
      </PageHeader>
    );
  }
}

LevelsGeneral.propTypes = {
  history: PropTypes.object,
};

export default LevelsGeneral;
