import React from "react";
import styled, {css} from 'styled-components'
import {NavLink} from 'react-router-dom'
import {useAirDropFn} from "../../hook/use_airdrop";
import {AppConfig} from "../../config";
import {Grid, Hidden} from "@material-ui/core";

export const NavWidget: React.FC = () => {
    const onAir = useAirDropFn();

    return (
        <Grid container item md={8} sm={12} xs={12} justify={"flex-end"}>
            <Grid item md={11} sm={12} xs={12}>
                <WapStyle>
                    <StyledLink to="/cover">Purchase</StyledLink>
                    <StyledLink to="/start_mining">Capital Mining</StyledLink>
                    <StyledLink to="/start_list">Underwriting</StyledLink>
                    <Hidden only="xs">
                        <StyledLink to="/referral">Agent</StyledLink>
                    </Hidden>
                    <StyledA href="https://docs.nsure.network/nsure-network/manual" target={'_balck'}>Manual</StyledA>

                    <StyledA href="https://nsure.network/#/stats" target={'_balck'}>Stats</StyledA>
                    <Hidden only="xs">
                        <AirDropStyle onClick={onAir}>
                            Claim Extra Reward
                        </AirDropStyle>
                    </Hidden>
                </WapStyle>
            </Grid>
            <Hidden smUp>
                <div style={{height:"10px",width:"10px"}}/>
                <Grid container sm={12} xs={12} justify={"space-between"}>
                    <Grid item xs={3}>
                        <StyledLink to="/referral">Referral</StyledLink>
                    </Grid>
                    <Grid item xs={6}>
                        <AirDropStyle onClick={onAir}>
                            Claim Extra Reward
                        </AirDropStyle>
                    </Grid>


                </Grid>
            </Hidden>


        </Grid>

    );
}


const WapStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  @media (max-width: 768px) {
    justify-content: space-around;
  }
`
const AirDropStyle = styled.div`
  display: inline-block;
  border-radius: 4px;
  padding: 1px 16px;
  color: #fff;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  background: #2344EE;
  font-weight: bold;
  cursor: pointer;
  @media (max-width: 768px) {
    height: 22px;
    line-height: 22px;
  }
`

const StyledLink = styled(NavLink)`
  ${() => Herf}
`;
const StyledA = styled.a`
  ${() => Herf};
`;

const Herf = css`
  color: #9C97AC;
  font-weight: 700;


  text-decoration: none;

  &:hover {

  }

  &.active {

    background: linear-gradient(90deg, #CE45C5 0%, #5592E8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

  }

  @media (max-width: 768px) {
    margin-right: 0;
    font-size: 14px;

  }
`
