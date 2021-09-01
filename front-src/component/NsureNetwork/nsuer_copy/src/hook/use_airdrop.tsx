import React, {useCallback, useContext} from "react";
import {ModalContext} from "../provider/model_provider";
import {AirdropModel} from "../widget/modal/airdrop_model";
import {HttpStatus} from "../utils/wait_fn";
import {HttpServer} from "../net/http_server";
import {CircularProgress} from "@material-ui/core";
import {AppConfig} from "../config";

export const useAirDropFn = () => {
    const {onPresent} = useContext(ModalContext);
    const onAir = useCallback(async () => {
        onPresent(<CircularProgress size={100} color="primary"/>);
        // if(AppConfig.comingSoon){
        //     await onPresent(<AirdropModel model={{
        //         amount:0,
        //         index:0,
        //         proofs:[]
        //     }}/>)
        //     return;
        // }
        let data:any = await HttpServer.airdrop();
        await onPresent(<AirdropModel model={data}/>)
    }, []);

    return onAir;
}

export interface AirDropObject {
    amount: number;
    index: number;
    proofs: Proof[];
}

export interface Proof {
    proof: string;
}
