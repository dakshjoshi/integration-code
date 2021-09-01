import React from "react";
import styled from "styled-components";
import {List, MenuItem, Select} from "@material-ui/core";
import {useWeb3} from "../../../provider/web3_provider";

interface SelectInterFace {
    handleChange: (ev: React.ChangeEvent<{ value: unknown }>) => void,
    value: unknown,
    selectMap: string[],
}


export const SelectWidget: React.FC<SelectInterFace> = ({handleChange, value , selectMap}) => {
    return (<SelectStyle

        value={value}
        defaultValue={selectMap[0]}
        onChange={handleChange}

        MenuProps={{
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
            },
            transformOrigin: {
                vertical: "top",
                horizontal: "left"
            },
            getContentAnchorEl: null
        }}

    >
        {

            selectMap.map((ev) => <MenuItem key={ev} value={ev}>{ev}</MenuItem>)
        }
    </SelectStyle>);
}


const SelectStyle = styled(Select)`
  margin-left: 10px;
  background-color: transparent;

  .MuiSelect-icon {
    color: ${({theme})=>theme.color.blues["200"]};
  }

  .MuiInputBase-input {
    color: ${({theme})=>theme.color.blues["200"]};

  }
`
