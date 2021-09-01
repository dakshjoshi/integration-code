import React from "react";
import styled from "styled-components";

export const ImagelabelWidget:React.FC<{url?:string,label?:string,size?:number}> = ({url,label,size}) =>{
    return (
        <ImageLabelStyle size={size}><img src={url} alt=""/>{label}</ImageLabelStyle>
    )
}

const ImageLabelStyle = styled.div<{size?:number}>`
font-size: 14px;
font-weight: 400;
color: #FFFFFF;
display: flex;
align-items: center;

img{
display: block;
width: ${({size}) => size}px;
height:  ${({size}) => size}px;
border-radius: 100%;
margin-right: 10px;
}
`;
