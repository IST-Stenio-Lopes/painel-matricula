import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(375px, 25%) minmax(375px, 25%) minmax(375px, 25%) minmax(375px, 25%);
  gap: 24px;
  padding: 32px 32px 90px 32px;
  align-items: start;
`;

export const Content = styled.div`
  grid-column: 1 / 1;
  display: grid;
  grid-template-rows: 156px 229px auto;
  gap: 24px;
`;
