import {useCallback, useContext} from "react";
import {kai as NetAxios} from "../../net/api";
import {SearchContext} from "./search_list";
import {HttpServer} from "../../net/http_server";


export const useSearchFn = () => {
    const {setListCellList, path, setLoading, onGetData,params, setPaginationModel, paginationModel,net,item} = useContext(SearchContext);

    const faceCallBack = useCallback(async (page: number) => {
        if(!net) throw Error('net is null');
        try {
            setLoading(1);
            const data: any = await net.get(path, {
                user: HttpServer.account,
                ...params,
                item,
                page,
            });
            setListCellList(data['list'] || data);
            onGetData&&onGetData(data);
            setLoading(0);
            if (!paginationModel.count) {
                setPaginationModel(
                    {
                        ...paginationModel,
                        count: data['count']
                    }
                );
            }


        } catch (e) {
            console.log(e);
        }

    }, [setLoading, setListCellList, path,paginationModel]);

    return [faceCallBack];
}
