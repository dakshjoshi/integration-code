import React, {useCallback, useContext, useEffect} from "react";
import {useWait} from "../../utils/wait_fn";
import {HttpServerModal, TransactionModal} from "./transaction_modal";
import {ModalContext} from "../../provider/model_provider";


/**
 *  发送交易过渡 模态框
 * @param confirmationFn
 * @param onDismiss
 * @constructor
 */
export const SendModal: React.FC<{confirmationFn:Function,onDismiss?:Function}> = ({confirmationFn,onDismiss}) => {

    const {request,status, data} = useWait(confirmationFn);


    useEffect(()=>{
        request('');
    },[])

    return (
        <TransactionModal onDismiss={onDismiss} txHash={data} status={status} />
    );
}

// /**
//  *  发送http请求过渡 模态框
//  * @param confirmationFn
//  * @param onDismiss
//  * @constructor
//  */
// export const SendMHttpModal: React.FC<{confirmationFn:Function,onDismiss?:Function}> = ({confirmationFn,onDismiss}) => {
//
//     const {request,status, data} = useWait(confirmationFn);
//
//
//     useEffect(()=>{
//         request('');
//     },[])
//
//     return (
//         <HttpServerModal onDismiss={onDismiss} txHash={data} status={status} />
//     );
// }





/**
 * 使用 SendModal 带参数时使用
 * @param confirmationFn
 */
export const useSendModal = (confirmationFn:Function) => {
    const {onPresent} = useContext(ModalContext);
    const onWithdraw = useCallback((...res)=>{
        onPresent(<SendModal confirmationFn={() => confirmationFn(...res)}/>);
    },[])
    return onWithdraw;
}



