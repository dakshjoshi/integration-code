import {useSendFn} from "../utils/web3_send";
import {useWeb3} from "../provider/web3_provider";
import {useCallback, useEffect, useState} from "react";
import {numberToUint256} from "../utils/formatBalance";
import {useWallet} from "../use_wallet";


export const usePoolsInfo = () => {
    const {contrcts, blockNumber} = useWeb3();
    const [data, setData] = useState({});

    const onPoolInfo = useCallback(async () => {
        if (!contrcts) return;
        let _data0 = await contrcts.capitaStakeContract.methods.poolInfo(0).call();

        setData(_data0)
    }, [contrcts]);
    useEffect(() => {
        onPoolInfo();
    }, [blockNumber]);
    return data;

}

export const useUserInfo = (pid: number) => {
    const {contrcts, blockNumber} = useWeb3();
    const [data, setData] = useState({});
    const {account} = useWallet();

    const onUserInfo = useCallback(async () => {
        let _pending = await contrcts.capitaStakeContract.methods.pendingDuration().call()
        let _data = await contrcts.capitaStakeContract.methods.userInfo(pid, account).call();
        let date = new Date().getTime() - _pending * 60 > _data.pendingAt;
        setData({..._data, pending: date,});
    }, [contrcts, pid]);
    useEffect(() => {
        onUserInfo();
    }, [blockNumber]);
    return data;
}

export const useCapitaStakeDeposit = () => {
    const {contrcts} = useWeb3();
    const handleSendFn = useSendFn(contrcts.capitaStakeAddress);
    const handleDeposit = useCallback(async (allData:any) => {
        let {currency, amount,v,r,s,deadline} = allData
        let method = contrcts.capitaStakeContract.methods.deposit(currency, amount);
        // let method = contrcts.capitaStakeContract.methods.deposit(currency, amount,v,r,s,deadline);
        let data = await handleSendFn(method);
        return data.transactionHash;
    }, [contrcts]);
    return [handleDeposit]
}

export const useClaim = (currency: string) => {
    const {contrcts} = useWeb3();
    const handleSendFn = useSendFn(contrcts.capitaStakeAddress);
    const pid: number = PidMap[currency.toLowerCase()];
    const handleClaim = useCallback(async () => {
        let method = contrcts.capitaStakeContract.methods.claim(pid);
        let data = await handleSendFn(method);
        return data.transactionHash
    }, [contrcts]);

    return handleClaim
}

export const useWithdraw = (currency: string | any) => {
    const {contrcts} = useWeb3();
    const handleSendFn = useSendFn(contrcts.capitaStakeAddress);
    const pid: number = PidMap[currency.toLowerCase()];
    const handleWithdraw = useCallback(async () => {
        let method = contrcts.capitaStakeContract.methods.withdraw(pid);
        let data = await handleSendFn(method);
        return data.transactionHash
    }, [contrcts]);
    return handleWithdraw
}

export const useUnStake = () => {
    const {contrcts} = useWeb3();
    const handleSendFn = useSendFn(contrcts.capitaStakeAddress);
    const handleWithdraw = useCallback(async (allData:any) => {
        let {currency, amount,v,r,s,deadline} = allData
        //let method = contrcts.capitaStakeContract.methods.unstake(currency, numberToUint256(amount).toFixed());
         let method = contrcts.capitaStakeContract.methods.unstake(currency, amount,v,r,s,deadline);
        let data = await handleSendFn(method);
        return data.transactionHash
    }, [contrcts]);
    return handleWithdraw
}


export const useIsPending = (currency:string) => {
    const {contrcts, blockNumber} = useWeb3();
    const {account} = useWallet();
    const [isPending, setIsPending] = useState<{0: boolean,1: number}>({'0':false,'1':0});
    const pid: number = PidMap[currency.toLowerCase()];
    const handleIsPending = useCallback(async () => {
        let data = await contrcts.capitaStakeContract.methods.isPending(pid).call({from:account});
        setIsPending(data);
    }, [contrcts, setIsPending,pid]);
    useEffect(() => {
        handleIsPending()
    }, [blockNumber])
    return isPending
}

export const usePendingNsure = (currency:string) => {
    const {contrcts, blockNumber} = useWeb3();
    const {account} = useWallet();
    const [pendingNsure, setPendingNsure] = useState<{0: boolean,1: number}>({'0':false,'1':0});
    const pid: number = PidMap[currency.toLowerCase()];
    const handleIsPending = useCallback(async () => {
        let pendingNsure = await contrcts.capitaStakeContract.methods.pendingNsure(pid,account).call();
        setPendingNsure(pendingNsure);
    }, [contrcts, pendingNsure,pid]);
    useEffect(() => {
        handleIsPending()
    }, [blockNumber])
    return pendingNsure
}


export const PidMap: { [key: string]: number } = {
    eth: 0,
    usdt: 1,
}

export enum PidEnum {
    ETH,
    USDT,
}
