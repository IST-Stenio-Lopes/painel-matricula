import { createGlobalStyle } from 'styled-components';
import { theme } from './styles';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: ${theme.colors.secondary05};
    color: ${theme.colors.secondary100};
    -webkit-font-smoothing: antialiased;

    font-family: ${theme.fonts.titleText}, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    text-overflow: ellipsis;
  }

  body, div, span, input, button, textarea, p, ul{
    font-family: ${theme.fonts.titleText}, sans-serif;

  }

  div, ul, textarea {
    /* width */
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: transparent;
      margin: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${theme.colors.secondary20};
      border-radius: 2px;

    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: ${theme.colors.secondary60};
    }
  }

  button {
    cursor: pointer;
  }
`;
