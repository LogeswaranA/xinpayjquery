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
    var obj = {};
    if (output.errors) {
        obj = {"status":false,"data":output.errors[0]}
        res.status(400).send(obj);
    }
    if(!output.contracts[':ClientContract']){
        obj = {"status":false,"data":"Contract name is not a ClientContract"}
        res.status(400).send(obj);
    }
    const bytecode = output.contracts[':ClientContract'].bytecode;
    const abi = JSON.parse(output.contracts[':ClientContract'].interface);
    var obj = {"status":true, "abi": abi, "bytecode": bytecode };
    res.status(200).send(obj);
})

app.listen(port, () => console.log(`Listening on port ${port}!`))

