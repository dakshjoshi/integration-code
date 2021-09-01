import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";
import {inputMapType, useMaxAmount, useMaxAmountAjax} from "../../../utils/max";
import styled from "styled-components";
import {ButtonWidget} from "../../base";
import {Button} from "@material-ui/core";


export const FormattedInputs: React.FC<{
    setInputMap: Function,
    address: string,
    value: number|null,
    inputMap: inputMapType
}> = ({
          setInputMap,
          address,
          value,
          inputMap
      }) => {
    const handleChange = (event: any) => {
        setInputMap({
            ...inputMap,
            [address]: event
        });
    };
    const handleMax = useMaxAmountAjax();


    return (
        <FormattedStyle>
            <div className={'_input'}>
                <TextField
                    value={value}
                    onChange={(ev) => handleChange(ev.target.value)}
                    placeholder={'0'}
                    InputProps={{
                        inputComponent: NumberFormatCustom as any,
                    }}
                />
                <p onClick={async () => {
                    let max = await  handleMax(inputMap,address)
                    handleChange(Math.floor(max * 100)/100)
                }}>Max</p>
            </div>


        </FormattedStyle>
    );
}



export const UnstakeFormattedInputs: React.FC<{
    setInputMap: Function,
    address: string,
    value?: string|number,
    inputMap: inputMapType,
    max:string,
    width?:string
}> = ({
          setInputMap,
          address,
          value = '',
          inputMap,
                                               max,
                                               width = '60%'
      }) => {
    const handleChange = (event: any) => {
        setInputMap({
            ...inputMap,
            [address]: event
        });
    };


    return (
        <FormattedStyle
            style={{width}}
        >
            <div className={'_input'}>
                <TextField
                    value={value}
                    placeholder={'0'}
                    onChange={(ev) => handleChange(ev.target.value)}
                    InputProps={{
                        inputComponent: NumberFormatCustom as any,
                    }}
                />
                <p onClick={() =>{
                    // setValues(max);
                    handleChange(Math.floor(parseFloat(max) * 100)/100)

                }}>Max</p>
            </div>


        </FormattedStyle>
    );
}





const FormattedStyle = styled.div`
  display: flex;
  width: 60%;
  float: right;
  box-sizing: border-box;

  ._input {
    //background-color: #162C75;
    border: 1px solid #E9E9E9;
    border-radius: 5px; 
    padding: 4px 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    p{
      cursor: pointer;
      color: ${({theme}) => theme.color.blues["200"] };
    }
  }
`


interface NumberFormatCustomProps {
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix=""
        />
    );
}



