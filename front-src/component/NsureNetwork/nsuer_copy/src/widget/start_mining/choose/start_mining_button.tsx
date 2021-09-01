import React, {useContext} from "react";
import {ApproveButton, ButtonWidget} from "../../base";
import styled from "styled-components";
import {StartStyle} from "./start_style";
import {ConvertCardInterface} from "../../../interface/start_mining";
import {CradCentext} from "../../../view/start_mining/choose_page";
import {useCardFn} from "../../../view/start_mining/fn/card_fn";
import {useAllowance} from "../../../server/token_server";
import {useWeb3} from "../../../provider/web3_provider";
import {PidMap, useCapitaStakeDeposit} from "../../../server/capita_stake_server";
import {useModel} from "../../../hook/use_model";
import {ConvertMoal} from "../../modal/convert_xxx";
import {getBalanceNumber} from "../../../utils/formatBalance";
import {ChangeInterFace} from "../../../nuser/token.config";
import {useDeposit} from "../../../view/start_mining/fn/start_mining_fn";


export const StartMiningButtonWidget: React.FC<{ balance: string }> = ({balance}) => {
    const model = useContext(CradCentext)
    const {contrcts} = useWeb3();

    const handleDeposit = useDeposit();

    const [handlePresent] = useModel(
        <ConvertMoal title={'n' + model.nick.toUpperCase()}
                     url={model.url}
                     max={balance}
                     imgText={`${model.nick.toUpperCase()} pool`}

                     buttonText={"Start Mining"}
                     confirmationFn={(ev) => {
                         return handleDeposit(ev,PidMap[model.nick.toLowerCase()]);
                     }}
        />
    );


    const allowance = useAllowance(model.changeContract?.contract, contrcts.capitaStakeAddress);
    return (
        <ButtonStyle>
            {model.changeContract ? allowance <= 0 ?
                <ApproveButton contract={model.changeContract.contract} contractAddress={model.changeContract.address || ''}
                               spender={contrcts.capitaStakeAddress}/>
                : <ButtonWidget text="Start Mining" onClick={handlePresent} type="img"/> :
                <ButtonWidget text={`Under Development`} type="img"/>
            }

        </ButtonStyle>
    );
}


const ButtonStyle = styled.div`
  ${StartStyle.ButtonStyle};
  margin-top: 19px;
`
