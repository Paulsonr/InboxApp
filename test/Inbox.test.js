const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

const INITIAL_STR = "Hi there!";
let accounts;
let inbox;
beforeEach(async () => {
    // get the list of all accounts
    accounts = await web3.eth.getAccounts();

    // use one of the account to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_STR] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploy the contract', () => {
        assert.ok(inbox.options.address);
    });
    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STR);
    });
    it('can change the message', async () => {
        await inbox.methods.setNewMessage('Bye there!').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye there!');
    })
});

