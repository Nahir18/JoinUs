import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, Modal } from "./style"
import {CloseIcon} from "../../pages/ConstantsIcons";

// todo дубль ModalWindow

class ModalSidebar extends Component {
    render() {
    const { closeModal, title, children, handleSave, isOpen } = this.props
    return isOpen && (
            <ModalContainer
                onClick={closeModal}
            >
                <Modal
                    onClick={e => e.stopPropagation()}
                >
                    <div className="mt-7 mr-7 mb-7 ml-7">
                        <div className="flex justify-end  cursor">
                            <div
                                dangerouslySetInnerHTML={{__html: CloseIcon}}
                                onClick={closeModal}
                            />
                        </div>
                        <div
                            className="font-bold fs-24 flex  m-b-32"
                        >
                            {title}
                        </div>
                        {children}
                    </div>
                    <div className="m-b-32 m-t-40 flex justify-center">
                        <button
                            className="grey btn width-m m-r-16"
                            onClick={closeModal}
                        >
                            Отмена
                        </button>
                        <button
                            className="blue btn width-m"
                            onClick={handleSave}
                        >
                            Сохранить
                        </button>
                    </div>
                </Modal>
            </ModalContainer>
        );
    }
}

ModalSidebar.propTypes = {
    closeModal: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    handleSave: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default ModalSidebar;
