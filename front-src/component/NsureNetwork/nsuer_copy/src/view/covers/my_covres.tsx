import React, {useContext, useEffect, useState,} from "react";
import {ButtonWidget, BorderWidget} from '../../widget/base'
import {NsuerStakingWidget} from "../../widget/covers";
import styled from "styled-components";
import {CoversProvider} from "../../provider/covers_provider";

import {ModalContext} from "../../provider/model_provider";
import {ProductInformation} from "../../widget/modal/product_information_widget";
import {SearchListWidget} from "../../widget/search_list/search_list";

import {useWait} from "../../utils/wait_fn";
import {HttpServer} from "../../net/http_server";
import {formatAddress, getBalanceFormat} from "../../utils/formatBalance";

import {UrlHaxFormat, UrlHerf} from "../../utils/url";
import {AppConfig} from "../../config";
import {black, blues} from "../../theme/colors";

export const MyCoversPage: React.FC = () => {
    return (<CoversProvider>
        <ChilderWidget/>
    </CoversProvider>);
}

const ChilderWidget: React.FC = () => {
    const {data, request} = useWait(HttpServer.amount);
    useEffect(() => {
        request('');
    }, [])


    return (
        <div style={{minHeight: "64vh"}}>
            <ListWapStyle>
                <BorderWidget>
                    <h2/>
                    <ButtonWidget to="/cover/all" text="My Policies" type="img"/>
                </BorderWidget>
                <NsuerStakingWidget data={data || {}}/>
            </ListWapStyle>

            <div style={{height: '29px'}}/>
            <ListWapStyle>
                <MyListWidget/>

            </ListWapStyle>

        </div>
    )
}


const MyListWidget: React.FC = () => {
    const {onPresent} = useContext(ModalContext);
    const [refresh, setRefresh] = useState(new Date().getTime());

    return (
        <SearchListWidget
            url={"/cover/list"}
            title={"Protocols"}
            item={40}
            structure={(ev) => {
                              return [
                                  {
                                      inner: ev.name,
                                      url: ev.logo.filename,
                                      color: black["300"],
                                      type: 'Imagelabel',
                                      size: 28
                                  },
                                  {
                                      inner: formatAddress(ev.address),
                                      color: blues["100"],
                                      onClick: () => {
                                          window.open(UrlHaxFormat(ev.address, 'address'), '_blank');
                                      }
                                  },
                                  {
                                      inner: ev.risLevel && ev.risLevel.toString(),
                                      color: black["300"],
                                      type: 'grade',
                                      grade: ev.risLevel,
                                      onClick: () => {
                                          onPresent(<ProductInformation
                                              address={ev.address}
                                              imgName={AppConfig.urlPath + ev.logo.filename}
                                              {...ev}
                                          />)
                                      }
                                  },
                                  {

                                      inner: getBalanceFormat(ev.coverAvailableAmount) > 1 ? getBalanceFormat(ev.coverAvailableAmount) + " ETH" : "No Capacity Available",
                                      color: getBalanceFormat(ev.coverAvailableAmount) > 1 ? black["300"] : 'red',

                                  },
                                  {
                                      inner: parseFloat(ev.premiumRate) > 0 ? ev.premiumRate && ev.premiumRate.toFixed(4) + " ETH" :"N/A",
                                      color: black["300"],
                                  },
                                  {
                                      inner: '',
                                      type: null,

                                      children: <div onClick={() => {
                                          UrlHerf.setDara = ev;
                                      }}>
                                          <ButtonWidget key={ev.id}
                                                        to={`/cover/average_premium/${ev.uid}`}
                                                        text="Quote"
                                                        type="color"
                                                        disable={getBalanceFormat(ev.coverAvailableAmount) < 1}
                                          />
                                      </div>

                                  }
                              ];
                          }}
            isShowPagination={true}
        >
            <div>Protocol</div>
            <div>Address</div>
            <div>Security Rating</div>
            <div>Available Capacity</div>
            <div>Estimated Cost <br/>(1 ETH for 30 days)</div>
            <div/>
        </SearchListWidget>
    );
}


const ListWapStyle = styled.div`
  background-color: ${({theme}) => theme.bgColor.main};
  border-radius: 0 4px 4px 4px;
  overflow: hidden;
`;








