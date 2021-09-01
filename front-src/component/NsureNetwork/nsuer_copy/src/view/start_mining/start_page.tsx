import React, {useContext} from "react";
import {BorderWidget, ButtonWidget} from "../../widget/base";
import styled from "styled-components";
import {StakeCenterWidget} from "../../widget/start_mining";
import {Grid} from "@material-ui/core";
import {WidthStyle} from "../../widget/style/width_style";
import {DashboardCard} from "../../widget/start_mining/dashboar/dashboard_card";
import {StartMiningContext} from "./index";
import {CradCentext} from "./choose_page";
import {useWait} from "../../utils/wait_fn";
import {HttpServer} from "../../net/http_server";


export const StartPage: React.FC = () => {
    const {listModel} = useContext(StartMiningContext);


    return (
        <StartStyle>

            <StakeCenterWidget/>
            <BottomStyle size={{x: 30, y: 30}}>
                <Grid container spacing={3}>
                    {
                        listModel.map((ev, index) => {
                            return (
                                <CradCentext.Provider  key={index+'provider'} value={ev}>
                                    <Grid item key={index} md={4} sm={6} xs={12}>
                                        <DashboardCard />
                                    </Grid>
                                </CradCentext.Provider>

                            )
                        })
                    }
                </Grid>
            </BottomStyle>
        </StartStyle>
    );
}


const StartStyle = styled.div`
  background-color: ${({theme}) => theme.bgColor.main};
`


const BottomStyle = styled.div`
  ${WidthStyle.PaddingSize};
  border-top: 1px solid ${({theme})=> theme.color.whites['600']};
`
