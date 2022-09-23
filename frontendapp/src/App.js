import './App.css';
import Table from './components/Table';
import React from "react"
// import getIndex from './services';
import PopupUpdateContributorForm from './components/UpdateForm';
import PopupCreateContributorForm from './components/CreateContributorForm';

function App() {
  // const [contributorIndex, setContributorIndex] = useState({})
  // useEffect(()=> {
  //     getIndex().then((res) => {
  //       console.log("hi", res)
  //       setContributorIndex(res)
  //     }
  //   ).catch(
  //     () => {
  //       setContributorIndex({error: 'uh oh'})
  //     }
  //   )
  // })
  return (
    <div className="App">
      <h1> HI</h1>
      <Table />
    </div>
  );
}

export default App;
