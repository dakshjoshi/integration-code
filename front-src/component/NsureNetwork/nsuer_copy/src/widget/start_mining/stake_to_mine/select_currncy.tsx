import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import styled from "styled-components";
import {Select} from "@material-ui/core";
import {USDT} from "../../../nuser/token.config";


const options = [
    "ETH",
    USDT.toUpperCase(),
    // "BTC",
];

export const SimpleListMenu:React.FC<{setAge:Function,age:string}> = function ({setAge,age}) {
    // const [age, setAge] = React.useState('ETH');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    return (
        <WapStyle>
            <SelectStyle

                value={age}
                defaultValue={age}
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

                    options.map((ev) => <MenuItem key={ev}
                                                  value={ev}
                                                  // disabled={ev != 'ETH'}
                    >{ev}</MenuItem>)
                }
            </SelectStyle>
        </WapStyle>
    );
}

const SelectStyle = styled(Select)`
  background-color: rgba(22, 44, 117, 1); 
  border-radius: 5px;
  

  padding: 0 5px;
  margin-bottom: 10px;
  .MuiSelect-icon {
    color: #7688B7;
  }

  .MuiInputBase-input {
    color: #7688B7;
  }
`

const WapStyle = styled.div`
    display: flex;
  justify-content: flex-end;
  margin-top: -10px;
`



