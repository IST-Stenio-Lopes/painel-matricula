import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 10% 10%;
  grid-template-rows: 65px;
  gap: 24px;
`;

export const ButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding-top: 15px;
`;
