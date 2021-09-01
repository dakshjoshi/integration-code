import React, {createRef, useRef, useState} from "react";
import {TextField, InputBase, withStyles, MenuItem, Select, Input} from "@material-ui/core";
import styled from "styled-components";
import {ButtonWidget} from "./button";


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
    multiline?:boolean

    // max:string,
}


export const InputWidget: React.FC<InputInterFace> = ({
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
                                                          children,
                                                          multiline = false
                                                      }) => {


    return (
        <>
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
                               rows={4}
                               inputProps={{
                                   accessKey:'docx',
                                   'accept':'.docx'
                               }}
                               multiline={multiline}
                               onChange={(ev) => onChange && onChange(ev)}
                    />
                    {
                        unit ?
                            <span>{unit}</span> : children
                    }
                </InputStyle>

                {setValue ?
                    <>
                        <SpacingStyle/>
                        <ButtonWidget text={buttonText} onClick={() => setValue(name || label)} type="color"/>
                    </>
                    : <div/>}
            </FlexStyle>
            <HelperTextStyle>{errors[name || label] ? errors[name || label].message : ''}</HelperTextStyle>
        </>
    );
}


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
  //font-weight: 400;
  color: ${({theme})=>theme.color.whites["800"]};
  line-height: 1;
  //font-family: Proxima Nova;
`


const FlexStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;


`

const InputStyle = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  border: 1px solid ${({theme}) => theme.color.whites['700']};
  font-size: 14px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 5px;

  span {
    font-size: 14px;
    font-weight: 400;
    color: ${({theme}) => theme.color.blues["200"]};
    display: inline-block;
    padding-left: 20px;
  }

  .MuiInputBase-input {
    color: black;
    text-align: end;

    &::-webkit-input-placeholder {
      text-align: start;
    }
  }
`
