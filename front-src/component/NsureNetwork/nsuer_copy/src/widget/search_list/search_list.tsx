import React, {createContext, ReactNode, useCallback, useState} from "react";
import {ListHeader, ListTopWidget} from "./list_header";
import {HttpListMain} from "./http_list";
import {Pagination} from '@material-ui/lab';
import styled from "styled-components";
import {ButtonWidget} from "../base";

import {SearchListInterface} from "../../interface/base/search_model";
import {NetAxios, kai} from "../../net/api";


export const SearchListWidget: React.FC<SearchListInterface> = ({
                                                                    sub = '',
                                                                    title = '',
                                                                    structure,
                                                                    url,
                                                                    confirm,
                                                                    isShowSearch = true,
                                                                    isShowHeader = true,
                                                                    isShowPagination = false,
                                                                    params,
                                                                    refresh,
                                                                    onGetData,
                                                                    children,
                                                                    selectList,
                                                                    net = kai,
                                                                    item = 20
                                                                }) => {

    const [listCellList, setListCellList] = useState([]);
    const [pagination, setPaginationModel] = useState<PaginationModel>({page: 1, count: 0,});
    const [loading, setLoading] = useState(1);
    const [path, setPath] = useState(url);
    const [isHide, setIsHide] = useState('');

    return (
        <SearchContext.Provider value={{
            path,
            setPath,
            listCellList,
            setListCellList,
            loading, setLoading, params,
            paginationModel: pagination,
            setPaginationModel: setPaginationModel,
            isHide, setIsHide, refresh, onGetData, net,item
        }}>
            {
                isShowHeader ? <ListHeader title={title} sub={sub} isShowSearch={isShowSearch}/> : ''
            }
            <SlideStyle>
                <div className="innerBox">
                    <ListTopWidget selectList={selectList}>{children}</ListTopWidget>
                    <HttpListMain isShowHeader={isShowHeader} isShowSearch={isShowSearch} structure={structure}/>
                </div>
            </SlideStyle>

            <PaginationStyle>
                {
                    isShowPagination && pagination.page && (pagination.count || 0) > item ? <Pagination count={ Math.ceil((pagination.count || 1) / item)}
                                                                      color="primary"
                                                                      variant="outlined"
                                                                      onChange={(ev, index) => {
                                                                          setPaginationModel({
                                                                              ...pagination,
                                                                              page: index
                                                                          });
                                                                      }
                                                                      } shape="rounded"/> : ''

                }
                {
                    confirm && <ButtonStyle><ButtonWidget text={'Confirm'} type={"img"} onClick={() => {
                        confirm({
                            path,
                            setPath,
                            listCellList,
                            setListCellList,
                            loading, setLoading, params,
                            paginationModel: pagination,
                            setPaginationModel: setPaginationModel,
                            isHide, setIsHide,item
                        })
                    }}/></ButtonStyle>
                }
            </PaginationStyle>


        </SearchContext.Provider>
    );
}


export const SearchContext = createContext<SearchInterfacer>({
    path: '',
    isHide: '',
    setPath: () => {
    },
    listCellList: [],
    setListCellList: () => {
    },
    loading: 1,
    setLoading: () => {
    },
    setPaginationModel: () => {
    },
    setIsHide: () => {
    },
    paginationModel: {
        page: 1
    },
    item:20

});

export interface SearchInterfacer {
    path: string,
    net?: NetAxios,
    listCellList: any[],
    loading: number,
    params?: { [key: string]: any },
    count?: number,
    setListCellList: Function,
    setPaginationModel: Function,
    paginationModel: PaginationModel,
    setLoading: Function,
    setPath: Function,
    isHide: string,
    setIsHide: Function,
    refresh?: string | number,
    onGetData?: Function,
    item:number

}


type PaginationModel = {
    page: number,
    count?: number
}

const SlideStyle = styled.div`
  overflow: scroll;
  .innerBox{
    min-width: 800px;
  }
`

const PaginationStyle = styled.div`
  display: flex;
  justify-content: flex-end;

  > .MuiPagination-root {
    padding: 10px 5%;
  }
`

const ButtonStyle = styled.div`
  display: flex;
  padding: 30px;
  box-sizing: border-box;
  justify-content: flex-end;

`
