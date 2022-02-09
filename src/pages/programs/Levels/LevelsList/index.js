import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import axios from 'axios';
import {NavLink} from "react-router-dom";
import { settings } from "./settings";
import {DEFAULT_URL, ADAPTATION_LEVELS, ADAPTATION_STAGE} from "../../../../components/APIList";
import PageHeader from "../../../../components/PageHeader";
import { levelsBreadcrumbs } from "../../configs";
import {STAGES_LINKS} from "../../Constants";

class LevelsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            stageData: {},
            items: []
        }
    }
    componentDidMount() {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        axios.get(`${DEFAULT_URL}/${ADAPTATION_LEVELS}`)
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
        axios.get(`${DEFAULT_URL}/${ADAPTATION_STAGE}/${pathnames[3]}/`)
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
        const { items } = this.state
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const subPage = pathnames.length > 1
        return (
            <PageHeader
                {...this.props}
                pageData={this.pageHeaderTitle()}
                bredCrumbsConfig={levelsBreadcrumbs}
                url="programs"
                links={STAGES_LINKS}
            >
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
                                to="/programs/new_program/general"
                            >
                                + Добавить уровень
                            </NavLink>
                        )
                    }
                    <AppList
                        settings={settings(pathname)}
                        data={items}
                    />
                </div>
            </PageHeader>
        );
    }
}

LevelsList.propTypes = {};

export default LevelsList;
