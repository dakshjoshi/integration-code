




import React, {PureComponent, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Tooltip, Legend, Area, AreaChart, Bar, XAxis} from 'recharts';




export const ChartWidget: React.FC<{listData:any}> = ({listData}) => {

    const c1 = "#CE45C5";
    const c2 = "#5592E8";



    return (
    <AreaChart width={1200} height={400} data={listData} margin={{top: 20, right: 20, bottom: 20, left: 20}}>

        <Tooltip separator={':'} labelFormatter={(label)=> {

            return '';
        }} label={'sss'}/>

        <defs>
            <linearGradient id="splitColors" x1="0" y1="0" x2="0" y2="100%">
            <stop  style={{stopColor: c1,}}  offset={'0%'} />
            <stop  style={{stopColor: c2,}} offset={'70%'} />
            </linearGradient>

        </defs>
        <Area type="monotone" dataKey='price' fill="url(#splitColors)" stroke='#EE2388'/>
        <XAxis dataKey="date" tickFormatter={(label)=>{
            let _date = new Date(label);

            return `${_date.getMonth() + 1}-${_date.getDate()}`
        }} />

    </AreaChart>);


};
