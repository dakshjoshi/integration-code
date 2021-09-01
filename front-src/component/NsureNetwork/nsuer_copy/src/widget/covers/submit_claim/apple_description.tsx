import React from "react";
import styled from "styled-components";
import {ButtonWidget, ImageWidget, TransactionModal} from "../../base";
import {Grid} from "@material-ui/core";
import {useWait} from "../../../utils/wait_fn";
import bgImg from "../../../assets/imgs/cover_modal_bg_top.png";
import {useBuyInsurance} from "../../../server/buy_server";
import balancerImage from "../../../assets/imgs/balancer.png"
import {formatAddress, getBalanceNumber} from "../../../utils/formatBalance";
import {AppConfig} from "../../../config";
import {BottomStyle, CoverBottomStyle, CoverModalMain, CoverTop, ImageStyle, MsgCellStyle} from "../style";
import {HttpServer} from "../../../net/http_server";
import {ClaimServer} from "../../../net/claim_server";
import {HttpServerModal} from "../../modal/transaction_modal";
import {appleClaimFn, useAppleClaimFn} from "../../../view/covers/fn/apple_claim";


export interface AppleDescriptionInterface {
    name: string,
    logo: { filename: string },
    credentials: string,
    description: string,
    loss: string,
    amount: string,
    hash: string,
    date: string,
    period: string,
    _id: string,
    orderId:string
}


export const AppleDescriptionModal: React.FC<{ CellModel: AppleDescriptionInterface, onDismiss?: () => void }> = ({
                                                                                                                      onDismiss,
                                                                                                                      CellModel
                                                                                                                  }) => {


    const appleClaimFn = useAppleClaimFn(CellModel);

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
                        <h4><p>Cover Amount:</p><span>{getBalanceNumber(CellModel.amount)} ETH</span></h4>
                    </MsgCellStyle>

                    <MsgCellStyle>
                        <h4><p>Credentials:</p><a target={'_black'} href={`${AppConfig.IPFS_NONE}/${CellModel.credentials}`}><span>{formatAddress(CellModel.credentials)}</span></a></h4>
                    </MsgCellStyle>

                    <MsgCellStyle>
                        <h4><p>Description:</p><span>{CellModel.description}</span></h4>
                    </MsgCellStyle>

                    <MsgCellStyle>
                        <h4><p>Loss:</p><span>{CellModel.loss}</span></h4>
                    </MsgCellStyle>


                    <BottomStyle>
                        <Grid container justify={"space-around"}>
                            <Grid item md={3}>
                                <ButtonWidget type={"border"} text={"Close"} onClick={onDismiss}/>
                            </Grid>
                            <Grid item md={3}>
                                <ButtonWidget type={"img"} text={"Confirm"} onClick={appleClaimFn}/>
                            </Grid>
                        </Grid>
                    </BottomStyle>
                </CoverBottomStyle>
            </CoverModalMain>
        </div>
    );
}



