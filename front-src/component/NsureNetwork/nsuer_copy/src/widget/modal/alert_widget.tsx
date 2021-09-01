import React from "react";
import { Alert } from '@material-ui/lab';
import {ModalProps} from "../../provider/model_provider";
import styled from "styled-components";
import alertImg from "../../assets/imgs/_jingao.png"

interface AlertInterFace extends ModalProps{
    text:string
}
export const AlertWidget: React.FC<AlertInterFace> = ({text}) => {
    return (<AlertStyle > <img src={alertImg} alt=""/>{text}</AlertStyle>);
}


const AlertStyle = styled.div`
  //width: 250px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 15px 20px;
  box-sizing: border-box;
  background-color: #FFFFFF;

  font-size: 14px;
  font-weight: 500;
  color: #DE4949;
  line-height: 25px;
  img{
    display: block;
    width: 19px;
    height: 19px;
    margin-right: 10px;
  }
`
