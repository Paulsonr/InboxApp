const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider('later stool reopen end super unhappy hobby orbit broom sting cabbage reunion',
    'https://goerli.infura.io/v3/db8126c23bbd4a6aa3b497ba384107b4');

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy the contract from account ", accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data: bytecode, arguments: ['Hi there!'] }).send({ from: accounts[0], gas: '1000000' });
    console.log("Contract deployed to ", result?.options?.address);
    provider.engine.stop();
};
deploy();