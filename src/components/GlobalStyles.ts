import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    font-family: ${({ theme }) => theme.typography.type};
  }

  * {
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text}; 
    overscroll-behavior: none;
    touch-action: pan-x pan-y;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  body.lock {
    touch-action: none;
  }

  @media (width < 800px) and (orientation: landscape) {
    html {
      transform: rotate(-90deg);
      transform-origin: left top;
      width: 100vh;
      overflow-x: hidden;
      position: absolute;
      top: 100%;
      left: 0;
    }
  }
`;

export default GlobalStyles;
