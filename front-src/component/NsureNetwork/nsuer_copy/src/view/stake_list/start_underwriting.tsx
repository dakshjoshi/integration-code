import React from "react";

import {Grid} from "@material-ui/core";
import styled from "styled-components";
import {CardStyle} from "../../widget/style/card_style";
import {SpacingWidget} from "../../widget/base";
import {BottomWidget, TitleLeftWidget, TitleRightWidget} from "../../widget/stake_list";
import {RmPaddingWidget} from "../../widget/base/rm_padding";


export const StartUnderwritingPage:React.FC = () =>{

    return (
        <RmPaddingWidget>
            <Grid container spacing={4}>
                <Grid item md={8} sm={12} xs={12}>
                    <WapStyle style={{height:"100%"}}>
                        <TitleLeftWidget />
                    </WapStyle>
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                    <WapStyle>
                        <TitleRightWidget />
                    </WapStyle>
                </Grid>
            </Grid>


            <SpacingWidget />

            <SpacingWidget />
            <WapStyle>
                <BottomWidget />
            </WapStyle>
        </RmPaddingWidget>
    );
}



const WapStyle = styled.div`
${CardStyle.wap};
  height: 100%;
  
`



