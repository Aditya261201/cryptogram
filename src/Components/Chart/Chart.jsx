import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { BsBorderWidth } from 'react-icons/bs';
import Loading from '../Loading';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({ currency }) => {
    const { id } = useParams();
    const [chartData, setchartData] = useState([]);
    const [days, setdays] = useState(1);
    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

    const coinChartData = async () => {
        const { data } = await axios.get(url);
        // console.log(data.prices);
        setchartData(data.prices);
    }

    useEffect(() => {
        coinChartData()
    }, [currency, id, days])

    const mydata = {
        labels: chartData.map((value) => {
            const date = new Date(value[0]);
            const time = date.getHours() > 12
                ? `${date.getHours() - 12} : ${date.getMinutes()}PM`
                : `${date.getHours()}: ${date.getMinutes()} AM`
            return days === 1 ? time : date.toLocaleDateString()
        }),

        datasets: [
            {
                label: `Price in Past ${days}  Days in ${currency}`,
                data: chartData.map((value) => value[1]),
                borderColor: 'orange',
                BsBorderWidth: '3'
            }
        ]
    }


    return (
        <>  
        {/* if there is no chart data show loader */}
            {chartData.length===0? (<Loading/>) : 
            (
                    <div>
                        <Line data={mydata} options={{
                            elements: {
                                point: {
                                    radius: 1,
                                }
                            }
                        }} style={{ marginTop: '5rem', width: '60rem' }} />
                        <div className="btn">
                            <button onClick={() => { setdays(1) }}>24 Hours</button>
                            <button onClick={() => { setdays(31) }}>1 Month</button>
                            <button onClick={() => { setdays(365) }}>1 Year</button>
                        </div>
                    </div>
            ) }
        </>
    )
}

export default Chart
