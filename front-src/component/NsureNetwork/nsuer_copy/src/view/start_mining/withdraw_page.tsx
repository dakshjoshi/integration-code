import React, {useCallback, useContext, useEffect} from "react";
import styled from "styled-components";
import {DateUtils} from "../../utils/date";
import {BorderWidget, ButtonWidget, InputWidget, SpacingWidget} from "../../widget/base";
import {BgWidget} from "../../widget/start_mining/stake_to_mine/bg_widget";
import {ItemStyles} from "../../widget/style/item_style";
import {WidthStyle} from "../../widget/style/width_style";
import {CardStyle} from "../../widget/style/card_style";
import {useModel} from "../../hook/use_model";
import {ConvertMoal} from "../../widget/modal/convert_xxx";
import {PidEnum, PidMap} from "../../server/capita_stake_server";
import {formatAddress, getBalanceNumber} from "../../utils/formatBalance";
import {SearchListWidget} from "../../widget/search_list/search_list";
import {StartMiningContext} from "./index";
import {useCardFn} from "./fn/card_fn";
import {useExit} from "../../server/capital_change";
import {OnWidthdraw} from "../../widget/start_mining/withdraw/on_withdraw";
import {Grid} from "@material-ui/core";
import {useUnStakeSing} from "./fn/withdraw_fn";
import {black} from "../../theme/colors";
import {useAirDropFn} from "../../hook/use_airdrop";


export const WithdrawPage: React.FC = () => {


    const {listModel,} = useContext(StartMiningContext);
    const [age] = React.useState('ETH');
    const [model, setModel] = React.useState(listModel[0]);


    const handleExit = useExit(model.changeContract);
    const {balance, amount, pendingWithdrawal} = useCardFn(model);


    const handleUnStake = useUnStakeSing();


    const [onUnStake] = useModel(
        <ConvertMoal title={'UnStake'}
                     url={''}
                     max={amount}
                     buttonText={"UnStake"}
                     confirmationFn={(ev) => {
                         return handleUnStake(ev.toString(), PidMap[age.toLowerCase()].toString());
                     }}/>
    );
    const [onExit] = useModel(
        <ConvertMoal title={'Convert'}
                     url={''}
                     max={balance}
                     buttonText={"Convert"}
                     confirmationFn={(ev) => {
                         return handleExit(ev);
                     }}/>
    );


    useEffect(() => {
        setModel(listModel[PidMap[age.toLowerCase()]])
    }, [age])


    return (
        <div>
            <WithdrawStyle>
                <BgWidgetStyle size={{all: 30}}>
                    {/*<SimpleListMenu age={age} setAge={setAge}/>*/}

                    <BgWidget>
                        <Grid container justify={"space-between"} alignItems={"center"}>
                            <Grid item md={3} sm={12} xs={12}>
                                <ItemStyle>
                                    <h3>Total nETH Locked</h3>
                                    <h4>{getBalanceNumber(amount)}</h4>
                                    <div>
                                        <ButtonWidget text={"Unstake"} onClick={onUnStake} type={"submit"}/>
                                    </div>
                                </ItemStyle>
                            </Grid>
                            <div className={'line'}/>

                            <Grid item md={4} sm={12} xs={12}>
                                <ItemStyle>
                                    <h3>Total nETH Available for Withdraw</h3>
                                    <h4>{getBalanceNumber(pendingWithdrawal)}</h4>
                                    <div>
                                        <OnWidthdraw pendingWithdrawal={pendingWithdrawal}
                                                     nick={model.nick.toUpperCase()}/>
                                    </div>
                                </ItemStyle>

                            </Grid>

                            <div className={'line'}/>
                            <Grid item md={3} sm={12} xs={12}>
                                <ItemStyle>
                                    <h3>Total nETH Available for Convert</h3>
                                    <h4>{getBalanceNumber(balance)}</h4>
                                    <div>
                                        <ButtonWidget text={"Convert"} onClick={onExit} type={"submit"}/>
                                    </div>
                                </ItemStyle>
                            </Grid>
                        </Grid>


                    </BgWidget>
                </BgWidgetStyle>


            </WithdrawStyle>
            <SpacingWidget/>
            <WithdrawStyle>
                <MyListWidget/>
            </WithdrawStyle>

        </div>

    )
}


const MyListWidget: React.FC = () => {
    const structureFn = useCallback((ev: any): Array<any> => {
        return [
            {
                inner: ev._id,
                color: black['300'],

            },
            {
                inner: DateUtils.dataString(ev.createdAt),
                color: black['300'],

            },
            {
                color: black['300'],

                inner: getBalanceNumber(ev.amount) + ' n' + PidEnum[ev.currency],
            },
            {
                inner: PidEnum[ev.currency],
                color: black['300'],

            },
            {
                inner: WithdrawEnum[ev.status],
                color: black['300'],

            },
        ];
    }, []);

    return (
        <>
            <SearchListWidget isShowHeader={false}
                              params={{"currency": "0",}}
                              url={'/capital/user-list'}
                              isShowPagination={true}
                              structure={structureFn}>
                <div>ID</div>
                <div>Time</div>
                <div>Amount</div>
                <div className={'start'}>Pool</div>
                <div className={'start'}>Action</div>
            </SearchListWidget>
        </>
    );
}

enum WithdrawEnum {
    Stake,
    Withdraw,
    Unstake,
}


const BgWidgetStyle = styled.div`
  ${WidthStyle.PaddingSize}
`

const ItemStyle = styled.div`
  ${ItemStyles.upDown};

  > div {
    width: 30%;
    margin: 10px auto 0 auto;
  }
`


const WithdrawStyle = styled.div`
  ${CardStyle.wap}
`
