import React from "react";
import styled from "styled-components";

export const ChooseImgWidget: React.FC<{img:string}> = ({img}) => {
    return (
        <ImgStyle>
            <img src={img} alt=""/>
        </ImgStyle>
    );
}

const ImgStyle = styled.div`
  width: 95px;
  display: block;

  img {
    display: block;
    width: 100%;
  }
`
