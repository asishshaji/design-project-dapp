import Web3 from 'web3';

// window.web3.currentProvider is the provider of web3 injected by metamask,this provider has 
// access to all our address and its private key

const web3 = new Web3(window.web3.currentProvider);

export default web3;