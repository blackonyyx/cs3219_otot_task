import './App.css';
import Table from './components/Table';
import React, {useState, useEffect} from "react"
import getIndex from './services';

function App() {
  const [contributorIndex, setContributorIndex] = useState({})
  useEffect(()=> {
      getIndex().then((res) => {
        console.log(res)
        setContributorIndex(res)
      }
    ).catch(
      () => {
        setContributorIndex({error: 'uh oh'})
      }
    )
  })
  return (
    <div className="App">
      <h1> HI</h1>
      <text>{JSON.stringify(contributorIndex)}</text>
      <Table />
    </div>
  );
}

export default App;
