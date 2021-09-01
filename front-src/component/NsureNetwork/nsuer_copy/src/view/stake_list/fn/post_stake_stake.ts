import {AppConfig} from "../../../config";
import {useSignFn} from "../../../utils/sign_v1_fn";
import {useCallback, useContext} from "react";
import {BackdropContext} from "../../../provider/backdrop_provider";
import {HttpServer} from "../../../net/http_server";
import {StartContext} from "../index";


export const usePostStakeStake = () => {
    const signFn = useSignFn();
    const {onPresent, onDismiss} = useContext(BackdropContext);
    let {handleBalance} = useContext(StartContext);

    const handlePostStakeStake = useCallback(async (data: { [key: string]: number},rec:any) => {

        onPresent();
        try{
            let params = getParams(data);
            let sign: string = await signFn(params);
            await HttpServer.stake(sign, params);
            rec();
            await handleBalance();
            onDismiss();
            return true;
        }catch (e) {
            onDismiss()
        }


    }, [onPresent, onDismiss]);

    return [handlePostStakeStake]
}


function getParams(data: any): string {
    let arr = [];
    for (let key in data) {
        arr.push({
            products: key,
            amounts: data[key] * 1e18
        });
    }
    return JSON.stringify({
        domain: {
            name: 'Stake',
            chainId: AppConfig.chainId,
        },
        message: {
            to: arr
        },
        primaryType: 'Stake',
        types: {
            EIP712Domain: [
                {name: 'name', type: 'string'},
                {name: 'chainId', type: 'uint256'},
            ],
            Stake: [],

        }
    });
}
