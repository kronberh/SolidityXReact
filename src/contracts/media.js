import web3 from '../web3';
import contractAbi from './mediaAbi.json';

const contractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

const contract = new web3.eth.Contract(contractAbi, contractAddress);

export default contract;
