import React from "react";
import styled from "styled-components";
import {HttpStatus} from "../../utils/wait_fn";
import {CircularProgress} from "@material-ui/core";
import {ValueWidget} from "./value";
import {whites} from "../../theme/colors";


export const ListCellWidget: React.FC<{
    label: string,
    last: string,
    color?: string,
    status?: HttpStatus,
    onClick?: Function,
}> = ({
          label,
          color,
          last,
          status = HttpStatus.success,
          onClick,
      }) => {

    return (
        <ListCellStyle isPointer={onClick != null} color={color || whites["300"]} onClick={() => onClick && onClick()}>
            <h3>{label}</h3>
            {
                status == HttpStatus.wait ? <CircularProgress/> : <h4>{last}</h4>
            }


        </ListCellStyle>
    );
}


export const ListCellStyle = styled.div<{ color: string,isPointer?:boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid ${({theme}) => theme.color.whites['700']};

  cursor: ${({isPointer})=> isPointer?"pointer":""};
  h3 {
    font-size: 14px;
    //font-weight: 400;
    color: ${({theme})=>theme.color.whites['800']};
  }

  h4 {
    font-size: 14px;
    font-weight: bold;
    line-height: 18px;
    color: ${({color}) => color} !important;


  }
`
