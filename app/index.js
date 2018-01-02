// Cryptoculator 1.0
// Author: Hamdriugelias (Andrew Alvarez) - 11/12/2017
//Features in progress:
/* 

    v Build Front-End (HTML+CSS)

    v Add Real-time Dynamic Updates

    v Fetch calls to Exchange API

    Portfolio Distribution Graph

    ROI Formula

    Calculators

    Login

    Portfolios
*/
//



function money_to_crypto(qty, value, name) {

    if (isNaN(qty)) {
        PBOX.innerHTML += `<p class="p-special">Cannot Compute</p>`

    } else if (typeof qty === "number") {
        let worth = qty / value;
        // console.log(`$${qty} will buy you ${worth.toFixed(8)} ${name}`)
        PBOX.innerHTML += `<p class="p-special">$${qty} will buy you<br>${worth.toFixed(8)} ${name}</p>`;

    }
}


// SELECTORS //

const CRYPTO_QTY = document.getElementById('crypto-qty-input');
const DROPDOWN = document.getElementById('crypto-dropdown-menu');
const MAIN_BUTTON = document.getElementById('search-button');

const CRYPTO_QTY2 = document.getElementById('crypto-qty-input2');
const DROPDOWN2 = document.getElementById('crypto-dropdown-menu2');
const MAIN_BUTTON2 = document.getElementById('search-button2');

// const CRYPTO_QTY = document.getElementById('crypto-qty-input');
// const DROPDOWN = document.getElementById('crypto-dropdown-menu');
// const MAIN_BUTTON = document.getElementById('search-button');

const PBOX = document.getElementById('p-box');

const CBOX = document.getElementById('calc-box')
const DBOX = document.getElementById('dollar-box');

const CALC_1 = document.getElementById('switch1');
const CALC_2 = document.getElementById('switch2');

/*
The function calculates the growth of a certain amount of
a cryptocurrency (coin) a certain amount of times (dups)
based on the premise of doubling the initial value of investment.
Function generates a string with the calculation of:

    The quantity of available coins

    multiplied by

    the current value of the coin in $USD 

The function loops and multiplies the current value by 2 and returns

the next string with the calculation.

*/

function cryptoculator(quantity, value) {
    if (isNaN(quantity)) {
        PBOX.innerHTML += `<p class="p-special">Cannot Compute</p>`

    } else if (typeof quantity === "number") {
        PBOX.innerHTML += `<p class="p-special">${quantity}</p><p class="p-special2">*</p>`;
        for (let i = 1; i <= 15; i++) {
            PBOX.innerHTML += `<p class="p-boxes">${value}  =  $${(quantity * value).toFixed(2)} - ${i}x</p>`;
            //console.log(`${qty} * ${value} = $${qty*value} - ${i}x`)
            value *= 2;
        }
    }
}

MAIN_BUTTON.addEventListener('click', (e) => {
    let qty_number = parseFloat(CRYPTO_QTY.value);
    //console.log(typeof qty_number);
    // console.log(DROPDOWN.value);
    //   let crypto_value;

    fetch(`https://api.coinmarketcap.com/v1/ticker/${DROPDOWN.value}/`)
        .then(
        function (response) {
            if (response.status !== 200) {
                PBOX.innerHTML = "";
                PBOX.innerHTML += `<p class="p-special">Looks like there was a problem. ${response.status} Error</p>`;
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
                let crypto_value = data[0].price_usd;
                console.log(data[0].price_usd);
                PBOX.innerHTML = "";
                cryptoculator(qty_number, crypto_value);
            });
        }
        )
        .catch(function (err) {
            console.log('Fetch Error', err);
        });
})



MAIN_BUTTON2.addEventListener('click', (e) => {
    let qty_number = parseFloat(CRYPTO_QTY2.value);

    fetch(`https://api.coinmarketcap.com/v1/ticker/${DROPDOWN2.value}/`)
        .then(
        function (response) {
            if (response.status !== 200) {
                PBOX.innerHTML = "";
                PBOX.innerHTML += `<p class="p-special">Looks like there was a problem. ${response.status} Error</p>`;
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            response.json().then(function (data) {
                let crypto_value = data[0].price_usd;
                let crypto_name = data[0].symbol;
                console.log(data[0].price_usd);
                PBOX.innerHTML = "";
                money_to_crypto(qty_number, crypto_value, crypto_name);
            });
        }
        )
        .catch(function (err) {
            console.log('Fetch Error', err);
        });
})

////////////////

CALC_1.addEventListener('click', (e) => {
    // console.log(CBOX.style.display)
    CBOX.style.display = 'flex';
    DBOX.style.display = 'none';
    PBOX.innerHTML = "";
})

CALC_2.addEventListener('click', (e) => {
    // console.log(CBOX.style.display)
    CBOX.style.display = 'none';
    DBOX.style.display = 'flex';
    PBOX.innerHTML = "";
})

