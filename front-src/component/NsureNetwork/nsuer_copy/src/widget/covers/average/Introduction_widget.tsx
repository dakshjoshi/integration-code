import React, {useCallback, useEffect, useState} from "react";
import {CoverPeriodWapStyle} from "./cover_period_widget";
import {BorderWidget, ButtonWidget} from "../../base";
import {ListCellStyle, ListCellWidget} from "../../base/list_cell_widget";
import styled from "styled-components";
import {UrlHaxFormat, UseUrlData} from "../../../utils/url";

import balancerImage from "../../../assets/imgs/balancer.png"
import {formatAddress, getBalanceFormat, getBalanceNumber} from "../../../utils/formatBalance";
import {ProductInformationInterface} from "../../../interface/product_interface";
import {AppConfig} from "../../../config";
import {CircularProgress} from "@material-ui/core";
import {StartTextWidget} from "../../base/start_widget";
import {useLocation} from "react-router-dom";
import {HttpServer} from "../../../net/http_server";
import copy from 'copy-to-clipboard';

import {CopyTisWidget} from "../../modal/copy_tis_widget";


export const IntroductionWidget: React.FC<{ urlData: ProductInformationInterface }> = ({urlData}) => {

    const hrefFn = useCallback((url: string) => {
        window.open(url, '_blank');
    }, []);
    const location = useLocation();
    const [rHref, setRHref] = useState('');
    useEffect(() => {
        let host = window.location.host;
        setRHref(`https://${host}/#${location.pathname}?r=${HttpServer.account}`);
    }, [])

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    return (
        <CoverPeriodWapStyle>
            <CopyTisWidget open={open} handleClose={handleClose} />

            <BorderWidget>
                <ImageLabelStyle><img src={AppConfig.urlPath + urlData?.logo?.filename || balancerImage} alt=""/>
                    <h2>{urlData.name}</h2></ImageLabelStyle>
            </BorderWidget>
            <InnerStyle>
                <ListCellWidget onClick={() => hrefFn(UrlHaxFormat(urlData.address, "address"))} label={"Address:"}
                                last={formatAddress(urlData.address || '')}
                />
                <ListCellWidget label={"Website:"}
                                last={urlData.website}
                                onClick={() => hrefFn(urlData.website)}
                />
                <ListCellWidget label={"Capacity:"}
                                last={getBalanceFormat(urlData.coverAvailableAmount || 0) + " ETH"}/>

                <ListCellStyle color={'#FFFFFF'}>
                    <h3>Security Rating:</h3>
                    {
                        urlData.risLevel === null ? <CircularProgress/> :
                            <StartTextWidget startNumber={urlData.risLevel}
                                             size={10}
                                             grade={urlData.risLevel}/>
                    }

                </ListCellStyle> <ListCellStyle color={'#FFFFFF'}>
                <h3>Invite Others And Get Referral Bonus</h3>
                {
                    <ButtonWidget text="Copy Link" type="submit" onClick={() => {
                        copy(rHref);
                        handleClick();
                    }
                    }/>
                }

            </ListCellStyle>

                {/*<ListCellStyle color={'#FFFFFF'}>*/}
                {/*    <h3>我的邀请链接</h3>*/}
                {/*    {rHref}*/}

                {/*</ListCellStyle>*/}

            </InnerStyle>

        </CoverPeriodWapStyle>
    );
}

const InnerStyle = styled.div`
  padding: 0 30px;
  box-sizing: border-box;
`;


const ImageLabelStyle = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #FFFFFF;
  display: flex;
  align-items: center;

  img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-right: 10px;
  }
`;
