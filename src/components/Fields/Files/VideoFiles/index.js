import React from 'react';
import PropTypes from 'prop-types';
import FileInput from "../FileInput";
import styled from "styled-components"
import {EditIcon, RotateIcon, Trash} from "../../../../pages/ConstantsIcons";
import PreloaderIcon from "../../../Preloader";
import {ContainerOpacity, ContainerPreloader} from "../styles"
import { Player } from 'video-react';

const VideoContainer = styled.div`
  //width: 300px;
  //height: 168.75px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const VideoFiles = (props) => {
return (
 <FileInput title="видео" {...props}>
   {({value, onDelete, onEdit, onDeleteTempFile, onReUpload}) => (
     <div className="flex">
       {value.map(({file, progress, fail}, index) => (
         <div className="flex items-center flex-col mr-2" key={file}>
           <VideoContainer className="rounded-2xl overflow-hidden" >
             <ContainerOpacity fail={fail}>
               {progress > 0 && <ContainerPreloader><PreloaderIcon/></ContainerPreloader>}
              <Player
                width={300}
                // height={168.75}
                playsInline
                src={file}
              />
             </ContainerOpacity>
           </VideoContainer>

           {fail &&
             <div className="flex items-center mt-1.5">
               <button
                 className="edit-icon"
                 dangerouslySetInnerHTML={{__html: EditIcon}}
                 onClick={() => onEdit(index)}
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

VideoFiles.propTypes = {
className: PropTypes.string,
value: PropTypes.array,
};

VideoFiles.defaultProps = {
className: "",
value: []
};

export default VideoFiles;
