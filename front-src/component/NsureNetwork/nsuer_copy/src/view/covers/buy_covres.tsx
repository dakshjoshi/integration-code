import React, {useState} from "react";
import {ButtonStyle, ButtonWidget} from '../../widget/base'
import {TabWidget, ListTopWidget, BuyListMain} from "../../widget/covers";
import styled from "styled-components";
import {CoversProvider} from "../../provider/covers_provider";
import {Redirect, Route, Switch} from "react-router-dom";
import {AliasEnum, ClaimsCellInterface} from "../../interface/covers_interface";
import {useHistory,} from 'react-router-dom';
import {RewardsWidget} from "./rewards";
import {SearchListWidget} from "../../widget/search_list/search_list";
import {formatAddress, getBalanceNumber} from "../../utils/formatBalance";
import {DateUtils} from "../../utils/date";
import {SimpleDialog} from "../../widget/base/nav_header_widget";
import {blues} from "../../theme/colors";
import {zhao} from "../../net/api";
import { HttpServer } from "../../net/http_server";
import {InvitationWidget} from "./Invitation_list";

export const BuyCoversPage: React.FC = () => {
    return (<CoversProvider>
        <ChilderWidget/>
    </CoversProvider>);
}

const ChilderWidget: React.FC = () => {


    const [open, setOpen] = React.useState(false);

    return (
        <div style={{minHeight: "64vh"}}>
            <CoversHeader>
                <TabWidget/>
                <ButtonWidget to="/cover/my" text="Purchase" type="border"/>
            </CoversHeader>
            <ListWapStyle>
                <Switch>
                    <Route path={`/cover/all/${AliasEnum.Active}`} exact>
                        <ActiveWidget setOpen={() => setOpen(true)}/>
                    </Route>
                    <Route path={`/cover/all/${AliasEnum.Inactive}`} exact component={InActiveWidget}/>

                    <Route path={`/cover/all/${AliasEnum.Claims}`} exact component={ClaimsWidget}/>

                    <Route path={`/cover/all/${AliasEnum.Rewards}`} exact component={RewardsWidget}/>
                    <Redirect to={`/cover/all/${AliasEnum.Active}`}/>
                </Switch>
            </ListWapStyle>
            <SimpleDialog selectedValue={'selectedValue'} open={open} onClose={() => setOpen(false)}/>

        </div>
    )
}


const ActiveWidget: React.FC<{ setOpen: Function }> = ({setOpen}) => {
    const history = useHistory();

    return (
        <>

            <SearchListWidget structure={(ev: any) => [
                {
                    inner: ev.name,
                    url: ev?.logo?.filename || '',
                    color: blues["100"],

                    type: 'Imagelabel',
                    size: 28
                },
                {
                    inner: getBalanceNumber(ev.amount) + " ETH",
                    color: blues["100"],

                },
                {
                    inner: getBalanceNumber(ev.cost, 4) + " ETH",
                    color: blues["100"],

                },
                {
                    inner: `${DateUtils.dataMinuteString(ev.begin * 1000)}`,
                    color: blues["100"],

                },
                {
                    inner: `${DateUtils.dataMinuteString(ev.end * 1000)}`,
                    color: blues["100"],

                },
                {
                    inner: 'Claim',
                    color: "#3DB3F4",
                    textAlign: "center",
                    onClick: () => {
                        history.push('/cover/sub_mit_claim_page?data=' + JSON.stringify(ev),);
                    },

                }
            ]} isShowHeader={false} url={"/cover/user-list"} params={{'model': '0'}}>
                <div>Protocol</div>
                <div>Insured Amount</div>
                <div>Cost</div>
                <div>Start</div>
                <div>End</div>
                <div>Action</div>
            </SearchListWidget>

        </>
    );
}


const InActiveWidget: React.FC = () => {
    const history = useHistory();

    return (
        <>
            <SearchListWidget structure={(ev: any) => [

                {
                    inner: ev.name,
                    url: ev?.logo?.filename || '',
                    color: blues["100"],

                    type: 'Imagelabel',
                    size: 28
                },
                {
                    inner: getBalanceNumber(ev.amount) + " ETH",
                    color: blues["100"],

                },
                {
                    inner: getBalanceNumber(ev.cost, 4) + " ETH",
                    color: blues["100"],

                },
                {
                    inner: `${DateUtils.dataMinuteString(ev.begin * 1000)}`,
                    color: blues["100"],

                },
                {
                    inner: `${DateUtils.dataMinuteString(ev.end * 1000)}`,
                    color: blues["100"],

                },
                // {
                //     inner: ' ',
                //     color: "#3DB3F4",
                //     textAlign: "center",
                //     onClick: () => {
                //         // history.push('/cover/sub_mit_claim_page?data=' + JSON.stringify(ev),);
                //     }
                // }
            ]} isShowHeader={false} url={"/cover/user-list"} params={{'model': '1'}}>
                <div>Protocol</div>
                <div>Cover Amount</div>
                <div>Cost</div>
                <div>Start</div>
                <div style={{textAlign:"start"}}>End</div>
                {/*<div/>*/}
                {/*<div>Status</div>*/}
            </SearchListWidget>


        </>
    )
        ;
}


const ClaimsWidget: React.FC = () => {
    const history = useHistory();
    return (
        <>
            <SearchListWidget  structure={(ev: any) => [
                {

                    inner: ev.claim_id,
                    color: blues["100"],
                    type: 'text',
                    size: 28
                },
                {
                    inner: DateUtils.dataString(ev.submit_at),
                    color: blues["100"],
                    type: 'text',
                },
                {
                    inner: ev.product,
                    color: blues["100"],
                    type: 'text',
                },
                {
                    inner: ev.status,
                    color: blues["100"],
                },

            ]} isShowHeader={false} net={zhao} url={"/api/claimListUser"} params={{'userId': HttpServer.account}}>
                    <div>Claim ID</div>
                    <div>Time Submitted</div>
                    <div>Project</div>
                    <div style={{textAlign:"start"}}>Status</div>
            </SearchListWidget>
        </>
    );
}



const CoversHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`


const ListWapStyle = styled.div`
  background-color: ${({theme}) => theme.bgColor.main};
  border-radius: 0 4px 4px 4px;
  overflow: hidden;
`;
