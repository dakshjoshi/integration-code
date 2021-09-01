import React, {useContext} from "react";
import {useModel} from "../../../hook/use_model";
import { ButtonWidget, ImageWidget, ValueWidget} from "../../base";
import {CardCellWidget, ChooseCardStyle} from "../choose/choose_card";
import styled from "styled-components";
import {StartStyle} from "../choose/start_style";
import {CradCentext} from "../../../view/start_mining/choose_page";
import {useCardFn} from "../../../view/start_mining/fn/card_fn";
import {getBalanceFormat, getBalanceNumber} from "../../../utils/formatBalance";
import {SendModal} from "../../modal/send_modal";
import {useClaim} from "../../../server/capita_stake_server";
import {StartMiningContext} from "../../../view/start_mining";
import {ChooseImgWidget} from "../widget/choose_img";


export const DashboardCard: React.FC = () => {
    const model = useContext(CradCentext)
    const {amount,deployed,pendingNsure} = useCardFn(model);
    const {mcr} = useContext(StartMiningContext);

    const handleClaim = useClaim(model.nick);

    const [onClaim] = useModel(
       <SendModal confirmationFn={handleClaim}/>
    );

    return (
        <ChooseCardStyle size={{all: 30}}>
            <ChooseImgWidget img={model.url}/>

            {/*<ImageWidget bgColor={model.bgColor} borderColor={model.bgColor} size={70} url={model.url}/>*/}
            <h3>n{model.nick.toUpperCase()} Pool</h3>

            <CardCellWidget label={`Solvency Ratio (Capital/MCR):`}>
                <ValueWidget value={((model.changeContract && mcr ) ? (mcr.mcr).toString() == 'NaN' ? 0: mcr.mcr : 0) +"%"} decimals={3}/>
                {/*<ValueWidget value={"NA"} decimals={3}/>*/}
            </CardCellWidget>
            <CardCellWidget label={`Pool n${model.nick.toUpperCase()} deployed:`}>
                <ValueWidget value={getBalanceFormat(deployed)} decimals={3}/>
            </CardCellWidget>

            <CardCellWidget label={`My n${model.nick.toUpperCase()}:`}>
                <ValueWidget value={getBalanceFormat(amount)} decimals={3}/>
            </CardCellWidget>
            <CardCellWidget label={ model.rewardUnit ? `Available Reward (${model.rewardUnit}):` : 'Available Reward'}>
                <ValueWidget value={getBalanceFormat(pendingNsure || '')} decimals={3}/>
            </CardCellWidget>

            <ButtonStyle>
                {model.changeContract ?  <ButtonWidget text={`Claim Reward`} onClick={onClaim} type="img"/>:  <ButtonWidget text={`Under Development`} type="img"/>}
            </ButtonStyle>
        </ChooseCardStyle>
    );
}


const ButtonStyle = styled.div`
  ${StartStyle.ButtonStyle};
  margin-top: 19px;
`
