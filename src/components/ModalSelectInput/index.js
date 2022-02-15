import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input from "@Components/Fields/Input"
import { ToggleArrowContainer } from "./style";
import {SmallArrow} from "../../pages/ConstantsIcons";

class ModalSelectInput extends Component {
    render() {
        const { props } = this
        const { toggleModal, id, key, value } = props
        return (
            <>
                <Input
                    disabled
                    value={value}
                    id={id}
                    key={key}
                    {...props}
                >
                    <ToggleArrowContainer
                        onClick={toggleModal}
                        className="flex items-center pr-3 cursor"
                        dangerouslySetInnerHTML={{__html: SmallArrow}}
                    />
                </Input>
            </>
        );
    }
}

ModalSelectInput.propTypes = {
    toggleModal: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array]),
};

export default ModalSelectInput;
