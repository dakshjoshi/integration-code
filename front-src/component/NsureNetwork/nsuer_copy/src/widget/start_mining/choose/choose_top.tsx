import React from "react";
import styled, {css} from "styled-components";
import {WidthStyle} from "../../style/width_style";
import HookImg from '../../../assets/imgs/hook_img.png'
import {CardStyle} from "../../style/card_style";

export const ChooseTopWidgte: React.FC = () => {
    return (
        <WapStyle>
            <h2>Choose a cryptocurrency to start</h2>
            <h3>Become a capital provider, earn passive income in NSURE</h3>


        </WapStyle>
    );
}

export const ChooseBottomWidget: React.FC = () => {
    return (<BorderStyle size={{x: 20, y: 30}} bgColor={"rgba(20, 28, 78, 1)"}>
        <h4>
            Welcome to Nsure Capital Mining section. Provide capital in order to increase capital efficiency and
            MCR requirements for the network. NSURE are minted and automatically awarded on every block.
        </h4>
        <MsgCellWidget inner={"Aprove contract for capital deployment"}/>
        <MsgCellWidget inner={"Deposit ETH, in order to mint nETH"}/>
        <MsgCellWidget inner={"Deploy your nETH for accessing capital mining rewards"}/>
        <h5>
            RISK DISCLAIMER: When depositing assets into the capital mining section, your capital is at risk. If
            MCR requirements drop below expected thresholds, part or all of your assets may be locked
            temporarily due to capital efficiency on the network. The capital pools are dependent on Nsure’s
            Surplus pool balancing, and may partially be utilised for coverage payouts if a statistically
            unlikely event of claim payouts occur.
        </h5>
    </BorderStyle>);
}
export const MsgCellWidget: React.FC<{ inner: string }> = ({inner}) => {
    return (
        <MsgCellStyle>
            <img src={HookImg} alt=""/>

            <h4>{inner}</h4>
        </MsgCellStyle>
    );
}

const MsgCellStyle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  img {
    display: block;
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }

  h4 {
    font-size: 14px;
    font-weight: 400;
    color: #FFFFFF;

  }
`;


export const BorderStyle = styled.div<{ bgColor: string, size: { x?: number, y?: number, all?: number } }>`
  ${() => CardStyle.BorderTwoStyle};
  ${() => WidthStyle.PaddingSize};
  padding: 20px 30px;

  h4 {
    font-size: 16px;
    color: #FFFFFF;
    text-align: start;
  }

  h5 {
    font-size: 14px;
    margin-top: 10px;
    color: #FFFFFF;
    text-align: start;
    font-style: italic;
  }
`


const WapStyle = styled.div`
  text-align: center;

  h2 {
    font-size: 32px;
    font-weight: 800;
    color: ${({theme}) => theme.color.black["500"]};
    //text-shadow: 0 2px 5px #13255B;
  }


  h3 {
    font-size: 14px;
    font-weight: 800;
    color: #BBBCC7;
    margin: 4px 0 29px 0;
  }

  padding: 30px;
  box-sizing: border-box;
`
