//Helper function that calculates the amount of USD$ you need
//to buy an arbitrary amount of the selected Cryptocurrency

function money_to_crypto(qty, coin){
    
        let worth = qty * Portfolio[coin].value;
    
        console.log(`You need $${worth} to buy ${qty} ${Portfolio[coin].name}s`)
    
    }
    // money_to_crypto(80000, "SC");

    
function crypto_to_money(dollars, coin){
    
        let worth = dollars / Portfolio[coin].value;
    
        console.log(`With $${dollars} you can buy ${worth.toFixed(6)} ${Portfolio[coin].name}s`)
    
    }
// crypto_to_money(400, "XRP");

export { money_to_crypto, crypto_to_money };