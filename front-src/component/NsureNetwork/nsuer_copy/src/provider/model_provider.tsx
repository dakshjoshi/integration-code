import React, {createContext, useCallback, useEffect, useState} from "react";
import {Modal} from "@material-ui/core";
import styled from "styled-components";
import {kai as NetApp,zhao} from "../net/api"


export interface ModalProps {
    onDismiss?: () => void
}


export const ModelProvider: React.FC = ({children}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<React.ReactNode>();
    const [modalKey, setModalKey] = useState<string>();
    const handlePresent = useCallback((modalContent: React.ReactNode, key?: string) => {
        setModalKey(key);
        setContent(modalContent);
        setIsOpen(true)
    }, [setContent, setIsOpen, setModalKey]);

    const handleDismiss = useCallback(() => {
        setContent(undefined);
        setIsOpen(false)
    }, [setContent, setIsOpen, modalKey]);


    useEffect(() => {
        NetApp.setPresent = handlePresent;
        zhao.setPresent = handlePresent;
    }, [])

    return (
        <ModalContext.Provider value={{
            content,
            isOpen,
            onPresent: handlePresent,
            onDismiss: handleDismiss,
        }}>

            <div style={{filter: isOpen ? "blur(5px)" : "none"}}>
                {children}

            </div>
            <Modal
                open={isOpen}
                onClose={handleDismiss}
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"

            >
                <ModalBodyStyle>
                    <div className={'bg'} onClick={handleDismiss}/>
                    <BodyStyle>  {React.isValidElement(content) && React.cloneElement(content, {
                        onDismiss: handleDismiss,
                    })}</BodyStyle>
                </ModalBodyStyle>
            </Modal>

        </ModalContext.Provider>
    );
}

export const ModalContext = createContext<ModalsContext>({
    onPresent: () => {
    },
    onDismiss: () => {
    },
});

interface ModalsContext {
    content?: React.ReactNode,
    isOpen?: boolean,
    onPresent: (content: React.ReactNode, key?: string) => void,
    onDismiss: () => void
}


const ModalBodyStyle = styled.div`
  outline: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .4);
  }
`

const BodyStyle = styled.div`
  position: absolute;
  z-index: 10;
  max-height: 80vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`
