import React, {useCallback, useEffect} from "react";
import {LogoWidget} from "./logo_widget";
import styled from "styled-components";
import {WidthStyle} from "../style/width_style";
import {NavWidget} from "./nav_widget";
import {Grid} from "@material-ui/core";
import {UseUrlData} from "../../utils/url";
import {INVITATIONCODE} from "../covers/average/cover_model";
import {useLocation} from "react-router-dom";

export const HeaderWidget: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        let _data = new URLSearchParams(location.search).get('r');
        console.log(_data);
        if (_data) {
            sessionStorage.setItem(INVITATIONCODE, _data)
        }
    }, [location])
    return (
        <HeaderStyle container>
            <LogoWidget/>
            <NavWidget/>
        </HeaderStyle>
    );
}


const HeaderStyle = styled(Grid)`
  display: flex;
  min-height: 10vh;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  ${WidthStyle.MaxWidth};

`
