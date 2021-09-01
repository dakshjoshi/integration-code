import {useStakeBalance} from "../../../server/stake_server";
import {useCallback, useEffect, useState} from "react";
import {useWeb3} from "../../../provider/web3_provider";
import {HttpServer} from "../../../net/http_server";
import {useWallet} from "../../../use_wallet";

export const useStakeBalanceHttp = () => {
    const {balanceFn} = useStakeBalance();
    const {account} = useWallet();
     const [res,setRes] = useState<any>({});

    const handleBalance = useCallback(async ()=>{
        if(account){
            let balance = await balanceFn();

            let data:any = await HttpServer.stakeBalance(balance);

            setRes(data);
        }
    },[account,setRes]);



    return {handleBalance,...res}
}
