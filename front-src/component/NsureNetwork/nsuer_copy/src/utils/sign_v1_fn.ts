import * as ethUtil from 'ethereumjs-util'
import * as sigUtil from 'eth-sig-util'
import {NetworkContextName, useWallet} from "../use_wallet";
import {useWeb3} from "../provider/web3_provider";
import {useCallback} from "react";
import {Web3Provider} from '@ethersproject/providers'
import {Web3ReactContextInterface} from "@web3-react/core/dist/types";
import {useWeb3React as useWeb3ReactCore} from '@web3-react/core'
import Web3 from "web3";
import WalletConnect from "@walletconnect/client";


export const useSignFn = (): (msgData: any) => Promise<string> => {
    const {account} = useWallet();
    const {walletConnect, web3} = useWeb3()
    const {library} = useActiveWeb3React()

    const handleFn = useCallback(async (msgData: any) => {
        msgData = JSON.stringify({message: JSON.parse(msgData).message});
        if (!account || !library) return;
        let data;
        if (walletConnect) {
            data = await signPersonalMessage(web3, msgData, account, walletConnect);
            const recovered = sigUtil.recoverPersonalSignature({data: msgData, sig: data.result})
            console.log(ethUtil.toChecksumAddress(recovered), account)
            return data;
        }

        data = await sendAsync(web3, msgData, account);

        const recovered = sigUtil.recoverPersonalSignature({data: msgData, sig: data.result})
        console.log(ethUtil.toChecksumAddress(recovered), account)
        return data;
    }, [library])

    return handleFn
}

async function signPersonalMessage(web3: Web3, msgData: any, account: string, walletConnect: WalletConnect) {
    let params = [msgData, account];
    let data;
    try {
        data = await walletConnect.signPersonalMessage(params);
        console.log('TYPED SIGNED:' + JSON.stringify(data))

        // const recovered = sigUtil.recoverPersonalSignature({data: msgData, sig: data})
        // console.log(ethUtil.toChecksumAddress(recovered), account)
    } catch (e) {
        throw e;
    }
    return {result: data};
}

async function sendAsync(web3: Web3, msgData: any, account: string): Promise<any> {

    let method = 'personal_sign'
    let params = [msgData, account ]
    return new Promise((resolve,reject)=>{
        web3.eth.defaultAccount = account;
        // @ts-ignore
        web3.eth.currentProvider.sendAsync({
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
            resolve(result);
        })
    });
    // let params = [msgData, account ]
    // let method = 'personal_sign'
    //
    // let result;
    // try {
    //     console.log(`method -------->${method}`,);
    //     console.log(`params -------->${params}`,);
    //     console.log(`library -------->`, library);
    //     result = await library.send(method, params);
    // } catch (e) {
    //     console.log('err------------>', e);
    //     throw  e;
    // }
    // return result;
}


export const useLedgerSignFn = () => {
    const {account} = useWallet();
    const {library} = useWeb3()

    const handleFn = useCallback(async (msgData: any, method: string = 'signTypedData') => {
        if (!account) return;
        if (!library) throw new Error('missing dependencies');

        console.log('useLedgerSignFn----------------->', library);
        // let method = 'personal_sign'
        let message = JSON.parse(msgData).message;
        const params = [account, JSON.stringify({message})];
        let _hax;
        try {
            let result = await library.send(method, params)


            console.log('PERSONAL SIGNED:' + JSON.stringify(result.result))

            console.log('recovering...')
            const recovered = sigUtil.recoverPersonalSignature({data: msgData, sig: result.result})
            console.log(recovered)
            console.log(ethUtil.toChecksumAddress(recovered), account)

            // console.log(await library.send(method,params).then())
            // _hax = await library.send(method,params);
            // console.log(_hax);
            // alert('sign success:' + _hax);
            // const recovered = sigUtil.recoverTypedSignature_v4({data: JSON.parse(params[1]), sig: _hax})
            // console.log(ethUtil.toChecksumAddress(recovered) == account);
            // alert(`sign verification:${ethUtil.toChecksumAddress(recovered) == account}
            // address: ${ethUtil.toChecksumAddress(recovered)}
            // `);

        } catch (e) {
            if (e.code == 4001) {
                throw  e;
            }
            // if (e.code === -32603) {
            //     await handleFn(msgData,'personal_sign')
            //     return;
            // }
            console.log(e);
            // alert('sign fail')
        }

        return _hax;
    }, [library])

    return handleFn
}


export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> {
    const context = useWeb3ReactCore<Web3Provider>()
    const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName)

    return context.active ? context : contextNetwork
}


// v4 old
/*async function sendAsync(web3: Web3Provider | undefined, params: any[], account: string): Promise<any> {
    let method = 'eth_signTypedData_v4'

    let result;
    try {
        if (!web3) return;
        result = await web3.send(method, params);
        console.log(result)

        console.log('TYPED SIGNED:' + JSON.stringify(result))
        const recovered = sigUtil.recoverTypedSignature_v4({data: JSON.parse(params[1]), sig: result})
        console.log(ethUtil.toChecksumAddress(recovered), account)
    } catch (e) {
        throw  e;
    }
    return result;

}*/

