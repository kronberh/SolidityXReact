import {useState, useEffect} from 'react';
import web3 from './web3';
import contract from './contracts/media';
import lighthouse from '@lighthouse-web3/sdk';

function Media() {
    const [account, setAccount] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState();
    const [images, setImages] = useState([]);

    async function loadImages() {
        const result = await contract.methods.getArts().call();
        setImages(result);
    }

    async function loadAccounts() {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
    }

    async function submitHandler(e) {
        e.preventDefault();
        if (!file || !name) {
            alert("Provide both a name and a file.");
            return;
        }
        const fileUpload = await lighthouse.upload([file], apiKey);
        const cid = fileUpload.data.Hash;
        console.log(cid);
        await contract.methods.newArt(cid, name).send({from: account});
        await loadImages();
    }

    async function deleteHandler(id) {
        await contract.methods.deleteArt(id).send({from: account});
        await loadImages();
    }

    useEffect(() => {
        loadAccounts();
        loadImages();
    }, []);

    const apiKey = '8e477174.ac2e21635ce84f279c8ceb8bc999a686'

    return (
        <div style={{padding: '1em'}}>
            <h1>Media Contract</h1>
            <p>Account: {account}</p>
            <form onSubmit={submitHandler}>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Define art name'></input>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} placeholder='Upload file'></input>
                <button type="submit">Submit</button>
            </form>
            <br />
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '1em'}}>
                {images.map((img) => (
                    <div key={img.id} style={{backgroundColor: 'lightgray', borderRadius: '0.5em'}}>
                        <img style={{height: '10em', borderRadius: '0.5em 0.5em 0 0'}} src={`https://gateway.lighthouse.storage/ipfs/${img.cid}`} alt={img.name} />
                        <div style={{textAlign: 'center', height: '5em', overflow: 'hiddex', padding: '0.5em'}}>
                            <button onClick={() => deleteHandler(img.id)} style={{backgroundColor: 'red', color: 'white'}}>Delete</button>
                            <h3>{img.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Media;
