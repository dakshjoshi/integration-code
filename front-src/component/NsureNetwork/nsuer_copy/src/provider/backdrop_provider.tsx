import React, {createContext, useCallback, useState} from "react";
import {Backdrop, CircularProgress} from "@material-ui/core";
import styled from "styled-components";


export const BackdropProvider:React.FC = ({children}) =>{
    const [isOpen, setIsOpen] = useState(false);

    const handleDismiss = useCallback(() => {
        setIsOpen(false)
    }, [ setIsOpen,]);

    const handlePresent = useCallback(() => {
        setIsOpen(true)
    }, [ setIsOpen,]);

    return (
        <BackdropContext.Provider value={{isOpen,onPresent:handlePresent,onDismiss:handleDismiss}}>
            <BackdropStyle className={"Backdrop"} open={isOpen} onClick={handleDismiss}>
                <CircularProgress size={100} color="primary" />
            </BackdropStyle>
            {children}
        </BackdropContext.Provider>
    );
}

export const  BackdropContext = createContext<BackdropInterface>({
    onPresent: () => {
    },
    onDismiss: () => {
    },
    isOpen:false
});

interface BackdropInterface{
    isOpen:boolean,
    onPresent: () => void,
    onDismiss: () => void
}


const BackdropStyle = styled(Backdrop)`
  &.MuiBackdrop-root{
    z-index: 100;

  }
`
