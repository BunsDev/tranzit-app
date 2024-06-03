'use client'

import React from 'react'
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

function PerformanceChart() {

    const chartData = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 1400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 3800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 4800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart width={300} height={100} data={chartData}>
                <Area type="monotone" dataKey="pv" stroke="#701a75" strokeWidth={2} dot={true} fill='rgba(112, 26, 117, 0.2)' />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default PerformanceChart