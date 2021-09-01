import {PolarAngleAxis, PolarGrid, RadarChart, Radar} from "recharts";
import React from "react";
import {RadarModel} from "../../interface/product_interface";
import styled from "styled-components";



export const RadarChartWidget:React.FC<{model:RadarModel}> = ({model}) => {
    const {no1,no2,no3,no4,no5} = model;
    const data = [
        { subject: 'History & Team', A: no1,},
        { subject: 'Exposure', A: no2,},
        { subject: 'Code Quality', A: no4,},
        { subject: 'Dev Community', A: no5,},
        { subject: 'Audit', A: no3,},

    ];
    return (
        <RadarStyle cx={150} cy={145} outerRadius={100} width={300} height={280} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={customTick}/>

            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
        </RadarStyle>
    );
}





// @ts-ignore
function customTick({ payload, x, y, textAnchor, stroke, radius }) {
    return (
        <g
            className="recharts-layer recharts-polar-angle-axis-tick"
        >
            <text
                radius={radius}
                stroke={stroke}
fill={'#666666'}
                x={x}
                y={y}
                className="recharts-text recharts-polar-angle-axis-tick-value"
                textAnchor={textAnchor}
            >
                <tspan x={x} dy="0em">
                    {payload.value}
                </tspan>
            </text>
        </g>
    );
}

const RadarStyle = styled(RadarChart)`
    .recharts-text{
      font-size: 12px;
    }
`

