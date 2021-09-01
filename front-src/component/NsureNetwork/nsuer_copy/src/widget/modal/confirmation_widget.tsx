import React from "react";
import {ModalProps} from "../../provider/model_provider";
import styled, {css} from "styled-components";
import {WidthStyle} from "../style/width_style";
import {ButtonWidget, InputWidget} from "../base";
import {Grid, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";



interface ConfirmationInterface extends ModalProps{}

export const ConfirmationModal:React.FC<ConfirmationInterface> = ({onDismiss}) =>{

    const {register, handleSubmit, setValue, errors,watch} = useForm();

    return (
       <ConfirmationStyle size={{y:30,x:20}}>
           <h2>Do Withdraw</h2>

            <h3>201549.16 COMPOUND 1 Available</h3>

           <InputWapStyle>
               <div className={'start'}>
                   <TextField
                       fullWidth={true}
                       name={'amount'}
                       inputRef={register({
                           required: 'no Enter the number is dame',
                           maxLength: {value: 10, message: 'Enter the number'},
                       })}
                   />
               </div>

               <span>COMPOUND 1</span>
                <div className={'lash'} onClick={() =>{
                    setValue('amount', '10000')
                }}>
                    Max
                </div>
           </InputWapStyle>

           <Grid container spacing={4} justify={"flex-end"}>
               <Grid item md={3} sm={12}>
                   <ButtonWidget text={"Cancel"} onClick={onDismiss} type={"border"}/>
               </Grid>
               <Grid item md={3} sm={12}>
                   <ButtonWidget text={"Confirm"} type={"img"}/>
               </Grid>

           </Grid>
       </ConfirmationStyle>
   );
}


const InputWapStyle = styled.div`
  height: 50px;
  background: #162C75;
  border: 1px solid #284192;
  box-shadow: 0 0 95px 0 rgba(45, 70, 146, 0.13);
  border-radius: 4px;
  padding: 7px;
  box-sizing: border-box;
  margin: 10px 0 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(118, 136, 183, 1);
  .start{
    flex: 1;
    .MuiInputBase-root{
      color:rgba(255, 255, 255, 1);
    }
  }
  .lash {
    background-color: rgba(14, 33, 96, 1);
    padding: 5px 15px;
    border-radius: 5px;
  }
  span{
    font-size: 14px;
    font-weight: 600;
    color: #7688B7;
    display: inline-block;
    padding: 0 10px;
  }
`

const ConfirmationStyle = styled.div`
    background: rgba(22, 31, 87, 1);
    border-radius: 5px;
    width: 100vw;
    max-width: 600px;
    ${WidthStyle.PaddingSize};
    h2{
      font-size: 18px;
      font-weight: 600;
      color: #7688B7;
      text-align: center;
      margin-bottom: 30px;
    }
  h3{
    font-size: 14px;
    font-weight: 600;
    color: #4F6294;
    text-align: right;
  }
`




