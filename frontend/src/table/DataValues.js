import React, {useState} from "react"
import Moment from 'moment'
import Badge from 'react-bootstrap/Badge'

export const DateData = ({ value }) => {
    const [isRelativeDate, setIsRelativeDate] = useState(true);
    const [relativeDate, setRelativeDate] = useState(Moment(new Date(value)).fromNow());
    const handleClick = () => {
        if (isRelativeDate) {
            setRelativeDate(Moment(new Date(value)).format('DD-MM-YYYY'));
            setIsRelativeDate(false)
        } else {
            setRelativeDate(Moment(new Date(value)).fromNow());
            setIsRelativeDate(true)
        }
    }
    // console.log(Moment(new Date(value)).format('DD-MM-YYYY'))
    return (<div onClick={handleClick}>
        <span key="dateTag" className="date-badge">{relativeDate}</span>
    </div>
    )
}

export const DataGender = ({ value }) => {
        switch(value){
        case "Male":
            return (<><Badge bg="primary" className="gender-badge">Male</Badge></>)
        case "Female":
            return (<><Badge bg="danger" className="gender-badge">Female</Badge></>)
        case "others":
            return (<><Badge bg="success" className="gender-badge">Others</Badge></>)
        default:
            return (<><Badge bg="secondary" className="gender-badge">Anonymous</Badge></>)
    }
};

export const DataTag = ({ valueList }) => {
    return (
        <>
        {valueList.map((tag, idx) => (
            <Badge style={{ maxWidth: 100 }} bg="warning" text="dark" key={idx} className="tag-badge text-wrap">
            {tag}
            </Badge>
        ))}
    </>
    );
};
