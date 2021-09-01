import styled, {css} from "styled-components";
import {PaddingSize} from "../../interface/css_interface";


export class WidthStyle {

    static MaxWidth = css`
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      @media (max-width: ${({theme}) => theme.lg}) {
        width: 96%;
        //margin: 20px auto 20px auto;
      }
    `;

    static PaddingSize = css<{ size: PaddingSize }>`
      padding: ${({size}) => size.all ? `${size.all}px` : `${size.x}px ${size.y}px`};
      box-sizing: border-box;
    `

    static LineStyle = styled.div<{ color: string, height: number, maxHeight: number }>`
      width: 1px;
      height: ${({height}) => height}px;
      background: ${({color}) => color};
      margin: 0 auto;

      @media (max-width: ${({theme}) => theme.md}) {
        margin: ${({maxHeight}) => maxHeight}px 0;
        height: 1px;
        width: 100%;
      }
    `


}


