import styled from "styled-components";


export const ModalTableHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 40% 40% 10%;
  margin-top: 3rem;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-light-blue-2);
  border-bottom: var(--color-light-grey-2) 1px solid;
  min-width: 600px;
  padding-bottom: 1rem;
`
export const ModalTableBody = styled.div`
  display: grid;
  grid-template-columns: 10% 40% 40% 10%;
  font-size: 14px;
  font-weight: 600;
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
  border-bottom: var(--color-light-grey-2) 1px solid;
`
export const FileImage = styled.div`
  max-height: 100px;
  max-width: 100px;
`
export const UserAvatar = styled.img`
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px
`
