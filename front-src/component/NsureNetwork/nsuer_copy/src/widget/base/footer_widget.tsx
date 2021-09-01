import {LogoWidget, StyledLogo, StyledText} from "./logo_widget";
import React from "react";
import styled from "styled-components";
import logoImage from "../../assets/imgs/logo.png";
import {Grid} from "@material-ui/core";


export const FooterWidget: React.FC = () => {
    return (
        <FooterStyle>
            <StyledLogo href="https://nsure.network/#/" target="_blank">
                <img src={logoImage} height="50"/>
                <StyledText textColor={"#fff"}>
                    Nsure.Network
                </StyledText>
            </StyledLogo>
        </FooterStyle>
    );
}


const FooterStyle = styled.div`
  background-color: #080326;
  padding: 40px 0;
  display: flex;
  justify-content: center;
`;
