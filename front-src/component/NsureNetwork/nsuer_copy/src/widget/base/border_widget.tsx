import styled from "styled-components";
import React from "react";
import {PaddingSize} from "../../interface/css_interface";


interface BorderInterface extends PaddingSize {
    boxShadow?: boolean
}

export const BorderWidget: React.FC<BorderInterface> = ({children, x = 30, y = 12, all, boxShadow =true}) => {
    return (
        <BorderStyle x={x} y={y} all={all} boxShadow={boxShadow}>
            <div className="left"/>
            <div className="bottom"/>
            <div className="right"/>
            <div className="inner">{children}</div>
        </BorderStyle>
    );
}

const BorderStyle = styled.div<BorderInterface>`
  box-shadow: ${({boxShadow}) => boxShadow && '0 5px 7px rgba(0, 0, 0, .06)'};

  .left {
    position: absolute;
    width: 1px;
    height: 100%;

    background: linear-gradient(to bottom, transparent, 70%, #5592E8);
  }

  .right {
    position: absolute;
    width: 1px;
    height: 100%;
    right: 0;
    background: linear-gradient(to bottom, transparent, 70%, #CE45C5);
  }

  .inner {
    z-index: 1;
    padding: ${({x, y, all}) => all ? `${all}px` : `${y}px ${x}px`};
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 18px;
      font-weight: 400;
      color: ${({theme}) => theme.color.black["400"]};
      line-height: 1;

    }
  }

  width: auto;
  height: auto;

  position: relative;

  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, #5592E8, #CE45C5);
  }

`;
