import {Property} from "csstype";
import {ReactNode} from "react";
import {SearchInterfacer} from "../../widget/search_list/search_list";
import {NetAxios} from "../../net/api";

export interface ListHeaderSeachInterface {
    title?: string,
    sub?: string,
    isShowSearch?: boolean,
    selectList?: Select[],
    item?:number

}
export type Select = {
    key?:string,
    name:string,
    justifyContent?:Property.JustifyContent,
    type?:'string'|'number'
};



export interface CellStructure {
    inner: string | number,
    url?: string,
    type?: 'Imagelabel' | 'text' | 'grade' | null,
    grade?: number,
    size?: number,
    color?: string,
    onClick?: () => void,
    children?: ReactNode,
    textAlign?: "inherit" | "-moz-initial" | "initial" | "revert" | "unset" | "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start"
}


export interface SearchListInterface extends ListHeaderSeachInterface {
    structure: (ev: any) => CellStructure[],
    url: string,
    net?:NetAxios,
    isShowHeader?: boolean,
    isShowPagination?: boolean,
    params?: { [key: string]: any },
    confirm?:(ev:SearchInterfacer) => void,
    refresh?:string|number,
    onGetData?:(ev:any) => void
}
