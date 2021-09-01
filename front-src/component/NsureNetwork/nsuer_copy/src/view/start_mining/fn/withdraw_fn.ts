import {useWeb3} from "../../../provider/web3_provider";
import {useCallback} from "react";
import {HttpServer} from "../../../net/http_server";
import {useUnStake} from "../../../server/capita_stake_server";



export const useUnStakeSing = () => {
    const {contrcts} = useWeb3();
    const face = useUnStake();

    const handleUnStake = useCallback(async (amount: string | number, currency: string | null = null) => {
        let _nonces = await contrcts.capitaStakeContract.methods.nonces(HttpServer.account).call();

        let sign = await HttpServer.capitalUnstake(HttpServer.account || '', _nonces, amount.toString(), currency);
        let data = await face({...sign, amount, currency});

        // console.log(data);
        return data;
    }, [contrcts]);

    return handleUnStake;
}

export const useUnStakeFn = () => {
    const {contrcts} = useWeb3();
    const face = useUnStake();

    const handleUnStake = useCallback(async (amount: string | number, currency: string | null = null) => {
        let _nonces = await contrcts.capitaStakeContract.methods.nonces(HttpServer.account).call();

        // let sign = await HttpServer.unstakeAndclaimAndwithdraw('/capital/unstake', HttpServer.account || '', _nonces, amount.toString(), currency);
        let data = await face({amount, currency});

        // console.log(data);
        return data;
    }, [contrcts]);

    return handleUnStake;
}
