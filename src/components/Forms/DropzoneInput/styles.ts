import styled, { css } from 'styled-components';
import { theme } from '../../../global/styles/styles';

interface DropzoneProps {
  isDragAccept: boolean;
  isDragReject: boolean;
  isFocused: boolean;
}
export const Container = styled.div`
  height: 278px;
`;

export const Dropzone = styled.div<DropzoneProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 246px;
  padding: 40px 20px;
  border-radius: 2px;
  border: 2px dashed ${theme.colors.secondary70};
  color: ${theme.colors.secondary70};
  outline: none;
  transition: border .24s ease-in-out;

  svg {
    color: ${theme.colors.primary50};
  }

  h3 {
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    color: ${theme.colors.secondary100};

  }

  p {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
  }

  button {
    background-color: transparent;
    border: none;
    color: ${theme.colors.primary50};
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;

    margin-top: 8px;

    :hover {
      text-decoration: underline;
    }
  }



  ${({ isDragAccept }) => isDragAccept && css`
    border-color: ${theme.colors.primary50};
  `}

  ${({ isFocused }) => isFocused && css`
    border-color: ${theme.colors.primary50};
  `}

  ${({ isDragReject }) => isDragReject && css`
    border-color: ${theme.colors.red};
  `}
`;

export const Error = styled.h2`
  text-align: center;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;

  color: ${theme.colors.red};

  margin: 8px 0;
`;
