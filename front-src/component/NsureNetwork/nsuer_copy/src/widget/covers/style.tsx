import styled, {css} from "styled-components";
import bgImg from "../../assets/imgs/cover_modal_bg_top.png";


export class CoversStyle {
   static ListCellStyle = css<{ top: number }>`
      padding: ${props => props.top}px 29px;
      box-sizing: border-box;
      div{
        flex: 1;
      }
      &>div:last-child{
        text-align: center;
      }
      .start:last-child{
              text-align: start;
      }
  `


}


export const BottomStyle = styled.div`
  padding: 20px 0;
`
export const InputStyle = styled.div`
  padding: 10px 0;
  h3 {
    font-size: 14px;
    font-weight: 400;
    color: #999;
    margin-bottom: 10px;
  }
  .input{
    padding: 5px 10px;
    box-sizing: border-box;
    background: #EFEFF6;
    border-radius: 4px;
    .MuiInputBase-input{
      color: #333333;
      font-size: 12px;
    }
  }
`
export const MsgCellStyle = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid ${({theme}) => theme.color.whites['600']};

  h3 {
    font-size: 14px;
    font-weight: 400;
    color: #999;
  }

  h4 {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;

    p {
      font-size: 14px;
      font-weight: 400;
      color: ${({theme})=>theme.color.whites["300"]};

    }

    span {
      font-size: 14px;
      font-weight: 400;
      color: ${({theme})=>theme.color.whites["800"]};


    }
  }
  
  .input{
    
  }
`

export const ImageStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: -35px;
`
export const CoverModalMain = styled.div`
  border-radius: 4px;
  background-color: ${({theme})=> theme.bgColor.main};
  max-width: 430px;
  margin: 0 auto;
  width: 100vw;
`;

export const CoverTop = styled.div`
  padding: 0 30px 10px 30px;
  text-align: center;
  box-sizing: border-box;
  height: 124px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  background-image: url(${bgImg});
  background-size: 100% 100%;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #FFFFFF;

    text-shadow: 0 2px 2px #0A1743;
  }

  h4 {
    font-size: 14px;
    font-weight: 400;
    color: #ABBDEC;
    text-shadow: 0 2px 2px #0A1743;


  }
`;

export const CoverBottomStyle = styled.div`
  padding: 0 20px;
  box-sizing: border-box;
`;
