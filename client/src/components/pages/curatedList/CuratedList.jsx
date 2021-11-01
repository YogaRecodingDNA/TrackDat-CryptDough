import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { MdRefresh } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { HiCheckCircle } from 'react-icons/hi';
import { TiDelete } from 'react-icons/ti';
import TableHeadsCurated from './TableHeadsCurated';
import axios from 'axios';
import '../Coins.css';
import SortMenu from './SortMenu';
import Footer from '../footer/Footer';


const CuratedList = () => {
    const url = 'http://localhost:9108/myList';

    const [cookie] = useCookies(['token', 'loggedIn']);
    const [userCoins, setUserCoins] = useState([]);
    const [coinGeckoData, setCoinGeckoData] = useState([]);
    const [sortedList, setSortedList] = useState(null);
    // const [refresh, setRefresh] = useState(false);

    const [coinId, setCoinId] = useState('');
    const [inputVisible, setInputVisible] = useState(false);
    const [inputText, setInputText] = useState('');
    const [notification, setNotification] = useState('');


    // FETCH USER DATA ON PAGE RENDER =================================================================================
    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                token: cookie.token,
                type: "onPageLoad",
            })
        })
        .then(res => res.json())
        .then(data => {
            setUserCoins(data);
        })
        .catch(err => console.log(err));
    }, [cookie.token]);
    
    
    // FETCH API COINGECKO =============================================================================================
    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true')
        .then( (res) => {
            setCoinGeckoData(res.data);
            console.log("GECKO API FETCHED!!!", res.data);
        });
    }, []);

    // const refreshData = () => {
    //     window.location.reload();
    // };
    
    
    // DELETE COIN REQUEST ====================================================================================================
    const deleteFunc = (e) => {
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                coinId: e.target.id,
                token: cookie.token,
                type: "delete",
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log("DELETE FUNC DATA!", data);
            setUserCoins(data.result);
            if (data.result) {
                setNotification(data.msg);
                setTimeout(() => {
                    setNotification('');
                }, 3500);
            }
        })
        .catch(err => console.log(err));
    };
    
    
    
    // UPDATE COIN AMOUNT REQUEST =============================================================================================
    const updateAmount = (e) => {
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: inputText,
                coinId: coinId,
                token: cookie.token,
                type: "updateAmount",
            })
        })
        .then(res => res.json())
        .then(data => {
            setUserCoins(data.result);
            setInputVisible(false); 
        })
        .catch(err => console.log(err));
    };
    
    
    // TRACK INPUT FIELD'S TEXT AND DYNAMICALLY SET inputText STATE TO CURRENT VALUE
    const inputValue = (e) => {
        console.log("inpuValue() FIRED");
        setInputText(e.target.value);
        setCoinId(e.target.id);
        console.log("inputText", inputText);
    };
    
    
    // TO RENDER THE INPUT COMPONENT
    let inputAppear = (e) => {
        console.log("inputAppear() FIRED");
        setInputVisible(true);
        setCoinId(e.target.id);
    };
    
    
    // // TO HIDE THE INPUT COMPONENT
    let inputHide = () => {
        console.log("inputHide() FIRED");
        setInputVisible(false);
    };


    // CROSS REFERENCE USER'S LIST TO COINGECKO API TO COLLECT COIN DATA ============================================================================================= 
    let curatedList = [];
    userCoins.forEach(userCoin => {
        for(let coinName in userCoin) {
            coinGeckoData.forEach((coin) => {
                if(coinName === coin.id) {
                    curatedList.push(coin);
                }
            });
        }  
    });
    
    // SET UPDATED USER AMOUNT TO EACH ARRAY ITEM
    curatedList.map( (coin) => {
        return userCoins.forEach (userCoin => {
            for (let coinName in userCoin) {
                if (coinName === coin.id){
                    coin.userAmount = userCoin[coinName];
                    coin.wallet = (coin.userAmount * coin.current_price).toFixed(0);
                }
            }
        });
    });

    const display = sortedList ? sortedList : curatedList;
    
    let total = 0;
    curatedList.forEach( coin => {
        let userFunds = coin.current_price * coin.userAmount;
        console.log("USER AMOUNT IN FOR EACH", coin.userAmount);
        total += userFunds;
    });
    console.log("total => ", total);

    //             const [sortedList, setSortedList] = useState();

    return (
        <>
        <SortMenu sorted={sortedList => setSortedList(sortedList)} curatedList={curatedList} />
        <h1 className="text-center titleSifter">Your Curated List</h1>
        <h2 className="text-center total">Total: ${total.toFixed(2)}</h2>
        {notification && <h3 className="text-center notify" style={{textAlign: 'center'}}>{notification}</h3>}
            <div className="row justify-content-center center-toggle">
                <table border="0" cellPadding="0" cellSpacing="0" style={{ width: '80%'}}>
                    <tbody>
                        <TableHeadsCurated />
                        {display.map( coin => (
                            <tr className='data' key={coin.id}>
                                <td onClick={deleteFunc} id={coin.id} className='icon'><MdDeleteForever style={{color: 'firebrick', textAlign: 'left'}} /></td>
                                <td style={{textAlign: 'left'}}><img src={coin.image} alt="" className='logo' /> {coin.name}</td>
                                <td>{coin.symbol}</td>
                                {(coinId === coin.id && inputVisible) ? <td>
                                    <HiCheckCircle id={coin.id} className='icon icon-update' onClick={updateAmount} />
                                    <TiDelete id={coin.id} className='icon icon-cancel' onClick={inputHide} />
                                    <input id={coin.id} className='form-control' type='text' name={coin.Name} maxLength='5' placeholder='ENTER AMOUNT' onChange={inputValue} />
                                    </td>
                                    : <td id={coin.id} onClick={inputAppear} className='icon'>{coin.userAmount.toFixed(3)}<AiOutlineEdit className='icon-save' /></td>
                                }
                                <td></td>
                                <td>${coin.wallet}</td>
                                <td></td>
                                <td>${coin.current_price.toFixed(0)} <MdRefresh className='icon refresh' /></td>
                                <td>${coin.price_change_24h.toFixed(2)}</td>
                                <td>{coin.price_change_percentage_24h.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    )
}

export default CuratedList;




// setRefresh(!refresh);
        // axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true')
        // .then( (res) => {
        //     setCoinGeckoData(res.data);
        //     console.log("REFRESHED...");
        //     console.log("REFRESHED DATA", res.data);
        // });




    // console.log('Sorted List =====', sortedList);
    // console.log('Curated List =====', curatedList);
    // console.log('DISPLAY =====', display);