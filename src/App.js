import {useState, useEffect} from 'react';
import web3 from './web3';
import contract from './contracts/counter';

function App() {
  const [account, setAccount] = useState('');
  const [value, setValue] = useState(0);
  const [storedValue, setStoredValue] = useState()

  async function loadAccounts() {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  async function loadStoredValue() {
    const result = await contract.methods.getCounter().call();
    setStoredValue(result);
  }

  async function countHandler() {
    await contract.methods.nextValue().send({from: account});
    loadStoredValue();
  }

  async function setCountHandler(e) {
    e.preventDefault()
    await contract.methods.setCounter(value).send({from: account});
    loadStoredValue();
  }

  useEffect(() => {
    loadAccounts();
    loadStoredValue();
  }, []);

  return (
    <div>
      <h1>Counter Contract</h1>
      <p>Account: {account}</p>
      <form onSubmit={setCountHandler}>
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder='Set new value'></input>
        <button type="submit">Set</button>
      </form>
      <button onClick={countHandler}>Increment stored value: {storedValue}</button>
    </div>
  );
}

export default App;
