const showCurrentPrice = async (web3, contract, accounts) => {
    $("#showprice").on("click", async (e) => {
        console.log("Iam at showCurrentPrice")
        e.preventDefault();
        const nonce = await web3.eth.getTransactionCount(accounts[0]);
        console.log("nonce value is", nonce)
        const gasPrice = await web3.eth.getGasPrice();
        console.log("gasPrice value is", gasPrice)
        const value = await contract.methods.currentPrice().call();
        console.log("Current Price is ", value)
    });
};

const deployContract = async (web3, accounts) => {
    let abi, bytecode;
    $("#abi").on("change", (e) => {
        abi = e.target.value;
    });
    $("#bytecode").on("change", (e) => {
        bytecode = e.target.value;
    });
    $("#deploy").on("click", async (e) => {
        e.preventDefault();
        let deploy_contract = new web3.eth.Contract(JSON.parse(abi));
        let payload = {
            data: bytecode
        }
        let parameter = {
            from: accounts[0],
            gas: web3.utils.toHex(800000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
        }
        await deploy_contract.deploy(payload).send(parameter, (err, transactionHash) => {
            console.log('Transaction Hash :', transactionHash);
        }).on('confirmation', function (confirmationNumber, receipt) {
            console.log("receipt", confirmationNumber, receipt)
            }).then(function (newContractInstance) {
                    console.log(newContractInstance) // instance with the new contract address
            });
    });
};

const requestPrice = async (web3, contract, accounts) => {
    let oracle, endpoint, symbol, jobid;
    $("#oracle").on("change", (e) => {
        oracle = e.target.value;
    });
    $("#endpoint").on("change", (e) => {
        endpoint = e.target.value;
    });
    $("#symbol").on("change", (e) => {
        symbol = e.target.value;
    });
    $("#jobid").on("change", (e) => {
        jobid = e.target.value;
    });
    $("#submitrequest").on("click", async (e) => {
        console.log("Iam at requestPrice")
        e.preventDefault();
        const nonce = await web3.eth.getTransactionCount(accounts[0]);
        console.log("nonce value is", nonce)
        const gasPrice = await web3.eth.getGasPrice();
        console.log("gasPrice value is", gasPrice)
        const value = await contract.methods.currentPrice().call();
        console.log("Current Price is ", value)
        await contract.methods
            .requestPrice(oracle, jobid, endpoint, symbol)
            .send({ from: accounts[0], gas: "210000" })
            .on("transactionHash", function (transactionHash) {
                console.log("transactionhahs", transactionHash)
            })
    });
};


const publishPrice = async (web3,accounts) => {
    let oracle, endpoint, symbol, jobid, abi, contract;
    $("#abi").on("change", (e) => {
        abi = e.target.value;
    });
    $("#contract").on("change", (e) => {
        contract = e.target.value;
    });
    $("#oracle").on("change", (e) => {
        oracle = e.target.value;
    });
    $("#endpoint").on("change", (e) => {
        endpoint = e.target.value;
    });
    $("#symbol").on("change", (e) => {
        symbol = e.target.value;
    });
    $("#jobid").on("change", (e) => {
        jobid = e.target.value;
    });
    $("#submitrequest").on("click", async (e) => {
        console.log("Iam at requestPrice")
        e.preventDefault();
        
        const reqContract = new web3.eth.Contract(
            abi,
            contract
          );
        const nonce = await web3.eth.getTransactionCount(accounts[0]);
        console.log("nonce value is", nonce)
        const gasPrice = await web3.eth.getGasPrice();
        console.log("gasPrice value is", gasPrice)
        await reqContract.methods
            .requestPrice(oracle, jobid, endpoint, symbol)
            .send({ from: accounts[0], gas: "210000" })
            .on("transactionHash", function (transactionHash) {
                console.log("transactionhahs", transactionHash)
            })
    });
};


async function mainFunc() {
    const web3 = await getWeb3();
    console.log("Web3", web3);
    const accounts = await web3.eth.getAccounts();
    console.log("Web3", accounts[0]);

    const requestContract = await getRequestContract(web3);
    console.log("requestContract", requestContract);

    // const ORACLE_CONTRACT = "0xac01be7848651fbc7a9f3e8b72f9d47a0f4ceb47";
    // const endpoint = "single_assets_daily";
    // const symbol = "xdc-usd-p-d";
    // const jobId = "f0713ada4ff0492cb5bca6036b02d2e5";

    await showCurrentPrice(web3, requestContract, accounts);
    await requestPrice(web3, requestContract, accounts);
    await deployContract(web3, accounts);
    await publishPrice(web3,accounts);


}

mainFunc();