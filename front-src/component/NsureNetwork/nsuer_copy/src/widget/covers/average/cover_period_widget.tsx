import styled from "styled-components";
import {BorderWidget, ButtonWidget, InputWidget, IsApprove, SpacingWidget} from "../../base";
import React, {useCallback, useContext, useEffect} from "react";
import {useForm} from "react-hook-form";
import {ListCellWidget} from "../../base/list_cell_widget";
import {SelectWidget} from "./select_widget";
import {ModalContext} from "../../../provider/model_provider";
import {CoverModal} from "./cover_model";
import {HttpServer} from "../../../net/http_server";
import {HttpStatus, useWait} from "../../../utils/wait_fn";
import {useWeb3} from "../../../provider/web3_provider";
import { numberToUint256} from "../../../utils/formatBalance";
import {ProductInformationInterface} from "../../../interface/product_interface";
import {useHistory} from "react-router-dom";
import {USDT} from "../../../nuser/token.config";
import {PidMap} from "../../../server/capita_stake_server";
import {CircularProgress} from "@material-ui/core";
import {LoadingWidget} from "../../base/button";

export const CoverPeriodWidget: React.FC<{ urlData: ProductInformationInterface }> = ({urlData}) => {
    const {register, handleSubmit, setValue, errors, watch} = useForm();
    const {onPresent} = useContext(ModalContext);

    const watchShowAge = watch("days", 0);
    const watchAmount = watch("Amount", 0);
    const [age, setAge] = React.useState('ETH');
    const history = useHistory();
    const {contrcts, tokenMap} = useWeb3();


    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };


    const historyPush = useCallback(() => history.push('/cover/my'), []);

    const {
        status,
        request,
        data
    } = useWait((ev: any) => HttpServer.product(urlData.uid.toString(), ev.watchAmount,
        ev.watchShowAge,
        ev.currency,
        ),
    );

    const handleLogin = useCallback(async (inputData: any) => {
        if (urlData === undefined || !data?.list) return;
        try {
            // let singData = await signFn({...data, address: urlData.uid,age});
            onPresent(<CoverModal
                CellModel={urlData}
                Cover={{
                    unit: age,
                    id: urlData.uid,
                    address: urlData['address'],
                    fixedPayout: '123123',
                    days: inputData.days,
                    cover: inputData.Amount,
                    cost: data?.list
                }}
            />)
        } catch (e) {
            console.log(e);
        }

    }, [urlData, data]);

    useEffect(() => {
        if (!watchAmount) return;

        const item = setTimeout(async () => {
            await request({
                ...urlData,
                watchAmount: numberToUint256(watchAmount).toNumber(),
                watchShowAge,
                currency: PidMap[age.toLowerCase()],
            });
        }, 400);
        return () => {
            clearTimeout(item);
        }
    }, [watchAmount, watchShowAge])
    return (
        <CoverPeriodWapStyle>
            <BorderWidget y={18}>
                <h2 style={{lineHeight: 1.6}}>Policy Period and Amount</h2>
            </BorderWidget>
            <InnerStyle>
                <form>
                    <InputWidget
                        setValue={(ev) => setValue(ev, urlData.minDuration)}
                        label={"Period (Min. 30 days, max. 365 days)"}
                        placeholder={"Number of days to be protected for"}
                        unit={"DAYS"}
                        errors={errors}
                        name={'days'}
                        buttonText={'Min'}
                        type='number'
                        inputRef={register({
                            required: 'no Enter the number is dame',
                            min: {value: urlData.minDuration, message: `Min ${urlData.minDuration} days`},
                            max: {value: urlData.maxDuration, message: `Max ${urlData.maxDuration} days`},
                        })}
                        onChange={handleSubmit(() => {
                            console.log('')
                        })}
                    />
                    {/*<p className={'tips'}>There will be 2 days waiting period, your policy will be active after</p>*/}

                    <SpacingWidget/>

                    <WidgetWap>
                        <InputWidget
                            errors={errors}
                            inputRef={register({
                                required: 'no Enter the number is dame',
                                validate: (ev) => {
                                    if (!(ev.toString().split("."))[1] || ev.toString().split(".")[1].length < 2) {
                                        return;
                                    }
                                    return "Must be a multiple of 0.1"
                                }
                            })}
                            label={"Amount"}
                            type='number'
                            placeholder={"Amount you want to be protected for"}
                        >
                            <SelectWidget selectMap={['ETH', USDT.toUpperCase()]} handleChange={handleChange}
                                          value={age}/>
                        </InputWidget>


                        <ListCellWidget label={"Estimated Cost:"} last={`${(data?.list || 0).toFixed(6)} ${age}`}
                                        status={status}/>
                        <h3 className={'tis'}>Before purchasing, please understand what you are paying for:
                            <a target={'_balck'} href="https://docs.nsure.network/nsure-network/docs/nsure-smart-contract-protect-policy-wording">Nsure Smart Contract Cover</a></h3>

                        <SpacingWidget/>
                    </WidgetWap>

                    <ButtonList>
                        <div className={'full'}>

                            <IsApprove erc20={
                                tokenMap[age.toLowerCase()]?.contract || undefined
                            } erc20Address={
                                tokenMap[age.toLowerCase()]?.useAddr || undefined
                            } spender={contrcts.buyAddress}>

                                {status == HttpStatus.wait ?
                                    <LoadingWidget><CircularProgress size={20}/></LoadingWidget> :
                                    <ButtonWidget text="Get Quote"
                                                  type="img"
                                                  disable={!data?.list}
                                                  onClick={handleSubmit(handleLogin)}/>
                                }

                            </IsApprove>
                        </div>

                        <div className={'return'}>
                            <ButtonWidget text="Return" type="border" onClick={historyPush}/>
                        </div>
                    </ButtonList>
                </form>
            </InnerStyle>
        </CoverPeriodWapStyle>
    );
}




const ButtonList = styled.div`
  display: flex;

  .return {
    width: 86px;
    margin-left: 15px;
  }

  .full {
    flex: 1;
  }
`


const InnerStyle = styled.div`
  padding: 30px;
  box-sizing: border-box;
`;

export const CoverPeriodWapStyle = styled.div`
  background-color: ${({theme})=>theme.bgColor.main};
  border-radius: 0 4px 4px 4px;
  overflow: hidden;
  min-height: 430px;

  .tips {
    color: #ABBDEC;
    font-size: 12px;
  }
`;


const WidgetWap: React.FC = ({children}) => {
    return (
        <WidgetStyle>
            <div>
                {children}

            </div>
            <h5 className={''}/>
        </WidgetStyle>
    );
}

const WidgetStyle = styled.div`
  display: flex;

  > div {
    flex: 1;
  }

  > h5 {
    margin-right: 15px;
    width: 86px;
  }
  .tis{
    font-size: 14px;
    font-weight: 400;
    font-style: italic;
    color: #333333;
    span{
      color: aqua;
    }
    a{
      display: block;
    }
  }
`



