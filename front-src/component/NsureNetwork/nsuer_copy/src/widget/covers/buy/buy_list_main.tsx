import React, {FunctionComponent, ReactNode, useMemo} from "react";
import styled from "styled-components";
import {CoversStyle} from "../style";
import {ListCellMode} from "../../../interface/covers_interface";
import {ImagelabelWidget} from '../../base'
import balancerImage from "../../../assets/imgs/balancer.png"


import {InputBase} from "@material-ui/core";

export const ListCell: Array<ListCellMode> = [
    {
        avatar: "",
        nick: 'Moloch V1',
        id: 123123,
        amount: 123,
        premium: 123123,
        startDate: new Date(),
        endDate: new Date(),
        action: false,
        grade: 1
    }, {
        avatar: "",

        nick: 'Moloch V1',
        id: 123123,
        amount: 123,
        premium: 123123,
        startDate: new Date(),
        endDate: new Date(),
        action: false,
        grade: 2
    }, {
        avatar: "",
        grade: 3,
        nick: 'Moloch V1',
        id: 123123,
        amount: 123,
        premium: 123123,
        startDate: new Date(),
        endDate: new Date(),
        action: false
    }, {
        avatar: "",
        grade: 2,
        nick: 'Moloch V1',
        id: 123123,
        amount: 123,
        premium: 123123,
        startDate: new Date(),
        endDate: new Date(),
        action: false
    }, {
        avatar: "",
        grade: 4,
        nick: 'Moloch V1',
        id: 123123,
        amount: 123,
        premium: 123123,
        startDate: new Date(),
        endDate: new Date(),
        action: false
    }, {
        avatar: "",
        grade: 5,
        nick: 'Moloch V1',
        id: 123123,
        amount: 123,
        premium: 123123,
        startDate: new Date(),
        endDate: new Date(),
        action: false
    },
]



interface CellStructure {
    inner: string,
    url?: string,
    type?: 'Imagelabel' | 'text'|'grade' | 'input' | null,
    grade?:number,
    size?: number,
    color?: string,
    onClick?: () => void,
    children?:ReactNode,
    textAlign?: "inherit" | "-moz-initial" | "initial" | "revert" | "unset" | "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start"
}




export const BuyListMain: React.FC<{structure: (ev:any,index?:number) => CellStructure[],listCell:Array<any>,}> = ({structure , listCell}) => {
    return (
        <div>
            {
                listCell.map((listItme, index) => {
                    return <ItemCellStyle key={index+'div'} top={18}>

                        {
                            structure(listItme,index).map((ev,i) => {
                                let  {inner,
                                    color,
                                    type = 'text',
                                    size,
                                    url,
                                    onClick,
                                    textAlign,
                                    grade,
                                    children,
                                } = ev;

                                let widget;
                                if (type === 'Imagelabel') {
                                    widget = <ImagelabelWidget url={url||balancerImage} label={inner} size={size || 20}/>;
                                }
                                if( type === 'grade'){
                                    widget =  <GradeStyle grade={grade}><span />{inner}</GradeStyle>
                                }
                                if(type === 'text' ){
                                    widget = inner;
                                }
                                // if(type === 'input'){
                                //     widget = <InputBase type={'number'} onChange={(data)=> listItme.input = data.target.value} />
                                // }
                                if(children !== undefined){
                                    widget = children;
                                }
                                return <div  key={index+'div'+i} style={{color:color||'#fff',textAlign:textAlign||'start',cursor: onClick ? 'pointer' :''}} onClick={() => onClick ? onClick() :''}>{widget}</div>

                            })
                        }

                    </ItemCellStyle>
                })
            }
        </div>
    );
}


const ItemCellWidget: React.FC<{ model: CellStructure[]}> = ({model},key) => {

    return (<ItemCellStyle  top={18}>

        {
            model.map((ev,index) => {
                const  {inner,
                    color,
                    type = 'text',
                    size,
                    url,
                    onClick,
                    textAlign,
                    grade,
                    children,
                } = ev;

                let widget;
                if (type === 'Imagelabel') {
                    widget = <ImagelabelWidget url={url} label={inner} size={size || 20}/>;
                }
                if( type === 'grade'){
                    widget =  <GradeStyle grade={grade}><span />{inner}</GradeStyle>
                }
                if(type === 'text' ){
                    widget = inner;
                }
                if(type === 'input'){
                    widget = <InputBase onChange={(data)=> model[index].inner = data.target.value} />
                }
                if(children !== undefined){
                    widget = children;
                }
                return <div key={index+'div'} style={{color:color||'#fff',textAlign:textAlign||'start',cursor: onClick ? 'pointer' :''}} onClick={() => onClick ? onClick() :''}>{widget}</div>

            })
        }

    </ItemCellStyle>);
}

const GradeStyle = styled.div<{grade?:number}>`
  color: ${({theme,grade}) => theme.gradeColor[grade||1]} !important;
  display: flex;
  align-items: center;
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
    align-items: center;
justify-content: space-between;
border-bottom: 1px solid #202A69;
div{
font-size: 14px;
font-weight: 400;
color: #FFFFFF;



}
&:last-child{
border-bottom: none;
}
`;
