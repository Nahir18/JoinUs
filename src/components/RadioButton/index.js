import React from 'react';
import PropTypes from 'prop-types';
import {RadioOn, RadioOff} from "../../pages/ConstantsIcons";

const RadioButton = ({title, id, inputValue, selected, noTitle}) => {
    const active = selected(title)
    return (
        <div className="flex items-center justify-between">
                { noTitle ? "" : title}
            {
                active ? (
                <div
                    className="cursor"
                    dangerouslySetInnerHTML={{__html: RadioOn}}
                    onClick={() => inputValue(title)}
                />
                ) : (
                <div
                    className="cursor"
                    dangerouslySetInnerHTML={{__html: RadioOff}}
                    onClick={() => inputValue(title)}
                />
                )
            }
        </div>
    );
};

RadioButton.propTypes = {
    noTitle: PropTypes.bool,
};

export default RadioButton;
