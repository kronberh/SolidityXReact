import web3 from '../web3';
import contractAbi from './counterAbi.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const contract = new web3.eth.Contract(contractAbi, contractAddress);

export default contract;
