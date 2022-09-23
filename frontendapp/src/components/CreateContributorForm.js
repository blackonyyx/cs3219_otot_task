import React, { useState } from 'react'
import axios from "axios"
import { BASE_URL } from '../urls'
import { Form, Button } from 'react-bootstrap'

async function PopupCreateContributorForm({closer, reloader}) {
    const [contributor, setContributor] = useState({
        name: "",
        email: "",
        gender: "",
        phone: "",
        userDescription: ""
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
        event.preventDefault()
        if (!(contributor.email.trim() && contributor.name.trim())) {
            alert("Email and Name are required fields")
            return
        }
        const data = {
            name: contributor.name,
            email: contributor.email,
            gender: contributor.String,
            phone: contributor.phone,
            userDescription: contributor.userDescription
        }
        axios.post(`${BASE_URL}/contributor/contributor`, data).then((res)=> {
            reloader()
            closer()
        })
        setContributor({
            name: "",
            email: "",
            gender: "",
            phone: "",
            userDescription: ""
        })
    }

    return (
        <div className='popup'>
            <div className='popup_inner'>
                <div className="d-flex justify-content-end">
                    <Button variant="dark" className="float-right mb-3" onClick={closer}>Close</Button>
                </div>
                <h2>Register New Contributor</h2>
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
                <Button variant="warning" type="submit" value="Submit" onClick={handleSubmit}>Submit</Button>
                </Form>
            </div>
        </div>
    )
}
export default PopupCreateContributorForm