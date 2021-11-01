import React from 'react';
import Fetch from '../../fetchApi/Fetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
// import '../../App.css';
// import './coins.css';

const Coins = () => {
    const [cookie] = useCookies(['token']);

    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true';

    const { data } = Fetch(url);
    
    const saveCoin = (e) => {

        let coinInfo = JSON.stringify({
            id: e.target.id,
            user: cookie.token
        });

        fetch('http://localhost:9108/coins',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: coinInfo
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch(error => console.log(error));

    };

    return (
        <>
        <h1 className="text-center titleSifter">START SIFTING COINS</h1>
         
        <div className="row justify-content-center">
            <table border="0" cellPadding="0" cellSpacing="0" style={{ width: '80%'}}>
                <tbody>
                <tr className='table-heads'>
                    <th>    </th>
                    <th></th>
                    <th>Rank</th>
                    <th style={{ width: '15%'}}>Currency</th>
                    <th>    </th>
                    <th>Price</th>
                    <th>    </th>
                    <th>Price Change</th>
                    <th>    </th>
                    <th>Price % Change 24H</th>
                </tr>
                {data.map( coin => (
                    <tr className='data' key={coin.id}>
                        <td style={{textAlign: 'left'}} onClick={saveCoin} id={coin.id} className='icon'><FontAwesomeIcon style={{color: 'mediumAquaMarine'}} icon={faPlusSquare}/></td>
                        <td>{coin.symbol}</td>
                        <td>{coin.market_cap_rank}</td>
                        <td><img src={coin.image} alt="" className='logo' /> {coin.name}</td>
                        <td>    </td>
                        <td currentPrice={coin.current_price}>${coin.current_price}</td>
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

export default Coins;





    // const { data, isLoading, error } = Fetch(url);

    // if (error) {

    //     return (
    //         <>
    //           <p style={{color: "red"}}>{"Hey man, like, there was a " + error.message + ".. soooo yeah"}</p>
    //         </>
    //     )

    // } else if (isLoading) {


    //     return (
    //         <>
    //           <h1>LOADING DAT CRYPDOUGH...</h1>
    //         </>
    //     )
    // }