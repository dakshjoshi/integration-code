import React from "react";
import {Button, IconButton, Slide, Snackbar} from "@material-ui/core";
import {TransitionProps} from "@material-ui/core/transitions";
import {Alert} from "@material-ui/lab";
import styled from "styled-components";

export const CopyTisWidget:React.FC<{handleClose?:(event: React.SyntheticEvent | React.MouseEvent, reason?: string) => void,open:boolean}> = ({handleClose,open}) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            TransitionComponent={TransitionUp}
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
        >
            <IconStyle>
                <Alert severity="success">Copy successfully</Alert>
            </IconStyle>

        </Snackbar>
    );
}
const IconStyle = styled.div`
  .MuiAlert-standardSuccess{
    background: #F0FAF4;
    box-shadow: 0px 2px 24px 0px rgba(206, 69, 197, 0.12);
    border-radius: 4px;
    .MuiAlert-messag{
      font-size: 14px;
      font-weight: 500;
      color: #333333;
    }
  }
`
function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="left" />;
}
