import React, { Component } from 'react';
import axios from "axios";
import AppList from "../../../../components/AppList";
import {DEFAULT_URL, ADAPTATION_PROGRAM, ADAPTATION_LEVELS, ADAPTATION_STAGE} from "../../../../components/APIList"
import { NavLink } from "react-router-dom";
import { settings } from "./tableConfig";
import Modal from "../../../../components/ModalWindow";
import { programsBreadcrumbs } from "../../configs";
import PageHeader from "../../../../components/PageHeader";
import { levelSelectionModalConfig } from "./levelSelectionModalConfig";
import {NAV_BUTTON_LINKS, NEW_PROGRAM} from "../../Constants";

class Levels extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            editModal: false,
            selectedLevels: [],
            modalData: {},
            isLoaded: false,
            programData: {},
            levels: [],
            items: [],
        }
    }

    loadPageData = () => {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const newProgram = pathnames[1] === "new_program"
        const url = newProgram ? `${ADAPTATION_LEVELS}` : `${ADAPTATION_PROGRAM}/${pathnames[2]}`
        axios.get(`${DEFAULT_URL}/${url}`)
            .then(
                (response) => {
                    this.setState({
                        isLoaded: true,
                        items: newProgram ? [] : response.data.levels_detail,
                        programData: newProgram ? {} : response.data
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
        this.loadPageData()
        axios.get(`${DEFAULT_URL}/${ADAPTATION_LEVELS}`)
            .then(
                (response) => {
                    const { data } = response
                    this.setState({
                        levels: data
                    })
                }
            )
    }
    toggleModal = () => {
        const { editModal } = this.state
        this.setState({
            editModal: !editModal
        })
    }
    editStage = (data, nestedlevel) => {
        const { id } = data
        const { history: { push } } = this.props
        push(`${id}/${nestedlevel ? "stage" : "level"}/general`)
    }
    checkLevels = (value, id) => {
        this.setState({
            selectedLevels: value
        })
    }
    saveNewLevel = async () => {
        const { selectedLevels, programData: { levels, program_name, create_date, id, status, tier, employee, duration_day, description } } = this.state
        const {
            location: { pathname }
        } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const idLevel = pathnames[1] !== "new_program" ? `/${pathnames[2]}/` : ""
        const newData = {
            levels: levels.concat(selectedLevels.filter(item => !levels.some(a => a === item))),
            create_date,
            program_name,
            id,
            status,
            tier,
            employee,
            duration_day,
            description
        }
        this.setState({
                    editModal: false,
                    selectedLevels: []
                })
        if (selectedLevels.length) {
           await axios.put(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${idLevel}`, newData)
                .then(
                    (response) => {
                        const { data, data: { levels_detail } } = response
                        this.setState({
                            programData: data,
                            items: levels_detail
                        })
                    }
                )
            this.setState({
                editModal: false,
            })
        }
    }
    deleteItem = async (value, nestedlevel) => {
        const { id: deleteItemID } = value
        const { programData: { levels, program_name, create_date, id, status, tier, employee, duration_day, description } } = this.state
        const {
            location: { pathname }
        } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const idLevel = pathnames[1] !== "new_program" ? `/${pathnames[2]}/` : ""
        if (!nestedlevel) {
            const newData = {
                levels: levels.filter(item => item !== deleteItemID),
                program_name,
                create_date,
                id,
                status,
                tier,
                employee,
                duration_day,
                description
            }
            await axios.put(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${idLevel}`, newData)
                .then((response) => {
                    const { data, data: { levels_detail } } = response
                    this.setState({
                        programData: data,
                        items: levels_detail
                    })
                })
            this.loadPageData()
        } else {
            const { create_date, duration_day, id: deleteStageID, id_employee, stage_name, status, tier } = value
            const newData = {
                create_date,
                duration_day,
                id: deleteStageID,
                id_employee,
                level: null,
                stage_name,
                status,
                tier
            }
            await axios.put(`${DEFAULT_URL}/${ADAPTATION_STAGE}/${deleteStageID}/`, newData)
            this.loadPageData()
        }
    }
    actionButtonTierUp = async ({id, tier, create_date, duration_day, stage_name, level, id_employee, status}) => {
        const newData = {
            id,
            create_date,
            duration_day,
            stage_name,
            level,
            id_employee,
            status,
            tier: tier + 1
        }
        await axios.put(`${DEFAULT_URL}/${ADAPTATION_STAGE}/${id}/`, newData)
        this.loadPageData()
    }
    actionButtonTierDown = async ({id, tier, create_date, duration_day, stage_name, level, id_employee, status}) => {
        if (tier > 1) {
            const newData = {
                id,
                create_date,
                duration_day,
                stage_name,
                level,
                id_employee,
                status,
                tier: tier - 1
            }
            await axios.put(`${DEFAULT_URL}/${ADAPTATION_STAGE}/${id}/`, newData)
            this.loadPageData()
        }
    }
    pageHeaderTitle = (program_name) => {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const newProgram = pathnames[1] === NEW_PROGRAM
        return newProgram ? "Новая программа" : program_name
    }
render() {
    const { items, editModal, selectedLevels, levels, programData: { program_name } } = this.state
        const {
            editStage,
            checkLevels,
            saveNewLevel,
            deleteItem,
            pageHeaderTitle,
            actionButtonTierUp,
            actionButtonTierDown
    } = this
        return (
          <div className="flex-container">
              <PageHeader
                  {...this.props}
                  bredCrumbsConfig={programsBreadcrumbs}
                  pageData={pageHeaderTitle(program_name)}
                  url="programs"
                  links={NAV_BUTTON_LINKS}
              >
                  <Modal
                      isOpen={editModal}
                      title="Выбор уровня"
                      closeModal={this.toggleModal}
                      handleSave={saveNewLevel}
                      style={{"minWidth": "500px"}}
                  >
                      <AppList
                          settings={levelSelectionModalConfig(selectedLevels, checkLevels)}
                          data={levels}
                      />
                  </Modal>
                  <div className="pt-6 mb-4 ml-4 flex">
                      <NavLink
                        className="blue btn width-m pt-1.5"
                        to="level/general"
                      >
                          + Добавить уровень
                      </NavLink>
                      <button
                        className="white btn width-m pt-1.5 ml-4"
                        onClick={this.toggleModal}
                      >
                          Выбрать уровень
                      </button>
                  </div>
                  <AppList
                    settings={settings(editStage, deleteItem, actionButtonTierUp, actionButtonTierDown)}
                    nestedData={true}
                    data={items}
                    nestedKey="stages"
                  />
              </PageHeader>
          </div>
        );
    }
}

Levels.propTypes = {};

export default Levels;
