import Web3 from "web3";
import {ChangeInterFace, ChangeMap, TokenInterFace, TokenList} from "./token.config";
import ERC20ABI from './abi/erc20.json'
import {Contrcts} from "./contrcts";
import WalletConnect from "@walletconnect/client";
import {AppConfig} from "../config";
import capitalChangeAbi from './abi/capital_change.json'
import {IpfsServer} from "./ipfs_save";
import {Web3Provider} from '@ethersproject/providers'
export class Nsuer {

    public web3: Web3;
    public tokenMap: { [key: string]: TokenInterFace } = TokenList;
    public changeMap: { [key: string]: ChangeInterFace } = ChangeMap;
    public networkId: number;
    public contrcts: Contrcts;
    public walletConnect: WalletConnect | undefined;
    public ipfs: IpfsServer;
    public library: Web3Provider;


    constructor(provider: any, networkId: number, connect:any,options: any) {

        this.networkId = networkId;
        let realProvider;
        if (typeof provider === 'string') {
            if (provider.includes('wss')) {
                realProvider = new Web3.providers.WebsocketProvider(
                    provider,
                    options.ethereumNodeTimeout || 10000,
                )
            } else {
                realProvider = new Web3.providers.HttpProvider(
                    provider,
                    options.ethereumNodeTimeout || 10000,
                )
            }
        } else {

            if (options.connector === 'walletconnect') {
                 realProvider = AppConfig.rpcUrl[networkId];
                this.walletConnect = new WalletConnect({bridge: AppConfig.rpcUrl[networkId],});
            } else {
                realProvider = provider;
            }
        }
        this.web3 = new Web3(realProvider);
        this.ipfs = new IpfsServer();
        this.library = new Web3Provider(provider, 'any');

        this.library.polling = true;
        this.contrcts = new Contrcts(this.web3, networkId)
        this.initTokenMap();
        this.initChangeMap();
    }


    initTokenMap() {
        Object.keys(this.tokenMap).map((ev) => {
            const item = this.tokenMap[ev];
            item.useAddr = item.address[this.networkId];
            item.contract =new this.web3.eth.Contract(ERC20ABI.abi as Array<any>, item.useAddr);

        });
    }

    initChangeMap() {
        Object.keys(this.changeMap).map((ev) => {
            const item: any = this.changeMap[ev];
            item.address = item[this.networkId];
            item.contract = new this.web3.eth.Contract(capitalChangeAbi.abi as Array<any>, item.address)
        });
    }

}
