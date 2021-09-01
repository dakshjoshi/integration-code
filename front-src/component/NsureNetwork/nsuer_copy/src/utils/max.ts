import {map} from "rxjs/operators";
import {useCallback, useContext} from "react";
import {StartContext} from "../view/stake_list";
import {getBalanceNumber} from "./formatBalance";
import {HttpServer} from "../net/http_server";
import {useWeb3} from "../provider/web3_provider";
import BigNumber from "bignumber.js";


export type inputMapType = { [key: string]: number };

export const useMaxAmountAjax = () =>{
    const {balance,locked} = useContext(StartContext);

    const handleMaxAmount = useCallback(async (data:inputMapType,target:string)=>{

        delete data[target];
        let max:any = await HttpServer.maxAll(balance.toString(),data,target);
        return getBalanceNumber(max);
    } ,[balance]);
    return handleMaxAmount;
}

export const useMaxAmount = ()=>{
    let {balance} = useContext(StartContext);

    const handleMaxAmount = useCallback((data:inputMapType,target:string) =>{
         let balances = getBalanceNumber(balance);
        let totalSumOther =0
        let half=0


        for (let i in data){
            for(let j in  data){
                let p1
                let p2
                if (i > j) {
                    p1 = j
                    p2 = i
                } else {
                    p1 = i
                    p2 = j
                }
                 let rate = relevance(p1, p2) //获取p1产品和p2产品之间的关联性
                totalSumOther = totalSumOther + data[i] * data[j] * rate
            }
        }
        for (let i in data) {

            let p1
            let p2
            if (i > target) {
                p1 = target
                p2 = i
            } else {
                p1 = i
                p2 = target
            }
            let rate = relevance(p1, p2) //获取p1产品和p2产品之间的关联性

            half = half + rate* data[i]
        }
        let v:any = Math.sqrt(balances*balances - totalSumOther + half*half) - half
        return parseFloat(v);
    },[balance,])

    return handleMaxAmount;

}


const relevance = (p1:string,p2:string):number =>{
    if( p1 === p2 ){
        return 1;
    }
    return  0.5;
}
