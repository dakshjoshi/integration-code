import React, {useEffect, useState} from "react";
import startImg from '../../assets/imgs/start.png'
import startUnImg from '../../assets/imgs/start_un.png'
import styled from "styled-components";

export const StartWidget: React.FC<{ startNumber: number, size?: number }> = ({
                                                                                  startNumber,
                                                                                  size = 10,
                                                                              }) => {
    const [startList, setStartList] = useState<boolean[]>([]);
    useEffect(() => {
        const arr: boolean[] = [];
        for (let i = 0; i < 5; i++) {
            if (i <= startNumber - 1) {
                arr.push(true);
            } else {
                arr.push(false);
            }
        }
        setStartList(arr);
    }, [])
    return (
        <StartStyle size={size}>
            {
                startList.map((ev, i) => <img key={i} src={ev ? startImg : startUnImg} alt=""/>)
            }
        </StartStyle>
    );
}
export const StartTextWidget: React.FC<{ startNumber: number, size?: number, grade?: number }> = ({
                                                                                                     startNumber,
                                                                                                     size = 10,
                                                                                                      grade,
                                                                                                 }) => {
    const [startList, setStartList] = useState<boolean[]>([]);
    useEffect(() => {
        const arr: boolean[] = [];
        for (let i = 0; i < 5; i++) {
            if (i <= startNumber - 1) {
                arr.push(true);
            } else {
                arr.push(false);
            }
        }
        setStartList(arr);
    }, [startNumber])
    return (
        <StartStyle size={size} grade={grade}>
            {
                startList.map((ev, i) => ev ? "★" : "☆")
            }
        </StartStyle>
    );
}


const StartStyle = styled.div<{ size: number, grade?: number }>`
  display: flex;
  color: ${({theme, grade}) => theme.gradeColor[grade || 1]} !important;

  img {
    display: block;
    width: ${({size}) => size}px;
    height: ${({size}) => size}px;
    margin-right: ${({size}) => size / 2}px;

    &:last-child {
      margin-right: 0;
    }
  }
`;
