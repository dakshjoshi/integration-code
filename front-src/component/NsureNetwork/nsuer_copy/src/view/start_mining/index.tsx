import React, {createContext, useEffect, useMemo} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {ChoosePages} from "./choose_page";
import {StakeToMine} from "./stake_to_mine";
import {BorderWidget, NavHeaderWidget, SpacingWidget} from "../../widget/base";
import {StartPage} from "./start_page";
import {WithdrawPage} from "./withdraw_page";
import {ConvertCardInterface} from "../../interface/start_mining";
import {useWeb3} from "../../provider/web3_provider";
import usdt from "../../assets/imgs/usdt.png"
import eth from "../../assets/imgs/eth.png"
import btc from "../../assets/imgs/btc.png"
import {useWait} from "../../utils/wait_fn";
import {HttpServer} from "../../net/http_server";
import {USDT} from "../../nuser/token.config";

export const StartMiningPage: React.FC = () => {
    const {changeMap} = useWeb3();
    const estimatedThreeApr = useWait<threeApr>(HttpServer.estimatedThreeApr);
    const listModel: ConvertCardInterface[] = useMemo(() => {
        return [
            {
                bgColor: "#3881e2",
                url: eth,
                total: "1,564.25 nETH",
                poolMCR: "130%",
                nick: "ETH",
                myStaked: "11.2 nETH",
                cardModel: {},
                changeContract: changeMap['ethChangeContract'],
                tokenContract: null,
                rewardUnit: 'Nsure'
            },
            {
                bgColor: "#e33fad",
                url: usdt,
                total: "0 nUSD",
                poolMCR: "0%",
                nick: USDT,
                myStaked: "0 nUSDT",
                cardModel: {},
                changeContract: null,
                tokenContract: null,
                // changeContract:changeMap['usdtChangeContract'],
                // tokenContract:tokenMap[USDT],


            },
            {
                bgColor: "#3881e2",
                url: btc,
                total: "0 nBTC",
                poolMCR: "0%",
                nick: "BTC",
                myStaked: "0 nBTC",
                cardModel: {},
                changeContract: null,
                tokenContract: null,

            }
        ];
    }, []);


    const {request, data} = useWait(HttpServer.mcr);
    useEffect(() => {
        request('').then();
        estimatedThreeApr.request('').then()
    }, [])
    return (

        <StartMiningContext.Provider value={{listModel, mcr: data,estimatedThreeApr:estimatedThreeApr.data}}>
            <div style={{background: "#fff"}}>
                <BorderWidget x={0} y={0} boxShadow={false}>
                    <NavHeaderWidget listNav={[
                        {to: '/start_mining/stake_to_mine/start', text: 'Start Mining'},
                        {to: '/start_mining/stake_to_mine/dashboard', text: 'Dashboard'},
                        {to: '/start_mining/stake_to_mine/withdraw', text: 'Withdraw'},
                    ]}/>
                </BorderWidget>
            </div>


            <SpacingWidget/>

            <Switch>
                <Route path="/start_mining/stake_to_mine/start" exact component={ChoosePages}/>
                <Route path="/start_mining/stake_to_mine/dashboard" exact component={StartPage}/>
                <Route path="/start_mining/stake_to_mine/withdraw" exact component={WithdrawPage}/>
                <Redirect to="/start_mining/stake_to_mine/start"/>
            </Switch>

        </StartMiningContext.Provider>
    );
}

export const StartMiningContext = createContext<StartMiningInterface>({
    listModel: [],
    mcr: {mcr: 0},
    estimatedThreeApr: {
        averagePremiumReturn: 0,
        capital: 0,
        policy: 0,
        underwrite: 0,
    }
});

interface StartMiningInterface {
    listModel: ConvertCardInterface[];
    mcr: { mcr: number },
    estimatedThreeApr: threeApr
}

type threeApr = { capital: number,averagePremiumReturn:number, policy: number, underwrite: number }


