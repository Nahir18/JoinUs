import React from 'react';
import PropTypes from 'prop-types';
import FileInput from "../FileInput";
import styled from "styled-components"
import {EditIcon, Trash, RotateIcon} from "../../../../pages/Constants";
import PreloaderIcon from "../../../Preloader";
import {ContainerOpacity, ContainerPreloader} from "../styles"

const PhotoContainer = styled.img`
  width: 300px;
`


// onReUpload повторная загрузка
// onDeleteTempFile удаление временного файла, который не загрузился
// fail когда файл не загрузился

const PhotoFiles = (props) => {
  return (
    <FileInput title="фото" {...props}>
      {({value, onDelete, onEdit, onDeleteTempFile, onReUpload}) => (
        <div className="flex flex-wrap">
          {value.map(({file, progress, fail}, index) => (
            <div key={index} className="flex items-center flex-col mr-2 mb-2">
              <ContainerOpacity fail={fail}>
                {progress && <ContainerPreloader><PreloaderIcon/></ContainerPreloader>}
                <PhotoContainer
                  className="rounded-2xl overflow-hidden"
                  src={file}
                />
              </ContainerOpacity>
              {fail &&
                <div className="flex items-center mt-1.5">
                  <button
                    className="edit-icon"
                    dangerouslySetInnerHTML={{__html: EditIcon}}
                    onClick={() => onReUpload(index)}
                  />
                  <button
                    className="trash-icon ml-7"
                    dangerouslySetInnerHTML={{__html: Trash}}
                    onClick={() => onDeleteTempFile(index)}
                  />
                  <button
                    className="trash-icon ml-7"
                    onClick={() => onReUpload(index)}
                    dangerouslySetInnerHTML={{__html: RotateIcon}}
                  />
                </div>
              }
              {progress === undefined && <div className="flex items-center mt-1.5">
                <button
                  className="edit-icon"
                  dangerouslySetInnerHTML={{__html: EditIcon}}
                  onClick={() => onEdit(index)}
                />
                <button
                  className="trash-icon ml-7"
                  dangerouslySetInnerHTML={{__html: Trash}}
                  onClick={() => onDelete(index)}
                />
              </div>
              }
            </div>
          ))}
        </div>
      )}
    </FileInput>
  );
};

PhotoFiles.propTypes = {};

export default PhotoFiles;
