import React from "react"
import Moment from 'moment'
import { Badge } from 'react-bootstrap/Badge'

export const DateData = ({ value }) => {
    return (<><span key="dateTag" className="date-badge">
        {Moment(new Date(value)).format('DD-MM-YYYY, HH:mm:ss')}
    </span></>)
}

export const DataGender = ({ value }) => {
        switch(value){
        case "male":
            return (<><Badge bg="primary" className="gender-badge">Male</Badge></>)
        case "female":
            return (<><Badge bg="danger" className="gender-badge">Female</Badge></>)
        case "others":
            return (<><Badge bg="success" className="gender-badge">Others</Badge></>)
        default:
            return (<><Badge bg="secondary" className="gender-badge">Anonymous</Badge></>)
    }
};




