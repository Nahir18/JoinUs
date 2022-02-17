import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import axios from 'axios';
import {NavLink} from "react-router-dom";
import { settings } from "./Settings";
import {DEFAULT_URL, ADAPTATION_PROGRAM} from "../../../../components/APIList";

class ProgramsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            items: []
        }
    }
    componentDidMount() {
        axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}`)
            .then(
                ({data}) => {
                    this.setState({
                        isLoaded: true,
                        items: data
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
    render() {
        const { items } = this.state
        return (
            <>
                    <NavLink
                        className="blue btn width-m flex items-center my-3 ml-4 mt-8"
                        to="/programs/new_program/general"
                    >
                        + Добавить программу
                    </NavLink>
                <AppList
                    settings={settings}
                    data={items}
                />
            </>
        );
    }
}

ProgramsList.propTypes = {};

export default ProgramsList;
