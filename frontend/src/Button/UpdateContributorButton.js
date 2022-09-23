import React, {useState} from 'react'
import { Button } from "react-bootstrap";
import UpdateContributorForm from '../forms/UpdateContributorForm';

export default function UpdateContributorButton({contributor, reload }) {
    const [displayUpdate, setDisplayUpdate] = useState(false)

    const closerUpdate = () => {
        setDisplayUpdate(!displayUpdate)
        reload()
    }
    return (<div>
        <Button variant="secondary" onClick={closerUpdate}>Update Contributor</Button> 
        <UpdateContributorForm show={displayUpdate} onHide={closerUpdate} data={contributor} />
    </div>
    )
}
// mongoimport --uri mongodb+srv://admin:Assword@otot-assignment.mo20vmx.mongodb.net/ototDBRecipes --collection contributors --type json --jsonArray --file MOCK_DATA.json
