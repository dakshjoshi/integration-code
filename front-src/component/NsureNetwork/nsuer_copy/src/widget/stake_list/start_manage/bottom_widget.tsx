import React, {useContext, useMemo, useState} from "react";
import {useStakeFn} from "../../../view/stake_list/fn/unstake";
import {inputMapType} from "../../../utils/max";
import {SearchInterfacer, SearchListWidget} from "../../search_list/search_list";
import {formatAddress, getBalanceFormat, getBalanceNumber} from "../../../utils/formatBalance";
import {UnstakeFormattedInputs} from "../stake_under/formatted_input";
import {ButtonWidget} from "../../base";
import styled from "styled-components";
import {StartManage} from "../../../view/stake_list/start_manage";
import Countdown from "react-countdown";
import {black} from "../../../theme/colors";

export const BottomWidget: React.FC = () => {
    const [unStake] = useStakeFn();
    const {refresh, setRefresh, inputMap, setInputMap, setList} = useContext(StartManage);


    // @ts-ignore
    return (
        <>
            <SearchListWidget title={"My Portfolio List"}
                              url={'/stake/list'}
                              isShowSearch={false}
                              sub={``}
                              refresh={refresh}
                              onGetData={(ev)=>setList(ev['list'])}
                              structure={(ev: any) => [
                                  {
                                      inner: ev.name,
                                      url: ev.logo.filename,
                                      color: black['300'],

                                      type: 'Imagelabel',
                                      size: 28
                                  },
                                  {
                                      inner: getBalanceFormat(ev.amount, 2),
                                      color: black['300'],

                                      textAlign: "end",
                                  },
                                  {
                                   inner:"",
                                  },
                                  {
                                      inner: '',
                                      color: black['300'],

                                      textAlig:'end',
                                      children: <UnstakeFormattedInputs
                                          width={'100%'}
                                          value={inputMap[ev.product]}
                                          max={getBalanceNumber(ev.amount).toString()}
                                          inputMap={inputMap}
                                          setInputMap={setInputMap}
                                          address={ev.product}
                                      />
                                  },
                                  {
                                      inner: getBalanceFormat(ev.pending, 2),
                                      color: black['300'],
                                      textAlign: "end",
                                  },

                                  {
                                      inner: '',
                                      color: black['300'],
                                      textAlign:"end",
                                      children: new Date().getTime() > ev.lockAt || !ev.lockAt ? <span> -</span> :
                                          <CountdownStyle date={new Date(ev.lockAt)}/>
                                  },

                              ]}
                              confirm={async (ev: SearchInterfacer) => {
                                  let _status = await unStake(inputMap)
                                  if(_status){
                                      setInputMap({})
                                      setRefresh(new Date().getTime());
                                  }
                              }}
            >
                <div>Protocol</div>
                {/*<div>Provided Capacity(ETH)</div>*/}
                <div style={{textAlign:'end'}}>Staked Balance</div>
                <div />
                <div style={{textAlign:'start'}}>Unstake</div>

                <div style={{textAlign:'end'}}>Locked Amount</div>
                <div style={{textAlign:'end'}}>Lock Time</div>
            </SearchListWidget>

        </>
    );
}


const CountdownStyle = styled(Countdown)`
  > span {
    color: white;
  }
`
const ButtonStyle = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: flex-end;
  width: 80%;

`
