import {zhao as NetAxios} from './api'
import {HttpServer} from "./http_server";

export class ClaimServer {


    /**
     *  提交申请
     * @param sigHex
     * @param msg
     */
    static claim(sigHex: string, msg: string,): Promise<any> {
        return NetAxios.post('/api/claim', {user_id: HttpServer.account, sig_hex: sigHex, msg: JSON.parse(msg),});
    }

    /**
     *  claimList
     */
    static claimList(): Promise<any> {
        return NetAxios.get('/api/claimListUser', {userId: HttpServer.account,});
    }

}
