import {css} from "styled-components";
import {whites} from "../../theme/colors";


export class CardStyle{
    static wap= css`
background-color: ${({theme})=>theme.bgColor.main};
border-radius: 5px;
`

    static BorderTwoStyle = css<{bgColor:string}>`
      border: 1px solid transparent;
      border-radius: 4px; /* 圆角属性测试 */
      background-color: ${({theme})=>theme.color.whites[100]};
      //background-image: linear-gradient(${({bgColor}) => bgColor},${({bgColor}) => bgColor}),linear-gradient( to bottom,rgba(28, 38, 98, 1), rgba(51, 92, 180, 1),rgba(28, 38, 98, 1)); /* 模拟渐变边框 */
      background-clip: padding-box, border-box;
      background-origin: border-box;
`
    static BorderToBottomStyle = css<{bgColor:string,borderColor:string}>`
      border: 1px solid transparent;
      border-radius: 4px; /* 圆角属性测试 */
      background-image: linear-gradient(${({bgColor}) => bgColor},${({bgColor}) => bgColor}),linear-gradient( to bottom,${({borderColor})=> borderColor}); /* 模拟渐变边框 */
      background-clip: padding-box, border-box;
      background-origin: border-box;
`

}
