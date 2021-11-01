import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchAPI = () => {
    
    const [coinAPIdata, setCoinAPIdata] = useState([]);

    useEffect(() => {

        const fetchApi = async () => {

            axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true')
            .then( (res) => {
                setCoinAPIdata(res.data);
            });
        };

        fetchApi();
    }, []);
    // return { data, isLoading, error };
    console.log("FetchApi file data ", coinAPIdata);

    return coinAPIdata;
};

export default useFetchAPI;
