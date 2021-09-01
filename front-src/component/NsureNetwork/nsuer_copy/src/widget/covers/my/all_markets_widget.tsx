import React from "react";
import {ListCellMode} from "../../../interface/covers_interface";
import {ButtonWidget, ImagelabelWidget} from "../../base";
import styled from "styled-components";
import {CoversStyle} from "../style";
import {ListCell} from "../buy/buy_list_main";




export const MyListMainWidget:React.FC = () =>{
    return (
        <div>
            {
                ListCell.map((ev,index)=> <ItemCellWidget key={ev.id+index } model={ev}/>)
            }
        </div>
    );
}



const ItemCellWidget: React.FC<{model:ListCellMode}> = ({model}) => {
    return (<ItemCellStyle top={18}>
        <ImagelabelWidget url={model.avatar} label={model.nick.toUpperCase()} size={28}/>
        <GradeStyle grade={model.grade}><span />Level {model.grade}</GradeStyle>

        <div>{model.amount} ETH</div>
        <div>
            <ButtonWidget to={"/cover/average_premium?data="+JSON.stringify(model)} text="Quote" type="color"/>
        </div>
    </ItemCellStyle>);
}


const GradeStyle = styled.div<{grade?:number}>`
  color: ${({theme,grade}) => theme.gradeColor[grade||1]} !important;
  span{
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 100%;
      border: 2px solid ${({theme,grade}) => theme.gradeColor[grade||1]};
      margin-right: 10px;
  }
`
const ItemCellStyle = styled.div`
${() => CoversStyle.ListCellStyle};
display: flex;
justify-content: space-between;
border-bottom: 1px solid #202A69;
div{
    font-size: 14px;
    font-weight: 400;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    
    &:last-child{
        justify-content: center;
        >div{
          width: auto;
          flex: none;
          //padding: 10px 30px;
        }
      }
    }

&:last-child{
border-bottom: none;
}
`;
