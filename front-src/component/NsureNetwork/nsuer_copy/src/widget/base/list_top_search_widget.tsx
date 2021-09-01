import React from "react";
import styled from "styled-components";
import {CoversStyle} from "../covers/style";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {Hidden} from "@material-ui/core";
export const ListTopWidget: React.FC = ({children}) => {
    return (
        <TopStyle top={11}>
            {children}
        </TopStyle>
    );
}


interface ListHeaderSeachInterface {
    title:string,
    sub:string,
    isShowSearch:boolean
}

export const ListHeader:React.FC<ListHeaderSeachInterface> = ({title,sub,isShowSearch}) =>{
    return (
        <ListHeaderStyle top={20}>
            <h2> {title}
                <Hidden smDown>
                    <span>{sub}</span>
                </Hidden>
            </h2>
            {
                isShowSearch? <SearchStyle>
                    <InputBase />
                    <SearchIcon />
                </SearchStyle> : <></>
            }


        </ListHeaderStyle>
    );
}





const  SearchStyle = styled.div`
display: flex;
align-items: center;
background-color: #162C75;
width: 30%;
flex: none !important;
border-radius: 5px;
padding: 0 10px;
color: white;
.MuiInputBase-input{
color: white;
}

`;


const  ListHeaderStyle= styled.div`
${() => CoversStyle.ListCellStyle};
background: #161F57;
display: flex;
justify-content: space-between;

h2{
font-size: 18px;
font-weight: 400;
color: #FFFFFF;
display: flex;
align-items: center;
span{
font-size: 14px;
font-weight: 400;
color: #9FAAED;
line-height: 1;
display: block;
margin-left: 10px;
}
}
`;




const TopStyle = styled.div`
display: flex;
justify-content: space-between;
z-index: 10;
position: relative;
${() => CoversStyle.ListCellStyle};
background: ${({theme})=> theme.bgColor.main};
div{
font-size: 14px;
font-weight: 400;
color: #8390B2;
}
`;




