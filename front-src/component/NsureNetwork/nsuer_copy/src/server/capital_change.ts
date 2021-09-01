import {useWeb3} from "../provider/web3_provider";
import {useCallback} from "react";
import {Contract} from "web3-eth-contract";
import {useSendFn} from "../utils/web3_send";
import {numberToUint256} from "../utils/formatBalance";
import {ChangeInterFace, TokenInterFace} from "../nuser/token.config";


export const useConvert = (change: ChangeInterFace | null, token: TokenInterFace|null) => {


    const handleSendFn = useSendFn(change?.address);
    const handleConvert = useCallback(async (amount: string) => {
        if (!change) return;
        let method = change.contract.methods.convert(amount);
        let data = await handleSendFn(method, token ? '0' : amount);
        return data.transactionHash
    }, [change]);

    return handleConvert

}


export const useExit = (change: ChangeInterFace | null) => {


    const handleSendFn = useSendFn(change?.address || '');
    const handleExit = useCallback(async (amount: string) => {
        if (change == null) return;
        let method = change.contract.methods.exit(amount);
        let data = await handleSendFn(method);
        return data.transactionHash
    }, [change]);

    return handleExit

}


