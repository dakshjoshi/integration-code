import React from "react";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {InputTabWidget} from "./input_tab";
import {InputWidget} from "../../base";

export const ClaimIndex: React.FC = () => {
    const {register, handleSubmit, setValue, errors, watch} = useForm();

    return (
        <ClaimStyle>
            <WapStyle>
                <InputTabWidget
                    label={"Claimed By:"}
                    placeholder={"Number of days to be protected for"}
                    errors={errors}
                    name={'days'}
                    type='number'
                    inputRef={register({
                        required: 'no Enter the number is dame',
                    })}
                    onChange={handleSubmit(() => {
                        console.log('')
                    })}
                />
            </WapStyle>
        </ClaimStyle>
    );
}


const ClaimStyle = styled.div`
  position: inherit;
`
const WapStyle = styled.div`
  padding: 19px 29px;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
  background-color: #fff;

`
