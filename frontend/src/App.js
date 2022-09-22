import './App.css';
import React, {useState} from 'react'
import { BASE_URL } from './urls'
import { Modal, Form, Button } from 'react-bootstrap'
import CreateContributorForm from './forms/CreateContributorForm';
import UpdateContributorForm from './forms/UpdateContributorForm';
import Table from './table/Table';
import { ContributorColumn } from './table/TableColumns';
import MOCK_DATA from './MOCK_DATA.json'

function fixDateObjects(responseBody) {
  if (responseBody) {
    const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}/;
    for (const [key, value] of Object.entries(responseBody)) {
      const val = String(value);
      if (val.startsWith('[object Object]')) {
        fixDateObjects(value);
      }
      if (val.match(regex)) {
        responseBody[key] = new Date(val);
      }
    }
  }
}

function App() {
  const [displayCreate, setDisplayCreate] = useState(false)
  const [displayUpdate, setDisplayUpdate] = useState(false)
  const closerCreate = () => {
    console.log("logging ",displayCreate)
    setDisplayCreate(!displayCreate)
  }
  const closerUpdate = () => {
    console.log("logging ",displayUpdate)
    setDisplayUpdate(!displayUpdate)
  }

  const data = {
    id: "A12312312412",
    name: "John Doe",
    email: "abc@gmail.com",
    gender: "male",
    phone: "85323423",
    create_date: Date.now(),
    update_date: Date.now(),
    userDescription: "Piss off"
}

// console.log()
  const d = new Date()//.toLocaleTimeString()
  return (
    <div className="App">  
      <p> {MOCK_DATA[0].update_date}</p>
      <Button variant="primary" onClick={closerCreate}>Add Contributor</Button> 
      <CreateContributorForm show={displayCreate} onHide={closerCreate} />
      <Button variant="secondary" onClick={closerUpdate}>Update Contributor</Button> 
      <UpdateContributorForm show={displayUpdate} onHide={closerUpdate} data={data}/>
      <Table columns={ContributorColumn} data={MOCK_DATA} />
    </div>
  );
}

export default App;
