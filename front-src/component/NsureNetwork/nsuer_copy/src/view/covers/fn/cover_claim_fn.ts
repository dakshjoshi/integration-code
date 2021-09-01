import React, {useCallback, useContext, useState} from "react";
import {HttpServer} from "../../../net/http_server";
import {useWallet} from "../../../use_wallet";
import {useWeb3} from "../../../provider/web3_provider";
import {useSendFn} from "../../../utils/web3_send";
import BigNumber from "bignumber.js";
import {AppConfig} from "../../../config";
import {useSignFn} from "../../../utils/sign_v1_fn";


export const useCoverClaimFn = () => {
    const {account} = useWallet();
    const {contrcts} = useWeb3();
    const handleSendFn = useSendFn(contrcts.claimPurchaseMintAddress);
    const _signFn = useSignFn();


    const facehCoverClaim = useCallback(async (amount:string) => {
        try {
            if(!account) return;
            const none = await contrcts.claimPurchaseMintContract.methods.nonces(account).call();
            let _params =  getParams(account,none);
            let _hax = await _signFn(_params)
            let {deadline, r, s, v,reward} = await HttpServer.coverClaim(_hax,_params);
            let method = contrcts.claimPurchaseMintContract.methods.claim(reward,deadline,v,r,s);
            let data = await handleSendFn(method);
            return data.transactionHash;
        } catch (e) {
            throw e
        }


    }, [account, contrcts]);
    return [facehCoverClaim];
}


function getParams(account: string,  nonce: string): string {

    return JSON.stringify({
        domain: {
            name: 'sign',
            chainId: AppConfig.chainId,
        },
        message: {
            account,
            amount: 0,
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
                    name: 'account',
                    type: 'address'
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
