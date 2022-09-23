import React, {useState} from 'react'
import { Button } from "react-bootstrap";
import { deleteContributor } from '../services/contributorservices';

export default function DeleteContributorButton({contributor_id, reload }) {
    const [error, setError] = useState(null)
    const deleteNode = () => {
        deleteContributor(contributor_id).then(
        ).catch((err) =>{
            console.log(err.response)
            setError(err)
        })
        reload()
    }
    return (<div>
        <Button variant="secondary" type="submit" name="deleteContributor" value={contributor_id} onClick={deleteNode}>Delete Contributor</Button>
        <p>{error}</p>
    </div>
    )
}
