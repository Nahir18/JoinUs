import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import axios from 'axios';
import {NavLink} from "react-router-dom";
import { settings } from "./settings";
import {DEFAULT_URL, ADAPTATION_LEVELS, ADAPTATION_STAGE} from "../../../../components/APIList";
import {NEW_LEVEL, PAGE_LINK_GENERAL, PAGE_LINK_LEVEL} from "../../Constants";

class LevelsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            stageData: {},
            items: [],
            loading: false
        }
    }

    loadData = async () => {
        this.setState({loading: true})
        await axios.get(`${DEFAULT_URL}/${ADAPTATION_LEVELS}`)
        .then(
          (response) => {
              this.setState({
                  isLoaded: true,
                  items: response.data
              })
          },
          (error) => {
              this.setState({
                  isLoaded: true,
                  error
              })
          }
        )
        this.setState({loading: false})
    }

    componentDidMount() {
        const { location: { pathname } } = this.props
        const pathNames = pathname.split("/").filter(x => x)
          this.loadData()
        axios.get(`${DEFAULT_URL}/${ADAPTATION_STAGE}/${pathNames[5]}/`)
            .then(({data}) => {
                this.setState({
                    stageData: data
                })
            })
    }
    pageHeaderTitle = () => {
        const {  stageData: { stage_name } } = this.state
        return stage_name ? `Этап "${stage_name}"` : ""
    }

    render() {
        const { items, loading } = this.state
        const { location: { pathname } } = this.props
        const pathNames = pathname.split("/").filter(x => x)
        const subPage = pathNames.length > 1
        return (
            <div className="flex-container">
                {
                    !subPage ? (
                        <div className="flex justify-between my-3">

                            <div className="text-2xl">
                                Программы
                            </div>
                            <NavLink
                                className="blue btn width-m flex items-center"
                                to="/programs/new_program/general"
                            >
                                + Создать программу
                            </NavLink>

                        </div>
                    ) : (
                        <NavLink
                            className="blue btn width-m flex items-center my-3 ml-4"
                            to={`/${pathNames[0]}/${pathNames[1]}/${pathNames[2]}/${PAGE_LINK_LEVEL}/${NEW_LEVEL}/${PAGE_LINK_GENERAL}`}
                        >
                            + Добавить уровень
                        </NavLink>
                    )
                }
                <AppList
                    settings={settings(pathname)}
                    data={items}
                    loading={loading}
                />
            </div>
        );
    }
}

LevelsList.propTypes = {};

export default LevelsList;
