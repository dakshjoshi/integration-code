import React, {useContext} from "react";
import {Grid, Hidden} from "@material-ui/core";
import styled from "styled-components";
import {StartContext} from "../../../view/stake_list";
import {ValueWidget} from "../../base";
import {getBalanceNumber} from "../../../utils/formatBalance";
import {LineStyle} from "../../style/item_style";


export const CenterWidget: React.FC = () => {
    const {leverage,apy,powerLeft} = useContext(StartContext)
    return (
        <GridWap container justify={"space-around"} alignItems={"center"}>
            <ItemWidget label={"Staking Power Left"} unit={""} value={getBalanceNumber(powerLeft).toString() || '--'}/>
            <Grid item sm={1}>
                <LineStyle/>
            </Grid>
            <ItemWidget label={"Leverage Used"} unit={"%"} value={leverage || '--'}/>
            <Grid item sm={1}>
                <LineStyle/>
            </Grid>
            <ItemWidget label={"Total Premium Rate"} unit={"%"} value={parseFloat(apy).toFixed(2) || '--'}/>
        </GridWap>
    );
}

export const ItemWidget: React.FC<{ label: string, value: string, unit: string }> = ({label, value, unit}) => {
    return (
        <Grid item md={3} sm={3} xs={12}>
            <ItemStyle>
                <h2>{label}</h2>
                <h3><ValueWidget value={parseFloat(value) || 0} decimals={2}/> <span>{unit}</span></h3>
            </ItemStyle>
        </Grid>
    );
}

const GridWap = styled(Grid)`
  box-sizing: border-box;
  flex: 1;
  background-color: ${({theme}) => theme.color.whites['100']};
  border-radius: 4px;
`

const ItemStyle = styled.div`
  text-align: center;
  padding: 15px 0;
  //background-color: rgba(22, 44, 117, 1);
  border-radius: 5px;

  h2 {
    font-size: 14px;
    font-weight: 400;
    color: ${({theme}) => theme.color.black["100"]};
    opacity: 0.6;
  }

  h3 {
    font-size: 36px;
    font-weight: 500;
    color: ${({theme}) => theme.color.black["100"]};

    line-height: 1;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    div{
      font-size: 20px;
      margin-right: 5px;
    }
    span {
      font-size: 20px;
    }
  }
`


const LinkStyle = styled.div`
  height: 50px;
  width: 1px;
  background-color: rgba(32, 42, 105, 1);

  @media (max-width: ${({theme}) => theme.md}) {
    display: none;
  }

`
