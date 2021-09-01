import React, {useState} from "react";
import {ConvertCardInterface} from "../../interface/start_mining";
import styled from "styled-components";
import {ButtonWidget, InputWidget, SpacingWidget, TransactionModal, ValueWidget} from "../base";
import {WidthStyle} from "../style/width_style";
import {useForm} from "react-hook-form";
import {ModalHeaderWidegt} from "./modal_header_widget";
import {CardStyle} from "../style/card_style";
import {useWait} from "../../utils/wait_fn";
import {ModalProps} from "../../provider/model_provider";
import balancerImage from "../../assets/imgs/logos.png"
import {getBalanceNumber, numberToUint256} from "../../utils/formatBalance";
import BigNumber from "bignumber.js";


interface ConvertInterface extends ModalProps {
    confirmationFn: (ev: string) => Promise<any>,
    title: string,
    url: string,
    buttonText: string,
    max?: string | number,
    label?: string,
    imgText?: string,
    tips?: string

}

export const ConvertMoal: React.FC<ConvertInterface> = ({
                                                            label = '',
                                                            max = '',
                                                            onDismiss,
                                                            url,
                                                            title,
                                                            buttonText,
                                                            confirmationFn,
                                                            imgText = "NSURE NETWORK",
                                                            tips
                                                        }) => {
    const {register, handleSubmit, setValue, errors} = useForm();



    const {request, status, data} = useWait(confirmationFn);
    let _max = getBalanceNumber(max, 3);
    const [test,setTest] = useState('1')
    return (
        <TransactionModal onDismiss={onDismiss} txHash={data} status={status}>
            <ConvertStyle>
                <ModalHeaderWidegt url={url || balancerImage} title={imgText}/>

                <ConverBottomStyle>
                    <AvailableStyle bgColor={"rgba(20, 28, 78, 1)"}>
                        <h2>{title}</h2>
                        <h4><ValueWidget value={_max} decimals={3}/></h4>
                    </AvailableStyle>
                    <SpacingWidget/>
                    <form>
                        <TipsWidget>{tips}</TipsWidget>
                        <InputWidget
                            setValue={(ev) => setValue(ev, _max)}
                            label={label}
                            placeholder={"Input"}
                            name={'amount'}
                            errors={errors}
                            inputRef={register({
                                required: 'no Enter the number is dame',
                                max: {value: _max, message: 'Enter the number'},
                            })}
                        />
                    </form>
                    <SpacingWidget/>
                    <ButtonWidget text={buttonText}
                                  type="img"
                                  onClick={handleSubmit((data) => {
                                      if (data.amount > _max) {
                                          return;
                                      }
                                      if (data.amount == _max) {

                                          request(new BigNumber(max).toFixed())
                                      } else {
                                          request(numberToUint256(data.amount).toFixed());
                                      }
                                      // request(data.amount);
                                  })}/>
                </ConverBottomStyle>
            </ConvertStyle>
        </TransactionModal>
    );
}


const TipsWidget = styled.p`
  color: #999;
  font-size: 12px;
`;
const AvailableStyle = styled.div`
  ${CardStyle.BorderTwoStyle};
  height: 118px;
  display: flex;
  flex-flow: column;
  justify-items: center;
  align-items: center;
  justify-content: center;
  background: #EFEFF6;
  border: 1px solid #E1E1E9;

  h2 {
    font-size: 14px;
    font-weight: 400;
    color: ${({theme}) => theme.color.black["400"]};

    text-transform: uppercase
  }

  h4 {
    font-size: 36px;
    font-weight: 500;
    color: ${({theme}) => theme.color.black["400"]};

  }
`

const ConverBottomStyle = styled.div`
  padding: 30px;
  box-sizing: border-box;
  background-color: ${({theme}) => theme.bgColor.main};
`


const ConvertStyle = styled.div`
  width: 100vw;
  max-width: 420px;
`

