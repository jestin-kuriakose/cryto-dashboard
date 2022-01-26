import { useState } from "react";
import ExchangeRate from "./ExchangeRate";
import axios from "axios";

function CurrencyConverter() {

    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC')
    const [amount, setAmount] = useState(1)
    const [exchangeRate, setExchangeRate] = useState(0)
    const [result, setResult] = useState(0)

    // console.log('Primary-' + chosenPrimaryCurrency)
    // console.log('Secondary-' + chosenSecondaryCurrency)

    const convert = () => {

        const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {to_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', from_currency: chosenSecondaryCurrency},
        headers: {
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
            'x-rapidapi-key': '6df3b81666mshecd82d66f32708cp12ddd2jsnf7bdb36865ed'
        }
        };

        axios.request(options).then((response) => {
            //console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
        }).catch((error) => {
            console.error(error);
        });
    }
    console.log(exchangeRate)
    return (
      <div className="currency-converter">
        <h2>Currency Converter</h2> 
        <div>
            <table>
                
                <tbody>
                    <tr>
                        <td>Primary Currency:</td>
                        <td>
                            <input type="number"
                            name="currency-amount-1"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            />
                        </td>
                        <td>
                            <select value={chosenPrimaryCurrency}
                            name="currency-option-1"
                            className="currency-options"
                            onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                            >
                                {currencies.map( (currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Secondary Currency:</td>
                        <td>
                            <input disabled="true"
                            name="currency-amount-2"
                            value={result}
                            />
                        </td>
                        <td>
                            <select value={chosenSecondaryCurrency}
                            name="currency-option-2"
                            className="currency-options"
                            onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                            >
                            {currencies.map( (currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>

                </tbody>
            </table>

            <button id="convert-button" onClick={convert}>Convert</button>

            <ExchangeRate 
            exchangeRating = {exchangeRate} 
            chosenPrimaryCurrency={chosenPrimaryCurrency}
            chosenSecondaryCurrency={chosenSecondaryCurrency}/>
        </div>
    </div>
        
    );
  }
  
  export default CurrencyConverter;