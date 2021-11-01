import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { FaPlusSquare } from 'react-icons/fa';
import TableHeads from './TableHeadsMarket';
import axios from 'axios';
import '../Coins.css';

const CoinMarket = () => {
    const [cookie] = useCookies(['token']);
    const [coinAPI, setCoinAPI] = useState([]);
    const [notification, setNotification] = useState('');

    // COIN API REQUEST
    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true')
        .then( (res) => {
            setCoinAPI(res.data);
        });
    }, []);
    
    // FUNCTIONALITY TO SAVE COIN TO LIST
    const saveCoin = (e) => {
        fetch('http://localhost:9108/coins',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: e.target.id,
                user: cookie.token
            })
        })
        .then((res) => res.json())
        .then((data) => {
            setNotification(data.msg);
                setTimeout(() => {
                    setNotification('');
                }, 3000);
        })
        .catch(error => console.log(error));
    };

    return (
        <>
            <h1 className="text-center titleSifter">START SIFTING COINS</h1>
            <h2 className="text-center h2">SIFT FROM THE MARKET INTO YOUR CURATED LIST</h2>
            {notification && <h3 className="text-center notify">{notification}</h3>}
            <div className="row justify-content-center">
                <table border="0" cellPadding="0" cellSpacing="0" style={{ width: '80%'}}>
                    <tbody>
                        <TableHeads/>
                        {coinAPI.map( coin => (
                            <tr className='data' key={coin.id}>
                            <td 
                            id={coin.id} 
                            onClick={saveCoin} 
                            className='icon'
                            style={{textAlign: 'left'}} 
                            >
                                <FaPlusSquare className='icon icon-save' />
                            </td>
                            <td>{coin.symbol}</td>
                            <td>{coin.market_cap_rank}</td>
                            <td><img src={coin.image} alt="" className='logo' /> {coin.name}</td>
                            <td>    </td>
                            <td>${coin.current_price}</td>
                            <td>    </td>
                            <td>${coin.price_change_24h.toFixed(2)}</td>
                            <td>    </td>
                            <td>{coin.price_change_percentage_24h.toFixed(2)}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CoinMarket
