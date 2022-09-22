import React, {useState} from 'react'
import { Modal, Form, Button } from 'react-bootstrap'


export default function UpdateContributorForm({show, onHide, data}) {
    const [contributor, setContributor] = useState({
        id: data.id,
        name: data.name,
        email: data.email,
        gender: data.gender,
        phone: data.phone,
        create_date: data.create_date,
        update_date: data.update_date,
        userDescription: data.userDescription
    })
  
    const handleChange = (event)=> {
        if (event.target.name === "is_flagged" || event.target.name === "is_completed") {
            setContributor(prevState => {
                const newState = Object.assign({}, prevState)
                newState[event.target.name] = !(newState[event.target.name])
                return newState
            })    
            return
        }
        
        setContributor(prevState => {
            const newState = Object.assign({}, prevState)
            newState[event.target.name] = event.target.value
            return newState
        })
    }
    const handleSubmit = (event) => {
        console.log(event)
        // event.preventDefault()
        // if (!(contributor.email.trim() && contributor.name.trim())) {
        //     alert("Email and Name are required fields")
        //     return
        // }
        // const data = {
        //     name: contributor.name,
        //     email: contributor.email,
        //     gender: contributor.String,
        //     phone: contributor.phone,
        //     userDescription: contributor.userDescription
        // }
        // axios.put(`${BASE_URL}/contributor/contributor/${contributor.id}`, data).then((res)=> {
        //     reloader()
        //     closer()
        // })
    }
    return (
            <Modal 
            show={show} 
            onHide={onHide} 
            size="lg" 
            aria-labelledby="contained-modal-title-vcenter" 
            centered backdrop="static">
              <Modal.Header closeButton>
                <Modal.Title>Edit Contributor Information</Modal.Title>
              </ Modal.Header >
              <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                <Form.Label>Name: </Form.Label><br/>
                    <input type="text" name="Contributor Name" value={contributor.name} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Email: </Form.Label><br/>
                    <input type="text" name="Contributor Email" value={contributor.email} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="me-2">Gender:</Form.Label>
                    <select name="Gender" value={contributor.gender} onChange={handleChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Phone Number: </Form.Label><br/>
                    <input type="text" name="Contributor Work Phone" value={contributor.phone} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Description: </Form.Label><br/>
                    <input type="text" name="description" value={contributor.description} onChange={handleChange}/>
                </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </ Modal>
    )
  }