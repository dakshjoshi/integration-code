import React, {createRef, useRef, useState} from "react";
import {TextField, InputBase, withStyles, MenuItem, Select, Input} from "@material-ui/core";
import styled from "styled-components";


interface InputInterFace {
    label: string,
    unit?: string,
    onChange?: (e: any) => void,
    placeholder: string,
    setValue?: (ev: string) => void,
    inputRef: React.Ref<any>,
    errors: any;
    name?: string,
    buttonText?: string,
    type?: string,

    // max:string,
}


export const InputTabWidget: React.FC<InputInterFace> = ({
                                                          label,
                                                          placeholder,
                                                          setValue,
                                                          unit,
                                                          inputRef,
                                                          errors,
                                                          name,
                                                          buttonText = 'Max',
                                                          type,
                                                          onChange,
                                                          children
                                                      }) => {


    return (
        <WapStyle>
            <div className={"top"}>
                <LabelStyle>{label}</LabelStyle>
                <FlexStyle>
                    <InputStyle>
                        <TextField name={name || label}
                                   error={Boolean(errors[name || label])}
                                   placeholder={placeholder}
                                   unselectable={'off'}
                                   fullWidth={true}
                                   inputRef={inputRef}
                                   type={type}
                                   onChange={(ev) => onChange && onChange(ev)}
                        />

                    </InputStyle>

                    {setValue ?
                        <>
                            <SpacingStyle/>
                        </>
                        : <div/>}
                </FlexStyle>
            </div>

            <HelperTextStyle>{errors[name || label] ? errors[name || label].message : ''}</HelperTextStyle>
        </WapStyle>
    );
}

const WapStyle = styled.div`
  >.top{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #F5F5F5;
  }
    
`


const HelperTextStyle = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const SpacingStyle = styled.div`
  width: 15px;
  height: 15px;

`

const LabelStyle = styled.h2`
  font-size: 14px;
  font-weight: 400;
  color: #7286C2;
  line-height: 1;
`


const FlexStyle = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;

`

const InputStyle = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  border: 1px solid transparent;
 
  font-size: 14px;
  font-weight: 600;
  //color: #FFFFFF;
  padding: 5px 10px;

  span {
    font-size: 14px;
    font-weight: 400;
    color: #7688B7;
    display: inline-block;
    padding-left: 20px;
  }

  .MuiInputBase-input {
    color: #3957B1;

    &::-webkit-input-placeholder {
      text-align: start;
    }
  }
`
