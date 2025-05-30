import {useState, useEffect} from 'react';
import web3 from './web3';
import contract from './contracts/media';
import lighthouse from '@lighthouse-web3/sdk';

function Media() {
    const [account, setAccount] = useState();
    const [name, setName] = useState();
    const [file, setFile] = useState();
    const [cid, setCid] = useState();

    async function loadAccounts() {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
    }

    async function submitHandler(e) {
        e.preventDefault();
        const fileUpload = await lighthouse.upload([file], apiKey);
        setCid(fileUpload.data.Hash);
        await contract.methods.newArt(cid, name).send({from: account});
        const result = await contract.methods.getArts().call();
        console.log(result);
    }

    useEffect(() => {
        loadAccounts();
    }, []);

    const apiKey = '8e477174.ac2e21635ce84f279c8ceb8bc999a686'

    return (
        <div>
            <h1>Media Contract</h1>
            <p>Account: {account}</p>
            <form onSubmit={submitHandler}>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Define art name'></input>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} placeholder='Upload file'></input>
                <button type="submit">Submit</button>
            </form>
            <img src={`https://gateway.lighthouse.storage/ipfs/${cid}`} alt="image" />
        </div>
    )
}

export default Media;
