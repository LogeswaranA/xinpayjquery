const fs = require('fs');
const solc = require('solc');
const Xdc3 = require('xdc3');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.API_PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/compile', (req, res) => {
    console.log("req value is",req.body)
    var web3;
    if (req.body.network=='Apothem'){
         web3 = new Xdc3(new Xdc3.providers.HttpProvider("https://rpc.apothem.network"));
    }else{
         web3 = new Xdc3(new Xdc3.providers.HttpProvider("https://rpc.xinfin.network"));
    }

    const output = solc.compile(req.body.solCode.toString(), 1);
    if (output.errors) {
        res.send(output.errors[0])
    }
    if(!output.contracts[':ClientContract']){
        res.send("Contract name is not a ClientContract");
    }
    const bytecode = output.contracts[':ClientContract'].bytecode;
    const abi = JSON.parse(output.contracts[':ClientContract'].interface);
    var obj = { "abi": abi, "bytecode": bytecode };
    res.send(obj);
})

app.listen(port, () => console.log(`Listening on port ${port}!`))

