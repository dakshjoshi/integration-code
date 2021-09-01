import React from "react";
import styled from "styled-components";
import {WidthStyle} from "../../style/width_style";
import BgDian from "../../../assets/imgs/bg_dian.png";
import {CardStyle} from "../../style/card_style";


export const BgWidget:React.FC = ({children}) =>{
    return (<BgStyle bgColor={'rgba(22, 31, 87, 1)'} size={{all: 30}}>
        <div>
            {children}
        </div>
    </BgStyle>);
}


const BgStyle = styled.div<{ size: { x?: number, y?: number, all?: number }, bgColor: string }>`
  ${CardStyle.BorderTwoStyle};
   >div{
       ${WidthStyle.PaddingSize};   
      display: flex;
      align-items: center;
      justify-content: space-between;
       .line{
            width: 1px;
            height: 60px;
            background:  #E2E3E9;
      }
   }
    
   
`
