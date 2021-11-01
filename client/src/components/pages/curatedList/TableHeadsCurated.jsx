import React from 'react';
import '../Coins.css';

const TableHeads = () => {
    return (
        <>
            <tr className='table-heads'>
                <th>    </th>
                <th style={{ width: '25%'}}>CURRENCY</th>
                <th style={{ width: '5%'}}>    </th>
                <th style={{textAlign:'center', width: '30%'}}>AMOUNT</th>
                <th>    </th>
                <th>WALLET</th>
                <th>    </th>
                <th style={{ width: '30%'}}>MKT PRICE</th>
                <th style={{ width: '30%'}}>PRICE CHANGE 24H</th>
                <th style={{ width: '10%'}}>PRICE % CHANGE 24H</th>
            </tr>
        </>
    )
}

export default TableHeads
