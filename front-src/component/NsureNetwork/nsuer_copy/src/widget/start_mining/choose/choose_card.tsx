import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import {ImageWidget, ValueWidget} from "../../base";
import {WidthStyle} from "../../style/width_style";
import {ConvertButtonWidget} from "./convert_button";
import {StartMiningButtonWidget} from "./start_mining_button";

import {getBalanceNumber} from "../../../utils/formatBalance";
import {useCardFn} from "../../../view/start_mining/fn/card_fn";
import {CradCentext} from "../../../view/start_mining/choose_page";
import BigNumber from "bignumber.js";
import {ConvertCardInterface} from "../../../interface/start_mining";
import {ChooseImgWidget} from "../widget/choose_img";


export const ChooseCardWidget: React.FC = () => {
    const model:ConvertCardInterface = useContext(CradCentext)

    const {balance, apy,exchange} = useCardFn(model);
    return (
        <ChooseCardStyle size={{all: 30}}>
            <ChooseImgWidget img={model.url}/>
            <h3>{model.nick.toUpperCase()} pool</h3>
            <CardCellWidget label={'Estimated APR:'}>
                <span>{apy}%</span>
            </CardCellWidget>
            <CardCellWidget label={`My n${model.nick.toUpperCase()} available`}>
                <ValueWidget  decimals={4} value={getBalanceNumber(balance)}/>
            </CardCellWidget>
            <div style={{height:"10px"}} />
            <ConvertButtonWidget exchangeEate={exchange || 0}/>
            <StartMiningButtonWidget balance={balance}/>
        </ChooseCardStyle>
    );
}

export const CardCellWidget: React.FC<{ label: string }> = ({label, children}) => {
    return (
        <ChooseCardCellStyle>
            <p><span/>{label}</p>
            <div>{children}</div>
        </ChooseCardCellStyle>
    );
}


const ChooseCardCellStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 19px;

  p {
    font-size: 14px;
    font-weight: 400;
    color: #999;
    display: flex;
    align-items: center;

    span {
      display: block;
      width: 3px;
      height: 3px;
      border-radius: 100%;
      margin-right: 5px;
      background-color: rgba(157, 174, 219, 1);
    }
  }

  div {
    font-size: 14px;
    font-weight: bold;
    color: ${({theme})=>theme.color.whites["300"]};

  }
`


export const ChooseCardStyle = styled.div`
  border-radius: 5px;
  //border: 1px solid rgba(41, 51, 117, 1);

  border: 1px solid #EBEBEB;
  background-color: ${({theme})=>theme.bgColor.main};
  display: flex;
  flex-flow: column;
  justify-items: center;
  align-items: center;

  ${WidthStyle.PaddingSize}
  h3 {
    margin: 0 0 23px 0;
    font-size: 20px;
    font-weight: bold;
    color: ${({theme})=>theme.color.whites["300"]};

  }
`
