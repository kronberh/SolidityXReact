import web3 from '../web3';
import contractAbi from './mediaAbi.json';

const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

const contract = new web3.eth.Contract(contractAbi, contractAddress);

export default contract;
