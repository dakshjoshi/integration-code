import buyAbi from './abi/buy.json'
import stakeAbi from './abi/stake.json'
import capitalStakeAbi from './abi/capital_stake.json'
import ClaimPurchaseMint from './abi/ClaimPurchaseMint.json'
import Airdrop from './abi/airdrop.json'
import {Contract} from 'web3-eth-contract';


export interface TokenInterFace {
    address: { [key: string]: string },
    useAddr:string,
    nick: string,
    contract: Contract|any,
    balance?: string,

}
export interface ChangeInterFace {
    address: string,
    contract: Contract,
}


export const  USDT = 'usdt';
export const NSURE = 'nsure'

export const TokenList: any = {
    usdt: {
        address: {
            1: '',
            42: '0x328f0Cb880d68ffB00ad2991f05C69C875d776d2',
        },
        nick: 'USDT',

    },
    nsure: {
        address: {
            1: '0x20945ca1df56d237fd40036d47e866c7dccd2114',
            42: '0x6CF83F10234ac1DB01Baed7E45c52A59C9c66A3b',
        },
        nick: 'Nsure',
    },
}


export const ChangeMap:any = {
    // capitalConvertEth
    ethChangeContract: {
        1: '0xa6b658Ce4b1CDb4E7d8f97dFFB549B8688CAFb84',
        42: '0x75425606a336Ef15abEcdb18fa4E8465fA097655',
    },
    usdtChangeContract: {
        1: '',
        42: '0x99e6f45d01BcdD92E031a2D5B9D691EE200D11a7',
    },

}

export const ContractMap: any = {
    buyContract: {
        '1': '0x702aff99b08e8891fc70811174701fb7407b4477',
        '42': '0x92621A98074747E3648D11627aE3B182a010e574',
        abi: buyAbi.abi
    },
    // underwriting
    stakeContract: {
        1: '0x1a66f065303299d78693f122c800Ab3dEbE9c966',
        42: '0x66c7De52563AD7ea2F1c76B1A36F002Fc152dB2E',
        abi: stakeAbi.abi
    },
    capitalStakeContract: {
        1: '0xB98eD9800fCD2982d26Cf0E4a6B53C96bbeff6A6',
       42: '0x55696e6b3fDf74bc56F0935c6eC8e199bF047519',
         // 42: '0xb63b050154c81A26aaD86f3eBB9785dE1479eCf0',
        abi: capitalStakeAbi.abi
    },
    claimPurchaseMintContract: {
        1: '0x200dB99FE5c0f39688853d4c4D8651648d995b26',
        42: '0xac27a005ac0fA7e46b0ccfE62eE4265Fc37d00FD',
        abi: ClaimPurchaseMint.abi
    },
    airDropContract: {
        1: '0x66270E505DDA64345678ab7FD060C1C272573AEE',
        42: '0xBD32376d08e2D946F9a433ABf072ceA2bA800Ad2',
        abi: Airdrop.abi
    },
}
