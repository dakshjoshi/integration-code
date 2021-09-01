import React from "react";
import styled from "styled-components";


export const SpacingWidget:React.FC = () => {
    return (<SpacingStyle />);
}

const SpacingStyle = styled.div`
width: 29px;
height: 29px;

@media (max-width: ${({theme}) => theme.sm}){
width: 15px;
height: 15px;
}

`
