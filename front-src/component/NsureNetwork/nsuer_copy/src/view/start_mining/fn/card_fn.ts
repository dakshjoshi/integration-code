import {useCallback, useContext, useEffect, useState} from "react";
import {useWeb3} from "../../../provider/web3_provider";
import {useWallet} from "../../../use_wallet";

import {CardModel, ConvertCardInterface, defaultCardModel} from "../../../interface/start_mining";
import {PidMap} from "../../../server/capita_stake_server";
import {getBalanceFormat, getBalanceNumber} from "../../../utils/formatBalance";
import BigNumber from "bignumber.js";
import {StartMiningContext} from "../index";


export const useCardFn = (itemModel: ConvertCardInterface) => {
    const {blockNumber, contrcts, web3} = useWeb3();
    const {account} = useWallet();
    const {estimatedThreeApr} = useContext(StartMiningContext);
    const [model, setModel] = useState<CardModel>(defaultCardModel);
    const pid = PidMap[(itemModel.nick).toLowerCase()]
    const {usd, nsureToUsd} = useWeb3();


    const handelCard = useCallback(async () => {
        if (!itemModel.changeContract) return;
        let _change = itemModel.changeContract;
        let _token:Contract|undefined = itemModel.tokenContract?.contract;
        let balance = await _change.contract.methods.balanceOf(account).call();
        let poolBalance = await _change.contract.methods.balanceOf(contrcts.capitaStakeAddress).call();
        let totalSupply = await _change.contract.methods.totalSupply().call();
        let pendingNsure = await contrcts.capitaStakeContract.methods.pendingNsure(pid, account).call();
        let ethBalance = await  (_token ? _token?.methods.balanceOf(_change.address).call() : web3.eth.getBalance(_change.address));
        let trueBalance = ethBalance * poolBalance / totalSupply;
        let userInfo = await contrcts.capitaStakeContract.methods.userInfo(pid, account).call();
        let poolInfo = await contrcts.capitaStakeContract.methods.poolInfo(pid).call();
        let exchange = totalSupply / ethBalance;
        let apy: any = 0;
        // if (nsureToUsd) {
            apy = getBalanceFormat(estimatedThreeApr?.capital * 1e18,2);
            console.log(apy);
            // apy = trueBalance > 0 ? (1.8 * 6400 * 365 * (nsureToUsd / usd) / getBalanceNumber(trueBalance) * 1e2).toFixed(2) : 0;
        // }
        let deployed = new BigNumber(poolInfo.amount).minus(poolInfo.pending);

        let dataModel: CardModel = {
            ...userInfo,
            balance,
            apy,
            poolBalance,
            ethBalance,
            totalSupply,
            trueBalance,
            pendingNsure,
            exchange,
            deployed
        }
        itemModel.cardModel = {...itemModel.cardModel,...model}
        setItemModel(itemModel,dataModel)
        setModel(dataModel);
    }, [setModel, model, account, pid, nsureToUsd, usd,estimatedThreeApr],);
    useEffect(() => {
        handelCard();
    }, [blockNumber, nsureToUsd,itemModel,estimatedThreeApr]);

    return model
}


function setItemModel(item: ConvertCardInterface, model: CardModel) {
    item.cardModel.balance = model.balance || 0;
    item.cardModel.apy = model.apy;
    item.cardModel.poolBalance = model.poolBalance;
    item.cardModel.ethBalance = model.ethBalance;
    item.cardModel.totalSupply = model.totalSupply;
    item.cardModel.trueBalance = model.trueBalance;
    item.cardModel.pendingNsure = model.pendingNsure;
    // item.cardModel = {...item.cardModel,...model}
}
