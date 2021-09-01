

import axios, {AxiosInstance} from 'axios';
import React from "react";
import {AlertWidget} from '../widget/modal/alert_widget'
import env from "@beam-australia/react-env";
type OnPresentType = (content: React.ReactNode, key?: string) => void;


export class NetAxios {
    private axios:AxiosInstance;
    private baseURL:string;


    set setPresent(fn: OnPresentType){
        this.onPresent = fn;
    }

    public onPresent: OnPresentType  | any;

    constructor(baseURL:string){
        this.baseURL = baseURL;
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
        // 请求拦截器
        this.axios.interceptors.request.use(
            (config) => {
                // if (localStorage.getItem('token')) {
                //     config.headers.common['token'] = localStorage.getItem('token');
                // }
                return Promise.resolve(config);
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // 响应拦截器
        this.axios.interceptors.response.use(
            (response) => {
                const { status, data } = response;
                const {  code, result } = data;
                if (status === 200 && (code === 200 || code === 0)) {
                    if(code === 0){
                        return Promise.resolve(data.data);
                    }else{
                        return Promise.resolve(result);
                    }
                }

                this.onPresent(React.createElement(AlertWidget, {text:data.msg}, null));
                return Promise.reject(data);
            },
            (error) => {

                this.onPresent(React.createElement(AlertWidget, {text:'Server Error'}, null));

                return Promise.reject(error);
            }
        );
    }

    get(url:string, params:any,baseUrl=true) {

        return this.axios.get(`${baseUrl?this.baseURL:''}${url}`, { params: { ...params } })
    }

    post(url:string, data:any) {
        return this.axios.post(`${this.baseURL}${url}`, data)
    }

    put(url:string, data:any) {
        return this.axios.put(url, data)
    }

    patch(url:string, data:any) {
        return this.axios.patch(url, data)
    }

    delete(url:string) {
        return this.axios.delete(url)
    }

}
export const kai = new NetAxios(env("KAI_API"));
export const zhao = new NetAxios(env("ZHAO_API"));
 // export default new NetAxios('https://api.nsure.network/v1');
//export default new NetAxios('http://192.168.0.105:3003');


