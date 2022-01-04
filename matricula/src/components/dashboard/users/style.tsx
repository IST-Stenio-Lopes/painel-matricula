import styled from 'styled-components';
import { css } from "styled-components";

import { ReactComponent as SearchIcon } from './../../../assets/search.svg';


export const SearchBar = styled.div`
    width: 620px;
    height: 36px;
    left: 282px;
    margin-top: 2%;
    border-radius: 5px;
    background-color: white;
`
export const ImgSearch = styled(SearchIcon)`
    margin-top: 1%;
    margin-left: 1%;
`
export const Search = styled.input`
    margin-left: 2%;
    height: 100%;
    width: 93%;
    border: none;
`

export const UlSearch = styled.ul`
    list-style: none;
    z-index: 3;

`
export const LiSearch = styled.li`
    background-color: #F5F6F9;
    border-bottom: 1px solid lightgray;
    padding-top: 2%;


`

export const TopContainer = styled.div`
    display: flex;
`
export const AddButton = styled.button`
    color: white;
    width: 10%;
    padding-top: 1%;
    padding-bottom: 1%;
    border-radius: 5px;
    border: none;
    background-color: #1665D8;
    margin-left: 40%;
    margin-top: 1.8%;
    font-size: 14px;
`
export const ListContainer = styled.div`
    margin-top: 5%;
    padding-right: 5%;
    z-index: 0!important;

`







export const DataEdit = styled.p`
    color: #9EA0A5;
    padding: 0px;
    margin: 0px;
`
