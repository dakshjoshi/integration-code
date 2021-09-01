import {useWeb3} from "../provider/web3_provider";

import {useSendFn} from "../utils/web3_send";
import {useCallback} from "react";
import {HttpServer} from "../net/http_server";
import {numberToUint256} from "../utils/formatBalance";
import { SignFnface} from "../widget/covers/average/cover_model";
import {PidMap} from "./capita_stake_server";


export const useBuyInsurance = () => {
    const {contrcts, web3} = useWeb3();
    const handleSendFn = useSendFn(contrcts.buyAddress);
    const facethBack = useCallback(async (data: SignFnface) => {
        let {id, cover, cost, days,unit, v, r, s, deadline} = data;
        let  _cost = numberToUint256(cost).toFixed(0);
        let method = contrcts.buyContract.methods.buyInsurance(
            id,
            numberToUint256(cover).toFixed(),
            _cost,
            days,
            v.toString(),
            r,
            s,
            deadline,
            PidMap[unit.toLowerCase()],
        );
        let txHash = await handleSendFn(method, _cost);
        return txHash.transactionHash
    }, [
        contrcts,
        HttpServer.account,
        web3
    ])
    return [facethBack]
}
