import {Contract} from "web3-eth-contract";
import Web3 from "web3";
import {ContractMap} from "./token.config";

export class Contrcts {
    public buyContract: Contract|any;
    public stakeContract: Contract|any;
    public capitaStakeContract: Contract|any;
    public claimPurchaseMintContract: Contract|any;
    public airdropContract: Contract|any;

    public stakeAddress:string;
    public buyAddress:string;
    public capitaStakeAddress: string;
    public claimPurchaseMintAddress: string;
    public  airdropAddress: string;


    constructor(web3: Web3, networkId: number,) {

        this.stakeAddress = ContractMap.stakeContract[networkId];
        this.buyAddress = ContractMap.buyContract[networkId];
        this.capitaStakeAddress = ContractMap.capitalStakeContract[networkId];
        this.claimPurchaseMintAddress = ContractMap.claimPurchaseMintContract[networkId];
        this.airdropAddress = ContractMap.airDropContract[networkId];


        this.buyContract = new web3.eth.Contract(ContractMap.buyContract.abi,  this.buyAddress);
        this.airdropContract = new web3.eth.Contract(ContractMap.airDropContract.abi,  this.airdropAddress);
        this.stakeContract = new web3.eth.Contract(ContractMap.stakeContract.abi, this.stakeAddress);
        this.capitaStakeContract = new web3.eth.Contract(ContractMap.capitalStakeContract.abi, this.capitaStakeAddress);
        this.claimPurchaseMintContract = new web3.eth.Contract(ContractMap.claimPurchaseMintContract.abi, this.claimPurchaseMintAddress);
    }
}





