import React, {useCallback, useContext, useState} from "react";
import {ButtonWidget, SpacingWidget} from "../../base";
import {SearchInterfacer, SearchListWidget} from "../../search_list/search_list";
import {usePostStakeStake} from "../../../view/stake_list/fn/post_stake_stake";
import {formatAddress, getBalanceFormat, getBalanceNumber} from "../../../utils/formatBalance";
import {FormattedInputs} from "./formatted_input";
import {inputMapType} from "../../../utils/max";
import {ModalContext} from "../../../provider/model_provider";
import {ProductInformation} from "../../modal/product_information_widget";
import styled from "styled-components";
import balancerImage from "../../../assets/imgs/balancer.png";
import {ProductInformationInterface} from "../../../interface/product_interface";
import {AppConfig} from "../../../config";
import {black} from "../../../theme/colors";


export const BottomWidget: React.FC = () => {

    const [handlePostStakeStake] = usePostStakeStake()
    const [inputMap, setInputMap] = useState<inputMapType>({});
    const [refresh, setRefresh] = useState(new Date().getTime());


    const {onPresent} = useContext(ModalContext);


    return (
        <>
            <SearchListWidget url={"/stake/all"}
                              title={"Protocols"}
                              refresh={refresh}
                              structure={(ev) => {
                                  ev = ev as ProductInformationInterface;
                                  return [
                                      {
                                          inner: ev.name,
                                          url: ev.logo.filename,
                                          color: black['300'],
                                          type: 'Imagelabel',
                                          size: 28
                                      },

                                      {
                                          inner: ev.risLevel && ev.risLevel.toString(),
                                          color: black['300'],

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
                                          inner: (ev?.averagePremiumRate).toFixed(2) + "%",
                                          color: black['300'],
                                          textAlign: "center"

                                      },
                                      {
                                          inner: getBalanceFormat(ev.stakingPoolPower, 0),
                                          color: black['300'],

                                          textAlign: "end"

                                      },

                                      {
                                          inner: getBalanceFormat(ev.amount, 0),
                                          color: black['300'],

                                          textAlign: "end"
                                      },
                                      {
                                          inner: '',
                                          color: "#FFFFFF",
                                          textAlign:"end",
                                          children: <FormattedInputs inputMap={inputMap}
                                                                     value={inputMap[ev.uid] || null}
                                                                     setInputMap={setInputMap}
                                                                     address={ev.uid}
                                          />
                                      },
                                  ];
                              }}
                              confirm={async (ev: SearchInterfacer) => {

                                  let rec = () => ev.setPaginationModel({
                                      page: 1,
                                  });
                                  try{
                                      let _status = await handlePostStakeStake(inputMap, rec)
                                      if(_status){
                                          setInputMap({})
                                          setRefresh(new Date().getTime());
                                      }
                                  }catch (e) {
                                      console.log(e)
                                  }


                              }}
                              selectList={
                                  [
                                      {
                                          name: 'Protocol',
                                          key: "name",
                                          type:"string",
                                      },

                                      {
                                          name: 'Security Rating',
                                          key: "risLevel",
                                      },
                                      {
                                          name: 'Average Premium Rate',
                                          key: "premiumRate",
                                          justifyContent:"center"
                                      },
                                      {
                                          name: "Staking Pool",
                                          key: "stakingPoolPower",
                                          justifyContent: 'flex-end'
                                      },

                                      {
                                          name: "Staked Balance",
                                          key: "amount",
                                          justifyContent: 'flex-end'

                                      },

                                      {
                                          name: 'Underwrite',
                                          justifyContent: "flex-end"

                                      },

                                  ]
                              }
            >

            </SearchListWidget>
        </>
    );
}


