import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState('')
  const [transactions, setTransactions] = useState()
  const [balance, setBalance] = useState(0)

  const handleChange = e =>{
    setUser(e.target.value);
  }

  const handleSubmit = () =>{
    let total = 0;
    axios
      .get('http://localhost:5000/chain')
      .then(res =>{
        console.log("This is the get request", res.data.chain);
        let chain = res.data.chain
        let name = user
        let list = []
        chain.forEach(block =>{
          block.transactions.forEach(item =>{
            let sender = item.sender
            let recipient = item.recipient
            if(sender === name){
              total -= item.amount
              list.push(item)
            } else if(recipient === name){
              total += item.amount
              list.push(item)
            }
          })
        })
        setBalance(total)
        setTransactions(list)
      })
      .catch(err =>{
        console.log(err)
      })
  }
  return(
    <div className="App">
        <input placeholder="Username" name="user" value={user} onChange={handleChange} />
        <button onClick={handleSubmit}>Go!</button>
        <div>
          <p>Total Balance: {balance}</p>
        </div>
      { transactions && transactions.map(block=>{
        return( <div key={block.id}>
          <p>Sender: {block.sender}</p>
          <p>Recipient: {block.recipient}</p>
          <p>Amount: {block.amount}</p>
          </div>
          )
      })}
    </div>
  )
}

export default App;