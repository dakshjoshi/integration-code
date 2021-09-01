import React, {FunctionComponent, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {CircularProgress} from "@material-ui/core";
import {SearchContext} from "./search_list";
import {useSearchFn} from "./search_fn";
import {ItemCellWidget} from "../base/list_main_widget";
import {CellStructure} from "../../interface/base/search_model";


export const HttpListMain: React.FC<{ structure: (ev: any) => CellStructure[], isShowSearch: boolean, isShowHeader: boolean }> = ({
                                                                                                                                      structure,
                                                                                                                                      isShowHeader,
                                                                                                                                      isShowSearch
                                                                                                                                  }) => {

    const [faceCallBack] = useSearchFn();
    const {listCellList, isHide, loading, paginationModel, refresh} = useContext(SearchContext);


    useEffect(() => {
        if (!paginationModel.page) {
            paginationModel.page = 1;
            faceCallBack(1);
            return;
        }
        faceCallBack(paginationModel.page);
    }, [paginationModel.page, refresh])


    return (
        <div>
            {
                !loading  &&  listCellList.length == 0 ? <EmptyStyle>N/A</EmptyStyle> : listCellList.map((ev, index) => {
                    if (isShowHeader && isShowSearch && ev?.name && ev?.name.toLowerCase().indexOf(isHide.toLowerCase()) < 0) {
                        return  <span key={'Cell' + index}/>
                    }
                     return <ItemCellWidget key={'Cell' + index} model={structure(ev)}/>;
                })
            }
            {

                loading ? <LoadginStyle><CircularProgress/></LoadginStyle> : <div/>
            }
        </div>
    );
}


const EmptyStyle = styled.h2`
  color: ${({theme}) => theme.color.black['300']};

  text-align: center;
  padding: 10px 0;
`


const LoadginStyle = styled.div`

  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  justify-content: center;
`
