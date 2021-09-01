import React from "react";
import styled from "styled-components";
import logoImage from "../../assets/imgs/logo.png"
import {Grid} from "@material-ui/core";

export const LogoWidget: React.FC<{textColor?:string}> = ({textColor}) => {
    return (
       <Grid item md={4} sm={12} xs={12}>
           <StyledLogo href="https://nsure.network/#/"  target="_blank">
               <img src={logoImage} height="50"/>
               <StyledText textColor={textColor}>
                   Nsure.Network
               </StyledText>
           </StyledLogo>
       </Grid>
    )
};



export  const StyledLogo = styled.a`
  align-items: center;
  display: flex;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
  @media (max-width: 768px) {
    padding: 10px 0;
    justify-content: center;
    img{
      width: 40px;
      height: 40px;
    }
  }
`;

export  const StyledText = styled.span<{textColor?:string}>`
  color: ${({theme,textColor}) => textColor|| theme.color.black["100"] };
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-left: 10px;
  
`;
