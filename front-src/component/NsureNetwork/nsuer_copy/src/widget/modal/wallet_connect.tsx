import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {WidthStyle} from "../style/width_style";
import {Dialog, DialogTitle, Grid} from "@material-ui/core";
import metamaskLogo from '../../assets/imgs/metamask-fox.svg'
import walletLogo from '../../assets/imgs/wallet-connect.svg'
import ledgerLogo from '../../assets/imgs/ledger.svg'
import {ImageWidget} from "../base";
import {useWallet} from "../../use_wallet";
import {ModalProps} from "../../provider/model_provider";
import {Alert} from "@material-ui/lab";


export const WalletConnect: React.FC<ModalProps> = ({onDismiss}) => {
    const {connect, account,chainId, networkName,status} = useWallet();

    const [open, setOpen] = useState(false);
    const handleClose = (value: string) => {
        setOpen(false);
    };


    useEffect(() => {

        if (account && onDismiss) {
            onDismiss();
        }

    }, [account, onDismiss]);

    const connectFn = useCallback(async (id: any) => {

        await connect(id);
    }, [chainId]);


    return (<WalletStyle size={{all: 20}}>
        <Grid container spacing={3}>
            <WalletCard img={metamaskLogo} onClick={async () => {
                //@ts-ignore
                if (window['ethereum'].networkVersion != chainId) {
                    setOpen(true);
                    return;
                }
                await connectFn('injected')
            }} title={`Metamask`} sub={`Connect to Your Metamask Wallet`}/>

            <WalletCard
                onClick={async () => {
                    await connectFn('walletconnect')
                }}
                img={walletLogo}
                title={`Wallet Connect`}
                sub={`Connect to you Wallet Connect`}
            />

        </Grid>
        <Dialog onClose={handleClose} open={open}>
            <Alert severity="error"> Please switch to {networkName} network!</Alert>
        </Dialog>
    </WalletStyle>);
}


const WalletCard: React.FC<{ img: string, title: string, sub: string, onClick: Function }> = ({
                                                                                                  img,
                                                                                                  title,
                                                                                                  sub,
                                                                                                  onClick,
                                                                                              }) => {
    return (

        <Grid item md={6} sm={12} xs={12} onClick={() => onClick()}>
            <WalletCardStyle size={{all: 20}}>
                <ImageWidget url={img} size={80}/>
                <h2>{title}</h2>
                <h3>{sub}</h3>
            </WalletCardStyle>
        </Grid>
    );
}


const WalletCardStyle = styled.div`
  width: 100%;
  height: 100%;
  ${WidthStyle.PaddingSize};
  border-radius: 5px;
  background-color: rgba(255, 255, 255, .48);

  display: flex;
  flex-flow: column;
  align-items: center;

  h2 {
    font-size: 20px;
    font-weight: bold;
    color: ${({theme})=> theme.color.black['100']};
    margin: 30px 0;
  }

  h3 {
    font-size: 14px;
    font-weight: 400;
    color: #4F6294;

  }
`


const WalletStyle = styled.div`
  //background: rgba(22, 31, 87, 1);
  border-radius: 5px;
  width: 100vw;
  max-width: 600px;
  ${WidthStyle.PaddingSize};

  background: linear-gradient(270deg, #9AD6FF 0%, #B49EFF 100%);
  box-shadow: 0px 3px 14px 0px rgba(0, 0, 0, 0.11);
`
