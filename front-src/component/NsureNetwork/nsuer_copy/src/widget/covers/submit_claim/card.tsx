import React from "react";
import styled from "styled-components";
import {UseUrlData} from "../../../utils/url";
import {ListCellMode} from "../../../interface/covers_interface";
import {DateUtils} from "../../../utils/date";
import balancer from "../../../assets/imgs/balancer.png"
import {BorderWidget} from "../../base";
import {AppConfig} from "../../../config";
import {formatAddress, getBalanceFormat} from "../../../utils/formatBalance";


export const CardWdiget: React.FC = () => {
    const [urlData] = UseUrlData<any>();
    return (
        <WapStyle>
            <BorderWidget y={10}>
                <ImgLabelStyle>
                    <img src={urlData?.logo.filename ? AppConfig.urlPath + urlData?.logo.filename : balancer} alt=""/>
                    <h4>{urlData?.name}</h4>
                </ImgLabelStyle>
            </BorderWidget>

            <div className="innerBox">

                <MsgCellStyle>
                    <p>Cover ID:</p>
                    <span>{formatAddress(urlData?.hash || '')}</span>
                </MsgCellStyle>


                <MsgCellStyle>
                    <p>Cover Amount:</p>
                    <span>{getBalanceFormat(urlData?.amount)} ETH</span>
                </MsgCellStyle>
                <MsgCellStyle>
                    <p>Cover Period:</p>
                    <span>{DateUtils.dataString(urlData?.date)} -- {DateUtils.dataString(urlData?.end * 1e3)}</span>
                </MsgCellStyle>

                <MsgCellStyle>
                    <p>Product :</p>
                    <span>{urlData?.name}</span>
                </MsgCellStyle>
            </div>

        </WapStyle>
    );
}

const WapStyle = styled.div`
  background-color: ${({theme}) => theme.bgColor.main};
  height: 100%;

  .innerBox {
    padding: 20px 15px;
    box-sizing: border-box;
  }
`

const ImgLabelStyle = styled.div`
  display: flex;
  align-content: center;
  align-items: center;

  img {
    display: block;
    width: 30px;
    border-radius: 100%;
    margin-right: 10px;
    padding: 5px;
    box-sizing: border-box;


  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: ${({theme}) => theme.color.black['100']};
  }
`


const MsgCellStyle = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;

  p {
    font-size: 14px;
    font-weight: 400;
    color: ${({theme}) => theme.color.whites['800']};
  }

  span {
    font-size: 14px;
    font-weight: bold;
    color: #3957B1;
  }
`





