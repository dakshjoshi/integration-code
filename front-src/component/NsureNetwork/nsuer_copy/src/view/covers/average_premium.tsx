import React, {useCallback, useEffect, useState} from "react";
import {ChartWidget} from "../../widget/echart/echrt_widget";
import {BorderWidget} from "../../widget/base";
import styled from "styled-components";
import {CircularProgress, Grid} from "@material-ui/core";
import {CoverPeriodWidget, IntroductionWidget} from "../../widget/covers";
import {UrlHerf} from "../../utils/url";
import {ProductInformationInterface} from "../../interface/product_interface";
import {useProduct} from "./fn/fetch_product";
import {HttpStatus, useWait} from "../../utils/wait_fn";
import {HttpServer} from "../../net/http_server";
import { useParams } from "react-router-dom";

export const AveragePremiumPage: React.FC = () => {
    const [urlData, setUrlData] = useState<ProductInformationInterface>(UrlHerf.getData);
    const uid = useParams<any>()
    const [facehProduct] = useProduct();
    const {request,data,status} = useWait(HttpServer.record);





    const callBack = useCallback(async () => {
        const _data: any = await facehProduct(uid.id);
        setUrlData(_data);
    }, [uid]);

    useEffect(() => {
        if (!UrlHerf.getData) {
            callBack();
        }
        request(uid.id);
    }, [])


    return (
        <div>
            <ListWapStyle>
                <BorderWidget>
                    <h2 style={{lineHeight: 1.6}}>Historical Cost (1ETH for 30 days):</h2>
                </BorderWidget>
                {
                    status == HttpStatus.success ?  <ChartWidget listData={data}/>:<LoadingStyle>
                        <CircularProgress color="primary" />
                    </LoadingStyle>
                }

            </ListWapStyle>

            {
                !urlData ? <div>...</div> : <>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <CoverPeriodWidget urlData={urlData}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <IntroductionWidget urlData={urlData}/>
                        </Grid>

                    </Grid>
                </>
            }


        </div>
    );
};

const LoadingStyle = styled.div`
height: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ListWapStyle = styled.div`
  background-color: ${({theme})=>theme.bgColor.main};
  border-radius: 0 4px 4px 4px;
  overflow: hidden;
  margin-bottom: 30px;
`;
