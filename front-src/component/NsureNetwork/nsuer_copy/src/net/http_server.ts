import {kai as NetAxios} from './api'
import BigNumber from "bignumber.js";
import {inputMapType} from "../utils/max";


export class HttpServer {
    static account: string | null;

    /**
     * product
     * @param product
     * @param amount
     * @param period
     * @param currency
     */
    static product(product: string, amount: number, period: number, currency: number): Promise<any> {
        return NetAxios.get('/quote', {product, amount, period, currency});
    }

    /**
     * ethToUsd
     */


    /**
     * sing
     * @param sign
     * @param params
     * @param inviter
     */
    static sign(sign: string, params: any, inviter: string): Promise<any> {
        return NetAxios.post('/sign', {
            user: this.account, sign, params, inviter
        });
    }

    /**
     * coverClaim
     */
    static coverClaim(sign: string, params: string): Promise<any> {
        return NetAxios.post('/cover/claim', {
            sign,
            params,
            account: this.account
        });
    }


    /**
     * stakeBalance
     * @param balance
     */
    static stakeBalance(balance: number) {
        return NetAxios.get('/stake/balance', {
            user: this.account, balance
        });
    }


    /**
     * stakeBalance
     * @param product
     */
    static record(product: number) {
        return NetAxios.get('/cover/record', {
            product
        });
    }

    /**
     * mcr
     */
    static mcr(ev: any) {
        return NetAxios.get('/capital/mcr', {});
    }


    /**
     * withdraw
     * @param user
     * @param balance
     */
    static withdraw(balance: string) {
        return NetAxios.get('/capital/withdraw', {
            user: this.account, balance
        });
    }

    /**
     * mintReward
     */
    static mintReward(user: string) {
        return NetAxios.get('/cover/mintReward', {user,});
    }

    /**
     * amount
     */
    static amount() {
        return NetAxios.get('/cover/amount', {});
    }

    /**
     * product
     */
    static averProduct(uid: number) {
        return NetAxios.get('/product', {uid});
    }

    /**
     * stake
     * @param sign
     * @param user
     * @param params
     */
    static stake(sign: string, params: string) {
        return NetAxios.post('/stake/stake', {
            user: this.account, sign, params
        });
    }

    /**
     * stake
     * @param sign
     * @param user
     * @param params
     */
    static unstake(sign: string, params: string) {
        return NetAxios.post('/stake/unstake', {
            user: this.account, sign, params
        });
    }


    /**
     * maxAll
     * @param balance
     * @param products
     * @param target
     */
    static maxAll(balance: string, products: inputMapType, target: any) {
        return NetAxios.post('/stake/max', {
            user: this.account, balance, products, target
        });
    }

    /**
     * airdrop
     */
    static airdrop() {
        return NetAxios.get('/airdrop/user', {
            user: this.account,
        });
    }


    /**
     * unstakeAndclaimAndwithdraw
     * @param url
     * @param sign
     * @param params
     */
    static unstakeAndclaimAndwithdraw(url: string, sign: string, params: string): Promise<any> {
        return NetAxios.post(url, {
            user: this.account, sign, params
        })
    }

    /**
     * capitalUnstake
     * @param account
     * @param nonce
     * @param amount
     * @param currency
     */
    static capitalUnstake(account: string, nonce: string, amount: string, currency: string | null,): Promise<any> {
        return NetAxios.post('/capital/unstake', {
            account, amount, nonce, currency
        })
    }


    static estimatedThreeApr(): Promise<any> {
        return NetAxios.get('/statistics/estimatedThreeApr', {});
    }


}
