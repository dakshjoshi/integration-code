import React, {useCallback, useContext, useState} from "react";
import styled from "styled-components";
import {ButtonWidget, ImageWidget, TransactionModal} from "../../base";
import {Grid, TextField} from "@material-ui/core";
import {useWait} from "../../../utils/wait_fn";
import bgImg from "../../../assets/imgs/cover_modal_bg_top.png";
import {useBuyInsurance} from "../../../server/buy_server";
import balancerImage from "../../../assets/imgs/balancer.png"
import {getBalanceNumber} from "../../../utils/formatBalance";
import {ProductInformationInterface} from "../../../interface/product_interface";
import {AppConfig} from "../../../config";
import {useCoverSignFn} from "../../../view/covers/fn/sign_fn";

import {BottomStyle, CoverBottomStyle, CoverModalMain, CoverTop, ImageStyle, InputStyle, MsgCellStyle} from "../style";
import {ModalContext} from "../../../provider/model_provider";
import {useSendModal} from "../../modal/send_modal";


export const INVITATIONCODE = "invitation_code";

export interface CoverInterface {
    unit: string,
    address: string,
    id: number,
    fixedPayout: string,
    days: number,
    cover: string,
    // r: string,
    // s: string,
    // v: string,
    // deadline: number,
    cost: number,
}

export interface SignFnface extends CoverInterface {
    r: string,
    s: string,
    v: string,
    deadline: number,
}

/**
 * 购买保险
 * @param Cover
 * @param CellModel
 * @param onDismiss
 * @constructor
 */
export const CoverModal: React.FC<{ Cover: CoverInterface, CellModel: ProductInformationInterface, onDismiss?: () => void }> = ({
                                                                                                                                    Cover,
                                                                                                                                    CellModel,
                                                                                                                                    onDismiss
                                                                                                                                }) => {


    const [signFn] = useCoverSignFn();
    const [inviter, setInviter] = useState(sessionStorage.getItem(INVITATIONCODE))

    const [buyInsuranceWithETH] = useBuyInsurance();

    const request = useCallback(async (inviter) => {
        let singData = await signFn({
            days: Cover.days,
            amount: Cover.cover,
            address: Cover.id,
            age: Cover.unit,
            inviter
        });
        return buyInsuranceWithETH({...Cover, ...singData});
    }, []);

    const buyInsurance = useSendModal(request);

    return (
        <div>
            <ImageStyle>
                <ImageWidget size={90} url={AppConfig.urlPath + CellModel.logo.filename || balancerImage}/>
            </ImageStyle>
            <CoverModalMain>
                <CoverTop>
                    <h3>{CellModel.name}</h3>
                    <h4>

                    </h4>
                </CoverTop>
                <CoverBottomStyle>
                    <MsgCellStyle>
                        <h3>Policy Amount</h3>
                        <h4><p>{Cover.cover}</p><span>{Cover.unit}</span></h4>
                    </MsgCellStyle>

                    <MsgCellStyle>
                        <h3>Policy Period</h3>
                        <h4><p>{Cover.days}</p><span>DAYS</span></h4>
                    </MsgCellStyle>

                    <MsgCellStyle>
                        <h3>Cost of Policy</h3>
                        <h4><p>{getBalanceNumber(Cover.cost * 1e18, 6)}</p><span>{Cover.unit}</span></h4>
                    </MsgCellStyle>

                    <InputStyle>
                        <h3>Invitation code</h3>
                        <div className="input">
                            <TextField
                                fullWidth
                                value={inviter}
                                onChange={(ev) => setInviter(ev.target.value)}

                            />
                        </div>
                    </InputStyle>

                    <BottomStyle>
                        <Grid container justify={"space-around"}>
                            <Grid item md={3}>
                                <ButtonWidget type={"border"} text={"Close"} onClick={onDismiss}/>
                            </Grid>
                            <Grid item md={3}>
                                <ButtonWidget type={"img"} text={"Confirm"} onClick={() => buyInsurance(inviter)}/>
                            </Grid>
                        </Grid>
                    </BottomStyle>
                </CoverBottomStyle>
            </CoverModalMain>
        </div>
    );
}


