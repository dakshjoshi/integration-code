import React, {createContext, useCallback, useContext, useEffect} from "react";
import {
    BorderStyle,
    ChooseBottomWidget,
    ChooseTopWidgte,
    MsgCellWidget
} from "../../widget/start_mining/choose/choose_top";
import styled from "styled-components";
import {ChooseCardWidget} from "../../widget/start_mining/choose/choose_card";
import {Grid} from "@material-ui/core";
import {ConvertCardInterface} from "../../interface/start_mining";
import {SpacingWidget} from "../../widget/base";

import {StartMiningContext} from "./index";


export const ChoosePages: React.FC = () => {


    const {listModel} = useContext(StartMiningContext);


    return (
        <div>
            <ChooseStyle>

                <ChooseTopWidgte/>
                <BottomStyle>
                    <Grid container spacing={3}>
                        {
                            listModel.map((ev, index) => {
                                    return (
                                        <CradCentext.Provider key={index + 'provider'} value={ev}>
                                            <GridStyle item md={4} sm={6} xs={12}>
                                                <ChooseCardWidget/>
                                            </GridStyle>
                                        </CradCentext.Provider>
                                    );
                                }
                            )
                        }
                    </Grid>
                    <SpacingWidget/>
                </BottomStyle>
                {/*<ChooseBottomWidget />*/}
            </ChooseStyle>

            <BottomTis>
                RISK DISCLAIMER: When depositing assets into the capital mining section, your capital is at risk. If
                MCR requirements drop below expected thresholds, part or all of your assets may be locked
                temporarily due to capital efficiency on the network. The capital pools are dependent on Nsure’s
                Surplus pool balancing, and may partially be utilised for coverage payouts if a statistically
                unlikely event of claim payouts occur.
            </BottomTis>
        </div>

    );
}


export const CradCentext = createContext<ConvertCardInterface>({
    tokenContract: null,

    changeContract: null,
    cardModel: null,
    bgColor: "",
    myStaked: "",
    nick: "",
    poolMCR: "",
    total: "",
    url: "",
    rewardUnit:""

});


const GridStyle = styled(Grid)`
  padding: 20px;
  box-sizing: border-box;
`

const BottomTis = styled.div`
  margin-top: 30px;
  padding: 15px 20px;
  box-sizing: border-box;
  background-color: #D9D9E8;
  font-size: 14px;
  font-weight: 400;
  font-style: italic;
  color: ${({theme}) =>theme.color.whites["300"]};
`

const ChooseStyle = styled.div`
  border-radius: 5px;
  background-color: ${({theme}) => theme.bgColor.main};
  //border: 1px solid rgba(32, 42, 105, 1);
`

const BottomStyle = styled.div`
  padding: 0 30px;
`

