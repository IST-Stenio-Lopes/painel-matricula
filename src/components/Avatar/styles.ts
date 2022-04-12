import styled, { css } from 'styled-components';
import { theme } from '../../global/styles/styles';

interface AvatarProps {
  edit: boolean;
  size: string;
}

export const EditButton = styled.div`
  background-image:
  linear-gradient(0deg, ${theme.colors.primary50} 30%, transparent 20%);

  visibility: hidden;
  bottom: 0;

  border-radius: 50%;

  label {
    width: 100%;
    height: 100%;

    border-radius: 50%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    cursor: pointer;

    input {
      display: none;
    }

    svg {
      color: ${theme.colors.secondary00};

      margin-bottom: 10px;
    }
  }
`;

export const Container = styled.div<AvatarProps>`
  background-color: ${theme.colors.secondary10};
  border-radius: 50%;

  display: flex;
  margin: 0 7px;

  align-items: center;
  justify-content: center;

  ${(props) => css`
      width: ${props.size};
      height: ${props.size};
  `}

  img {
    width: 100%;
    height: 100%;

    border-radius: 50%;
    object-fit: cover;
  }

  ${EditButton} {
    ${(props) => props.edit && css`
      width: ${props.size}px;
      height: ${props.size}px;
    `}
  }

  :hover {
    ${EditButton} {
      ${(props) => props.edit && css`
        visibility: visible;

        cursor: pointer;
      `}
    }
  }
`;

export const TextLetter = styled.h2`
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;

  color: ${theme.colors.secondary00};
`;
