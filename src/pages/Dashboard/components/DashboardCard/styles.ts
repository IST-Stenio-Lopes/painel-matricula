import styled, { css } from 'styled-components';
import { theme } from '../../../../global/styles/styles';

interface PercentProps {
  color: 'green' | 'red'
}

export const Container = styled.div`
  background-color: ${theme.colors.secondary00};

  border: 1px solid ${theme.colors.secondary10};
  border-radius: 4px;

  box-shadow: 0px 0px 0px 1px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15);

  height: 152px;
  padding: 20px 24px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  height: 60%;
`;

export const IconArea = styled.div`

`;

export const TextArea = styled.div`
`;

export const Title = styled.h2`
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;

  color: ${theme.colors.secondary80};
`;

export const Number = styled.h2`
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;

  color: ${theme.colors.secondary100};

  margin: 8px 0;
`;

export const Footer = styled.div<PercentProps>`
  display: flex;
  align-items: center;
  height: 40%;

  ${(props) => (props.color === 'green'
    ? css`
      color: ${theme.colors.green};
    `
    : css`
      color: ${theme.colors.red};
  `)}
`;

export const Description = styled.h2`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;

  color: ${theme.colors.secondary90};

`;

export const Percent = styled.h2`
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;

  margin: 0 8px;
`;
