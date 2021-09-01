import React, {useEffect} from "react";
import {useWeb3} from "../../provider/web3_provider";
import styled from "styled-components";
import { ButtonWidget, SpacingWidget} from "../../widget/base";
import {getBalanceFormat} from "../../utils/formatBalance";
import {HttpStatus, useWait} from "../../utils/wait_fn";
import {HttpServer} from "../../net/http_server";
import {CircularProgress} from "@material-ui/core";
import {useWallet} from "../../use_wallet";
import {useCoverClaimFn} from "./fn/cover_claim_fn";
import {useSendModal} from "../../widget/modal/send_modal";

export const RewardsWidget: React.FC = () => {
    const {request,status,data} = useWait(HttpServer.mintReward);
    const {account} = useWallet();
    const [facehCoverClaim] = useCoverClaimFn();


    const onCoverClaim = useSendModal(facehCoverClaim);

    useEffect(() => {
        request(account);
    }, [request])
    return (
        <MainStyle>
            <WapStyle>
                {
                    status == HttpStatus.success ?  <>
                        <H2Style>
                            <h2>My Policies Cost:</h2>
                            <span>{getBalanceFormat(data.amount)} ETH</span>
                            <p>- Mint conditions: 0.2 NSURE/Block</p>
                        </H2Style>
                        <SpacingWidget/>
                        <H2Style>
                            <h2>My Available Reward:</h2>
                            <span>{getBalanceFormat(data.reward,2)} NSURE</span>
                            <p>- Rewards in Nsure are redeemable anytime</p>

                        </H2Style>
                    </>:   <CircularProgress color="primary" />
                }

            </WapStyle>
            <BottomButton>

                    <ButtonWidget onClick={()=>onCoverClaim(data.reward)} text={'Claim Reward'} type={"img"}/>


            </BottomButton>
        </MainStyle>
    );
}

const MainStyle = styled.div`
  position: inherit;
`
const WapStyle = styled.div`
  padding: 19px 29px;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
  background-color: ${({theme}) => theme.bgColor.main};


`

const BottomButton = styled.div`
  padding: 30px;
  border-top: 1px solid rgba(50, 61, 134, 1);
  display: flex;
`

const H2Style = styled.div`
  display: flex;

  h2 {
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, .6);
    width: 200px;
    color: #999;

  }

  span {
    font-size: 16px;
    font-weight: 400;
    flex: 1;
    color: ${({theme}) => theme.color.black['300']};

  }

  p {
    flex: 2;
    color: #999;

    font-size: 16px;
    font-weight: 400;
  }
`
