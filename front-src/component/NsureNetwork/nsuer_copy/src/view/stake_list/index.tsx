import React, {createContext, useEffect, useState} from "react";
import {BorderWidget, ButtonWidget, NavHeaderWidget, SpacingWidget} from "../../widget/base";
import {Redirect, Route, Switch} from "react-router-dom";
import {StartUnderwritingPage} from "./start_underwriting";
import {StartManagePage} from "./start_manage";
import {useWeb3} from "../../provider/web3_provider";
import {useStakeBalanceHttp} from "./fn/stake_balance";


export const StartListPage: React.FC = () => {


    const allItem = useStakeBalanceHttp()
    const {blockNumber} = useWeb3();

    useEffect(() => {
        allItem.handleBalance();
    }, [blockNumber])

    return (
        // <DevModal>
        <StartContext.Provider value={allItem}>
            <div style={{background: "#fff"}}>
                <BorderWidget x={0} y={0} boxShadow={false}>
                    <NavHeaderWidget listNav={
                        [
                            {to: '/start_list/underwriting/', text: 'Start Underwriting'},
                            {to: '/start_list/portfolio', text: 'My Portfolio'},
                            {to: 'asd', dev: true, text: 'Syndicate'}
                        ]
                    }/>

                </BorderWidget>
            </div>
            <SpacingWidget/>


            <Switch>
                <Route path="/start_list/underwriting" exact component={StartUnderwritingPage}/>
                <Route path="/start_list/portfolio" exact component={StartManagePage}/>
                <Redirect to="/start_list/underwriting/"/>
            </Switch>


        </StartContext.Provider>
        // </DevModal>
    );
}


export const StartContext = createContext<StartInterface>({
    leverage: "", reward: "", staked: "", apy: "",
    handleBalance: () => Promise.resolve(undefined),
    balance: '',
    locked: '',
    withdraw: '',
    powerLeft: '',
    pending: ''
});

interface StartInterface {
    leverage: string,
    reward: string,
    apy: string,
    staked: string,
    withdraw: string,
    locked: string,
    balance: string,
    powerLeft: string,
    pending: string,
    handleBalance: () => Promise<any>
}
