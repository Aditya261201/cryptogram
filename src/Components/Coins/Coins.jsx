import React from 'react';
import { useState, useEffect } from 'react'
import axios from "axios";
import Loading from '../Loading';
import './Coins.css';
import Header from '../Header/Header';

const Coins = () => {
    const [loading, setloading] = useState(true);
    const [currency, setcurrency] = useState('inr');
    const [coins, setcoins] = useState([]);
    const currencySymbol = currency === 'inr' ? '₹' : '$'

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`;
    useEffect(() => {
        const getData = async () => {
            // destructuring data from response
            const { data } = await axios.get(url);
            console.log(data);
            setloading(false);
            setcoins(data);
        }
        getData();
    }, [currency])




    return (
        <>
            {
                loading ? <Loading /> :
                    <>
                        <Header />
                        <div className="btns">
                            <button onClick={()=>{setcurrency('inr')}}>INR</button>
                            <button onClick={() => {setcurrency('usd')}}>USD</button>
                        </div>
                        {

                            coins.map((coindata, i) => {
                                return (
                                    <div className="coin-card" key={i}>
                                        <div className="coin-img"><img src={coindata.image} height={60}/></div>
                                        <div className="coin-name">{coindata.name}</div>
                                        <div className="coin-price">{currencySymbol} {coindata.current_price.toFixed(0)}</div>
                                        <div className="coin-profitloss" style={coindata.price_change_percentage_24h > 0 ? { color: "green"} : {color:"red"}}>{coindata.price_change_percentage_24h}</div>
                                    </div>
                                )
                            })
                        }
                    </>
            }
        </>
    )
}

export default Coins
