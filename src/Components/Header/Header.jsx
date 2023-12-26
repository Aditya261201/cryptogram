import React from 'react'
import './Header.css'
import { FaBitcoin } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <nav className='navbar'>
            <FaBitcoin className='main-icon'/>
            <h2>CryptoGram</h2>
            <div className='curr-last'>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/coins'>Coins</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header
