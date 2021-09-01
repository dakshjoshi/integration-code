import {useCallback, useContext, useState} from "react";
import {BackdropContext} from "../../../provider/backdrop_provider";
import {HttpServer} from "../../../net/http_server";
import {useWait} from "../../../utils/wait_fn";
import {useWeb3} from "../../../provider/web3_provider";
import {numberToUint256} from "../../../utils/formatBalance";
import {PidMap} from "../../../server/capita_stake_server";
import {AppConfig} from "../../../config";
import {useSignFn} from "../../../utils/sign_v1_fn";
import BigNumber from "bignumber.js";
import useWallet from "../../../use_wallet";


export const useCoverSignFn = () => {
    const {onPresent, onDismiss} = useContext(BackdropContext);
    const {account} = useWallet();
    const {contrcts} = useWeb3();
    const _signFn = useSignFn();

    const facehBacl = useCallback(async (data: any) => {
        try {
            onPresent();
            const {age, days, address, amount,inviter} = data;

            const none = await contrcts.buyContract.methods.nonces(account).call();
            let params = getParams(account || '', PidMap[age.toLowerCase()], numberToUint256(amount), days, address, none,);
            let sign: string = await _signFn(params);


            let singData = await HttpServer.sign(sign, params,inviter);
            onDismiss()
            return singData;
        } catch (e) {
            onDismiss()
            throw e
        }


    }, [onPresent, onDismiss, account, contrcts]);
    return [facehBacl];
}


function getParams(account: string, type: number, amount: BigNumber, period: number, product: string, nonce: string): string {

    return JSON.stringify({
        domain: {
            name: 'sign',
            chainId: AppConfig.chainId,
        },
        message: {
            account,
            currencyType:type,
            amount: amount.toString(),
            cost: amount.toString(),
            period,
            product,
            nonce,
            deadline:1607680924304
        },
        primaryType: 'sign',
        types: {
            EIP712Domain: [
                {name: 'name', type: 'string'},
                {name: 'chainId', type: 'uint256'},
            ],
            sign: [
                {
                    name: 'product',
                    type: 'uint256'
                },
                {
                    name: 'account',
                    type: 'address'
                },
                {
                    name: 'amount',
                    type: 'uint256'
                },
                {
                    name: 'cost',
                    type: 'uint256'
                },
                {
                    name: 'currencyType',
                    type: 'uint256'
                },
                {
                    name: 'period',
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
