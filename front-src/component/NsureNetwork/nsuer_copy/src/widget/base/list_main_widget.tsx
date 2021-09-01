import React, {FunctionComponent, ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import styled from "styled-components";


import {ImagelabelWidget} from "./image_label";
import {CoversStyle} from "../covers/style";
import {CircularProgress} from "@material-ui/core";

import balancerImage from "../../assets/imgs/balancer.png"
import {AppConfig} from "../../config";
import {StartTextWidget, StartWidget} from "./start_widget";


export const ListMain: React.FC<{ structure: (ev: any) => CellStructure[], listCell: Array<any>, }> = ({
                                                                                                           structure,
                                                                                                           listCell
                                                                                                       }) => {

    const [loading, setLoading] = useState(1);
    const [listCellList, setListCellList] = useState([]);


    return (
        <div>
            {
                loading ? <LoadginStyle><CircularProgress/></LoadginStyle> :
                    listCellList.map((ev, index) => <ItemCellWidget key={'Cell' + index} model={structure(ev)}/>)
            }
        </div>
    );
}

interface CellStructure {
    inner: string | any,
    url?: string,
    type?: 'Imagelabel' | 'text' | 'grade' | null,
    grade?: number,
    size?: number,
    color?: string,
    onClick?: () => void,
    children?: ReactNode,
    textAlign?: "inherit" | "-moz-initial" | "initial" | "revert" | "unset" | "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start"
}

export const ItemCellWidget: React.FC<{ model: CellStructure[] }> = ({model}, key) => {

    return (<ItemCellStyle top={18}>

        {
            model.map((ev, index) => {
                const {
                    inner,
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
                    widget = <ImagelabelWidget url={url ? AppConfig.urlPath+url:balancerImage} label={inner} size={size || 20}/>;
                }
                if (type === 'grade') {
                    widget = <GradeStyle grade={grade}><span/>
                        <StartTextWidget startNumber={inner}
                                         size={10}
                                         grade={grade} />
                    </GradeStyle>
                }
                if (type === 'text') {
                    widget = inner;
                }
                if (children !== undefined) {
                    widget = children;
                }
                return <div key={index + 'div'}
                            style={{
                                color: color || '#fff',
                                textAlign: textAlign || 'start',
                                cursor: onClick ? 'pointer' : ''
                            }}
                            onClick={() => onClick ? onClick() : ''}
                >
                    {widget}
                </div>

            })
        }

    </ItemCellStyle>);
}

const GradeStyle = styled.div<{ grade?: number }>`
  color: ${({theme, grade}) => theme.gradeColor[grade || 1]} !important;
  display: flex;
  align-items: center;

  span {
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    border: 2px solid ${({theme, grade}) => theme.gradeColor[grade || 1]};
    margin-right: 10px;
  }
`

const ItemCellStyle = styled.div`
  ${() => CoversStyle.ListCellStyle};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({theme})=>theme.color.whites["600"]};

  div {
    font-size: 14px;
    font-weight: 400;
    color: ${({theme})=>theme.color.black["300"]};
    //font-family: Myriad Pro;

  }

  &:last-child {
    border-bottom: none;
  }
`;


const LoadginStyle = styled.div`

  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  justify-content: center;
`
