import React, {useEffect} from "react";
import {ImageWidget, StartWidget} from "../base";
import {ProductInformationInterface} from "../../interface/product_interface";
import styled from "styled-components";
import {Grid} from "@material-ui/core";
import {RadarChartWidget} from "../echart/radar_chart";
import {ListCellWidget} from "../base/list_cell_widget";
import {theme} from "../../theme";
import {WidthStyle} from "../style/width_style";
import {ModalHeaderWidegt} from "./modal_header_widget";
import balancerImage from "../../assets/imgs/balancer.png"
import {formatAddress} from "../../utils/formatBalance";

export const ProductInformation: React.FC<ProductInformationInterface> = ({
                                                                              imgName,
                                                                              address,
                                                                              name,
                                                                              team = '',
                                                                              exposure = '',
                                                                              audit = '',
                                                                              developer = '',
                                                                              code_quality = '',
                                                                              no1,
                                                                              no2,
                                                                              no3,
                                                                              no4,
                                                                              no5,
                                                                              website
                                                                          }) => {


    return (
        <WapStyle>

            <ModalHeaderWidegt url={imgName} title={name}/>

            <BottomStyle>
                <Grid container spacing={4}>
                    <Grid item md={6} sm={12} xs={12}>
                        <ListCellWidget label={"Address:"} last={formatAddress(address)}/>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <a href={website}>
                            <ListCellWidget label={"Website:"} last={website}/>

                        </a>
                    </Grid>
                </Grid>
                <BottomInnerStyle>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Grid container item md={5} sm={12} xs={12}>
                            <RadarChartWidget model={{no1, no2, no3, no4, no5}}/>
                        </Grid>

                        <Grid item md={1} sm={12} xs={12}>
                            <WidthStyle.LineStyle color={'#f5f5f5'} height={200} maxHeight={20}/>

                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <StartTopMsgWidget
                                startNumber={getStart(0.2 * no1 + 0.15 * no2 + 0.45 * no3 + 0.1 * no4 + 0.1 * no5)}/>
                            <StartCellMsgWidget title={"History & Team"}
                                                sub={team}
                                                startNumber={getStart(no1)}
                            />
                            <StartCellMsgWidget title={"Exposure"}
                                                sub={exposure}
                                                startNumber={getStart(no2)}
                            />
                            <StartCellMsgWidget title={"Audit"}
                                                sub={audit}
                                                startNumber={getStart(no3)}
                            />
                            <StartCellMsgWidget title={"Code Quality"}
                                                sub={code_quality}
                                                startNumber={getStart(no4)}
                            />
                            <StartCellMsgWidget title={"Developer Community"}
                                                sub={developer}
                                                startNumber={getStart(no5)}
                            />
                        </Grid>
                    </Grid>

                </BottomInnerStyle>
            </BottomStyle>


        </WapStyle>
    );
}

const StartTopMsgWidget: React.FC<{ startNumber: number }> = ({startNumber}) => {
    let _text = ["High Risk", "Medium Risk", "Medium Risk", "Low Risk", "Low Risk"];
    return (
        <StartTopMsgStyle>
            <h2>Security Rating:</h2>
            <div>
                <StartWidget startNumber={startNumber} size={20}/>
                <h4>{_text[startNumber - 1]}</h4>
            </div>
        </StartTopMsgStyle>
    );
}


const StartCellMsgWidget: React.FC<{ title: string, startNumber: number, sub: string }> = ({
                                                                                               title,
                                                                                               startNumber,
                                                                                               sub,
                                                                                           }) => {
    return (
        <StartCellMsgStyle>
            <h2>{title} <StartWidget startNumber={startNumber} size={10}/></h2>
            <h3>{sub}</h3>
        </StartCellMsgStyle>
    );
}
const arrStart = [49.9, 64.9, 79.9, 89.9, 100];

export const getStart = (ev: number = 0): number => {
    let _startNumber: number = 1;
    for (let i = 0; i < arrStart.length; i++) {
        if (ev <= arrStart[i]) {
            _startNumber = i + 1;
            break;
        }
    }

    return _startNumber;

}


const StartTopMsgStyle = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;

  h2 {
    font-size: 18px;
    font-weight: bold;
    color: ${({theme}) => theme.color.whites['300']};
    line-height: 18px;

  }

  > div {
    h4 {
      font-size: 12px;
      font-weight: 400;
      color: #ABBDEC;
      text-align: end;
      margin-top: 10px;

    }
  }
`

const StartCellMsgStyle = styled.div`
  &:last-child {
    margin-bottom: 0;
  }

  h2 {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: ${({theme}) => theme.color.whites["300"]};
    margin-bottom: 10px;

    > div {
      margin-left: 10px;
    }
  }

  h3 {
    width: 368px;
    font-size: 12px;
    font-weight: 400;
    color: #999;
    line-height: 14px;
    opacity: 0.8;

  }

  margin-bottom: 19px;
`

const ImageStyle = styled.div`


  display: flex;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: -40px;
`;


const WapStyle = styled.div`
  max-width: 900px;
  width: 100vw;
  border-radius: 5px;
`


const BottomStyle = styled.div`
  padding: 10px 40px 50px 40px;
  box-sizing: border-box;
  background-color: ${({theme}) => theme.bgColor.main};

  a {
    text-decoration: none;
  }
`

const BottomInnerStyle = styled.div`
  background-color: ${({theme}) => theme.color.whites['100']};
  margin-top: 30px;
  padding: 20px;
`
