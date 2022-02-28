import styled from "styled-components";

export const HeaderContainer = styled.div`
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0.01em
`
export const TableContainer = styled.div`
  > div {
    &:last-child {
      border-bottom: 1px solid var(--color-light-grey);
    }
  }
`

export const ContainerReport = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
`
