import styled, {css} from "styled-components";

export class ItemStyles {
    static upDown = css`
      flex: 1;
      text-align: center;

      h3 {
        font-size: 14px;
        font-weight: 400;
        color: ${({theme}) => theme.color.black['100']};

        opacity: 0.6;
      }

      h4 {
        font-size: 36px;
        font-weight: 500;
        color: ${({theme}) => theme.color.black['100']};


      }
    `
}



export const LineStyle = styled.div`
  width: 1px;
  height: 117px;
  background: #E2E3E9;
  margin: 0 auto;

  @media (max-width: 600px) {
    height: 30px;
    background: transparent;
  }

`
