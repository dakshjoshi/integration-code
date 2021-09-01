import styled from "styled-components";
import React from "react";

export const RmPaddingWidget:React.FC = ({children}) => {
    return (<WapStyle>{children}</WapStyle>);
}

const WapStyle = styled.div`
  padding: 0 10px;
`
