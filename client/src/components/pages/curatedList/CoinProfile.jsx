import React from 'react';
// import { useState, useEffect } from 'react';
// import Coins from './Coins';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';
// import { AiOutlineEdit } from 'react-icons/ai';
// import { MdDeleteForever } from 'react-icons/md';
// import { HiCheckCircle } from 'react-icons/hi';
// import { TiDelete } from 'react-icons/ti';
// import './coins.css';

const CoinProfile = () => {

    // const url = 'http://localhost:9108/myList';

    // const [cookie] = useCookies(['token', 'loggedIn']);
    // // const [coinData] = useState(coinGeckoData);
    // const [userCoins, setUserCoins] = useState([]);
    // const [inputVisible, setInputVisible] = useState(false);
    // const [inputText, setInputText] = useState('');
    // // const [saveIcon, setSaveIcon] = useState(false);
    // const [coinId, setCoinId] = useState('');
    
    // // FETCH USER DATA ON PAGE RENDER =============================================================================================
    // useEffect(() => {
    //     const userBody = JSON.stringify({ 
    //         token: cookie.token,
    //         type: "onPageLoad",
    //     });
    //     const data = fetch(url, userBody);
    //         console.log("PAGE RELOADED DATA!!!!!", data);
    //         //     setUserCoins(data);

    //     // fetch('http://localhost:9108/myList', {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'Content-Type': 'application/json'
    //     //     },
    //     //     body: userBody
    //     // })
    //     // .then(res => res.json())
    //     // .then(data => {
    //     //     setUserCoins(data);
    //     //     console.log("PAGE RELOADED DATA!!!!!", data);
        
    //     // })
    //     // .catch(err => console.log(err)); 
    // }, [cookie.token]);

    
    // // CROSS REFERENCE USER'S LIST TO COINGECKO API TO COLLECT COIN DATA =============================================================================================
    // let curatedList = [];
            
    // userCoins.forEach(userCoin => {
    //     for(let coinName in userCoin) {
    //         let amount = userCoin[coinName];
    //         coinGeckoData.forEach((coin) => {
    //             coin.userAmount = amount;
    //             // console.log('coin ->', coin.id, ' amount ->', coin.userAmount, ' type of amount ->', typeof coin.userAmount);
    //             if(coinName === coin.id) {
    //                 curatedList.push(coin);
    //             }
    //         });
    //     }  
    // });
    // // setCuratedList(userList);
    // console.log('Curated List =====', curatedList);


    // // DELETE COIN REQUEST ====================================================================================================
    // const deleteFunc = (e) => {

    //     const deleteBody = JSON.stringify({
    //         coinId: e.target.id,
    //         token: cookie.token,
    //         type: "delete",
    //     });

    //     const data = fetch(url, deleteBody);
    //     console.log("DELETE FUNC DATA!", data);

    //     // fetch('http://localhost:9108/myList', {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'Content-Type': 'application/json'
    //     //     },
    //     //     body: deleteBody,
    //     // })
    //     // .then(res => res.json())
    //     // .then(data => {
    //     //     setUserCoins(data.result);
    //     // })
    //     // .catch(err => console.log(err));
    // };


    // // UPDATE COIN AMOUNT REQUEST =============================================================================================
    // const updateAmount = (e) => {

    //     const updateBody = JSON.stringify({
    //         amount: inputText,
    //         coinId: e.target.id,
    //         token: cookie.token,
    //         type: "updateAmount",
    //     });

    //     const data = fetch(url, updateBody);
    //     console.log("UPDATE FUNC DATA!", data);
    //     setInputVisible(false);
    //     //     setUserCoins(data.result);

    //     // fetch('http://localhost:9108/myList', {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'Content-Type': 'application/json'
    //     //     },
    //     //     body: updateBody,
    //     // })
    //     // .then(res => res.json())
    //     // .then(data => {
    //     //     setUserCoins(data.result);
    //     //     setInputVisible(false);
    //     //     console.log("updateAmount FIRED");
    //     //     console.log("updateAmount data result", data.result);
    //     // })
    //     // .catch(err => console.log(err));
    // };


    // // TRACK INPUT FIELD'S TEXT AND DYNAMICALLY SET inputText STATE TO CURRENT VALUE
    // const inputValue = (e) => {
    //     console.log("inpuValue() FIRED");
    //     setInputText(e.target.value);
    //     setCoinId(e.target.id);
    //     console.log("inputText", inputText);
    // };


    // // TO RENDER THE INPUT COMPONENT
    // let inputAppear = (e) => {
    //     console.log("inputAppear() FIRED");
    //     setInputVisible(true);
    //     setCoinId(e.target.id);
    // };


    // // // TO HIDE THE INPUT COMPONENT
    // let inputHide = () => {
    //     console.log("inputHide() FIRED");
    //     setInputVisible(false);
    // };



    return (
        <>
        <h1 className="text-center titleSifter">Your List</h1>
         
        {/* <div className="row justify-content-center">

            <table border="0" cellPadding="0" cellSpacing="0" style={{ width: '80%'}}>
                <tbody>
                <tr className='table-heads'>
                    <th>    </th>
                    <th style={{ width: '15%'}}>Currency</th>
                    <th>    </th>
                    <th style={{textAlign:'center', width: '10%'}}>Amount</th>
                    <th>    </th>
                    <th>    </th>
                    <th>Price</th>
                    <th>Price Change</th>
                    <th style={{ width: '10%'}}>Price % Change 24H</th>
                </tr>
                {curatedList.map( coin => (
                    <tr className='data' key={coin.id}>
                        <td onClick={deleteFunc} id={coin.id} className='icon'><MdDeleteForever style={{color: 'firebrick', textAlign: 'left'}} /></td>
                        <td style={{textAlign: 'left'}}><img src={coin.image} alt="" className='logo' /> {coin.name}</td>
                        <td>{coin.symbol}</td>
                        {(coinId === coin.id && inputVisible) ? <td>
                            <HiCheckCircle className='icon' id={coin.id} onClick={updateAmount} style={{ boxSizing: 'border-box', color: 'mediumAquaMarine', cursor: 'pointer'}} />
                            <TiDelete className='icon' id={coin.id} onClick={inputHide} style={{ boxSizing: 'border-box', color: 'firebrick', cursor: 'pointer'}} />
                            <input className='form-control' id={coin.id} type='text' name={coin.Name} maxLength='5' placeholder='ENTER AMOUNT' onChange={inputValue} />
                            </td>
                            : <td onClick={inputAppear} className='icon' id={coin.id}>{coin.userAmount.toFixed(5)}<AiOutlineEdit style={{ color: 'mediumAquaMarine'}} /></td>
                        }
                        <td></td>
                        <td></td>
                        <td>${coin.current_price}</td>
                        <td>${coin.price_change_24h.toFixed(2)}</td>
                        <td>{coin.price_change_percentage_24h.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> */}
        </>
    )
}

export default CoinProfile;



// FETCH API COINGECKO =============================================================================================
    // useEffect(() => {
    //     axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true')
    //     .then( (res) => {
    //         setCoinData(res.data);
    //         console.log("COINGECKO AXIOS FIRED");
    //     });
    // }, []);


      // IF TEXT EXISTS IN INPUT FIELD, RENDER THE SAVE ICON =============================================================================================
    // useEffect(() => {
    //     // console.log("SAVE ICON", saveIcon);
    //     if(inputVisible && inputText.length > 0){
    //         // 'Make icon appear'
    //         setSaveIcon(true);
    //     } else if (inputVisible && inputText.length === 0) {
    //         // 'Make icon hidden'
    //         setSaveIcon(false);
    //     }
    // }, [inputVisible, inputText]);