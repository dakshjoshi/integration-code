import {ChangeInterFace, TokenInterFace} from "../nuser/token.config";
import {useWallet} from "../use_wallet";
import {useCallback, useEffect, useMemo, useState} from "react";
import {ethers} from 'ethers'
import {useSendFn} from "../utils/web3_send";
import {useWeb3} from "../provider/web3_provider";
import {Contract} from "web3-eth-contract";


export const useApprove = (contract: Contract,contractAddress:string,spender:string) => {
    const handleSendFn = useSendFn(contractAddress);
    const handleApprove = useCallback(async () => {
        try{
            let method = contract.methods.approve(spender, ethers.constants.MaxUint256,);

            let data = await handleSendFn(method);

            return data.transactionHash;
        }catch (e){
            console.log(e);
            throw e
        }
    }, [contract, spender,contractAddress]);
    return [handleApprove];
}



export const useAllowance = (ERC20: Contract | undefined,spender:string) =>{
    const [allowance, setAllowance] = useState(0);
    const {account,} = useWallet();
    const {blockNumber} =useWeb3();
    const fetchAllowance = useCallback(async () => {
        if(!ERC20) return;
        const allowance = await ERC20.methods
            .allowance(account, spender)
            .call();
        setAllowance(allowance)
    }, [account, ERC20,spender]);

    useEffect(() => {
        fetchAllowance();
    }, [blockNumber,ERC20]);
    return allowance;
}


