import styled from "styled-components";



export const PrincipalDivFaq = styled.div`
    width: 50%;
    height: 80vh;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0px 0px 0px 1px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15);

    @media(max-width: 1500px) {
        height: 93vh;
    }
`;


export const ConteudoDivFaq= styled.div`
    padding: 5%;
    
    align-items: flex-start;

    *{
        margin-bottom: 8%;
        
    }
    form{
        display: grid;
    }
`