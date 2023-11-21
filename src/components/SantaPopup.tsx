import styled, { keyframes } from 'styled-components';
import SantaVector from '../assets/santa.svg?react';

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(65px);
  }
`;

const Root = styled.div`
  position: fixed;
  inset: auto 0 0;
  display: flex;
  justify-content: center;
  transform: translateY(65px);
  animation: ${slideUp} 1s ease;
`;

const Santa = styled(SantaVector)`
  height: 50vh;
  max-height: 750px;
`;

export const SantaPopup = () => (
  <Root>
    <Santa />
  </Root>
);
