import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(375px, 25%) minmax(375px, 25%) minmax(375px, 25%) minmax(375px, 25%);
  gap: 24px;
  padding: 32px 32px 90px 32px;
`;

export const Content = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: max-content auto;
`;
