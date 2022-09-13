/* eslint-disable react/prop-types */
import React, {useState, useEffect, useMemo } from "react"
import Button from 'react-bootstrap/Button'
import useTable from 'react-table'
import axios from "axios"
import Table from "./parts/Table.jsx"
import DateData from './parts/TableElement.jsx'
import PopupUpdateContributorForm from './parts/PopupUpdateContributorForm'

export default function App() {
  const [display, setIsDisplayed] = useState(false)
  const [contributorId, setContributorId] = useState(null)
  const [contributor, setContributor] = useState(null)
  const data = 0
  const columns = useMemo( () => [
    {
      Header: "Contributor",
      columns: [
        {
          Header: "Name",
          accessor: "contributor.name",
          maxWidth: 250,
          width: 150,
        },
        {
          Header: "Email",
          accessor: "contributor.email",
          maxWidth: 150,
          width: 100,
        },
        {
          Header: "Phone number",
          accessor: "contributor.phone"
        },
        {
          Header: "Join Date",
          accessor: "contributor.create_date"
        },{
          Header: "Last Activity",
          accessor: "contributor.update_date",
          Cell: ({ cell: { value } }) => <DateData value={value} />
        },
        {
          Header: "User Description",
          accessor: "contributor.userDescription",
          Cell: ({ cell: { value } }) => 
            <span style={{ maxWidth: 200, 'overflow-wrap': 'break-word' }}>{value}</span>
        },
      ]
    }
  ])
  
  const togglePopup = (event) => {
    setIsDisplayed(!display)
    console.log(display)
  }

  return (
    // do something here where there is a button that will replace the text
    <div className="App">
      <Button variant="primary" size="lg" onChange={togglePopup}>
          Edit Contributor Information
        </Button>
      {display 
      ? <PopupUpdateContributorForm id={contributorId} data={contributor} reloader={reloader} closer={closePopup} /> 
      : null}

      {/* <Table columns={columns} data={data} /> */}
    </div>
  )
}

