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
`;

export default GlobalStyles;
