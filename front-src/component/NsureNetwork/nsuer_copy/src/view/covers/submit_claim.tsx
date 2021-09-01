import React from "react";
import styled from "styled-components";
import {CardWdiget} from "../../widget/covers";
import {Grid} from "@material-ui/core";
import {DescriptionWidget} from "../../widget/covers/submit_claim/description";


export const SubMitClaimPage:React.FC = () =>{

    return (
        <WapStyle>


            <Grid container justify={"center"}  spacing={4}>
                <Grid  item xs={12} sm={12} md={6}>
                    <CardWdiget />
                </Grid>

                <Grid  item sm={12} md={6}>
                    <DescriptionWidget />
                </Grid>
            </Grid>
        </WapStyle>
    );
}


const WapStyle = styled.div`
  //background-color: ${({theme}) => theme.bgColor.main};

  border-radius:0 4px 4px 4px;
overflow: hidden;
`

const MainBodyStyle = styled.div`
padding: 30px;
box-sizing: border-box;
`
