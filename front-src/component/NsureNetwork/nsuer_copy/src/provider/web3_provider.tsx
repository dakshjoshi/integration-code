import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import {Nsuer} from "../nuser/nsuer";
import {useWallet} from "../use_wallet";
import Web3 from "web3";
import {Contrcts} from "../nuser/contrcts";
import {HttpServer} from "../net/http_server";
import WalletConnect from "@walletconnect/client";
import {NSURE, TokenInterFace, USDT} from "../nuser/token.config";
import {useWait} from "../utils/wait_fn";
import {EthToUsd} from "../net/apis";
import BigNumber from "bignumber.js";
import { Web3Provider as _webProvider } from '@ethersproject/providers'



let current: number = 0;
export const Web3Provider: React.FC = ({children}) => {

    const [nsuer, setNsuer] = useState<any>();
    const {ethereum, chainId, getBlockNumber, connector, account,connect} = useWallet();

    const [data, setData] = useState({
        block: current, token: {
            usdt: new BigNumber(0),
            eth: new BigNumber(0),
            btc: new BigNumber(0),
            nsure: new BigNumber(0),
            usd: new BigNumber(0),
        }
    });
    const ethToUsd = useWait<any>(EthToUsd);

    const callBack = useCallback(async (nsuer: Nsuer) => {
        if (!account) return;
        const latestBlockNumber = await nsuer.web3.eth.getBlockNumber();
        if (current !== latestBlockNumber) {
            let token: any = await tokenList(nsuer.tokenMap, nsuer.web3, account);
            ethToUsd.request('');
            setData(
                {
                    block: latestBlockNumber,
                    token,
                }
            );
            current = latestBlockNumber;
        }
    }, [ethereum, getBlockNumber, setData]);

    useEffect(() => {
            if (!ethereum) return;
            let _nsuer = new Nsuer(ethereum, chainId || 0, connect,{connector});
            setNsuer(_nsuer);
            HttpServer.account = account;
            callBack(_nsuer);
            const interval = setInterval(async () => {
                callBack(_nsuer);
            }, 3000);

            return () => clearInterval(interval)
        }, [ethereum],
    );

    return (
        <web3Context.Provider value={{
            nsuer,
            block: data.block,
            listToken: data.token,
            usd: ethToUsd.data?.ethToUsd || 0,
            nsureToUsd: ethToUsd.data?.nsureToUsd || 0,


        }}>{children}</web3Context.Provider>
    )
}


const web3Context = createContext<Web3Interface>({
    nsuer: null,
    block: current,
    listToken: {},
    usd: 0,
    nsureToUsd: 0,
})


interface Web3Interface {
    nsuer: Nsuer | any,
    block: number,
    listToken: { [key: string]: BigNumber },
    usd: number,
    nsureToUsd: number,
}


export const useWeb3 = () => {
    const {nsuer, block, listToken, usd, nsureToUsd} = useContext(web3Context);
    return {
        web3: nsuer.web3,
        tokenMap: nsuer.tokenMap,
        changeMap: nsuer.changeMap,
        contrcts: nsuer.contrcts as Contrcts,
        blockNumber: block,
        walletConnect: nsuer.walletConnect as WalletConnect,
        listToken: listToken,
        usd,
        nsureToUsd,
        ipfs:nsuer.ipfs,
        library:nsuer.library
    }
}


async function tokenList(tokenMap: { [key: string]: TokenInterFace }, web3: Web3, account: string) {
    const _map: any = {};

    // let bb = await tokenMap[USDT].contract.methods.balanceOf(account).call();
    // _map[USDT] = new BigNumber(bb)

    let _nsure = await tokenMap[NSURE].contract.methods.balanceOf(account).call();
    _map[NSURE] = new BigNumber(_nsure)
    let ethBalance: any = await web3.eth.getBalance(account);
    _map['eth'] = new BigNumber(ethBalance);

    return _map;
}








