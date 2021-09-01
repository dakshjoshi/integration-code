import React, {useMemo} from "react";
import styled, {css} from "styled-components";
import {Link} from "react-router-dom";
import BgImage from "../../assets/imgs/button_img.jpg"
import {Button,} from "@material-ui/core";

export interface ButtonInterface {
    type: 'img' | 'border' | 'color' | 'submit',
    text: string,
    onClick?: (ev: any) => void,
    to?: string,
    disable?: boolean
}


export const ButtonWidget: React.FC<ButtonInterface> = ({
                                                            text,
                                                            type,
                                                            onClick,
                                                            to,
                                                            disable = false
                                                        }) => {
    const ButtonClider = useMemo(() => {
        if (to && !disable) {
            return <StyledLink to={to}> {text}</StyledLink>
        } else {
            return text
        }

    }, [to, text,disable],);
    return (
        <ButtonStyle disable={disable} type={type} onClick={(ev)=>{
            if (!disable && onClick){
                onClick(ev);
            }
        }}>
            {ButtonClider}
        </ButtonStyle>
    );
}


export const LoadingWidget = styled.div`
  padding: 10px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background-image: url(${BgImage}), linear-gradient(to bottom, rgba(51, 92, 180, 1), rgba(28, 38, 98, 1));
`

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  justify-content: center;
  margin: 0;
  padding: 0;
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: flex;
`;

export const ButtonStyle = styled.div<{ type: 'img' | 'border' | 'color' | 'submit', disable: boolean }>`
  border-radius: 4px;
  padding: 0 30PX;
  height: 40px;
  font-size: 16px;
  line-height: 1;
  color: white;
  cursor: ${({disable})=> disable?"not-allowed":"pointer"};
  opacity: ${({disable})=> disable?"0.5":"1"};
  font-weight: bold;
  overflow: hidden;
  ${({type}) => {
    let _style;
    switch (type) {
      case 'submit':
        _style = SubColor;
        break;
      case 'img':
        _style = ButtonImage;
        break;
      case 'border':
        _style = ButtonBorder;
        break;
      case 'color':
        _style = ButtonColor;
        break;
    }
    return _style;
  }};
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonImage = css`
  //background: linear-gradient(165deg, #123DB5 0%, #5A42EC 100%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  //box-shadow: 0 0 32px 0 rgba(45, 70, 146, 0.2);
  border: 1px solid transparent;

  background-image:linear-gradient(149deg, #123DB5,#5A42EC);
  //border: 1px solid transparent;
  border-radius: 4px; /* 圆角属性测试 */
  background-clip: padding-box, border-box;
  background-origin: border-box;
`

const ButtonColor = css`
  font-size: 14px;
  font-weight: 600;
  background-color: #ECEFFF;
  border: 1px solid transparent;
  border-radius: 4px; /* 圆角属性测试 */
  background-clip: padding-box, border-box;
  background-origin: border-box;
  color: #2344EE !important;
`

const SubColor = css`
  font-size: 14px;
  font-weight: 600;
  background-color: ${({theme}) => theme.color.blues["100"]};
  border: 1px solid transparent;
  border-radius: 4px; /* 圆角属性测试 */
  background-clip: padding-box, border-box;
  background-origin: border-box;
  color: #fff !important;
`
const ButtonBorder = css`
  background: transparent;
  border: 1px solid #2344EE;
  font-size: 14px;
  font-weight: 600;
  color: #2344EE;
  clip-path: inset(0 round 4px);
`







