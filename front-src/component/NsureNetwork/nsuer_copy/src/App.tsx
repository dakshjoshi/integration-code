import React, {useEffect, useState} from 'react';
import {HeaderWidget, FooterWidget, ButtonWidget, BorderWidget} from "./widget/base";
import {HashRouter as Router, Switch, Route, Redirect,} from "react-router-dom";
import {CoversPage} from "./view/covers";
import styled, {ThemeProvider} from "styled-components";
import {WidthStyle} from "./widget/style/width_style";
import {themes, theme} from "./theme";
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {ModelProvider} from "./provider/model_provider";
import {StartMiningPage} from "./view/start_mining";
import {StartListPage} from "./view/stake_list";
import {useWallet, UseWalletProvider} from './use_wallet'
import {WalletConnect} from "./widget/modal/wallet_connect";
import {Web3Provider} from "./provider/web3_provider";
import {BackdropProvider} from "./provider/backdrop_provider";
import {AppConfig} from "./config";
import PubBgImg from "./assets/imgs/pub_bg.png"
import {InvitationWidget} from "./view/covers/Invitation_list";


const App: React.FC = () => {

    return (
        <Provider>
            <div className="App">
                <Page/>
            </div>
        </Provider>


    );
}


const Provider: React.FC = ({children}) => {
    return (
        <UseWalletProvider chainId={AppConfig.chainId} connectors={{
            walletconnect: {rpcUrl: AppConfig.rpcUrl[AppConfig.chainId]},
            ledger: {url: AppConfig.rpcUrl[AppConfig.chainId]},

        }}>
            <ThemeProvider theme={theme}>
                <MuiThemeProvider theme={themes}>
                    <Web3Provider>
                        <BackdropProvider>
                            <ModelProvider>
                                {children}
                            </ModelProvider>
                        </BackdropProvider>

                    </Web3Provider>

                </MuiThemeProvider>

            </ThemeProvider>

        </UseWalletProvider>

    );
}


const Page: React.FC = () => {

    const {status} = useWallet();


    return (<PubBg>
        {
            status === 'connected' ? <Router>
                <HeaderWidget/>

                <MainStyle>

                    <Switch>
                        <Route path="/cover/">
                            <CoversPage/>
                        </Route>
                        <Route path="/start_mining/">
                            <StartMiningPage/>
                        </Route>
                        <Route path="/start_list/">
                            <StartListPage/>
                        </Route>
                        <Route path="/referral/">
                            <InvitationWidget/>
                        </Route>
                        <Route path="/stats">
                            {/*<UnNamePage/>*/}
                        </Route>
                        {/*<Route path="/">
                              </Route>*/}
                        <Redirect to="/start_mining/"/>

                    </Switch>
                </MainStyle>
                <FooterWidget/>
            </Router> : <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    height: '100vh'
                }}
            >
                <WalletConnect/>


            </div>

        }
    </PubBg>);
};


const MainStyle = styled.div`
  ${WidthStyle.MaxWidth};
  min-height: 70vh;
  margin: 40px auto 40px auto;

  @media (max-width: ${({theme}) => theme.lg}) {
    margin: 20px auto 20px auto;

    //margin: 20px auto 20px auto;
  }
  .airDrop {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
`;

const PubBg = styled.div`
    //background-image: url(${PubBgImg});
  background-size: 100% 100%;
  background-repeat: no-repeat;
`
export default App;
