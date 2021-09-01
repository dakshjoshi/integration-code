import styled from "styled-components";
import {WidthStyle} from "../../style/width_style";
import React from "react";
import {NsuerStakingModel} from "../../../interface/covers_interface";
import BgDian from '../../../assets/imgs/bg_dian.png'

import {Grid} from '@material-ui/core';
import {CardStyle} from "../../style/card_style";
import {SpacingWidget, ValueWidget} from "../../base";
import {useWeb3} from "../../../provider/web3_provider";
import {getBalanceNumber} from "../../../utils/formatBalance";
import {black} from "../../../theme/colors";


export const NsuerStakingWidget: React.FC<{ data: any }> = ({data}) => {
    const {usd, nsureToUsd} = useWeb3();
    return (

        <NsureWapStyle size={{all: 30}} bgColor={'#EFEFF6'}>
            <div className={'border'}>
                <div>
                    <Grid container>

                        <Grid item xs={12} sm={3}>
                            <NsureStakingCellWidget model={{
                                decimals: 2,
                                titleContent: getBalanceNumber(data.totalValueInPools * usd),
                                title: 'Total Capital Pool Support',
                                titleUnit: ' USD',
                                subTitle: '',
                                subContent: '',
                                subUnit: ''
                            }}/>
                        </Grid>
                        <Grid item sm={1}>
                            <LineStyle/>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <NsureStakingCellWidget model={{
                                decimals: 2,

                                titleContent: getBalanceNumber(data.activityAmount),
                                title: 'Active Policy Value',
                                titleUnit: ' USD',
                                subTitle: 'Total Policy Value Sold',
                                subContent: getBalanceNumber(data.soldAmount),
                                subUnit: ' USD'
                            }}/>
                        </Grid>
                        <Grid item sm={1}>
                            <LineStyle/>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <NsureStakingCellWidget model={{
                                decimals: 0,
                                titleContent: data.activityCount,
                                title: 'Active Policies',
                                titleUnit: '',
                                subTitle: 'Total Policies Sold',
                                subContent: data.soldCount,
                                subUnit: ''
                            }}/>
                        </Grid>
                    </Grid>
                </div>

            </div>


        </NsureWapStyle>
    )
}
const NsureWapStyle = styled.div<{ size: { x?: number, y?: number, all?: number }, bgColor: string }>`
  ${WidthStyle.PaddingSize};

  .MuiGrid-container {
    ${WidthStyle.PaddingSize};
  }

  .border {
    ${CardStyle.BorderTwoStyle};

    > div {
        //background-image: url(${BgDian});
    }
  }
`;


const NsureStakingCellWidget: React.FC<{ model: NsuerStakingModel }> = ({model}) => {
    return (
        <NsureStakingCellStyle>
            <h2>{model.title}</h2>
            <h3><ValueWidget value={model.titleContent} decimals={model.decimals}/><p> {model.titleUnit}</p></h3>
            {model.subTitle ? <h4>{model.subTitle}</h4> : null}
            {model.subTitle ? <h5><ValueWidget value={model.subContent}/><span>{model.subUnit}</span></h5> : null}
        </NsureStakingCellStyle>
    )
}


const NsureStakingCellStyle = styled.div`
  display: flex;
  flex-flow: column;

  align-items: center;
  flex: 1;
  justify-content: center;
  height: 100%;

  h2 {
    font-size: 18px;
    font-weight: 400;
    color: ${({theme}) => theme.color.black[100]};
    margin-bottom: 10px;
  }

  h3 {
    font-size: 36px;
    font-weight: 500;
    line-height: 1;
    color: ${({theme}) => theme.color.black[100]};

    margin-bottom: 5px;
    display: flex;
    align-content: center;
    align-items: baseline;

    p {
      font-size: 20px;
      margin-left: 5px;

    }
  }

  h4 {
    font-size: 14px;
    font-weight: 400;
    color: ${({theme}) => theme.color.black[200]};

    line-height: 18px;
    margin-top: 10px;
  }

  h5 {
    display: flex;
    height: 15px;
    font-size: 16px;
    font-weight: 400;
    color: ${({theme}) => theme.color.black[100]};

    span {
      display: block;
      margin-left: 3px;
    }
  }
`


const LineStyle = styled.div`
  width: 1px;
  height: 117px;
  background: #E2E3E9;
  margin: 0 auto;

  @media (max-width: 600px) {
    height: 30px;
    background: transparent;
  }

`
