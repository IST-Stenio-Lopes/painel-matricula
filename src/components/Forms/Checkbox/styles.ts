import styled from 'styled-components';
import { theme } from '../../../global/styles/styles';

export const Container = styled.div`
  display: flex;
  align-items: center;

  max-height: 50px;


  h2 {
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    color: ${theme.colors.secondary60};
    margin-right: 10px;

    :hover{
      cursor: pointer;
    }
  }


  input[type="checkbox"] {
    display: flex;
    align-items: center;
    margin: 5px;
    cursor: pointer;
    width: 16px;
    height: 16px;

    background-color: transparent;
    border: 2px solid ${theme.colors.secondary60};
    border-radius: 3px;
    display: inline-block;
    margin-right: 15px;
    position: relative;
    -webkit-appearance: none;

}

  input[type="checkbox"]:after {
    background-color: transparent;
    border-radius: 2px;
    content: '';
    display: block;
    position: relative;
    top: 1px;
    left: 1px;

    width: 10px;
    height: 10px;
}

  input[type="checkbox"]:checked:after {
    background-color: ${theme.colors.primary50};

}
`;
