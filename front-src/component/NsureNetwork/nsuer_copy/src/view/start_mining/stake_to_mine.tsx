import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import {StartPage} from "./start_page";
import {NavHeaderWidget, SpacingWidget} from "../../widget/base";
import {WithdrawPage} from "./withdraw_page";
import {ChoosePages} from "./choose_page";


export const StakeToMine: React.FC = () => {
    return (
        <div>
            <NavHeaderWidget listNav={[
                {to: '/start_mining/stake_to_mine/start', text: 'Start Mining'},
                {to: '/start_mining/stake_to_mine/dashboard', text: 'Dashboard'},
                {to: '/start_mining/stake_to_mine/withdraw', text: 'Withdraw'},
            ]}/>
            <SpacingWidget/>
            <Switch>
                <Route path="/start_mining/stake_to_mine/start" exact component={ChoosePages}/>
                <Route path="/start_mining/stake_to_mine/dashboard" exact component={StartPage}/>
                <Route path="/start_mining/stake_to_mine/withdraw" exact component={WithdrawPage}/>
                <Redirect to="/start_mining/stake_to_mine/start"/>
            </Switch>
        </div>
    );
}
