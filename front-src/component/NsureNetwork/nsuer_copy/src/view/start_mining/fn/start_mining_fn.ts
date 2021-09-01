import {useWeb3} from "../../../provider/web3_provider";
import {useCallback} from "react";
import {HttpServer} from "../../../net/http_server";
import {useCapitaStakeDeposit, useUnStake} from "../../../server/capita_stake_server";



export const useDeposit = () => {
    const {contrcts} = useWeb3();
    const [face] = useCapitaStakeDeposit();

    const handleUnStake = useCallback(async (amount: string, currency: number) => {
        let _nonces = await contrcts.capitaStakeContract.methods.nonces(HttpServer.account).call();
        console.log(_nonces, '<<<<<----nonces-------------', amount);
        let data = await face({amount, currency});
        // let sign = await HttpServer.unstakeAndclaimAndwithdraw('/capital/deposit', HttpServer.account || '', _nonces, amount.toString(), currency.toString());
        // let data = await face({...sign, amount, currency});

        // console.log(data);
        return data;
    }, [contrcts]);

    return handleUnStake;
}
