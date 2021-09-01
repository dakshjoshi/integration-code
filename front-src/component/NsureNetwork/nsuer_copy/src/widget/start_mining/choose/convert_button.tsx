import React, {useContext, useEffect} from "react";
import {ApproveButton, ButtonWidget,IsApprove} from "../../base";
import styled from "styled-components";
import {StartStyle} from "./start_style";
import {useModel} from "../../../hook/use_model";
import {ConvertMoal} from "../../modal/convert_xxx";
import {ConvertCardInterface} from "../../../interface/start_mining";
import {CradCentext} from "../../../view/start_mining/choose_page";
import {useWeb3} from "../../../provider/web3_provider";
import {useConvert} from "../../../server/capital_change";
import {PidMap} from "../../../server/capita_stake_server";
import {useAllowance} from "../../../server/token_server";
import {useWallet} from "../../../use_wallet";


export const ConvertButtonWidget: React.FC<{exchangeEate:number}> = ({exchangeEate}) => {
    const model = useContext(CradCentext);
    const {listToken} = useWeb3();
    const {chainId} = useWallet();
    const handleConvert = useConvert(model.changeContract,model.tokenContract);


    const [handlePresent] = useModel(
        <ConvertMoal title={model.nick.toUpperCase()}
                     url={model.url}
                     tips={exchangeEate?`1 ${model.nick.toUpperCase()} ≈ 1 n${model.nick.toUpperCase()} ${exchangeEate.toFixed(4)}` : ''}
                     imgText={`${model.nick.toUpperCase()} pool`}
                     buttonText={`Convert to n${model.nick.toUpperCase()}`}
                     max={(listToken[(model.nick).toLocaleLowerCase()]  || 0).toString()}
                     confirmationFn={handleConvert}/>
    );




    // @ts-ignore
    return (
        <ButtonStyle>
            {
                model.changeContract ?
                    <IsApprove
                        erc20={model.tokenContract?.contract}
                        erc20Address={model.tokenContract?.address[chainId || '42']}
                        spender={model.changeContract.address}
                    >
                        <ButtonWidget text={`Convert n${model.nick.toUpperCase()}`} type="border" onClick={handlePresent}/>
                    </IsApprove>
                    :
                    <ButtonWidget text={`Under Development`} type="border"/>
            }
        </ButtonStyle>
    );
}



const ButtonStyle = styled.div`
  ${StartStyle.ButtonStyle}
`
