import {useWallet} from "../use_wallet";
import React, {useCallback} from "react";
import {useWeb3} from "../provider/web3_provider";
import Web3 from "web3";
import BigNumber from "bignumber.js";

/**
 * web3 使用
 * @param to 合约地址
 * @param value eth数量 默认为 0 0x00
 */
export const useSendFn = (to: string | undefined): (methods: any, value?: string) => Promise<any> => {
    const {account, connector} = useWallet();
    const {walletConnect, web3,library} = useWeb3();
    const handleSendFn = useCallback(async (methods: any, value: string = '0x00') => {
        value = new BigNumber(value).decimalPlaces(0).toFixed();
        let gas: any = 0;
        let gasPrice;
        try {
            gasPrice = await web3.eth.getGasPrice();
            gasPrice = new BigNumber(gasPrice).times(1.1).decimalPlaces(0).toFixed();
            gas = await methods.estimateGas({
                from: account,
                to: to,
                gasPrice: gasPrice,
                data: methods.encodeABI(),
                value: value,
                gas: 5000000
            });

        } catch (e) {
            console.log(e)
        }

        gas = gas && parseInt((gas * 1.2).toString()).toString();

        let tx: any = {
            from: account,
            to: to, // Required (for non contract deployments)
            data: methods.encodeABI(), // Required
            gasPrice: gasPrice, // Optional
            gas, // Optional
            value: value, // Optional
        }

        if(!tx.gas) delete tx.gas;

        if (connector === 'walletconnect') {
            return walletConnect.sendTransaction(tx);
        }

        return sendTransaction(web3, tx);
    }, [walletConnect, account, to]);
    return handleSendFn;
}


async function sendTransaction(web3: Web3, tx: any) {
    return new Promise<any>(async (resolve, reason) => {
        try {
            await web3.eth.sendTransaction(tx, (error: Error, hash: string) => {
                if (error) {
                    reason(error)
                } else {
                    resolve({transactionHash: hash});
                }
            });
        } catch (e) {
            console.log(e);
        }

    });
}




