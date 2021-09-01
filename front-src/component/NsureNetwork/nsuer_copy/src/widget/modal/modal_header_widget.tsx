import React from "react";
import {ImageWidget} from "../base";
import styled from "styled-components";
import {white} from "../../theme/colors";


export const ModalHeaderWidegt:React.FC<{url:string,title:string}> = ({url,title}) =>{
    return (
        <div>
            <ImageStyle>
                <ImageWidget url={url} borderColor={white} bgColor={white} size={90}/>
            </ImageStyle>
            <TopStyle>
                <h3>{title}</h3>
            </TopStyle>
        </div>
    );
}

const ImageStyle = styled.div`


display: flex;
justify-content: center;
border-radius: 50%;
margin-bottom: -40px;
`;


const TopStyle = styled.div`
height: 98px;
background-color: ${({theme})=>theme.color.whites['100']};
border-radius: 4px 4px 0 0;
padding-top: 50px;
box-sizing: border-box;
h3{
box-sizing: border-box;
text-align: center;
font-size: 18px;
font-weight: 600;
color: ${({theme})=>theme.color.black["100"]};

}
`
