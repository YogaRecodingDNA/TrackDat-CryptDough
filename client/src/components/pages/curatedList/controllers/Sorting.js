
const Sorting = (curatedList) => {

    const amountHiLo = (curatedList) => {
        console.log("amount Hi Lo", curatedList);
    };
    
    const amountLoHi = (curatedList) => {
        console.log("amount Lo Hi", curatedList);
        
    };
    
    const fundsHiLo = (curatedList) => {
        console.log("Funds Hi Lo", curatedList);
        
    };
    
    const fundsLoHi = (curatedList) => { 
        console.log("Funds Lo Hi", curatedList);
    };
    
    const priceHiLo = (curatedList) => {
        console.log("Price Hi Lo", curatedList);
        
    };
    
    const priceLoHi = (curatedList) => {
        console.log("Price Lo Hi", curatedList);

    };

    return {
        amountHiLo,
        amountLoHi,
        fundsHiLo,
        fundsLoHi,
        priceHiLo,
        priceLoHi,
    };
};

export default Sorting;
