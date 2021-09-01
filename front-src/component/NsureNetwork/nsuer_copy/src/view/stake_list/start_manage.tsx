import React, {createContext, useCallback, useContext, useState} from 'react';
import styled from 'styled-components';
import {CardStyle} from '../../widget/style/card_style';
import {BorderWidget} from '../../widget/base/border_widget';
import {SpacingWidget} from '../../widget/base/spacing_widget';
import {Grid} from '@material-ui/core';
import {ButtonWidget, TransactionModal, ValueWidget} from "../../widget/base";
import {formatAddress, getBalanceFormat, getBalanceNumber} from "../../utils/formatBalance";
import {StartContext} from "./index";
import {useModel} from "../../hook/use_model";
import {ConvertMoal} from "../../widget/modal/convert_xxx";
import {SignData, useStakeFn, useUnStakeAndWithdraw} from "./fn/unstake";
import {useWeb3} from "../../provider/web3_provider";
import {SendModal} from "../../widget/modal/send_modal";
import {inputMapType} from "../../utils/max";
import {BottomWidget} from "../../widget/stake_list/start_manage/bottom_widget";
import {LineStyle} from "../../widget/style/item_style";
import BigNumber from "bignumber.js";


export const StartManagePage: React.FC = () => {
    const {contrcts} = useWeb3();
    const {staked, pending, reward, withdraw} = useContext(StartContext);

    const [unStake] = useStakeFn();


    const handleWithdraw = useUnStakeAndWithdraw('/stake/withdraw', contrcts.stakeContract.methods.withdraw);

    const [onWithdraw] = useModel(<ConvertMoal
        buttonText={"Withdraw"}
        max={withdraw}
        url={''}
        title={"Withdraw"}
        confirmationFn={handleWithdraw}
    />);

    const handleClaim = useUnStakeAndWithdraw('/stake/claim', contrcts.stakeContract.methods.claim);

    const [onHandleClaim] = useModel(<SendModal confirmationFn={() => handleClaim(reward)}/>);

    const [inputMap, setInputMap] = useState<inputMapType>({});
    const [refresh, setRefresh] = useState(new Date().getTime());
    const [list, setList] = useState([]);

    const onUnStake = useCallback(async () => {
        let _data: any = {};
        list.forEach((ev: any) => {
            _data[ev.product] = getBalanceNumber(ev.amount).toString();
        });
        setInputMap(_data);

        await unStake(_data)

        setInputMap({})
        setRefresh(new Date().getTime());

    }, [list, inputMap, setRefresh]);
    return (
        <StartManage.Provider value={{
            inputMap, setInputMap, refresh, setRefresh, list, setList
        }}>
            <WapStyle>
                <BorderWidget y={20}>
                    <h2>Overview</h2>
                </BorderWidget>
                <SubTitleStyle container>
                    <Grid item md={12} sm={12} xs={12} justify={"space-between"} container>
                        <GridCellWidget >
                            <MsgItemWidgte value={staked} label={"Staking Power Used"}>
                                <ButtonWidget text={"Unstake  All"} onClick={onUnStake} type={"img"}/>
                            </MsgItemWidgte>
                        </GridCellWidget>
                        <Grid item sm={1}>
                            <LineStyle/>
                        </Grid>

                        <GridCellWidget>
                            <MsgItemWidgte value={pending} label={"Lockup Period"}>
                            </MsgItemWidgte>
                        </GridCellWidget>
                        <Grid item sm={1}>
                            <LineStyle/>
                        </Grid>

                        <GridCellWidget >
                            <MsgItemWidgte value={withdraw} label={"Idle"}>
                                <ButtonWidget text={"Withdraw"} onClick={onWithdraw} type={"img"}/>
                            </MsgItemWidgte>
                        </GridCellWidget>
                        <Grid item sm={1}>
                            <LineStyle/>
                        </Grid>

                        <GridCellWidget>
                            <MsgItemWidgte value={reward} display={8} label={"Returns"} unit={'ETH'}>
                                <ButtonWidget text={"Claim"} type={"img"} onClick={onHandleClaim}/>
                            </MsgItemWidgte>
                        </GridCellWidget>
                    </Grid>
                </SubTitleStyle>

            </WapStyle>
            <SpacingWidget/>
            <WapStyle>
                <BottomWidget/>
            </WapStyle>
        </StartManage.Provider>
    );
}

const  GridCellWidget:React.FC = ({children})=>{
    return (
        <Grid item md={2} sm={5} xs={12}>
            {children}
        </Grid>
        );
}

export const StartManage = createContext<ManageInterface>({
    refresh: '',
    setRefresh: () => null,
    inputMap: {},
    setInputMap: () => null,
    setList: () => null,
    list: {},
});

interface ManageInterface {
    refresh: string | number,
    setRefresh: Function,
    inputMap: inputMapType,
    setInputMap: Function,
    list: any,
    setList: (ev: any) => void,

}


const MsgItemWidgte: React.FC<{ label: string, value: number | string, unit?: string, display?: number }> = ({
                                                                                                                 label,
                                                                                                                 value = 0,
                                                                                                                 unit = 'Nsure',
                                                                                                                 display = 2,
                                                                                                                 children
                                                                                                             }) => {
    return (
        <MsgItemStyle>
            <h2>{label}</h2>
            <h3><span>{getBalanceFormat(value, display)} {unit}</span></h3>
            <div className={'button_img'}>
                {children}
            </div>
        </MsgItemStyle>
    );
}

const SubTitleStyle = styled(Grid)`
  //background-image: linear-gradient(to bottom, RGBA(19, 26, 81, 1), RGBA(22, 30, 86, 1)); /* 模拟渐变边框 */

  border: 1px solid ${({theme}) => theme.color.whites["600"]};
  border-top: none;
  border-radius: 0 0 5px 5px;
  padding: 20px 20px;
  >div{
    background-color: ${({theme}) => theme.color.whites["100"]};
    padding: 20px;
    border-radius: 5px;
  }
  //.line{
  //  width: 1px;
  //  height: 60px;
  //  background:  #E2E3E9;
  //}
`
const MsgItemStyle = styled.div`
  text-align: center;

  //border-right: 1px solid rgba(32, 42, 105, 1);

  h2 {
    font-size: 14px;
    //font-weight: 400;
    color: ${({theme}) => theme.color.black["100"]};
    line-height: 18px;
    opacity: 0.6;
  }

  h3 {
    margin-top: 20px;
    font-size: 36px;
    font-weight: 500;
    color: ${({theme}) => theme.color.black["100"]};
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 20px;
      line-height: 1;
    }
  }

  > .button_img {

    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
  }

`


const WapStyle = styled.div`
  ${CardStyle.wap};
  border-radius: 5px;

`
