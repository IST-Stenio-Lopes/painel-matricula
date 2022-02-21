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
    position: relative;
    align-items: flex-start;
    height: 65%;

    *{
        margin-bottom: 8%;
        
    }
    form{
        display: grid;
        max-height: 100%
        
    }
`

export const ButtonSaveFooterFaq = styled.button`
    background-color: #1665D8;
    color: white;
    text-align: center;
    padding-left: 4%;
    padding-right: 4%;
    padding-top: 1%;
    padding-bottom: 1%;
    border-radius: 4px;
    margin-top: 2%;
    margin-left: 78%;
    border: none;


    @media (max-width: 1500px) {
   
        margin-top: 3%;
        margin-left: 76%;
    }
`

export const BottomLineFaq = styled.div`
    position: relative;
    //bottom: 0;
    width: 100%;
    //height: 15%;
    margin-top: 14%;
    border-top: 1px solid #E4E7EB;

    @media (max-width: 1500px) {
        margin-top: 22%;
    }
    
`