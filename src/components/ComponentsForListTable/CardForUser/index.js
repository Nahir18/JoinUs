import React from 'react';
import PropTypes from "prop-types"
import styled from "styled-components"
import MinAvatar from "../../MinAvatar";

const Wrapper = styled.div`
  .addHover {
    transition-duration: 150ms;
  }
  ${props => props.addHover && `
   &:hover {
    .addHover{
        color: var(--color-blue);
      }
    }
  `}
`

const CardForUser = ({data, addHover}) => {
  const { role, name, img } = data
  return (
    <Wrapper className="flex" addHover={addHover}>
      <div className="items-center flex">
        <MinAvatar value={img}/>
      </div>
      <div className="p-l-12">
        <div
          className="addHover color-darken-blue fs-14 lh-19"
        >
          {name}
        </div>
        <div
          className="color-light-blue-2 fs-12"
        >
          {role}
        </div>
      </div>
    </Wrapper>
  );
};

CardForUser.propTypes = {
  data: PropTypes.object,
  addHover: PropTypes.bool,
}

CardForUser.defaultProps = {
  data: {},
  addHover: false
}

export default CardForUser;
