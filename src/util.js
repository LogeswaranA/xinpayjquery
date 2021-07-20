
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
    const data = await $.getJSON("./contractsJSON/request.json");
    const netId = await web3.eth.net.getId();
    console.log("Netid", netId)
};

const mainExecute = async () => {
    if ((await GetCurrentProvider()) !== "xinpay") {

    } else {
        const web3 = await getWeb3();
        console.log("web3 value is",web3)
        getRequestContract(web3);
    }
}

mainExecute();