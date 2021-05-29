import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import styled from 'styled-components';
import { onEnter } from '../customHooks';

interface ISearchInput{
    onSearch: (query: string)=>void;
    placeHolder?: string;
    defaultValue?: string;
}

const SearchContainer = styled.div`
    width: 220px;
    margin: auto;
    padding: 0px;
    input{
        padding: 13px;
        padding-top: 14px;
        border-radius: 10px;
        font-size: 18px;
        margin-right: 0;
        border: none;
        margin-top: 0;
        height: 21.5px;
        width: 140px;
        :focus{
            outline: none;
        }
    }
    button{
        width: 50px;
        height: 49px;
        padding: 13px;
        background: linear-gradient(to right, #9d50bb, #6e48aa); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        margin-left: -10px;
        border: none;
        margin-top: 0;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        ;
        :hover{
            background: linear-gradient(to right, #da22ff, #9733ee); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            box-shadow: 0 0 5px purple;
        }
        svg{
            font-size: 18px;
            color: white;
        }
    }
`;

export const SearchInput: React.FC<ISearchInput> = ({onSearch, placeHolder = "Keresés", defaultValue = ""}) => {
    const [query, setQuery] = useState(defaultValue);
    return (
        <SearchContainer>
               <input value={query} onChange={(e)=>{ setQuery(e.target.value) }} type="text" placeholder={placeHolder} onKeyDown={(e)=>{ onEnter(e, ()=>{ onSearch(query); } )}} />
                <button onClick={()=>{ onSearch(query) }} ><FontAwesomeIcon icon={faSearch} /></button>
        </SearchContainer>
    )
}

export default SearchInput;