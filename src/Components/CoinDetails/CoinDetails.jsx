import React from 'react';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import axios from "axios";
import { useParams } from 'react-router-dom';
import './Coindetails.css';
import { BsArrowUpRightCircleFill, BsArrowDownLeftCircleFill } from "react-icons/bs";
import Chart from '../Chart/Chart';

const CoinDetails = () => {
    const { id } = useParams();
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    const [loading, setloading] = useState(true);
    const [coin, setcoin] = useState([]);
    const [currency, setcurrency] = useState('inr');
    const profit = coin.market_data?.price_change_24h > 0;
    useEffect(() => {
        const getCoin = async () => {
            const { data } = await axios.get(url);
            console.log(data);
            setloading(false);
            setcoin(data);
        }
        getCoin();
    }, [id])






    return (
        <>
            {
                loading ? <Loading /> :
                    <>
                        <div className="coininfo">
                            <div className="coindetails">
                                <div className="btn">
                                    <button onClick={() => { setcurrency('inr') }}>INR</button>
                                    <button onClick={() => { setcurrency('usd') }}>USD</button>
                                </div>
                                <div className="time">Last Updated : {coin.last_updated}</div>
                                <div className="coind-img"><img src={coin.image.large} /></div>
                                <div className="coind-name">{coin.name}</div>
                                <div className="coind-price">
                                    {currency == 'inr' ? "₹" : "$"}
                                    {coin.market_data.current_price[currency]}</div>
                                <div className="coind-profit">
                                    {profit ? <BsArrowUpRightCircleFill color='green' /> : <BsArrowDownLeftCircleFill color='red' />}
                                    {coin.market_data.price_change_percentage_24h}%
                                </div>
                                <div className="coind-mkt-rank">#{coin.market_cap_rank}</div>
                                <div className="coind-desc"><p>{coin.description.en.split('.')[0]}</p></div>
                            </div>
                            <div>
                                <Chart currency={currency} />
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default CoinDetails
