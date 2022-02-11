import React, {useCallback, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {PlusIcon} from "../../pages/Constants";
import FileInputController from "../Fields/Files/FileInputController";

const FileInput = ({children, title, className, ...props}) => {
    const refContainer = useRef()
    return (
        <FileInputController {...props} containerRef={refContainer}>
                {({value, onEdit, onDelete}) => (
                    <>
                        <button
                            onClick={onEdit}
                            className="color-blue flex items-center justify-center fw-700 mt-5 mb-5"
                        >
                            <span dangerouslySetInnerHTML={{__html: PlusIcon}}/> Добавить {title}
                        </button>
                        <div
                            className={`flex flex-col items-start ${className}`}
                            ref={refContainer}
                        >
                            {children({value, onDelete})}
                        </div>
                    </>
                )
            }
        </FileInputController>
    );
};

FileInput.propTypes = {
    className: PropTypes.string,
};
FileInput.defaultProps = {
    className: ""
};

export default FileInput;
