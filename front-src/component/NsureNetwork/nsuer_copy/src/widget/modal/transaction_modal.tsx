import {HttpStatus} from "../../utils/wait_fn";
import React, {useEffect, useState} from "react";
import {CircularProgress, Divider} from "@material-ui/core";
import styled from "styled-components";
import {useModel} from "../../hook/use_model";
import {ButtonWidget} from "../base/button";
import successImg from '../../assets/imgs/success.png'
import {UrlHaxFormat} from "../../utils/url";

export const TransactionModal: React.FC<{ txHash: any, status: HttpStatus, onDismiss?: any }> = ({
                                                                                                    txHash,
                                                                                                    children,
                                                                                                    onDismiss,
                                                                                                    status
                                                                                                }) => {

    const [widget, setWidget] = useState<any>(children);

    useEffect(() => {
        if (status == HttpStatus.failure) {
            if (txHash.err.code && txHash.err.code === 4001) {
                onDismiss()
            }
            setWidget(<ErrWidget msg={txHash.err.message} />)
        }
        if (status == HttpStatus.wait) {
            setWidget(<WapStyle><LoadingWidget/></WapStyle>)
        }
        if (status == HttpStatus.success) {
            setWidget(<SuccessWidget onDismiss={onDismiss} hash={txHash}/>)
        }


    }, [status])
    return (
        <div>
            {widget}
        </div>
    );
}



export const HttpServerModal: React.FC<{ data: any, status: HttpStatus, onDismiss?: any }> = ({
                                                                                                  data,
                                                                                                     children,
                                                                                                     onDismiss,
                                                                                                     status
                                                                                                 }) => {

    const [widget, setWidget] = useState<any>(children);

    useEffect(() => {
        if (status == HttpStatus.failure) {
            if (data.err.code && data.err.code === 4001) {
                onDismiss()
            }
            console.log(data);
            setWidget(<ErrWidget msg={data.msg} />)
        }
        if (status == HttpStatus.wait) {
            setWidget(<WapStyle><LoadingWidget/></WapStyle>)
        }
        if (status == HttpStatus.success) {
            // setWidget(<SuccessWidget hash={txHash}/>)
        }


    }, [status])
    return (
        <div>
            {widget}
        </div>
    );
}


const SuccessWidget: React.FC<{hash:string, onDismiss:any}> = ({hash,onDismiss}) => {
    // const [ onDismiss] = useModel(<div/>);
    return (
        <WapStyle>
            <span> </span>

            <img className={'success'} src={successImg} alt=""/>

            <LoadingStyle>
                <h2>Transaction Submitted</h2>

                <a href={UrlHaxFormat(hash,'tx')} target="_blank">View on Etherscan</a>
                <SuccessButtonWidget onClick={onDismiss}>Close</SuccessButtonWidget>

            </LoadingStyle>
        </WapStyle>
    );
}

const LoadingWidget: React.FC = () => {
    return (
        <WapStyle>
            <span> </span>
            <CircularProgress size={100} style={{color:"#bfdfff"}}/>
            <LoadingStyle>
                <h2>Waiting For Confirmation</h2>
                <h4>Confirm this transaction in your wallet</h4>
            </LoadingStyle>
        </WapStyle>
    );
}


export const ErrWidget:React.FC<{msg:string}> = ({msg}) =>{
    useEffect(()=>{console.log(msg)},[])
    return (
        <WapStyle>
            <LoadingStyle>
                {/*<h2>{msg}</h2>*/}
                <h2>Err:{msg}</h2>
            </LoadingStyle>
        </WapStyle>
    );
}



const SuccessButtonWidget = styled.div`
display: inline-block;
  padding:  5px 20px;
  background: rgba(255,255,255,.81);
  
  font-size: 16px;
  font-weight: 400;
  color: #1508D2;
`
const LoadingStyle = styled.div`
  text-align: center;
  margin-top: 20px;

  h2 {
    font-size: 18px;
    font-weight: 600;
    color: #FFFFFF;
  }

  h3,a {
    font-size: 14px;
    font-weight: 400;
    color: #FFFFFF;
    padding: 5px 0 20px 0 ;
    display: block;
  }

  h4 {
    font-size: 14px;
    font-weight: 400;
    color: #ABBDEC;
  }
`

const WapStyle = styled.div`
  width: 100vw;
  max-width: 380px;
  //background-color: rgba(22, 31, 87, 1);
  background-image:linear-gradient(149deg, #123DB5,#5A42EC);
  border-radius: 5px;
  height: 325px;
  display: flex;
  flex-flow: column;
  //justify-content: center;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  box-sizing: border-box;

  .success{
    display: block;
    width: 90px;
  }

`;
