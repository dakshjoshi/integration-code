import {useLocation} from "react-router-dom";
import {Dispatch, SetStateAction, useMemo, useState} from "react";
import {AppConfig} from "../config";

// http://localhost:9000/#/cover/my?data={%22id%22:2,%22r%22:%220x1ebA3aC1CD7Fa3c67f0A032472Bc81B9ae33C7Ef%22}

export function UseUrlData<S>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
    const [data, setData] = useState<S>();
    const location = useLocation();
    useMemo(() => {
        let _data = new URLSearchParams(location.search).get('data');
        if(_data){
            setData(JSON.parse(_data || ''));
        }
    }, [location.search]);


    return [data, setData]
}

export class UrlHerf {
    static data: any;

    static set setDara(ev: any) {
        this.data = ev;
    }

    static get getData() {
        return this.data;
    }
}


export function UrlHaxFormat(hax: string,type:'tx'|'address') {
    let id = AppConfig.chainId;
    return AppConfig.etherscan[id] +`${type}`+ '/' + hax;
}
