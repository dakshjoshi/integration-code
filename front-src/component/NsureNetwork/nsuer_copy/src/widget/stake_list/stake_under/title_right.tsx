import React, {useCallback, useContext, useMemo} from "react";
import {ApproveButton, BorderWidget} from "../../base";
import styled from "styled-components";
import {WidthStyle} from "../../style/width_style";
import {ListCellWidget, ButtonWidget, SpacingWidget} from "../../base";
import {useModel} from "../../../hook/use_model";
import {ConvertMoal} from "../../modal/convert_xxx";
import {useAllowance,} from "../../../server/token_server";
import {useWeb3} from "../../../provider/web3_provider";
import {useDeposit} from "../../../server/stake_server";
import {StartContext} from "../../../view/stake_list";
import {getBalanceFormat} from "../../../utils/formatBalance";
import {useWallet} from "../../../use_wallet";
import BigNumber from "bignumber.js";

export const TitleRightWidget: React.FC = () => {

    const {tokenMap, contrcts,listToken} = useWeb3();
    let spenderAddress = contrcts.stakeAddress;
    let tokenItem = tokenMap.nsure;
    let {chainId} = useWallet();


    const allowance = useAllowance(tokenItem.contract, spenderAddress); // 检查权限


    const [deposit] = useDeposit();    // 存款

    const [onDeposit] = useModel(<ConvertMoal max={listToken.nsure.toString() || ''}
                                              title={"My Balance"}
                                              url={''}
                                              buttonText={'Deposit'}
                                              confirmationFn={deposit}/>);

    const {balance,locked} = useContext(StartContext);
    return (
        <>
            <BorderWidget y={22}>
                <h2>Holdings</h2>
            </BorderWidget>
            <TitleWap size={{y: 30, x: 20}}>
                <ListCellWidget label={"Wallet Balance"} last={getBalanceFormat(listToken.nsure,2)+" Nsure"}/>
                <ListCellWidget label={"Deposits"} last={getBalanceFormat(new BigNumber(locked).plus(balance),2)+" Nsure"}/>
                <SpacingWidget/>
                {
                    allowance <= 0 ? <ApproveButton contract={tokenItem.contract} contractAddress={tokenItem.address[chainId || 1]} spender={spenderAddress}/> :
                        <ButtonWidget text={"Deposit"} onClick={onDeposit} type={"img"}/>
                }
                <SpacingWidget/>

            </TitleWap>
        </>
    );
}

const TitleWap = styled.div`
  ${WidthStyle.PaddingSize};
`
