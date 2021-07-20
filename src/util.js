const GetProvider = async () => {
    const provider = await detectEthereumProvider();
    return provider;
}

const getWeb3 = async () => {
    let xdc3 = new Web3(await GetProvider());
    return xdc3;
}

const GetChainId = async () => {
    let xdc3 = new Web3(await GetProvider());
    console.log("tetjsothaosdg", xdc3.eth.net.getId())
    const val = await xdc3.eth.net.getId();
    return val;
}

const GetCurrentProvider = async () => {
    // if (window.web3.currentProvider.isMetaMask) {
        const chainId = await GetChainId();
        console.log("testing heres", chainId)

        if ([50, 51].includes(chainId)) {
            console.log("testing this")
            return "xinpay";
        }
        console.log("testing that")

        return "metamask";
    // }
}

const getRequestContract = async (web3) => {
    console.log("Web3 value is",web3)
    const data = await $.getJSON('../contractsJSON/request.json');

    console.log("data value is",data)
    const netId = await web3.eth.net.getId();
    console.log("Netid",netId);

    const requestContract = new web3.eth.Contract(
      data,
      "0x045687b5eda47d9c38d2ce79d35f3179b43f2f37"
    );
    console.log("request Contract is",requestContract)
    return requestContract;
};
