import {useSignFn} from "../../../utils/sign_v1_fn";
import {useCallback, useContext} from "react";
import {BackdropContext} from "../../../provider/backdrop_provider";
import {HttpServer} from "../../../net/http_server";
import {AppConfig} from "../../../config";
import {useWeb3} from "../../../provider/web3_provider";
import {useStakeUnStalkeAndWithdraw} from "../../../server/stake_server";
import {StartContext} from "../index";


export type SignData =   { [key: string]: number};
export const useStakeFn = () => {
    const signFn = useSignFn();
    const {onPresent, onDismiss} = useContext(BackdropContext);
    let {handleBalance} = useContext(StartContext);

    const handlePostStakeStake = useCallback(async (data: SignData) => {

        onPresent();
        try{
            let params = getParams(data);
            let sign: string = await signFn(params);
            await HttpServer.unstake(sign, params);
            handleBalance();
            onDismiss()
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
            name: 'unStake',
            chainId: AppConfig.chainId,
        },
        message: {
            to: arr
        },
        primaryType: 'unStake',
        types: {
            EIP712Domain: [
                {name: 'name', type: 'string'},
                {name: 'chainId', type: 'uint256'},
            ],
            unStake: [],

        }
    });
}





type methodCB = (amount:string,  v:string, r:string, s:string, deadline:number) => any;

export const useUnStakeAndWithdraw = (url:string,method:methodCB,) => {
    const {contrcts} = useWeb3();
    const [handle] = useStakeUnStalkeAndWithdraw(method);
    const signFn = useSignFn();

    const handleUnStake = useCallback(async (amount: string|number,) => {

        let nonces = await contrcts.stakeContract.methods.nonces(HttpServer.account).call();
        console.log(nonces,'<<<<<----nonces-------------',amount);
        let params = getClaim(HttpServer.account||'',
            0,
            amount.toString(),
            nonces);
        let _sign: string = await signFn(params);
        let sign = await HttpServer.unstakeAndclaimAndwithdraw(url,_sign,params);
        return await handle({...sign,amount:amount.toString()});
    }, [contrcts]);

    return handleUnStake;
}

function getClaim(account: string, currency: number, amount: string, nonce: string): string {

    return JSON.stringify({
        domain: {
            name: 'sign',
            chainId: AppConfig.chainId,
        },
        message: {
            account,
            currency,
            amount: amount.toString(),
            nonce,
            deadline:1607680924304
        },
        primaryType: 'Claim',
        types: {
            EIP712Domain: [
                {name: 'name', type: 'string'},
                {name: 'chainId', type: 'uint256'},
            ],
            Claim:  [
                {
                    name: 'account',
                    type: 'address'
                },
                {
                    name: 'currency',
                    type: 'uint256',
                },
                {
                    name: 'amount',
                    type: 'uint256'
                },
                {
                    name: 'nonce',
                    type: 'uint256'
                },
                {
                    name: 'deadline',
                    type: 'uint256'
                }
            ],

        }
    });
}
