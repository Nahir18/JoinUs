import React, {Component} from 'react';
import "./style.css"
import { EditIcon, ArrowUP, Trash } from "../../../ConstantsIcons";
import {ActionsForm} from "./style";

class Actions extends Component {
    render() {
        const { editButton, data, data: { tier }, nestedlevel, deleteButton, tierUp, tierDown } = this.props
        const iconColor = tier <= 1 ? "0.3" : ""
        return (
            <ActionsForm className="icon-container transition-icon cursor a-i-center flex">
                <div
                    onClick={() => editButton(data, nestedlevel)}
                    className="edit-icon"
                    dangerouslySetInnerHTML={{__html: EditIcon}}
                />
                <div
                    className="flex a-i-center j-c-center ml-7"
                    style={!nestedlevel ? {"display": "none"} : {}}
                >
                         <div
                             className="arrow-icon"
                             onClick={() => tierUp(data)}
                             dangerouslySetInnerHTML={{__html: ArrowUP}}
                         />
                         <div
                             onClick={() => tierDown(data)}
                             className="arrow-icon arrow-down"
                             style={{"opacity": iconColor}}
                             dangerouslySetInnerHTML={{__html: ArrowUP}}
                         />
                 </div>
                <div
                    onClick={() => deleteButton(data, nestedlevel)}
                    className="trash-icon ml-7"
                    dangerouslySetInnerHTML={{__html: Trash}}
                />
            </ActionsForm>
        );
    }
}

export default Actions;
