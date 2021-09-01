import React from "react";
import {useCoverSignFn} from "../../view/covers/fn/sign_fn";
import {useWait} from "../../utils/wait_fn";
import {TransactionModal} from "./transaction_modal";
import {BottomStyle, CoverBottomStyle, CoverModalMain, CoverTop, MsgCellStyle} from "../covers/style";
import {Grid} from "@material-ui/core";
import {ButtonWidget} from "../base";
import styled from "styled-components";
import {useWallet} from "../../use_wallet";
import {AirDropObject} from "../../hook/use_airdrop";
import {getBalanceNumber} from "../../utils/formatBalance";
import {useClaim} from "../../server/airdrop_server";

export const AirdropModel: React.FC<{model:AirDropObject, onDismiss?: () => void }> = ({onDismiss,model}) => {

    const onClaim = useClaim();
    const {account} = useWallet();

    const {request, status, data} = useWait(async () => {
        let singData = await onClaim(model);
        return singData
    });


    return (
        <TransactionModal status={status} txHash={data} onDismiss={onDismiss}>
            <CoverModalMain>
                <CoverTop>
                    <TopStyle>
                        <h5>Claim Nsure token</h5>
                        <h6>
                            <span>Reward Available</span>
                            <p>{getBalanceNumber(model.amount)} Nsure</p>
                        </h6>
                    </TopStyle>
                </CoverTop>
                <CoverBottomStyle>
                    <TextStyle>
                        <h2>If the address has any claimable NSURE, the
                            tokens will be sent to it on submission.</h2>
                        <div>
                            <h3>Recipient</h3>
                            <h4>{account}</h4>
                        </div>
                    </TextStyle>
                    <BottomStyle>
                        <ButtonWidget disable={model.amount == 0} type={"img"} text={"Claim"} onClick={request}/>
                    </BottomStyle>
                </CoverBottomStyle>
            </CoverModalMain>

        </TransactionModal>

    );
}

const TextStyle = styled.div`
  h2 {
    font-size: 14px;
    font-weight: 500;
    color: #666666;
    line-height: 20px;
    margin: 30px 0;
  }

  div {
    background: #EFEFF6;
    border-radius: 4px;

    h3 {
      color: rgba(39, 13, 79, 1);
      border-bottom: 1px solid rgba(230, 230, 243, 1);
      padding: 5px 10px;
    }

    h4 {
      color: rgba(153, 153, 153, 1);
      padding: 7px 10px;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
    }
  }
`

const TopStyle = styled.div`
  h5 {
    height: 33px;
    font-size: 24px;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 33px;
  }

  h6 {
    span {
      font-size: 16px;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 22px;
    }

    p {
      font-size: 24px;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 33px;
    }

  }
`
