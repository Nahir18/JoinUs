import React from 'react';
import PropTypes from 'prop-types';
import FileInput from "../FileInput";
import styled from "styled-components"
import {EditIcon, Trash, RotateIcon} from "../../../../pages/ConstantsIcons";
import PreloaderIcon from "../../../Preloader";
import {ContainerOpacity, ContainerPreloader, DefaultContainer} from "../styles"

const PhotoContainer = styled.img`
  width: 300px;
`


// onReUpload повторная загрузка
// onDeleteTempFile удаление временного файла, который не загрузился
// fail когда файл не загрузился

const PhotoFiles = ({titleForFileInput, style, className, width, ...props}) => {
  return (
    <FileInput
      title={titleForFileInput}
      className={className}
      style={style}
      {...props}
    >
      {({value, onDelete, onEdit, onDeleteTempFile, onReUpload}) => (
        <div className="flex flex-wrap items-end">
          {value.map(({file, progress, fail}, index) => (
            <div key={index} className="flex items-center flex-col mr-2 mb-2">
              <ContainerOpacity
                style={{width: width}}
                fail={fail}
              >
                {progress > 0 && <ContainerPreloader>
                  <PreloaderIcon/>
                </ContainerPreloader>}
                <PhotoContainer
                  style={{width: width}}
                  className="rounded-2xl overflow-hidden"
                  src={file}
                />
                {/*{file.match(/\.([^.]+)$/)[1] !== "jpg" && file.match(/\.([^.]+)$/)[1] !== "png" ? (*/}
                {/*  <DefaultContainer>*/}
                {/*    .{file.match(/\.([^.]+)$/)[1]}*/}
                {/*  </DefaultContainer>*/}
                {/*)*/}
              </ContainerOpacity>
              {fail &&
                <div className="flex items-center mt-1.5">
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

PhotoFiles.propTypes = {
  titleForFileInput: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  width: PropTypes.string,
};

PhotoFiles.defaultProps = {
  titleForFileInput: "фото",
  width: "300px",
  style: {},
  className: ""
}
export default PhotoFiles;
