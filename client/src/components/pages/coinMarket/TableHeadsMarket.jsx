import React from 'react';
import '../Coins.css';

const TableHeads = () => {
    return (
        <>
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
        </>
    )
}

export default TableHeads
