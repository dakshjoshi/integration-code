import React, {useCallback, useContext} from "react";
import styled from "styled-components";
import {ButtonWidget, InputWidget, SpacingWidget} from "../../base";
import {CircularProgress} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {UseUrlData} from "../../../utils/url";
import {ModalContext} from "../../../provider/model_provider";
import {AppleDescriptionModal} from "./apple_description";
import {useWeb3} from "../../../provider/web3_provider";
import {SuccessWidget} from "./success_widget";
import {AlertWidget} from "../../modal/alert_widget";

export const DescriptionWidget: React.FC = () => {
    const {register, handleSubmit, errors} = useForm();
    const [urlData] = UseUrlData<any>();
    const {onPresent} = useContext(ModalContext);
    const {ipfs} = useWeb3();


    const handleLogin = useCallback(async (inputData: any) => {
        if (urlData === undefined) return;
        if (!urlData.orderId) {
            onPresent(<AlertWidget text={'out OrderId '}/>);
            return;
        }
        try {
            onPresent(<CircularProgress size={100} color="primary"/>);
            let _file: File = inputData.credentials[0];
            let _hex = await ipfs.pinFile(_file)
            onPresent(<AppleDescriptionModal
                CellModel={{...urlData, ...inputData, credentials: _hex}}
            />)
        } catch (e) {
            console.log(e);
        }

    }, [urlData]);

    const handleUplabel = useCallback(async (inputData: any) => {
        if (urlData === undefined) return;
        try {
            let _file: File = inputData.credentials[0];

            ipfs.pinFile(_file)

        } catch (e) {
            console.log(e);
        }

    }, [urlData]);

    return (
        <DescriptionWapStyle>
            <form>
                <InputWidget

                    label={"Description"}
                    placeholder={"Please fill in a detailed description of your loss"}
                    errors={errors}
                    name={'description'}
                    multiline={true}
                    inputRef={register({
                        required: 'Please fill in a detailed description of your loss',
                    })}
                />

                <SpacingWidget/>

                <InputWidget
                    label={"Loss"}
                    placeholder={"Please loss"}
                    errors={errors}
                    name={'loss'}
                    inputRef={register({
                        required: 'Please of your loss',
                    })}
                />

                <SpacingWidget/>

                <InputWidget
                    errors={errors}
                    inputRef={register({
                        required: 'credentials',
                        validate: (ev) => {
                            if (!(ev.toString().split("."))[1] || ev.toString().split(".")[1].length < 2) {
                                return;
                            }
                            return "Must be a multiple of 0.1"
                        }
                    })}
                    name={'credentials'}
                    label={"Credentials"}
                    type='file'
                    placeholder={""}
                >
                    {/*<ButtonWidget onClick={handleSubmit(handleUplabel)} text="Upload" type="img"/>*/}
                </InputWidget>


            </form>

            <ButtonWidget onClick={handleSubmit(handleLogin)} text="Apply" type="img"/>
        </DescriptionWapStyle>
    );
};


let DescriptionWapStyle = styled.div`
  background-color: ${({theme}) => theme.bgColor.main};
  height: 100%;
  padding: 40px 15px;
  box-sizing: border-box;

  form {
    .MuiInputBase-input {
      text-align: start;
    }
  }

  > div:last-child {
    margin-top: 40px;
  }
`
