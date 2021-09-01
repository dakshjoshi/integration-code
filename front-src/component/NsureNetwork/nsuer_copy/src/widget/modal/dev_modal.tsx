import styled from "styled-components";
import React from "react";
import {Alert} from "@material-ui/lab";
import {AppConfig} from "../../config";


export const DevModal:React.FC = ({children}) =>{
    return (
        <BgWapStyle>
            {children}
            {
                AppConfig.comingSoon && <div className={'bg'} >
                    <div className={'top'}>
                        Coming Soon
                        {/*<Alert severity="info">Coming Soon</Alert>*/}
                    </div>
                </div>
            }

        </BgWapStyle>

        );
}
const BgWapStyle = styled.div`
    position: relative;
  
    .bg{
      position: absolute;
      height: 100%;
      width: 100%;
      background: rgba(0,0,0,.4);
      top: 0;
      z-index: 999;
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: center;
    
      .top{
        //height: 80vh;
        //width: 100%;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;


        width: 316px;
        height: 108px;
        color: rgba(150, 102, 225, 1);
        background: #FFFFFF;
        box-shadow:inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
      }
    }
  
`
