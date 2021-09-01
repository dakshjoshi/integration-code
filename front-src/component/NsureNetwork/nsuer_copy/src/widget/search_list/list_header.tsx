import React, {ReactNode, useCallback, useContext, useEffect, useMemo} from "react";
import {Hidden} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";
import {CoversStyle} from "../covers/style";
import {Subject, interval} from 'rxjs';
import {debounce} from 'rxjs/operators';
import {SearchContext} from "./search_list";
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import {ListHeaderSeachInterface, Select} from "../../interface/base/search_model";


export const ListTopWidget: React.FC<{ selectList: any }> = ({children, selectList}) => {

    const {setListCellList, listCellList,} = useContext(SearchContext);
    const [sort, setSort] = React.useState({
        key: '',
        isUp: false,
    });

    const handleChange = useCallback((key: string, type: any) => {
        setSort({
            key: key,
            isUp: sort.key == key ? !sort.isUp : true,
        });

        let _list: any[];

        if (type == 'string') {
            _list = listCellList.sort();
            _list.reverse();
        } else {
            if (sort.isUp) {
                _list = listCellList.sort((a, b) => b[key] - a[key]);
            } else {
                _list = listCellList.sort((a, b) => a[key] - b[key]);
            }
        }


        setListCellList([..._list]);
    }, [sort, listCellList]);
    return (
        <TopStyle top={11}>
            {
                selectList == null ? children :
                    selectList.map((ev: Select,index:number) => <SelectStyle key={index+ev.name} style={{justifyContent: ev.justifyContent}}>
                        <span>{ev.name}</span>
                        {
                            ev.key != null ? <p
                                onClick={() => {
                                    handleChange(ev.key || '', ev.type);
                                }}
                                style={{color: "#fff"}}
                            >
                                {
                                    sort.key == ev.key ?
                                        sort.isUp ? <ArrowDropUpRoundedIcon/> : <ArrowDropDownRoundedIcon/>
                                        :
                                        <ArrowDropDownRoundedIcon style={{color: "#8390B2"}}/>
                                }
                            </p> : ""
                        }
                    </SelectStyle>)

            }
        </TopStyle>
    );
}


export const ListHeader: React.FC<ListHeaderSeachInterface> = ({
                                                                   title,
                                                                   sub,
                                                                   isShowSearch,
                                                               }) => {

    const {setIsHide} = useContext(SearchContext);
    const onDebounce = new Subject();


    useEffect(() => {
        const subscription = onDebounce.pipe(debounce((ev) => interval(500))).subscribe({
            next: (value: any) => {
                setIsHide(value);
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [onDebounce])


    return (
        <ListHeaderStyle top={20}>
            <h2> {title}
                <Hidden smDown>
                    <span>{sub}</span>
                </Hidden>
            </h2>
            {/*<SelectWapStyle>*/}
            {/*    {*/}
            {/*        select ? <SelectWidget*/}
            {/*            selectMap={Object.keys(select)}*/}
            {/*            handleChange={handleChange}*/}
            {/*            value={sort}*/}
            {/*        /> : <div/>*/}
            {/*    }*/}
            {/*</SelectWapStyle>*/}

            {
                isShowSearch ? <SearchStyle>
                    <InputBase placeholder={"Search for ticker or contract address"}
                               onChange={(ev) => onDebounce.next(ev.target.value)}/>
                    <SearchIcon/>
                </SearchStyle> : <></>
            }


        </ListHeaderStyle>
    );
}


const SelectStyle = styled.div`
  display: flex;
  justify-content: start;

`

const SearchStyle = styled.div`
  display: flex;
  align-items: center;
  background-color: #E8E8E8;
  width: 30%;
  flex: none !important;
  border-radius: 5px;
  padding: 4px 10px;
  color: white;
  border: 1px solid #E8E8E8;

  .MuiInputBase-input {
    font-size: 12px;
    //color: ${({theme})=>theme.color.whites["200"]};
  }
  .MuiSvgIcon-root{
    color: #270D4F;
  }

  .MuiSvgIcon-root{
    font-size: 18px;
    
  }
`;

const ListHeaderStyle = styled.div`
  ${() => CoversStyle.ListCellStyle};
  background: ${({theme})=>theme.color.white};
  display: flex;
  
  justify-content: space-between;

  h2 {
    font-size: 18px;
    //font-weight: 400;
    color: ${({theme})=>theme.color.whites["300"]};
    display: flex;
    align-items: center;

    span {
      font-size: 14px;
      font-weight: 400;
      color: #9FAAED;
      line-height: 1;
      display: block;
      margin-left: 10px;
    }
  }
`;


const TopStyle = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 10;
  align-items: center;
  position: relative;
  ${() => CoversStyle.ListCellStyle};
  background: ${({theme})=>theme.color.whites[400]};

  div {
    font-size: 14px;
    font-weight: 400;
    color: #8390B2;
  }
`;

