import styled from 'styled-components'

export const AvatarContainer = styled.div`
  width: 140px;
  height: 140px;
  min-width: 140px;
  min-height: 140px;
`

export const EditButton = styled.button`
  position: absolute;
  z-index: 2;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  fill: white;
  background: var(--color-blue-hover-gradient);
  right: -4px;
  bottom: 9px;
  border: 4px solid var(--color-white);
  box-sizing: content-box;
  &:hover {
    fill: white!important;
  }
`

export const BaseAvatarContainer = styled.div`
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--color-light-grey-2);
  width: 140px;
  height: 140px;
  min-width: 140px;
  min-height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
`
