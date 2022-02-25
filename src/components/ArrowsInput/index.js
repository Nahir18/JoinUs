import React, {useCallback} from 'react';
import Input from "@Components/Fields/Input"
import {SmallArrowUp} from "../../pages/ConstantsIcons";
import { Arrows } from "./style";
import PropTypes from 'prop-types';
import isNumeric from "antd/lib/_util/isNumeric";

const ArrowInput = props => {
    const { value, onInput, arrowUp, arrowDown, right, top } = props
    const iconColor = value <= 1 ? "0.3" : ""
    const { id } = props
    const handleInput = useCallback((nextVal) => {
        if (isNumeric(nextVal)) {
            onInput(nextVal, id)
        }
    }, [onInput, id])
    return (
        <div className="flex">
            <Input
                {...props}
                onInput={handleInput}
            />
            <Arrows
                right={right}
                top={top}
                className="flex"
            >
                <div
                    onClick={arrowUp}
                    style={{"fill": "var(--color-light-blue-2)"}}
                    className="flex items-center cursor color-red"
                    dangerouslySetInnerHTML={{__html: SmallArrowUp}}
                />
                <div
                    onClick={arrowDown}
                    style={{"fill": "var(--color-light-blue-2)", "opacity": iconColor}}
                    className="flex items-center cursor arrow-down"
                    dangerouslySetInnerHTML={{__html: SmallArrowUp}}
                />
            </Arrows>
        </div>
    );
};

ArrowInput.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    arrowUp: PropTypes.func,
    onInput: PropTypes.func,
    arrowDown: PropTypes.func,
};

export default ArrowInput;
