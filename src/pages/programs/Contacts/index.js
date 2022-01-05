import React, {Component} from 'react';
import AppList from "../../../components/AppList";
import {DEFAULT_URL, ADAPTATION_CONTACTS} from "../../../components/APIList";
import axios from "axios";

const Contact = ({data}) => {
    return (
        <div className="flex ml-1.5 items-center">
            <div
                className="h-7 w-7 bg-color-green"
                style={{"border-radius": "50%"}}
            />
            <div className="flex flex-col ml-3 justify-center">
                <div className="flex j-c-start">
                    { data.name }
                </div>
                <div
                    className="flex j-c-start text-xs font-semibold color-light-blue-2"
                >
                    { data.role }
                </div>
            </div>
        </div>
    )
}

const ContactsComp = ({ data }) => {
    return  (
        <div>
            {
                data.phone && data.phone.map( a => (
                    <div className="flex j-c-start mb-1">
                        { a }
                    </div>
                ))
            }
            {
                data.mail && (
                    <div className="flex j-c-start text-xs font-semibold color-light-blue-2">
                        {data.mail}
                    </div>
                )
            }
        </div>
    )
}

const settings = [
    {
        id: 1,
        key: "number",
        name: "№",
        size: "5%"
    },
    {
        id: 2,
        key: "value",
        name: "Контакт",
        component: Contact,
        size: "45%"
    },
    {
        id: 3,
        key: "role",
        name: "Роль",
        size: "30%"
    },
    {
        id: 4,
        key: "contacts",
        name: "Контакты",
        component: ContactsComp,
        size: "30%"
    }
]

class Contacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            items: []
        }
    }
    componentDidMount() {
        axios.get(`${DEFAULT_URL}/${ADAPTATION_CONTACTS}`)
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
        const { items = [] } = this.state
        const newData = items.map(({ last_name, first_name, post, role }) =>
            ({
                value: {
                    name: `${last_name} ${first_name}`,
                    role: `${post}`
                },
                role: `${role}`,
                contacts: {
                    mail: "petrova.darya@gmail.com",
                    phone: [
                        "+7 999 787 7868",
                        "+7 999 787 7868"
                    ]
                }
            })
        )
        return (
            <div>
                    <div
                        className="pt-6 pl-4"
                    >
                        <button
                            className="blue btn width-m"
                        >
                            + Добавить контакт
                        </button>
                    </div>
                     <div>
                         <AppList
                             settings={settings}
                             data={newData}
                         />
                     </div>
            </div>
        );
    }
}

export default Contacts;
