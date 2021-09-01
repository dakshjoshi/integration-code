import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {WidthStyle} from "../../style/width_style";
import {Grid} from "@material-ui/core";
import {BgWidget} from "./bg_widget";
import {ItemStyles} from "../../style/item_style";
import {StartMiningContext} from "../../../view/start_mining";
import {useWeb3} from "../../../provider/web3_provider";
import {getBalanceFormat, getBalanceNumber} from "../../../utils/formatBalance";
import {ValueWidget} from "../../base";
import BigNumber from "bignumber.js";
import {ConvertCardInterface} from "../../../interface/start_mining";
import {useWait} from "../../../utils/wait_fn";
import {HttpServer} from "../../../net/http_server";


export const StakeCenterWidget: React.FC = () => {
    const {listModel,} = useContext(StartMiningContext);
    let modelCell: ConvertCardInterface = listModel[0];
    const {usd, nsureToUsd} = useWeb3();

    const {
        request,
        data
    } = useWait<{ capital: number, policy: number, underwrite: number }>(HttpServer.estimatedThreeApr);




    useEffect(() => {
        request('');
    }, [])


    return (
        <StakeCenterStyle size={{all: 30}}>
            <Grid container alignItems={"center"} spacing={2}>
                <Grid item md={8} sm={12} xs={12}>
                    <BgWidget>
                        <Grid container alignItems={"center"}>
                            <Grid item xs={12} sm={5} md={5}>
                                <ItemStyle>
                                    <h3>Capital Pool TVL </h3>
                                    <h4>
                                        $ <ValueWidget
                                        decimals={3}
                                        value={getBalanceNumber(modelCell?.cardModel?.trueBalance || '') * usd}
                                    />
                                    </h4>
                                </ItemStyle>

                            </Grid>
                            <div className={'line'}/>
                            <Grid item xs={12} md={6} sm={6}>
                                <ItemStyle>
                                    <h3>Estimated APR</h3>
                                    <h4>
                                        {modelCell?.cardModel?.apy} %
                                    </h4>
                                </ItemStyle>

                            </Grid>
                        </Grid>

                    </BgWidget>
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                    <RightMsgStyle>- Mint conditions: 1.8 NSURE/Block</RightMsgStyle>
                    <RightMsgStyle>- Deposited assets will be locked for 14 days</RightMsgStyle>
                    <RightMsgStyle>- Rewards in Nsure are redeemable anytime</RightMsgStyle>
                </Grid>
            </Grid>
        </StakeCenterStyle>
    );
}


const StakeCenterStyle = styled.div`
  ${WidthStyle.PaddingSize}
`


const ItemStyle = styled.div`
  ${ItemStyles.upDown}
  h4 {
    display: flex;
    justify-content: center;
    color: ${({theme})=>theme.color.black['100']};
  }
`

const RightMsgStyle = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${({theme})=>theme.color.whites['800']};
  
`

