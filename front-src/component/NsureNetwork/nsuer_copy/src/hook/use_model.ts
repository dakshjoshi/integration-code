import React, {useCallback, useContext} from "react";
import {ModalContext} from "../provider/model_provider";


export  const useModel = (model:React.ReactNode, key?: string) => {
    const {onDismiss, onPresent} = useContext(ModalContext);
    const handlePresent = useCallback((ev?:any) => {
        onPresent(model, key)
    }, [key, model, onPresent]);

    return [handlePresent, onDismiss]
}



