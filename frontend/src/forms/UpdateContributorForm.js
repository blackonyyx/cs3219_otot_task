import React, {useState} from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { updateContributor } from '../services/contributorservices';


export default function UpdateContributorForm({show, onHide, data}) {
    const [contributor, setContributor] = useState({
        _id: data._id,
        name: data.name,
        email: data.email,
        gender: data.gender,
        phone: data.phone,
        create_date: data.create_date,
        update_date: data.update_date,
        userDescription: data.userDescription
    })
  
    const handleChange = (event) => {
        console.log("change", contributor)
        setContributor({ ...contributor, [event.target.name]: event.target.value });
      };

    const handleSubmit = (event) => {
        console.log(event)
        event.preventDefault()
        if (!(contributor.email.trim() && contributor.name.trim())) {
            alert("Email and Name are required fields")
            return
        }
        updateContributor(contributor._id, contributor)
        onHide()
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
                      <Form.Control type="text" name="name" value={contributor.name} onChange={handleChange} placeholder="input name"/>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Email: </Form.Label><br/>
                      <Form.Control type="text" name="email" value={contributor.email} onChange={handleChange} placeholder="input email"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="me-2">Gender:</Form.Label>
                    <Form.Select name="gender" value={contributor.gender} onChange={handleChange}>
                          <option value="">Choose a Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Non-binary">Others</option>
                      </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Phone Number: </Form.Label><br/>
                      <Form.Control type="text" name="phone" value={contributor.phone} onChange={handleChange} placeholder="Input Phone Number"/>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Description: </Form.Label><br/>
                      <Form.Control type="text" name="userDescription" value={contributor.userDescription} onChange={handleChange} placeholder="Input Your User Bio"/>
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