import React, {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {Dialog, DialogTitle} from "@material-ui/core";


export const NavHeaderWidget: React.FC<{ listNav: { to: string, text: string, dev?: boolean }[], }> = ({
                                                                                                           listNav,
                                                                                                       }) => {


    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };

    const ListWidget = useMemo(() => {
        let arr = listNav.map((model, index) => {
            return ([
                <CellItemStyle key={'CellItemStyle' + index}
                               activeClassName={'ac'}
                               to={model.to}
                               onClick={() => {
                                   if (model.dev) {
                                       handleClickOpen()
                                   }
                               }}
                >{model.text}</CellItemStyle>,
                index === listNav.length - 1 ? null :
                    <span key={'link' + index} className="link"/>
            ]);
        })
        return arr;
    }, [listNav])
    return (
        <>
            <NaveHeaderStyle>
                {
                    ListWidget
                }
            </NaveHeaderStyle>
            <SimpleDialog selectedValue={'selectedValue'} open={open} onClose={handleClose}/>
        </>

    );
}


export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

export function SimpleDialog(props: SimpleDialogProps) {
    const {onClose, selectedValue, open} = props;

    const handleClose = () => {
        onClose(selectedValue);
    };


    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Under Development</DialogTitle>
        </Dialog>
    );
}

const NaveHeaderStyle = styled.div`

  display: flex;
  justify-items: start;
  align-items: center;

  //border: 1px solid rgba(32, 42, 105, 1);
  //background-color: rgba(22, 31, 87, 1);
  border-radius: 4px 0 4px 0;

  .link {
    background-color: #EDEEF1;
    height: 20px;
    width: 1px;
  }
`

const CellItemStyle = styled(NavLink)`
  padding: 20px 27px;
  //font-weight: 400;
  text-decoration: none;
  color: ${({theme}) => theme.color.black['400']};
  line-height: 1;
  opacity: .6;
  border-bottom: 2px solid transparent;
  font-weight: bold;

  &.ac {
    opacity: 1;
    border-bottom: 2px solid rgba(25, 145, 235, 1);
  }
  @media (max-width: 760px){
    padding: 15px 12px;
    font-size: 14px;
  }


`
