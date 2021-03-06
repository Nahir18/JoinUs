import styled from "styled-components";


export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Modal = styled.div`
  background-color: var(--color-white);
  border-radius: 24px;
  min-width: 576px;
  max-height: 80vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`
