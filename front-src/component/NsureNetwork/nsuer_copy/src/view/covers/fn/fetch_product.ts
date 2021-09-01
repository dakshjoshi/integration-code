import {useCallback, useContext, useState} from "react";
import {BackdropContext} from "../../../provider/backdrop_provider";
import {HttpServer} from "../../../net/http_server";
import {useWait} from "../../../utils/wait_fn";
import {useWallet} from "../../../use_wallet";
import {useWeb3} from "../../../provider/web3_provider";
import {numberToUint256} from "../../../utils/formatBalance";


export const useProduct = () =>{
    const {onPresent,onDismiss} = useContext(BackdropContext);
    const {account} = useWallet();
    const {contrcts} = useWeb3();

    const facehProduct = useCallback(async (data:number)=>{
        try{
            onPresent();
            let singData = await  HttpServer.averProduct(data);
            onDismiss()
            return singData;
        }catch (e) {
            onDismiss()
            throw e
        }


    },[onPresent,onDismiss,account,contrcts]);
    return [facehProduct];
}
