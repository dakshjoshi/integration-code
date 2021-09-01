import {useWeb3} from "../provider/web3_provider";
import {useCallback, useContext, useState} from "react";
import {useWallet} from "../use_wallet";
import {useSendFn} from "../utils/web3_send";
import {numberToUint256} from "../utils/formatBalance";
import {StartContext} from "../view/stake_list";
import {HttpServer} from "../net/http_server";


export const useStakeBalance = () => {
    const {contrcts} = useWeb3();
    const {account} = useWallet();
    const [balance, setBalance] = useState(0);

    const balanceFn = useCallback(async () => {
        let data = await contrcts.stakeContract.methods.balanceOf(account).call();
        // let data = 0
        setBalance(data);
        return data;
    }, [setBalance, contrcts, account]);
    return {balance, balanceFn}
}


export const useDeposit = () => {
    const {contrcts} = useWeb3();
    const handleSendFn = useSendFn(contrcts.stakeAddress);
    const {handleBalance} = useContext(StartContext);

    const handleDeposit = useCallback(async (amount: string) => {
        try {


            let deposit = contrcts.stakeContract.methods.deposit(amount.toString());
            let data = await handleSendFn(deposit);
            handleBalance();
            return data.transactionHash;
        } catch (e) {
            throw e
        }
    }, [contrcts]);
    return [handleDeposit];
}


export const useStakeUnStalkeAndWithdraw = (methodCB: (amount: string, v: string, r: string, s: string, deadline: number) => any) => {
    const {contrcts, web3} = useWeb3();
    const handleSendFn = useSendFn(contrcts.stakeAddress);
    const handleUnStake = useCallback(async (data: any) => {
        let {amount, v, r, s, deadline, currency} = data;
        let method;
        if (currency != null) {

            method = contrcts.stakeContract.methods.claim(
                amount,
                currency,
                deadline,
                v,
                r,
                s)
        } else {

            method = methodCB(
                amount,
                deadline,
                v,
                r,
                s,
            )
        }
        let txHash = await handleSendFn(method);
        return txHash.transactionHash
    }, [
        contrcts,
        HttpServer.account,
        web3
    ])
    return [handleUnStake]
}

export const useStakeWithdraw = () => {
    const {contrcts, web3} = useWeb3();
    const handleSendFn = useSendFn(contrcts.stakeAddress);
    const handleUnStake = useCallback(async (data: any) => {
        let {amount, v, r, s, deadline} = data;
        let method = contrcts.stakeContract.methods.withdraw(
            amount,
            deadline,
            v,
            r,
            s,
        );
        let txHash = await handleSendFn(method);
        return txHash.transactionHash
    }, [
        contrcts,
        HttpServer.account,
        web3
    ])
    return [handleUnStake]
}
