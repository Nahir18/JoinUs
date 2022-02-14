import styled from "styled-components";

export const ContainerOpacity = styled.div`
  position: relative;
  width: 300px;
  ${props => props.fail && `
   height: 100%;
  &:before {
    content: "Не удалось загрузить";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    color: var(--color-white);
    display: flex;
    justify-content: center;
    align-items: center;
  }`
}
  `

export const ContainerPreloader = styled.div`
  background: rgba(0, 0, 0, 0.5);
  width: 300px;
  height: 168.75px;
  &:before {
    content: "Загружается...";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    color: var(--color-white);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
