import React from "react";
import styled from "styled-components";
import {ButtonWidget,ButtonStyle} from "../../base";
import env from "@beam-australia/react-env";
import {useHistory} from "react-router-dom";
import {AliasEnum} from "../../../interface/covers_interface";

export const SuccessWidget: React.FC<{ onDismiss?: () => void, claimId: string }> = ({onDismiss, claimId}) => {
    const history = useHistory();

    return (<WapStyle>
            <h2>Claim Submitted</h2>
            <h3>Check your claim status</h3>
            <div className={'buttons'}>
                <ButtonWidget type={"border"} onClick={onDismiss} text={'Close'}/>
                <ButtonStyle
                    disable={false}
                    onClick={() => {
                        onDismiss&&onDismiss();
                        window.location.href = `#/cover/all/${AliasEnum.Claims}`
                        // onDismiss&&onDismiss() && history.push(`/cover/all/${AliasEnum.Claims}`)
                    }}
                    type={"border"}
                >Check</ButtonStyle>
            </div>
        </WapStyle>
    );
}


const WapStyle = styled.div`
  width: 368px;
  background: linear-gradient(270deg, #E3EFFF 0%, #FAF0FF 100%);
  box-shadow: 0px 0px 16px 1px rgba(126, 126, 126, 0.45);
  border-radius: 12px;
  text-align: center;
  padding: 30px 0;
  box-sizing: border-box;

  h2 {
    font-size: 18px;
    font-weight: 400;
    color: #188058;
  }

  h3 {
    font-size: 12px;
    font-weight: 400;
    color: #333333;
    margin: 10px 0 30px 0;
  }

  .buttons {
    padding: 0 5%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
  }

`
