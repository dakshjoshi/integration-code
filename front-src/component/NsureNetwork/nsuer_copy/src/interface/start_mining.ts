import {ModalProps} from "../provider/model_provider";
import {Contract} from "web3-eth-contract";
import {ChangeInterFace, TokenInterFace} from "../nuser/token.config";
import BigNumber from "bignumber.js";


export interface ConvertCardInterface extends ModalProps {
    url: string,
    bgColor: string,
    total: string,
    poolMCR: string,
    myStaked: string,
    nick: string,
    changeContract: ChangeInterFace | null,
    cardModel: CardModel | any,
    tokenContract: TokenInterFace | null,
    rewardUnit?:string,
    // address?:string,
    // contract?: Contract,


}


export interface CardModel {
    balance: string,
    userInfo: string,
    amount: string,
    pendingAt: string,
    pendingWithdrawal: string,
    rewardDebt: string,
    apy: string,
    poolBalance: string,
    ethBalance: string,
    totalSupply: string,
    trueBalance?: string,
    pendingNsure?: string,
    exchange?: number,
    deployed?:BigNumber,
}


export const defaultCardModel: CardModel = {
    amount: "",
    pendingAt: "",
    pendingWithdrawal: "",
    rewardDebt: "",
    balance: '',
    userInfo: "",
    apy: "0",
    poolBalance: '',
    ethBalance: '',
    totalSupply: ''
};
