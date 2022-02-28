import styled from "styled-components"

export const Text = styled.div`
  position: absolute;
  left: -25px;
  top: 100px;
`

export const PreloaderContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export const Preloader = styled.div`
  width: 100px;
  height: 100px;
  animation: rotatePreloader 2s infinite ease-in;
  @keyframes rotatePreloader {
    0% {
      transform: translateX(-50%) translateY(-50%) rotateZ(0deg);
    }
    100% {
      transform: translateX(-50%) translateY(-50%) rotateZ(-360deg);
    }
  }

  @keyframes rotateCircle1 {
    0% {
      opacity: 0;
    }
    0% {
      opacity: 1;
      transform: rotateZ(36deg);
    }
    7% {
      transform: rotateZ(0deg);
    }
    57% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(-324deg);
      opacity: 1;
    }
  }
  @keyframes rotateCircle2 {
    5% {
      opacity: 0;
    }
    5.0001% {
      opacity: 1;
      transform: rotateZ(0deg);
    }
    12% {
      transform: rotateZ(-36deg);
    }
    62% {
      transform: rotateZ(-36deg);
    }
    100% {
      transform: rotateZ(-324deg);
      opacity: 1;
    }
  }
  @keyframes rotateCircle3 {
    10% {
      opacity: 0;
    }
    10.0002% {
      opacity: 1;
      transform: rotateZ(-36deg);
    }
    17% {
      transform: rotateZ(-72deg);
    }
    67% {
      transform: rotateZ(-72deg);
    }
    100% {
      transform: rotateZ(-324deg);
      opacity: 1;
    }
  }
  @keyframes rotateCircle4 {
    15% {
      opacity: 0;
    }
    15.0003% {
      opacity: 1;
      transform: rotateZ(-72deg);
    }
    22% {
      transform: rotateZ(-108deg);
    }
    72% {
      transform: rotateZ(-108deg);
    }
    100% {
      transform: rotateZ(-324deg);
      opacity: 1;
    }
  }
  @keyframes rotateCircle5 {
    20% {
      opacity: 0;
    }
    20.0004% {
      opacity: 1;
      transform: rotateZ(-108deg);
    }
    27% {
      transform: rotateZ(-144deg);
    }
    77% {
      transform: rotateZ(-144deg);
    }
    100% {
      transform: rotateZ(-324deg);
      opacity: 1;
    }
  }
  @keyframes rotateCircle6 {
    25% {
      opacity: 0;
    }
    25.0005% {
      opacity: 1;
      transform: rotateZ(-144deg);
    }
    32% {
      transform: rotateZ(-180deg);
    }
    82% {
      transform: rotateZ(-180deg);
    }
    100% {
      transform: rotateZ(-324deg);
      opacity: 1;
    }
  }
  @keyframes rotateCircle7 {
    30% {
      opacity: 0;
    }
    30.0006% {
      opacity: 1;
      transform: rotateZ(-180deg);
    }
    37% {
      transform: rotateZ(-216deg);
    }
    87% {
      transform: rotateZ(-216deg);
    }
    100% {
      transform: rotateZ(-324deg);
      opacity: 1;
    }
  }
  @keyframes rotateCircle8 {
    35% {
      opacity: 0;
    }
    35.0007% {
      opacity: 1;
      transform: rotateZ(-216deg);
    }
    42% {
      transform: rotateZ(-252deg);
    }
    92% {
      transform: rotateZ(-252deg);
    }
    100% {
      transform: rotateZ(-324deg);
      opacity: 1;
    }
  }
  @keyframes rotateCircle9 {
    40% {
      opacity: 0;
    }
    40.0008% {
      opacity: 1;
      transform: rotateZ(-252deg);
    }
    47% {
      transform: rotateZ(-288deg);
    }
    97% {
      transform: rotateZ(-288deg);
    }
    100% {
      transform: rotateZ(-324deg);
      opacity: 1;
    }
  }
  @keyframes rotateCircle10 {
    45% {
      opacity: 0;
    }
    45.0009% {
      opacity: 1;
      transform: rotateZ(-288deg);
    }
    52% {
      transform: rotateZ(-324deg);
    }
    100% {
      transform: rotateZ(-324deg);
      opacity: 1;
    }
  }
  .item {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    &:before {
      content: "";
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      width: 10%;
      height: 10%;
      background-color: var(--color-blue);
      border-radius: 50%;
    }
  }

  .item:nth-child(1) {
    transform: rotateZ(0deg);
    animation: rotateCircle1 2s infinite linear;
    z-index: 9;
  }
  .item:nth-child(2) {
    transform: rotateZ(36deg);
    animation: rotateCircle2 2s infinite linear;
    z-index: 8;
  }
  .item:nth-child(3) {
    transform: rotateZ(72deg);
    animation: rotateCircle3 2s infinite linear;
  }
  .item:nth-child(4) {
    transform: rotateZ(108deg);
    animation: rotateCircle4 2s infinite linear;
    z-index: 6;
  }
  .item:nth-child(5) {
    transform: rotateZ(144deg);
    animation: rotateCircle5 2s infinite linear;
    z-index: 5;
  }
  .item:nth-child(6) {
    transform: rotateZ(180deg);
    animation: rotateCircle6 2s infinite linear;
    z-index: 4;
  }
  .item:nth-child(7) {
    transform: rotateZ(216deg);
    animation: rotateCircle7 2s infinite linear;
    z-index: 3;
  }
  .item:nth-child(8) {
    transform: rotateZ(252deg);
    animation: rotateCircle8 2s infinite linear;
    z-index: 2;
  }
  .item:nth-child(9) {
    transform: rotateZ(288deg);
    animation: rotateCircle9 2s infinite linear;
    z-index: 1;
  }
  .item:nth-child(10) {
    transform: rotateZ(324deg);
    animation: rotateCircle10 2s infinite linear;
    z-index: 0;
  }
`
