import {AppConfig} from "../../../config";
import {HttpServer} from "../../../net/http_server";
import {AppleDescriptionInterface} from "../../../widget/covers/submit_claim/apple_description";
import {useV4SignFn} from "../../../utils/sign_v4_fn";
import React, {useCallback, useContext} from "react";
import {ClaimServer} from "../../../net/claim_server";
import App from "../../../App";
import {BackdropContext} from "../../../provider/backdrop_provider";
import {ModalContext} from "../../../provider/model_provider";
import {Backdrop, CircularProgress} from "@material-ui/core";
import {ErrWidget} from "../../../widget/modal/transaction_modal";
import {SuccessWidget} from "../../../widget/covers/submit_claim/success_widget";
import {HttpStatus} from "../../../utils/wait_fn";
import {useWeb3} from "../../../provider/web3_provider";


export const useAppleClaimFn = (data: AppleDescriptionInterface) => {
    const signFn = useV4SignFn();
    const {onPresent,onDismiss} = useContext(ModalContext);



    const AppleClaim = useCallback(async () => {

        onPresent(<CircularProgress size={100} color="primary" />)
        try {

            let _msg = appleClaimFn(data);
            let singData = await signFn(_msg);
            // let hax = await ipfs.pinJson({
            //     singData
            // });
            let _claimId = await ClaimServer.claim(singData, _msg)
            //

            onPresent(<SuccessWidget claimId={_claimId} />)

        } catch (err) {
            console.log(err)
                if ( err.code === 4001) {
                    onDismiss()
                    return;
                }
            onPresent(<ErrWidget msg={err.msg} />)

        }



    }, [data, onDismiss,])
    return AppleClaim;
}

export const appleClaimFn = (data: AppleDescriptionInterface): string => {

    return JSON.stringify({
        domain: {
            name: 'place_claim',
            chainId: AppConfig.chainId.toString(),
        },
        message: {
            method: "place_claim",
            content: {
                user_id: HttpServer.account,
                product: data.name,
                cover_hash: data.hash,
                cover_id: data.orderId&&data.orderId.toString(),
                currency: 'ETH',
                amount: data.amount.toString(),
                reward: '10000',
                begin_at: data.date,
                period: data.period,
                cred: data.credentials,
                desc: data.description,
                loss: data.loss,
            }

        },
        primaryType: 'Place',
        types: {
            EIP712Domain: [
                {name: 'name', type: 'string'},
                {name: 'chainId', type: 'uint256'},
            ],
            Place: [
                {name: 'content', type: 'Model'},
                {name: 'method', type: 'string'},
            ],
            Model: [
                {name: 'user_id', type: 'string'},
                {name: 'product', type: 'string'},
                {name: 'cover_hash', type: 'string'},
                {name: 'cover_id', type: 'string'},
                {name: 'currency', type: 'string'},
                {name: 'amount', type: 'string'},
                {name: 'reward', type: 'string'},
                {name: 'begin_at', type: 'string'},
                {name: 'period', type: 'uint256'},
                {name: 'desc', type: 'string'},
                {name: 'cred', type: 'string'},
                {name: 'loss', type: 'string'},
            ],

        }
    });
}
