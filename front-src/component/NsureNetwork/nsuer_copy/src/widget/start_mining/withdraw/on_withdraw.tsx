import React from "react";
import {ButtonWidget} from "../../base";
import {useModel} from "../../../hook/use_model";
import {ConvertMoal} from "../../modal/convert_xxx";
import {useIsPending, useWithdraw} from "../../../server/capita_stake_server";
import {useSendModal} from "../../modal/send_modal";
import Countdown, {zeroPad} from "react-countdown";
import styled from "styled-components";

export const OnWidthdraw: React.FC<{ nick: string, pendingWithdrawal: any }> = ({nick, pendingWithdrawal}) => {
    const handleWithdraw = useWithdraw(nick);
    const isPending = useIsPending(nick);


    const onWithdraw = useSendModal(handleWithdraw);

    return (<>

        {
            isPending["0"] ? <CountdownStyle
                date={Date.now() + isPending["1"] * 1000}
                renderer={renderer}
            /> : <ButtonWidget text={"Withdraw"} onClick={onWithdraw} type={"submit"}/>
        }

    </>)
}


// @ts-ignore
const renderer = ({days, hours, minutes, seconds, completed}) => {

    return (
        <TmpStyle>

            <div>

                <div>
                    <h4>{zeroPad(days)}</h4>
                    <p>D </p>
                </div>
                <div>
                    <h4>{zeroPad(hours)}</h4>
                    <span>:</span>
                </div>
                <div>
                    <h4>{zeroPad(minutes)}</h4>
                    <span>:</span>
                </div>
                <div>
                    <h4>{zeroPad(seconds)}</h4>
                </div>

            </div>
        </TmpStyle>
    );
};
const CountdownStyle = styled(Countdown)`
  color: ${({theme}) => theme.color.black['100']};

  > div {
    display: flex;
  }
`

const TmpStyle = styled.div`
  div {
    display: flex;
    align-items: center;
    line-height: 1;

    h4 {
      font-size: 15px;
    }
    p{
      margin: 0 3px;
    }
  }
`
