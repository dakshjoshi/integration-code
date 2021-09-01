import React, {useContext} from "react";
import {BorderWidget} from "../../base";
import {Grid} from "@material-ui/core";
import styled from "styled-components";
import {WidthStyle} from "../../style/width_style";
import {CardStyle as CardStyles} from "../../style/card_style";
import {PaddingSize} from "../../../interface/css_interface";
import Icon1Img from "../../../assets/imgs/icon1.png"
import balancer from "../../../assets/imgs/balancer.png"
import {StartContext} from "../../../view/stake_list";
import {CenterWidget} from "./center";

export const TitleLeftWidget: React.FC = () => {
    const {leverage, apy, powerLeft} = useContext(StartContext)

    return (
        <TitleLeftStyle>

            <BorderWidget y={22}>
                {/*on contracts and earn ETH when cover is purchased*/}
                <TitleStyle>Start
                    Underwriting <span>Earn by staking NSURE on selected products underwriting risks</span></TitleStyle>
            </BorderWidget>
            <div className={'centerBox'}>
                <CenterWidget/>
            </div>


        </TitleLeftStyle>
    );
}

const TitleLeftStyle = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  .centerBox{
    padding: 50px 30px;
    box-sizing: border-box;
    flex: 1;
    display: flex;
  }
`

const CardWidget: React.FC<{ text: string, url: string }> = ({text, url}) => {
    return (
        <CardStyle item md={4} sm={12} xs={12}>
            <CardInner size={{all: 20}} bgColor={"rgba(22, 44, 117, 1)"}
                       borderColor={"rgba(23, 54, 160, 1),rgba(10, 34, 113, 1)"}>
                <h1>{url}</h1>
                {/*<img src={url} alt=""/>*/}
                <h2>{text}</h2>
            </CardInner>

        </CardStyle>
    );
}


const CardStyle = styled(Grid)`
  padding: 10px;
  box-sizing: border-box;
`

const CardInner = styled.div<{ bgColor: string, borderColor: string, size: PaddingSize }>`
  border-radius: 5px;
  justify-content: start;
  height: 100%;
  box-sizing: border-box;
  ${WidthStyle.PaddingSize} ${CardStyles.BorderToBottomStyle};
  display: flex;
  flex-flow: column;
  align-items: center;

  img {
    display: block;
    width: 40px;
    height: 40px;
    margin-bottom: 30px;
  }

  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    font-size: 28px;
    color: white;
    height: 40px;
    margin-bottom: 30px;
  }

  h2 {
    font-size: 14px;
    font-weight: 400;
    color: #9FAAED;
  }
`

const GridWap = styled.div`
  ${WidthStyle.PaddingSize};
  flex: 1;

`

const TitleStyle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: #FFFFFF;

  span {
    font-size: 14px;
    font-weight: 400;
    color: #9FAAED;
    line-height: 18px;
  }
`
