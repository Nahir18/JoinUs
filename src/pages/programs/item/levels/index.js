import React, { Component } from 'react';
import axios from "axios";
import AppList from "../../../../components/AppList";
import { DEFAULT_URL, ADAPTATION_LEVELS } from "../../../../components/APIList"
import { NavLink } from "react-router-dom";
import { settings } from "./tableConfig";

const pageData = {
    pageName: "Программа для разработчиков"
}

const levelsList = [
    {
        name: "Немного о нас",
        data: [
            {
                name: "Немного о нас",
                days: "4",
                points: "200",
                status: 1,
            },
            {
                name: "Что необходимо изучить",
                days: "6",
                points: "100",
                status: 1,
            },
            {
                name: "Немного о нас",
                days: "3",
                points: "290",
                status: 1,
            }
        ]
    },
    {
        name: "Как мы работаем",
        data: [
            {
                name: "Наш график",
                days: "4",
                points: "200",
                status: 1,
            },
            {
                name: "Правила офиса",
                days: "6",
                points: "100",
                status: 1,
            }
        ]
    },
    {
        name: "Что необходимо изучить",
        data: [
            {
                name: "Основные регламенты",
                days: "4",
                points: "200",
                status: 1,
            },
            {
                name: "Презентация о компании",
                days: "6",
                points: "100",
                status: 1,
            }
        ]
    }

]

class Levels extends Component {



    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
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
    }
    render() {
        const { items } = this.state
        return (
            <div className="h-full">
                <div>
                    <div>
                         <div className="bg-white h-full">
                             <div className="pt-6 mb-4 ml-4">
                                 <NavLink
                                     className="blue btn width-m pt-1.5"
                                     to="stages/general"
                                 >
                                     + Добавить уровень
                                 </NavLink>
                                 <button
                                     className="white btn width-m pt-1.5 ml-4"
                                 >
                                     Выбрать уровень
                                 </button>
                             </div>
                             <AppList
                                 settings={settings}
                                 nestedData={true}
                                 data={items}
                                 nestedKey="stages"
                             />
                         </div>
                    </div>
                </div>
            </div>
        );
    }
}

Levels.propTypes = {};

export default Levels;
