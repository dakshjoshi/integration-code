import {Contract} from "web3-eth-contract";
import {useCallback, useEffect, useState} from "react";
import {useWallet} from "../use_wallet";
import {useWeb3} from "../provider/web3_provider";
import {useSendFn} from "../utils/web3_send";
import {AirDropObject} from "../hook/use_airdrop";

export const useClaim = () => {
    const {account,} = useWallet();
    const {contrcts} = useWeb3();
    const sendFn = useSendFn(contrcts.airdropAddress);
    const fetchClaim = useCallback(async (model: AirDropObject,) => {

        let method = contrcts.airdropContract.methods.claim(
            model.index,
            account,
            model.amount.toString(),
            model.proofs.map((ev) => ev.proof)
        );
        let _hax = await sendFn(method)
        return _hax.transactionHash

    }, [account,]);


    return fetchClaim;
}

