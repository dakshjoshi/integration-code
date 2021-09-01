import * as ethUtil from 'ethereumjs-util'
import * as sigUtil from 'eth-sig-util'
import {NetworkContextName, useWallet} from "../use_wallet";
import {useWeb3} from "../provider/web3_provider";
import {useCallback} from "react";
import Web3 from "web3";


export const useV4SignFn = ():(msgData:any) =>Promise<string> => {
    const {account} = useWallet();
    const {web3, walletConnect} = useWeb3()



    const handleFn = useCallback(async (msgData: any) => {
        if(!account || !web3) return ;
        let params = [account, msgData]

        if (walletConnect) {
            console.log('walletConnect');
            let data = await walletConnect.signTypedData(params);
            console.log('TYPED SIGNED:' + JSON.stringify(data))
            const recovered = sigUtil.recoverTypedSignature_v4({data: JSON.parse(msgData), sig: data})
            console.log(ethUtil.toChecksumAddress(recovered), account)
            return data;
        }


        let data = await sendAsync(web3,params,account);
        return  data;
    }, [web3,account])

    return handleFn
}

function sendAsync(web3:Web3,params:any[],account:string):Promise<any>{
    let method = 'eth_signTypedData_v4'

    return new Promise((resolve,reject)=>{
        // @ts-ignore
        web3.currentProvider.sendAsync({
            method,
            params,
            account,
        }, (err: any, result: any) => {
            if (err) return reject(err)
            if (result.error) {
                reject(result.error.message)
            }
            if (result.error) return reject(result, )
            console.log('TYPED SIGNED:' + JSON.stringify(result.result))
            resolve(result.result);
        })
    });
}




