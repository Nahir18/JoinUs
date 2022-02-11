import React, {useMemo} from 'react';
import {ImgStyle, BaseAvatar} from "./style"
import {DEFAULT_URL_FOR_FILE} from "../APIList";

const MinAvatar = ({value}) => {
  const getPicture = useMemo(() => {
    return `${DEFAULT_URL_FOR_FILE}${value}`
  }, [value])

  return (
    <div>
      {value && value.length > 0 ? (
        <ImgStyle
          src={getPicture}
          alt=""
        />
      )
        :
        (
          <BaseAvatar/>
        )
      }
    </div>
  );
};

export default MinAvatar;
