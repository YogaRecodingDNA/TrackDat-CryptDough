

export const useCurate = (userCoins, coinGeckoData) => {
    let curatedList = [];
    userCoins.forEach(userCoin => {
        for(let coinName in userCoin) {
            let amount = userCoin[coinName];
            coinGeckoData.forEach((coin) => {
                coin.userAmount = amount;
                // console.log('coin ->', coin.id, ' amount ->', coin.userAmount, ' type of amount ->', typeof coin.userAmount);
                if(coinName === coin.id) {
                    curatedList.push(coin);
                }
            });
        }  
    });
    // console.log('Curated List =====', curatedList);
    
    return curatedList;
};

// export default useCurate;