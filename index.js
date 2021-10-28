var express = require("express");
var axios = require('axios');
var cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

var app = express();

app.use(cors())
app.use(express.static('./cryptoexchanges/build/'))

var allowance = "Not fetched yet";

app.listen(process.env.PORT, () => {
 console.log(`Server running on port ${process.env.PORT}`);
});

app.get("/exchangeone", async (req, res, next) => {

     let details = [];

     details.push({
        "exchange": "kraken",
        "detailsinfo" : []
     })

     let results = await fetchdetails(`https://api.cryptowat.ch/markets/kraken/btcusd/orderbook?limit=1`);

     details[0].detailsinfo.push({
         "crypto": "btcusd",
         "buy": results.data.result.asks[0][0],
         "sell": results.data.result.bids[0][0]
     })

     results = await fetchdetails(`https://api.cryptowat.ch/markets/kraken/ethusd/orderbook?limit=1`);

     details[0].detailsinfo.push({
        "crypto": "ethusd",
        "buy": results.data.result.asks[0][0],
        "sell": results.data.result.bids[0][0]
    })

    res.send(details);
});

app.get("/exchangetwo", async (req, res, next) => {

    let details = [];

    details.push({
        "exchange": "bitfinex",
        "detailsinfo" : []
     })

    let results = await fetchdetails(`https://api.cryptowat.ch/markets/bitfinex/btcusd/orderbook?limit=1`);

     details[0].detailsinfo.push({
         "crypto": "btcusd",
         "buy": results.data.result.asks[0][0],
         "sell": results.data.result.bids[0][0]
     })

     results = await fetchdetails(`https://api.cryptowat.ch/markets/bitfinex/ethusd/orderbook?limit=1`);

     details[0].detailsinfo.push({
        "crypto": "ethusd",
        "buy": results.data.result.asks[0][0],
        "sell": results.data.result.bids[0][0]
    })

    allowance = results.data.allowance.remaining;

    res.send(details);

});

app.get("/allowance", (req, res,next) => {

    res.send({
        "allowance": allowance
    })
})

async function fetchdetails(url) {
    let res;
    await axios.get(url).then(response => {res =  response});
    return res;
}