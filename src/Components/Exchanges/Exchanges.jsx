import React, { useState, useEffect } from 'react'
import axios from "axios";
import Loading from '../Loading';
import './Exchanges.css';
import Header from '../Header/Header';

const Exchanges = () => {


    const [loading, setloading] = useState(true);
    const [exchanges, setexchanges] = useState([]);
    const url = 'https://api.coingecko.com/api/v3/exchanges';
    useEffect(() => {
        const getData = async () => {
            // destructuring data from response
            const { data } = await axios.get(url);
            console.log(data);
            setloading(false);
            setexchanges(data);
        }
        getData();
    }, [])




    return (
        <>
            {
                loading ? <Loading /> : 
                    <>
                        <Header />
                        <h2 className='heading'>Exchanges</h2>
                        {
                            
                            exchanges.map((item, i) => {
                                return (
                                    <div className="exch-card">
                                        <div className="ex-img"><img src={item.image} /></div>
                                        <div className="ex-name">{item.name}</div>
                                        <div className="ex-price">{item.trade_volume_24h_btc.toFixed(0)}</div>
                                        <div className="ex-rank">#{item.trust_score_rank}</div>
                                    </div>
                                )
                            })
                        }
                    </>
            }
        </>
    )
}

export default Exchanges
