import React from "react";
import styled from "styled-components";

interface ImageWidgetInterface{
    url:string,size:number,bgColor?:string,
    borderColor?:string
}
export const ImageWidget:React.FC<ImageWidgetInterface> = ({
                                                               size,
                                                               url,
                                                               bgColor = "rgba(31, 42, 105, 1)",
                                                               borderColor = '#344087',
                                                           }) =>{
    return (
        <ImageStyle url={''} size={size} bgColor={bgColor} borderColor={borderColor}>
            <img src={url} alt=""/>
        </ImageStyle>
    );
}

const ImageStyle = styled.div<ImageWidgetInterface>`
width: ${({size}) => size}px;
height: ${({size}) => size}px;
border-radius: 100%;
//border: 1px solid  ${({borderColor})=>borderColor};
//padding: ${({size})=>size/4}px;
box-sizing: border-box;
//background-color: ${({bgColor})=>bgColor};

//box-shadow: 0 4px 18px 0 rgba(17, 35, 85, 0.3);
img{
display: block;
width: 100%;
height: 100%;
border-radius: 100%;
}
`
