import React from 'react';
import PropTypes from 'prop-types';
import {ActiveIcon} from "../../pages/Constants";

const StatusIndicator = ({data}) => {
    return (
        <div className="flex justify-between items-center">
            <div
                className="color-red"
                dangerouslySetInnerHTML={{__html: ActiveIcon}}
            />
            <div
                className="ml-2"
            >
                {`${data > 0 ? "Активен" : "Неактивен"}`}
            </div>
        </div>
    );
};

StatusIndicator.propTypes = {

};

export default StatusIndicator;