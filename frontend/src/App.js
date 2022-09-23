import './App.css';
import React, {useEffect, useState} from 'react'
import CreateContributorForm from './forms/CreateContributorForm';
import Table from './table/Table';
import { ContributorColumn, MotherlessColumns } from './table/TableColumns';
import { getContributorIndex } from './services/contributorservices';
import { getMotherlessSearch } from './services/serverless';
import { Form, Button, Col, Row } from 'react-bootstrap'
import Topbar from './TopBar/Topbar';

function App() {
  const [displayCreate, setDisplayCreate] = useState(false)
  const [data, setData] = useState([])
  const [serverless, setServerless] = useState([])
  
  const closerCreate = () => {
    setDisplayCreate(!displayCreate)
  }
  useEffect(()=> {
    loadData()
  }, [])

  // reload data manually
  const loadData = () => {
    getContributorIndex().then( 
      (res) => {
      setData(res.data)
    }
    )
  }

  const [query, setQuery] = useState({
    name: '',
    ingredients: '',
    tags: '',
    maxPrepareTime: '',
    maxCookTime: '',
    maxSugar: '',
    maxAddedSugar: '',
    maxNetCarbs: '',
    special_diet: '',
    religious: '',
    allergy1: '',
    allergy2: '',
    allergy3: '',
    allergy4: '',
    byCalories: '',
    byFat: '',
  })
  
  const handleChange = (event) => {
    setQuery({ ...query, [event.target.name]: event.target.value });
  };

  const resetForm = () => {
    setQuery({
        name: '',
        ingredients: '',
        tags: '',
        maxPrepareTime: '',
        maxCookTime: '',
        maxSugar: '',
        maxAddedSugar: '',
        maxNetCarbs: '',
        special_diet: '',
        religious: '',
        allergy1: '',
        allergy2: '',
        allergy3: '',
        allergy4: ''
      })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!(query.name.trim())) {
        alert("Food Name is a required field")
        return
    }
    const data = getMotherlessSearch(query)
    data.then((res) => {
        setServerless(res.data)
    })

  }

  return (
    <div className="App">  
      <Topbar />
      <Button variant="primary" onClick={loadData}>Reload Index</Button> 
      <Button variant="secondary" onClick={closerCreate}>Add Contributor</Button> 
      <CreateContributorForm show={displayCreate} onHide={closerCreate} />
      <Table columns={ContributorColumn} data={data} reload={loadData} type="contributor" />
      {/* <ServerlessForm sendback={(d)=>setServerless(d)} /> */}
      <div className='Form'>
      <Form>
                <h1>Query for Food Recipes</h1>
            <Row className="align-items-center">
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Food Name: </Form.Label><br/>
                <Form.Control type="text" name="name" value={query.name} onChange={handleChange} placeholder="omelette"/>
                <Form.Label>Ingredient: </Form.Label><br/>
                <Form.Control type="text" name="ingredients" value={query.email} onChange={handleChange} placeholder="egg"/>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Maximum Cook Time: </Form.Label><br/>
                <Form.Control type="number" name="maxCookTime" value={query.maxCookTime} onChange={handleChange} placeholder="15"/>
                <Form.Label>Maximum Prepare Time: </Form.Label><br/>
                <Form.Control type="number" name="maxPrepareTime" value={query.maxPrepareTime} onChange={handleChange} placeholder="20"/>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Maximum Sugar Amount: </Form.Label><br/>
                <Form.Control type="number" name="maxSugar" value={query.maxSugar} onChange={handleChange} placeholder="1.5"/>
                <Form.Label>Maximum Added Sugar: </Form.Label><br/>
                <Form.Control type="number" name="maxAddedSugar" value={query.maxAddedSugar} onChange={handleChange} placeholder="2.5"/>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Maximum Net Carbohydrates: </Form.Label><br/>
                <Form.Control type="number" name="maxNetCarbs" value={query.maxNetCarbs} onChange={handleChange} placeholder="omelette"/>
            </Form.Group>
            </Row>
            <Row className="align-items-center">
                <Col className="my-1">
                <Form.Group className="mb-3">
                    <Form.Label className="me-2">Special Diet:</Form.Label>
                    <Form.Select name="special_diet" value={query.special_diet} onChange={handleChange}>
                        <option value="">Choose a Special Diet</option>
                        <option value="vegan">Vegan</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="pescatarian">Pescatarian</option>
                        <option value="keto">Ketogenic</option>
                        <option value="paleo">Paleo</option>
                    </Form.Select>
                    <Form.Label className="me-2">Religious:</Form.Label>
                    <Form.Select name="religious" value={query.religious} onChange={handleChange}>
                        <option value="">Choose a Religious Constraint</option>
                        <option value="pork-free">Halal</option>
                        <option value="vegetarian">Buddhist</option>
                        <option value="beef-free">Hinduist</option>
                    </Form.Select>
                </Form.Group>
                </Col>
            </Row>
            <Row className="align-items-center">
            <Col sm={5} className="my-1">
                <Form.Group className="mb-3">
                    <Form.Label className="me-2">Allergy 1:</Form.Label>
                    <Form.Select name="allergy1" value={query.allergy1} onChange={handleChange}>
                        <option value="">Choose a Allergy</option>
                        <option value="dairy-free">Lactose Intolerant</option>
                        <option value="gluten-free">Celiac's Disease</option>
                        <option value="shellfish-free">Shellfish Allergy</option>
                        <option value="peanut-free">Peanut Allergy</option>
                    </Form.Select>
                    <Form.Label className="me-2">Allergy 2:</Form.Label>
                    <Form.Select name="allergy2" value={query.allergy2} onChange={handleChange}>
                        <option value="">Choose a Allergy</option>
                        <option value="dairy-free">Lactose Intolerant</option>
                        <option value="gluten-free">Celiac's Disease</option>
                        <option value="shellfish-free">Shellfish Allergy</option>
                        <option value="peanut-free">Peanut Allergy</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col sm={5} className="my-1">
                <Form.Group className="mb-3">
                <Form.Label className="me-2">Allergy 3:</Form.Label>
                    <Form.Select name="allergy3" value={query.allergy3} onChange={handleChange}>
                        <option value="">Choose a Allergy</option>
                        <option value="dairy-free">Lactose Intolerant</option>
                        <option value="gluten-free">Celiac's Disease</option>
                        <option value="shellfish-free">Shellfish Allergy</option>
                        <option value="peanut-free">Peanut Allergy</option>
                    </Form.Select>
                    <Form.Label className="me-2">Allergy 4:</Form.Label>
                    <Form.Select name="allergy4" value={query.allergy4} onChange={handleChange}>
                        <option value="">Choose a Allergy</option>
                        <option value="dairy-free">Lactose Intolerant</option>
                        <option value="gluten-free">Celiac's Disease</option>
                        <option value="shellfish-free">Shellfish Allergy</option>
                        <option value="peanut-free">Peanut Allergy</option>
                </Form.Select>
                </Form.Group>
            </Col>
            </Row>
            </Form>
        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        <Button variant="danger" onClick={resetForm}>Reset Search</Button>
        </div>
      <Table columns={MotherlessColumns} data={serverless} reload={setServerless} type="serverless" />
      
    </div>
  );
}

export default App;
