import axios, {AxiosInstance} from 'axios';

class NetApis {
    private axios: AxiosInstance;

    constructor() {

        this.axios = axios.create({
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            transformRequest: [
                (data) => {
                    return JSON.stringify(data);
                }
            ],
            transformResponse: [
                (data) => {
                    return JSON.parse(data);
                }
            ]
        });
        this.interceptors();
    }

    /**
     * 默认拦截器
     */
    interceptors() {
        // 响应拦截器
        this.axios.interceptors.response.use(
            (response) => {
                const {status, data} = response;
                const {code, result,} = data;
                return Promise.resolve(data);
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    get(url: string, params: any,): Promise<any> {
        return this.axios.get(`${url}`, {params: {...params}})
    }

    post(url: string, data: any) {
        return this.axios.post(`${url}`, data)
    }

    put(url: string, data: any) {
        return this.axios.put(url, data)
    }

    patch(url: string, data: any) {
        return this.axios.patch(url, data)
    }

    delete(url: string) {
        return this.axios.delete(url)
    }
}

const apis = new NetApis();

export const EthToUsd = async () => {
    let data: any = await apis.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,nsure-network&vs_currencies=usd', []);
    return {
        ethToUsd: data.ethereum.usd,
        nsureToUsd: data['nsure-network'].usd,
    };
}
