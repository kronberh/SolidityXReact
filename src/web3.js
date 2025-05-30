import Web3 from 'web3';

let web3;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
        window.ethereum.request({method: 'eth_requestAccounts'});
    } catch (err) {
        console.error(err);
    }
} else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider)
} else {
    console.error('Web3 not detected')
}

export default web3;
