import React from "react";
import {Route, Switch,Redirect} from "react-router-dom";
import {BuyCoversPage} from "./buy_covres";
import {MyCoversPage} from "./my_covres";
import {AveragePremiumPage} from "./average_premium";
import {SubMitClaimPage} from "./submit_claim";

import {DevModal} from "../../widget/modal/dev_modal";

export const CoversPage:React.FC = () =>{
    return (
        <DevModal>
            <Switch>
                <Route path="/cover/my" exact component={MyCoversPage} />
                <Route path="/cover/all"  component={BuyCoversPage} />
                <Route path="/cover/average_premium/:id"  component={AveragePremiumPage} />
                <Route path="/cover/sub_mit_claim_page"  component={SubMitClaimPage} />
                <Redirect to="/cover/my" />
            </Switch>
        </DevModal>

    );
}


